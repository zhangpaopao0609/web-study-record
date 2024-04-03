const book = {
  title: 'ARROW',
  authors: [
    'bullet',
    'zhang',
  ],
  edition: 4,
  year: 2017,
  toJSON() {
    return { a: this.authors };
  },
};

const jsonText = JSON.stringify(book, null, '--');

console.log(jsonText);
