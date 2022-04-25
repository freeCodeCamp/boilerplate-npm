function objParser(str, init) {
  // finds objects, arrays, strings, and function arguments
  // between parens, because they may contain ','
  const openSym = ["[", "{", '"', "'", "("];
  const closeSym = ["]", "}", '"', "'", ")"];
  let type;
  for (var i = init || 0; i < str.length; i++) {
    type = openSym.indexOf(str[i]);
    if (type !== -1) break;
  }
  if (type === -1) return null;
  const open = openSym[type];
  const close = closeSym[type];
  let count = 1;
  for (var k = i + 1; k < str.length; k++) {
    if (open === '"' || open === "'") {
      if (str[k] === close) count--;
      if (str[k] === "\\") k++;
    } else {
      if (str[k] === open) count++;
      if (str[k] === close) count--;
    }
    if (count === 0) break;
  }
  if (count !== 0) return null;
  const obj = str.slice(i, k + 1);
  return {
    start: i,
    end: k,
    obj: obj,
  };
}

function replacer(str) {
  // replace objects with a symbol ( __#n)
  let obj;
  let cnt = 0;
  let data = [];
  // obj = objParser(str) is not a syntax error
  while ((obj = objParser(str))) {
    data[cnt] = obj.obj;
    str =
      str.substring(0, obj.start) + "__#" + cnt++ + str.substring(obj.end + 1);
  }
  return {
    str: str,
    dictionary: data,
  };
}

function splitter(str) {
  // split on commas, then restore the objects
  const strObj = replacer(str);
  let args = strObj.str.split(",");
  args = args.map(function (a) {
    let m = a.match(/__#(\d+)/);
    while (m) {
      a = a.replace(/__#(\d+)/, strObj.dictionary[m[1]]);
      m = a.match(/__#(\d+)/);
    }
    return a.trim();
  });
  return args;
}

function assertionAnalyser(body) {
  // already filtered in the test runner
  // // remove comments
  // body = body.replace(/\/\/.*\n|\/\*.*\*\//g, '');
  // // get test function body
  // body = body.match(/\{\s*([\s\S]*)\}\s*$/)[1];

  if (!body) return "invalid assertion";
  // replace assertions bodies, so that they cannot
  // contain the word 'assertion'

  const cleanedBody = body.match(
    /(?:browser\s*\.\s*)?assert\s*\.\s*\w*\([\s\S]*\)/
  );
  if (cleanedBody && Array.isArray(cleanedBody)) {
    body = cleanedBody[0];
  } else {
    // No assertions present
    return [];
  }
  const s = replacer(body);
  // split on 'assertion'
  const splittedAssertions = s.str.split("assert");
  let assertions = splittedAssertions.slice(1);
  // match the METHODS

  let assertionBodies = [];
  const methods = assertions.map(function (a, i) {
    const m = a.match(/^\s*\.\s*(\w+)__#(\d+)/);
    assertionBodies.push(parseInt(m[2]));
    const pre = splittedAssertions[i].match(/browser\s*\.\s*/)
      ? "browser."
      : "";
    return pre + m[1];
  });
  if (
    methods.some(function (m) {
      return !m;
    })
  )
    return "invalid assertion";
  // remove parens from the assertions bodies
  const bodies = assertionBodies.map(function (b) {
    return s.dictionary[b].slice(1, -1).trim();
  });
  assertions = methods.map(function (m, i) {
    return {
      method: m,
      args: splitter(bodies[i]), //replace objects, split on ',' ,then restore objects
    };
  });
  return assertions;
}

module.exports = assertionAnalyser;
