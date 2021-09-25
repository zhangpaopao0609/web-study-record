(() => {
  interface DataBase<T> {
    data: T[];
    add(value: T): T;
    getItem(id: number): T | undefined;
  };

  class User {
    id: number;
    age: number;
    name: string;
    constructor(id: number, age: number, name: string) {
      this.id = id;
      this.age = age;
      this.name = name;
    }
  };

  class UserData implements DataBase<User> {
    data: User[] = [];

    add(value: User): User {
      this.data.push(value);
      return value;
    };

    getItem(id: number): User | undefined {
      return this.data.find(item => item.id === id);
    };

  };

  const userData = new UserData();
  userData.add(new User(Date.now() + Math.random(), 12, 'tom'));
  const { id } = userData.add(new User(Date.now() + Math.random(), 2, 'lusi'));
  userData.add(new User(Date.now() + Math.random(), 32, 'liu'));

  console.log(userData.data);
  const user = userData.getItem(id);
  console.log(user);
})();