const textDecoder = new TextDecoder();

const encodedText = Uint8Array.of(102, 111, 111);
const decodeText = textDecoder.decode(encodedText);

console.log(decodeText);