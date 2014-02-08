#!/bin/bash
#
# Verify the production functionality of the init worker process
# Run the init worker like it would in the production scheduler
#

# change this if you move this file
relativeAppRoot=../..

# path to the worker from appRoot
worker=server/workers/init/bin/init

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

  # run the job in debug
  env NODE_ENV=debug $worker

  kill -TERM $testProcs
else
  echo "ERROR: $worker not found in appRoot `pwd`"
fi

popd
cd -