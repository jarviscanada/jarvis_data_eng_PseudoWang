#! /bin/bash

#check number of input arguments
if [ $# -ne 5 ]; then
  echo "Illegal number of parameters"
  echo "Usage: host_info.sh psql_host psql_port db_name psql_user psql_password"
  exit 1
fi

#assign input arguments
psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

#save command outputs
lscpu_out=$(lscpu)
hostname=$(hostname -f)
cpu_number=$(echo "$lscpu_out"  | egrep "^CPU\(s\):" | awk '{print $2}' | xargs)
cpu_architecture=$(echo "$lscpu_out"  | egrep "^Architecture:" | awk '{print $2}' | xargs)
cpu_model=$(echo "$lscpu_out"  | egrep "^Model\sname:" | sed -e 's/Model name://g' | xargs)
cpu_mhz=$(echo "$lscpu_out"  | egrep "^CPU\sMHz:" | sed -e 's/CPU MHz://g' | xargs)
L2_cache=$(echo "$lscpu_out" | egrep "^L2\scache:" | sed -e 's/L2 cache://g' | sed -e 's/K//g' | xargs)
total_mem=$(cat /proc/meminfo | egrep MemTotal | awk '{print $2}' | xargs)
timestamp=$(date -u "+%Y-%m-%d %T")

#construct insertion
insert_stmt="INSERT INTO host_info (hostname,cpu_number,cpu_architecture,cpu_model,cpu_mhz,L2_cache,total_mem,timestamp)
  VALUES ('$hostname',$cpu_number,'$cpu_architecture','$cpu_model','$cpu_mhz','$L2_cache','$total_mem','$timestamp');"

#set environment variable
export PGPASSWORD=$psql_password

#execute insertion
psql -h $psql_host -p $psql_port -U $psql_user -d $db_name -c "$insert_stmt"

#exit with returned status code
exit $?
