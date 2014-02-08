#!/bin/bash
#
# Production initialization script
# Runs the init worker in a one-off dyno to initialize the databases
#
# Run after production deployment when clean data is required
#   (Like after a key, model, route, or content policy change)
#
# Operates on a pre-existing repo for heroku deployments
# Assumes
#   You have the heroku toolbelt installed
#   You have previously deployed the app to production with the prod.sh script
#

# the destination directory of the heroku repo
repo=/home/agrant/var/www/content/wpspa-heroku

# change to the deployment repo
if [ -d "$repo" ] && [ -d "$repo/.git" ]; then
  cd "$repo"
  heroku run:detached server/workers/init/bin/init
  heroku run server/workers/dump/bin/dump
  cd -
else
  echo "ERROR repo $repo not found"
fi