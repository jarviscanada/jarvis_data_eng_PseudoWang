#! bin/bash

#check number of input arguments
if [ $# -ne 5 ]; then
  echo "Illegal number of parameters"
  echo "Usage: host_usage.sh psql_host psql_port db_name psql_user psql_password"
  exit 1
fi

#assign input arguments
psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

#save command outputs
hostname=$(hostname -f)
memory_free=$(vmstat -s | egrep "free memory" | awk '{print $1}' | xargs)
cpu_idle=$(vmstat -w | tail -1 | awk '{print $(NF-2)}' | xargs)
cpu_kernel=$(vmstat -w | tail -1 | awk '{print $(NF-4)}' | xargs)
disk_io=$(vmstat -D -S M | egrep "inprogress IO" | awk '{print $1}' | xargs)
disk_available=$(df -BM / | tail -1 | awk '{print $(NF-2)}' | sed -e 's\M\\g' | xargs)
timestamp=$(date -u "+%Y-%m-%d %T")

#set environment variable
export PGPASSWORD=$psql_password

#construct and execute selection
host_id=$(psql -h localhost -p 5432 -U postgres -d host_agent -c "SELECT id FROM host_info WHERE hostname='$hostname'" | sed -n "3p" | xargs)

#construct insertion
insert_stmt="INSERT INTO host_usage (timestamp,host_id,memory_free,cpu_idle,cpu_kernel,disk_io,disk_available)
  VALUES ('$timestamp','$host_id','$memory_free','$cpu_idle','$cpu_kernel','$disk_io','$disk_available');"

#execute insertion
psql -h $psql_host -p $psql_port -d $db_name -U $psql_user -c "$insert_stmt"

#exit with returned status code
exit $?
