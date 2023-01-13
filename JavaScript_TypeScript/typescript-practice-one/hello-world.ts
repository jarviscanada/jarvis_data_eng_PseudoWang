"use strict";
function greet(person: string, date: Date) {
  console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Test", new Date());
