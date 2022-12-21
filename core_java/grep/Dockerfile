FROM openjdk:8-alpine
COPY target/grep-1.2.5.jar /usr/local/app/grep/lib/grep.jar
ENTRYPOINT ["java","-jar","/usr/local/app/grep/lib/grep.jar"]