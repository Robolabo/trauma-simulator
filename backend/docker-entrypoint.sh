#!/bin/bash

echo "Esperando a la BD "
cd ..
./usr/wait-for-it.sh mysql:3306


echo "Cargando la BD en Backend"

cd app

npm run migrate
npm run seed
npm run dev

echo "Ya funciona!!"