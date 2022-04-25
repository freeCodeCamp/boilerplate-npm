function Utils() {
   this.ready = function (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   };

   this.ajax = function (options, cb) {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4){
           if(Math.floor(xmlhttp.status/100) === 2) {
             var results = xmlhttp.responseText;
             var type = xmlhttp.getResponseHeader('Content-Type');
             if(type.match('application/json')) {
               results = JSON.parse(results);
             }
             cb(null, results);
           } else {
             cb(xmlhttp);
           }
         }
      };

      const method = options.method || 'get';
      let url = options.url || '/';

      if(url.charAt(url.length - 1) === '/')
        url = url.slice(0,url.length-1);

      if (options.data) {
        let query;
        let contentType = "application/x-www-form-urlencoded";
        if(options.type && options.type === 'json') {
          query = JSON.stringify(options.data);
          contentType = "application/json";
        } else {
          query = [];
          for (let key in params) {
            query.push(key + '=' + encodeURIComponent(params[key]));
            query.push('&');
          }
          query.pop();
          query = query.join('');
        }

        switch(method.toLowerCase()){
          case 'get':
            url += ('?' + query);
            xmlhttp.open(method, url, true);
            xmlhttp.send();
            break;
          case 'put':
          case 'patch':
          case 'delete':
          case 'post':
            xmlhttp.open(method, url, true);
            xmlhttp.setRequestHeader("Content-type", contentType);
            xmlhttp.send(query);
            break;
          default:
            return;
        }
      } else {
        xmlhttp.open(method, url, true);
        xmlhttp.send();
      }

   };
}

const utils = new Utils();

utils.ready(function() {

  const form = document.getElementById('f1');
  const input = document.getElementById('i1');
  const div = document.getElementById('tn');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value) {
      const options = {
        method: 'put',
        url: '/travellers',
        type: 'json',
        data: {surname: input.value}
      };
      div.innerHTML = '<p>Loading...</p>';
      utils.ajax(options, function(err, res) {
        if(err) return console.log(err);
        div.innerHTML = '<p>first name: <span id="name">' + res.name + '</span><p>' +
          '<p>last name: <span id="surname">' + res.surname + '</span><p>' +
          '<p>dates: <span id="dates">' + res.dates + '</span><p>';
      });
    }
  });
});
