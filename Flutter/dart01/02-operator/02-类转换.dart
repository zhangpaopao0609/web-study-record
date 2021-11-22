void main(List<String> args) {
  // 数字转字符串
  int a = 123;
  print(a.toString() is String);

  // 字符转数字
  String b = '123.4';
  print(double.parse(b));

  print(b.isEmpty);
  print(a.isNaN);
}