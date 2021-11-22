void main() {
  // String str = 'this is a str';
  // const PI = 3.1415926;
  // final r;
  // r = 1;
  // print(r);

  // const t = new DateTime.now();
  // print(t);


  String str = """
    dirdirdir
    driras
    asdsa
  """;
  print(str);
  
  String str1 = '1';
  String str2 = '2';

  print("$str1 $str2");

  double a = 12;
  print(a);

  bool flag = true;
  print(flag);

  List l1 = [1, '22'];
  print(l1);
  print(l1.length);

  List l2 = <String>['1'];
  print(l2);

  List l3 = [];
  l3.add(1);
  print(l3);

  List l4 = List.filled(4, '');
  print(l4);

  Map person = {
    "name": "a",
  };
  
  print(person);
}