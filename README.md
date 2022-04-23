# Backend Challenges boilerplate - package.json
[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-npm)](https://repl.it/github/freeCodeCamp/boilerplate-npm)


https://help.heroku.com/CKVOUPSY/how-to-switch-deployment-method-from-github-to-heroku-git-with-all-the-changes-app-code-available-in-a-github-repo

From the local repository's root directory, enter these commands:

$ git pull origin
This pulls your repo from GitHub, assuming that origin is your GitHub remote repo. Change this depending on your local setup. This will make sure all changes committed to GitHub are in your local git repo.
$ git checkout branch-to-deploy
This will checkout the branch you wish to deploy, for example master or main. You don't strictly need to do this if you are already working on this branch locally.
$ heroku git:remote -a app-name
This will create the heroku remote in your local repo for the app you wish to deploy to.
$ git push heroku branch-to-deploy:main
This pushes the local branch to the Heroku app's git repository. You can change heroku depending on what you do in step 3. You can also use a different branch here if you are not deploying from main locally. The last part always needs to be main or master, as Heroku will only start builds for pushes to the main or master branch.
Additional Options

If you use the same repo for multiple apps, you can use the -r option on step 3 to have different remote names. For example, heroku git:remote -r heroku-dev -a heroku-dev-app will make the heroku-dev remote. You can then also add your production app to your local repo by doing heroku git:remote -r heroku-prod -a heroku-prod-app.

To push a specific commit, specify the commit SHA in step 4. For example, git push heroku commit-ref-sha:main where commit-ref-sha is the specific commit SHA.