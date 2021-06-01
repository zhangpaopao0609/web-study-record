"use strict";
(() => {
    ;
    class User {
        id;
        age;
        name;
        constructor(id, age, name) {
            this.id = id;
            this.age = age;
            this.name = name;
        }
    }
    ;
    class UserData {
        data = [];
        add(value) {
            this.data.push(value);
            return value;
        }
        ;
        getItem(id) {
            return this.data.find(item => item.id === id);
        }
        ;
    }
    ;
    const userData = new UserData();
    userData.add(new User(Date.now() + Math.random(), 12, 'tom'));
    const { id } = userData.add(new User(Date.now() + Math.random(), 2, 'lusi'));
    userData.add(new User(Date.now() + Math.random(), 32, 'liu'));
    console.log(userData.data);
    const user = userData.getItem(id);
    console.log(user);
})();
