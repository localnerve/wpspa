#!/bin/bash
#
# Verify the production functionality of the snapshots worker process
# Run the snapshots worker like it would in the production scheduler
#

# change this if you move this file
relativeAppRoot=../..

# path to the worker from appRoot, this is what is in the production scheduler
worker=server/workers/snapshots/bin/snapshots

cd "$(dirname "$0")"
pushd $relativeAppRoot

if [ -x $worker ]; then

  # start the test processes, app server at port 9000
  grunt devTest &
  testProcs=$!
  sleep 6

  # run the job
  env NODE_ENV=test $worker

  # kill the test processes
  pkill -TERM -P $testProcs
else
  echo "ERROR: $worker not found in appRoot `pwd`"
fi

popd
cd -