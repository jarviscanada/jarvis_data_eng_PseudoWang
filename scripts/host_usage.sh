#! bin/bash

memory_free=$(vmstat -s | egrep "free memory" | awk '{print $1}' | xargs)
cpu_idle=$(vmstat -w | tail -1 | awk '{print $(NF-2)}' | xargs)
cpu_kernel=$(vmstat -w | tail -1 | awk '{print $(NF-4)}' | xargs)
disk_io=$(vmstat -D -S M | egrep "inprogress IO" | awk '{print $1}' | xargs)
disk_available=$(df -BM / | tail -1 | awk '{print $(NF-2)}' | sed -e 's\M\\g' | xargs)

# testing output
echo $memory_free
echo $cpu_idle
echo $cpu_kernel
echo $disk_io
echo $disk_available
