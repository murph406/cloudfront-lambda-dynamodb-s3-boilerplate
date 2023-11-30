#!/bin/bash

folders=$(find ./src -name 'package.json' -exec dirname {} \;)

for folder in $folders; do
  if [ ! -d "$folder/node_modules" ]; then
    (cd "$folder" && npm i)
  fi
done

exit