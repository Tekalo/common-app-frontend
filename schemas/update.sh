#!/bin/bash

apiDir='./common-app-api/packages/schemas/src'
localDir='./schemas/src'
replaceReg='s/\.js//g'

mkdir -p ${localDir}

cp -f ${apiDir}/applicants.ts ${localDir}/applicants.ts
cp -f ${apiDir}/opportunities.ts ${localDir}/opportunities.ts
cp -f ${apiDir}/shared.ts ${localDir}/shared.ts

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e ${replaceReg} ${localDir}/applicants.ts
  sed -i '' -e ${replaceReg} ${localDir}/opportunities.ts
else
  sed -i -e ${replaceReg} ${localDir}/applicants.ts
  sed -i -e ${replaceReg} ${localDir}/opportunities.ts
fi

ls ${localDir}
