#!/bin/bash
#
# Production deployment script
# Copies the release distribution files to the production deployment repo and deploys
#
# Operates on a pre-existing repo for aws deployments
# Assumes
#   You have elastic beanstalk installed
#   Repo was previously setup with 'git init', 'eb init', and 'eb start'
#

# the source directory of the release distribution
src=/home/agrant/var/www/content/wpspa/dist/release

# the destination directory of the production deployment repo
dest=/home/agrant/var/www/content/wpspa-aws

# deployment message
message="production deployment `date +%F-%H.%M.%S`"

# refresh the release build
grunt release
if [ $? -eq 0 ]; then

  # change to the deployment repo
  if [ -d "$dest" ] && [ -d "$dest/.git" ]; then
    cd "$dest"
    if [ $? -eq 0 ] && [ "`pwd`" = "$dest" ]; then
      if [ -d "$src" ]; then

        echo "cleaning $dest..."
        find ./ ! -path "./.git*" ! -path "./.elasticbeanstalk*" ! -name "*.sublime*" ! -name "." -delete
        delResult=$?

        clean=`find ./ ! -path "./.git*" ! -path "./.elasticbeanstalk*" ! -name "*.sublime*" ! -name "." -print | wc -l`
        if [ $delResult -eq 0 ] && [ $clean -eq 0 ]; then

          echo "copying $src to $dest..."
          cp -r $src/* .
          cpResult=$?

          files=`find ./ -type f ! -path "./.git*" ! -path "./.elasticbeanstalk*" ! -name "*.sublime*" ! -name "." -print | wc -l`
          if [ $cpResult -eq 0 ] && [ $files -gt 0 ]; then
            echo "copied $files files for deployment..."

            git status | grep -i "nothing to commit"
            status=$?
            if [ $status -ne 0 ]; then
              echo "deploying to aws..."
              
              git add --all
              git commit -m "$message"

              #git aws.push
            else
              echo "no changes, deployment cancelled"
              git checkout -- .
            fi
          else
            echo "ERROR failed to copy any files to the repo"
            git checkout -- .
          fi
        else
          echo "ERROR failed to clean $dest prior to deployment"
          git checkout -- .
        fi
      else
        echo "ERROR directory $src not found"
      fi
      #go back to wherever we started.
      cd - >/dev/null
    else
      echo "ERROR change to directory $dest failed"
    fi
  else
    echo "ERROR repo $dest not found"
  fi
else
  echo "ERROR release build failed"
fi