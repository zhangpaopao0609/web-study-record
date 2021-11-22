void main(List<String> args) {
  int a = 10;
  var b;

  b ??= a;
  print(b);

  var c;
  int d = c ?? 10;
  print(d);

  int e = 22;
  int f = e ?? 10;
  print(f);
} 