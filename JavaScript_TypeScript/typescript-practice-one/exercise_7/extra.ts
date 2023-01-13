interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

const users: User[] = [
  {
    type: "user",
    name: "Moses",
    age: 70,
    occupation: "Desert guide",
  },
  {
    type: "user",
    name: "Superman",
    age: 28,
    occupation: "Ordinary person",
  },
];

function test() {
  const user = users[0];
  logUser(user as Exclude<typeof user, undefined>); // make sure it is not undefined
}
