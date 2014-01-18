#!/bin/bash
#
# Verify the production functionality of the routes worker process
# Run the worker like it would in the production scheduler
# Requires that you have redis installed locally
#

# change this if you move this file
relativeAppRoot=../..

# path to the worker from appRoot, this is what is in the production scheduler
worker=server/workers/routes/bin/routes

cd "$(dirname "$0")"
pushd $relativeAppRoot

if [ -x $worker ]; then

  # do the debug build
  grunt debug

  # start the test processes, app server 
  grunt express:devDebug &
  testProcs=$!
  echo process $testProcs started
  sleep 6

  # run the job
  env NODE_ENV=debug $worker

  # kill the test processes
  # pkill -TERM -P $testProcs
  # express:devDebug is just one process - no pgroup will be found
  kill -TERM $testProcs
else
  echo "ERROR: $worker not found in appRoot `pwd`"
fi

popd
cd -