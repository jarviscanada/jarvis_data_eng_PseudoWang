#! /bin/bash

lscpu_out=`lscpu`
cpu_number=$(echo "$lscpu_out"  | egrep "^CPU\(s\):" | awk '{print $2}' | xargs)
cpu_architecture=$(echo "$lscpu_out"  | egrep "^Architecture:" | awk '{print $2}' | xargs)
cpu_model=$(echo "$lscpu_out"  | egrep "^Model\sname:" | sed -e 's/Model name://g')
cpu_mhz=$(echo "$lscpu_out"  | egrep "^CPU\sMHz:" | sed -e 's/CPU MHz://g')
L2_cache=$(echo "$lscpu_out" | egrep "^L2\scache:" | sed -e 's/L2 cache://g' | sed -e 's/K//g')
total_mem=$(cat /proc/meminfo | egrep MemTotal | awk '{print $2}' | xargs)
hostname=$(hostname -f)
timestamp=$(date -u "+%Y-%m-%d %T")

# testing output
echo $cpu_number
echo $cpu_architecture
echo $cpu_model
echo $cpu_mhz
echo $L2_cache
echo $total_mem
echo $timestamp
echo $hostname
