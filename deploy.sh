#!/bin/bash

set -e

dir="$(cd "$(dirname "$0")"; pwd -P)"
cd "$dir"

if [ ! -e package.json ]; then
	echo $dir/package.json not found
	exit 9
fi

if [ "$1" = --force ]; then
	npm version patch --message "set version to %s"
elif [ "$1" != "--dry-run" ]; then
	echo "call deploy with --force or --dry-run"
	exit 8
fi

if [ ! -e target/prepackage ]; then
	mkdir target/prepackage
fi
rsync -ar --delete node_modules/ target/prepackage/node_modules
rsync -ar --delete src/module/ target/prepackage/src
/bin/cp -af package.json package-lock.json tsconfig.json README.md LICENSE target/prepackage

cd target/prepackage
npm run cti
npm run build

cd ../..

/bin/rm -rf target/package
mkdir target/package

cp -a target/prepackage/target/dist/* target/package
cp -a package.json package-lock.json README.md LICENSE target/package

cd target/package
if [ "$1" = --force ]; then
	npm publish --access public
else
	npm publish --dry-run
fi

cd ../..

if [ "$1" != --force ]; then
	echo "dont update version in dryrun"
else
	npm version prepatch --no-git-tag-version --message "set version to %s"
	ver="$(cat package.json | grep version | tr -d -c "0-9.-")"
	git add .
	git commit -m "set version to $ver"
fi
echo -n "new version "
cat package.json | grep version | tr -d -c "0-9.-"
echo


