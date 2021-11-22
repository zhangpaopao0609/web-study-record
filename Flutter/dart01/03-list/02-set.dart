/**
 * Set
 * 去重
 */

void main(List<String> args) {
  Set s = new Set();
  s.add('香蕉');
  s.add('苹果');
  print(s);
  print(s.toList());

  List l1 = [1, 2, 1, 2, 1];
  Set s1 = new Set();
  s1.addAll(l1);
  print(s1);
}