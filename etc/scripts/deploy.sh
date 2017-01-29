#!/bin/sh

cd public
rsync -avz -e ssh . ${REMOTE} --delete
