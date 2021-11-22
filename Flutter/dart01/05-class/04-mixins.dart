class A {
  printA() {
    print('a');
  }
}

class B {
  printB() {
    print('b');
  }
}

class C with A, B {

}

t<T>(T v) {
  return v;  
}


void main(List<String> args) {
  C c = new C();
  List<int> l = <int>[1, 2];
  c.printA();
  c.printB();

  t<String>('sd');
}