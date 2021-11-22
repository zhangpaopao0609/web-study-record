/**
 * Map
 */

void main(List<String> args) {
 
  Map m1 = {
    "name": "是多少",
    "age": 12,
  };

  print(m1.keys);
  print(m1.values);
  print(m1.isEmpty);

  m1.addAll({
    "word": "code"
  });

  print(m1);

  m1.remove('name');
  print(m1);

  print(m1.containsKey('name'));
}