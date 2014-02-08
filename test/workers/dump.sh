#!/bin/bash
#
# Verify the functionality of the dump worker process
# Run the dump worker like it would in the cloud
#

# change this if you move this file
relativeAppRoot=../..

# path to the worker from appRoot
worker=server/workers/dump/bin/dump

cd "$(dirname "$0")"
pushd $relativeAppRoot

if [ -x $worker ]; then  
  $worker
else
  echo "ERROR: $worker not found in appRoot `pwd`"
fi

popd
cd -