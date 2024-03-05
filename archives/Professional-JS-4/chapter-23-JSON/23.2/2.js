const book = {
  title: 'ARROW',
  authors: [
    'bullet',
    'zhang'
  ],
  edition: 4,
  year: 2017
}

const jsonText = JSON.stringify(book, (key, value) => {
  switch(key) {
    case 'authors':
      return value.join(',');
    case 'year':
      return 5000;
    case 'edition':
      return undefined;
    default:
      return value;
  }
});

console.log(jsonText);

