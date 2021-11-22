/**
 * List 属性和方法
 * 常用属性
 *  length
 *  reversed
 *  isEmpty
 *  isNotEmpty
 * 
 * 常用方法
 *  add(value)
 *  addAll(list) 拼接
 *  indexOf(value) 查找  传入具体值
 *  remove(value) 删除 传入具体值
 *  removeAt(index) 删除 传入索引值
 *  fillRange 修改
 *  insert(index, value)
 *  insertAll(index, list)
 *  toList()
 *  join()
 *  split()
 *  forEach
 *  map
 *  
 */

void main(List<String> args) {
  List l1 = [1, 2, 3];
  print(l1.reversed.toList());
  l1.addAll([4, 5]);
  print(l1);

  print(l1.indexOf(3));

  l1.fillRange(2, 5, 10);
  print(l1);
}