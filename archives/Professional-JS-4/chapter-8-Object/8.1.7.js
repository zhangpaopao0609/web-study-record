const person = {
  job: {
    title: 'software',
  },
};
const personCopy = {
  test: { t: 8 },
};

({ job: { title: personCopy.test.t } } = person);

console.log(personCopy);
