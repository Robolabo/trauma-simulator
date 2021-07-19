#!/bin/bash

string1='server'
string2='local'
string3='server_carmen'
string4='local_carmen'

if [[ $string1 = $1 ]];
then
    grep -l -ri 8080 backend/Dockerfile | xargs sed -i 's/8080/5000/g'
    grep -l -ri 8080 backend/src/App.js | xargs sed -i 's/8080/5000/g'
    grep -l -ri 8080:8080 docker-compose.yml | xargs sed -i 's/8080:8080/5000:5000/g'
    grep -l -ri backend:8080 frontend/docker-entrypoint.sh | xargs sed -i 's/backend:8080/backend:5000/g'
    cd frontend/src
    grep -l -ri localhost:8080 * | xargs sed -i 's/localhost:8080/138.100.21.252:5000/g'
    echo Ready to deploy in server
elif [[ $string2 = $1 ]];
then
    grep -l -ri 5000 backend/Dockerfile | xargs sed -i 's/5000/8080/g'
    grep -l -ri 5000 backend/src/App.js | xargs sed -i 's/5000/8080/g'
    grep -l -ri 5000:5000 docker-compose.yml | xargs sed -i 's/5000:5000/8080:8080/g'
    grep -l -ri backend:5000 frontend/docker-entrypoint.sh | xargs sed -i 's/backend:5000/backend:8080/g'
    cd frontend/src
    grep -l -ri 138.100.21.252:5000 * | xargs sed -i 's/138.100.21.252:5000/localhost:8080/g'
    echo Ready to deploy in local
elif [[ $string3 = $1 ]]
then
    grep -l -ri 3000 docker-compose.yml | xargs sed -i 's/3000/3001/g'
    grep -l -ri 3000 frontend/Dockerfile | xargs sed -i 's/3000/3001/g'
    grep -l -ri 8080 backend/Dockerfile | xargs sed -i 's/8080/5001/g'
    grep -l -ri 8080 backend/src/App.js | xargs sed -i 's/8080/5001/g'
    grep -l -ri 8080:8080 docker-compose.yml | xargs sed -i 's/8080:8080/5001:5001/g'
    grep -l -ri backend:8080 frontend/docker-entrypoint.sh | xargs sed -i 's/backend:8080/backend:5001/g'
    grep -l -ri trauma_simulator docker-compose.yml | xargs sed -i 's/trauma_simulator/trauma_simulator_carmen/g'
    cd backend
    grep -l -ri trauma_simulator * | xargs sed -i 's/trauma_simulator/trauma_simulator_carmen/g'
    cd ..
    cd frontend/src
    grep -l -ri localhost:8080 * | xargs sed -i 's/localhost:8080/138.100.21.252:5001/g'
    grep -l -ri 127.0.0.1:8080 * | xargs sed -i 's/127.0.0.1:8080/138.100.21.252:5001/g'
    echo Ready to deploy in server
elif [[ $string4 = $1 ]]
then
    grep -l -ri 3001 docker-compose.yml | xargs sed -i 's/3001/3000/g'
    grep -l -ri 3001 frontend/Dockerfile | xargs sed -i 's/3001/3000/g'
    grep -l -ri 5001 backend/Dockerfile | xargs sed -i 's/5001/8080/g'
    grep -l -ri 5001 backend/src/App.js | xargs sed -i 's/5001/8080/g'
    grep -l -ri 5001:5001 docker-compose.yml | xargs sed -i 's/5001:5001/8080:8080/g'
    grep -l -ri backend:5001 frontend/docker-entrypoint.sh | xargs sed -i 's/backend:5001/backend:8080/g'
    grep -l -ri trauma_simulator_carmen docker-compose.yml | xargs sed -i 's/trauma_simulator_carmen/trauma_simulator/g'
    cd backend
    grep -l -ri trauma_simulator_carmen * | xargs sed -i 's/trauma_simulator_carmen/trauma_simulator/g'
    cd ..
    cd frontend/src
    grep -l -ri 138.100.21.252:5001 * | xargs sed -i 's/138.100.21.252:5001/localhost:8080/g'
    echo Ready to deploy in local
fi

