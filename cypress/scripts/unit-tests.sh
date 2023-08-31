#!/bin/bash

rm -rf .next .nyc_output coverage ;\
mv _babelrc .babelrc ;\
BABEL_ENV=unit cypress run --component $1 $2 ;\
mv .babelrc _babelrc ;