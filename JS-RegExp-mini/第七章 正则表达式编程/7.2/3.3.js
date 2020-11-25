const string = "1234 2345 3456";

// string.replace(/(\d)\d{2}(\d)/g, (match, $1, $2, index, input) => {
//   console.log([match, $1, $2, index, input]);
// });

string.replace(/(\d)\d{2}(\d)/g, (...arr) => {
  console.log(arr);
});