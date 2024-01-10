#!/bin/bash

apiDir='./common-app-api/packages/schemas/src'
localDir='./schemas/src'
replaceReg='s/\.js//g'

cp -f ${apiDir}/applicants.ts ${localDir}/applicants.ts
cp -f ${apiDir}/opportunities.ts ${localDir}/opportunities.ts
cp -f ${apiDir}/shared.ts ${localDir}/shared.ts

sed -i '' -e ${replaceReg} ${localDir}/applicants.ts
sed -i '' -e ${replaceReg} ${localDir}/opportunities.ts