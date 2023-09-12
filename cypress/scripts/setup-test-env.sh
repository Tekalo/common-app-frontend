#!/bin/bash

rm -rf .next .nyc_output coverage ;\
mv _babelrc .babelrc ;\
BABEL_ENV=unit $1 $2 $3 ;\
mv .babelrc _babelrc ;
