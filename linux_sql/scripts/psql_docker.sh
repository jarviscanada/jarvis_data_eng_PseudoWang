#! /bin/sh

#assign input arguments
cmd=$1
db_username=$2
db_password=$3

#start docker
sudo systemctl status docker || sudo systemctl start docker

#check container status
container_status=$(docker container inspect jrvs-psql | grep Status | awk -F\" '{print $4}')

#user switch case to handle create|stop|start opetions
case $cmd in 
  create)
  
    #check if the container is already created
    if [ $(docker ps -a | grep jrvs-psql) != "" ]; then
      echo 'Container already exists'
      exit 1
    fi 

    #check number of create arguments
    if [ $# -ne 3 ]; then
      echo 'Create requires username and password'
      exit 1
    fi
  
    #create container
    docker volume create pgdata
    docker run --name jrvs-psql -u=$db_username -e POSTGRES_PASSWORD=$db_password -d -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:9.6-alpine
    exit 0
  ;;

  start|stop) 
    #check instance status; exit 1 if container has not been created
    if [[ $cmd == "start" ]] && [[ $container_status == "running" ]]; then
      echo 'Container already running'
      exit 1
    elif [[ $cmd == "stop" ]] && [[ $container_status == "exited" ]]; then
      echo 'Container already stopped'
      exit 1
    fi

    #start or stop the container
    docker container $cmd jrvs-psql
    exit 0
  ;;	
  
  *)
    echo 'Illegal argument'
    echo 'Commands: start|stop|create [db_username] [db_password]'
    exit 1
  ;;
esac

