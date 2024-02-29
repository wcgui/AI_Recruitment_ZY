#!/usr/bin/env bash

git pull || exit
npm run build || exit
export tag=`date "+%Y%m%d%H%M%S"` || exit
docker build -f Dockerfile -t cc-frontend:${tag} . || exit
docker tag cc-frontend:${tag} registry.cn-hangzhou.aliyuncs.com/projectcc/cc-frontend:${tag} || exit
docker push registry.cn-hangzhou.aliyuncs.com/projectcc/cc-frontend:${tag} || exit