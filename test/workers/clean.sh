#!/bin/bash
#
# Verify the production functionality of the clean worker process
# Run the clean worker like it would in the production scheduler
#

# change this if you move this file
relativeAppRoot=../..

# path to the worker from appRoot
worker=server/workers/clean/bin/clean

cd "$(dirname "$0")"
pushd $relativeAppRoot

if [ -x $worker ]; then
  # run the job in production
  env NODE_ENV=production $worker
else
  echo "ERROR: $worker not found in appRoot `pwd`"
fi

popd
cd -