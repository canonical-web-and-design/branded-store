#!/bin/bash

# Remove the build directrory contents
rm -rf ./build/*

# Make a temporary directory for build stuff if it doesn't exist
mkdir -p tmp_build

# Store original index.js
cp -rf src/index.js tmp_build/index.js

# use index-admin.js 
cp -rf src/index-admin.js src/index.js

# Build admin UI
npm run build

# Move the admin build to temp build dir
mv ./build/ tmp_build/build-admin/

# use index-enduser.js 
cp -rf src/index-enduser.js src/index.js

# Build enduser UI
npm run build

# Move the enduser build to temp build dir
mv ./build/ tmp_build/build-enduser/

# Move builds in to build dir
mkdir build
mv ./tmp_build/build-admin/ ./build/
mv ./tmp_build/build-enduser ./build/

# Restore original index.js file
cp -rf tmp_build/index.js src/index.js

# cleanup
rm -rf ./tmp_build

