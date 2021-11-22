void main(List<String> args) {
  void t () {
    print('11');
  };

  t();

  int sum = 0;
  int add(int n) {
    sum += n;
    if (n == 0) return sum;
    return add(n - 1);
  };
  print(add(100));
}