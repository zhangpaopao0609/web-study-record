const book = {};

Object.defineProperties(book, {
    year_: {
        value: 2017,
        enumerable: true
    },
    edition: {
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if(newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});

const descriptor = Object.getOwnPropertyDescriptor(book, 'year');

console.log(descriptor);

for (const key in book) {
    console.log(key);
}