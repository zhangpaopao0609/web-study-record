import * as tf from '@tensorflow/tfjs';

// 2 * 3 Tensor
const shape = [2, 3];  // 可以看做是两行三列组成
const a = tf.tensor([1, 2, 3, 10, 20, 30], shape);
a.print();  // 打印张量值
// 输出： Tensor
    // [[1 , 2 , 3 ],
    // [10, 20, 30]]

// shape 也可以用下面方式实现
const b = tf.tensor([[1, 2, 3], [10, 20, 30]]);
b.print();

// 其实就是矩阵

const c = tf.scalar(3);    
c.print();    // 3

const d = tf.tensor1d([3]);
d.print();    // [3]

const e = tf.tensor2d([[2, 3, 4], [5, 6, 7]]);
e.print();    
//      [[2, 3, 4],
//      [5, 6, 7]]
const f = tf.zeros([2, 3]);
f.print();
//      [[0, 0, 0],
//      [0, 0, 0]]

const g = tf.ones([3, 5]);
g.print();
//      [[1, 1, 1, 1, 1],
//      [1, 1, 1, 1, 1],
//      [1, 1, 1, 1, 1]]


const initialValues = tf.zeros([5]);
initialValues.print()
const biases = tf.variable(initialValues);    // 初始化 biases
biases.print();   // 输出：[0, 0, 0, 0, 0]

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues);   // 更新 biases 的值
biases.print()    // 输出： [0, 1, 0, 1, 0]