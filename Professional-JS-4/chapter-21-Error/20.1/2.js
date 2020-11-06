class CustomErrot extends Error {
  constructor(name, messsage) {
    super();
    this.name = name;
    this.message = messsage;
  }
};

throw new CustomErrot('arrow', 'great121212')