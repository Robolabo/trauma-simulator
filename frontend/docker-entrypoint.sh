#!/bin/bash

echo "Esperando al Backend"
cd ..
./usr/wait-for-it.sh backend:8080

cd app

yarn start

echo "Ya funciona!!"