const book = {
  title: 'ARROW',
  authors: [
    'bullet',
    'zhang'
  ],
  edition: 4,
  year: 2017,
  toJSON: function() {
    return { a: this.authors};
  }
}

const jsonText = JSON.stringify(book, null, '--' )

console.log(jsonText);

