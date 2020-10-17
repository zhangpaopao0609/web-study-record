const user = {
    name: 'arrow'
}

const handler = {
    get(target, property, receiver) {
        console.log(`${property} is being visited!`);
        return Reflect.get(...arguments);
    },
    set(target, property, newVal, receiver) {
        if(newVal === target[property]) {
            console.log(`${property} has same value!`);
            return;
        }
        console.log(`${property} is being setted with newValue ${newVal}`);
        return Reflect.set(...arguments);
    }
}

const userProxy = new Proxy(user, handler);

userProxy.name;
userProxy.name = 'arrow';
userProxy.name = 'bullet';
userProxy.job = 'en';
console.log(userProxy);