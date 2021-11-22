abstract class Animal {   // 抽象类
  void eat(); // 抽象方法
  void run();

  h() { // 普通方法
    print('haha');
  }
}

class Dog extends Animal {
  @override
  void eat() {
    
  }

  @override
  void run() {
  }
}

void main(List<String> args) {
  Dog d = new Dog();
  d.h();
}