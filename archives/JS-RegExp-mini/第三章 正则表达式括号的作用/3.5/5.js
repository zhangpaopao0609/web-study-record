function escapeHTML (str) {
  const escapeChars = {
    '<' : 'lt',
    '>' : 'gt',
    '"' : 'quot',
    '\'' : '#39'
  };

  const regex = new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g');
  return str.replace(regex, match => '&' + escapeChars[match] + ';');
}

console.log(escapeHTML('<div>Balh</div>'));