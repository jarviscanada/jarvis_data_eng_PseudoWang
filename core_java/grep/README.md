# Java Grep

## Introduction

A Java app that mimics Linux grep command which allows users to search matching strings from files.
This project use Java API (mainly `File` and `Stream`) for implementing and `Maven` for packaging. For `Stream` process, `Lambda` has been used in this project. For logging and error outputting, `slf4j` has been used in the project. During `process()`, the idea of functional programming was implied.

## Quick Start

```bash
mvn package
mv grep-1.2.jar ..
cd ..
java -jar grep-1.2.jar ".*Romeo.*Juliet.*" "./data" "./out/output.txt"

```

## Performance Issue

Large file might cause JVM out of memory, so `Stream` is used to substituted all `List`. For `JavaGrepLambda`, there is no `List` is been used and no stream data is stored into JVM during program running. As result, the memory performance is significantly improved.

## Deployment

Dockerize need to be done.

## Improvement

There are still some feature could be improved or implemented:

* Modify the input parameter type of `containsPattern()` to `Stream<String>`
* Modify the input parameter type of `readLines()` to `Stream<File>`
* Modify the return type of `writeToFile()` to `boolean` to return the status (success or fail).
