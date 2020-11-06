const book = {
  title: 'ARROW',
  authors: [
    'bullet',
    'zhang'
  ],
  edition: 4,
  year: 2017
}

const jsonText = JSON.stringify(book, ['title', 'edition']);

console.log(jsonText);

