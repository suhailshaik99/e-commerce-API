class UsersModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = 'customer';
  }

  static createUser(data) {
    const user = new UsersModel(
      users.length + 1,
      data.name,
      data.email,
      data.password,
    );
    users.push(user);
    return user;
  }

  static getUserByEmail(email) {
    let allUsers = users;
    return allUsers.find((user) => user.email === email) ?? null;
  }

  static getUserById(id) {
    let allUsers = users;
    return allUsers.find((user) => user.id === Number(id)) ?? null;
  }

  static validateUserByCreds(email, password) {
    let user = users.find((userObj) => userObj.email === email && userObj.password === password) ?? null;
    return user;
  }

}

let users = [
  new UsersModel(
    1,
    "shaik suhail",
    "suhailshaik975@gmail.com",
    "suhailshaik",
    "admin"
  ),
];

export { UsersModel };
