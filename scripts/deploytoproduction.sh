#!/bin/bash
cd ~/Coding/TS/TGBL-Bot-V2/ || exit
git pull
git checkout master
docker-compose up -d --build
