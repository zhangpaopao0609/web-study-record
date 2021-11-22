class Person {
  String name = '张三';
  int age = 12;
  
  Person() {    // 默认构造函数

  }

  Person.now() {  // 命名构造函数，可多个

  }

  void getInfo() {
    print("${this.name}");
  }
}

void main(List<String> args) {
  Person p1 = new Person();
  p1.getInfo();
} 