class Animal {
  String _name;
  int age;
  Animal(this._name, this.age);

  void printInfo() {
    print("${this._name}---${this.age}");
  }
}