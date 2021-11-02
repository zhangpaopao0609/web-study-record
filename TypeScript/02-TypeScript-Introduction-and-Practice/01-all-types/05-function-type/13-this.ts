function foo(this: { bar: string }, baz: number) {

}

// foo({ bar: 'hello' });
foo.call({ bar: 'hello' }, 0);