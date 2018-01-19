#!/bin/sh

if [ -z "$1" ]
then
  echo "Please specify the URL you want to send build to"
else
  npm run build:prod
  tar czf build.tar.gz docs
  curl -X POST -H "Content-Type: application/x-gtar" -d @build.tar.gz $1
  rm build.tar.gz
fi
