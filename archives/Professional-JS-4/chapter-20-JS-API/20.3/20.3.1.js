const textEncoder = new TextEncoder();
const decodedText = 'foo';
const encodeText = textEncoder.encode(decodedText);

console.log(encodeText);