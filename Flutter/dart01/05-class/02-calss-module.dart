import 'lib/Animal.dart';
import "lib/Person.dart";

void main(List<String> args) {
  Person p1 = new Person();
  p1.getInfo();

  Animal a1 = new Animal('mao', 1);
  print(a1);
} 