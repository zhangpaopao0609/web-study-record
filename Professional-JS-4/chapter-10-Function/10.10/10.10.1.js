const color = 'red';
const o = {
    color: 'green'
};

function sayColor(params1, params2) {
    console.log(params1, params2);
    console.log(this.color);
};

sayColor.apply(this, [1, 2]);
sayColor.apply(o, [1, 2]);
sayColor.call(o, 3, 4);

const sayColorObject = sayColor.bind(o);
sayColorObject(5, 6);

