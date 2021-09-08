[toc]

# Tensorflow.js

## 1. 什么是 Tensorflow.js 
TensorFlow.js是一个开源的基于硬件加速的JavaScript库，用于训练和部署机器学习模型。谷歌推出的第一个基于TensorFlow的前端深度学习框架TensorFlow.js 是一个开源的用于开发机器学习项目的 WebGL-accelerated JavaScript 库。TensorFlow.js 可以为你提供高性能的、易于使用的机器学习构建模块，允许你在浏览器上训练模型，或以推断模式运行预训练的模型。TensorFlow.js 不仅可以提供低级的机器学习构建模块，还可以提供高级的类似 Keras 的 API 来构建神经网络。

### 1.1 Tensorflow.js的优点：

1. 不用安装驱动器和软件，通过链接即可分享程序
2. 网页应用交互性更强
3. 有访问GPS，Camera，Microphone，Accelerator，Gyroscope等传感器的标准api（主要是指手机端）
4. 安全性，因为数据都是保存在客户端的

### 1.2 TensorFlow.js的应用方式：
1. 在浏览器中开发ML
    使用简单直观的API从头构建模型，然后使用低级别的JavaScript线性代数库或高层API进行训练。
2. 运行现有模型
    使用TensorFlow.js模型转换器在浏览器中运行预训练好的TensorFlow模型。
3. 重新训练现有模型
    使用连接到浏览器的传感器数据或其他客户端数据重新训练ML模型。

## 2. Tensorflow.js 安装
在JavaScript项目中，TensorFlow.js的安装方法有两种：一种是通过script标签引入，另外一种就是通过npm进行安装。

如果不熟悉WEB开发的同学，我们建议使用脚本标签来获取。

### 2.1 使用 Script Tag

将以下脚本标签添加到您的主HTML文件中：

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
```

有关脚本标签的设置，请参阅代码示例：
```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.9.0" rel="external nofollow" > </script>
    <script>
      // 定义一个线性回归模型
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      // 准备模型训练，指定损失函数和优化器
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
      // 构造一些人工数据用于训练
      const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
      const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
      // 使用数据训练模型
      model.fit(xs, ys).then(() => {
        // 使用模型对数据点进行推断
        // 打开控制台可以看到结果
        model.predict(tf.tensor2d([5], [1, 1])).print();
      });
    </script>
  </head>

  <body>
  </body>
</html>
```

### 2.2 通过 NPM （或 yarn）

使用yarn或npm将TensorFlow.js添加到您的项目中。 注意：因为使用 ES2017 语法（如import），所以此工作流程假定您使用打包程序/转换程序将代码转换为浏览器可以理解的内容，通俗的说就是基于 webpack 等打包工具进行开发。 

```bash
yarn add @tensorflow/tfjs  
# 或者
npm install @tensorflow/tfjs
```

index.js 中输入以下代码：

```js
import * as tf from '@tensorflow/tfjs';

//定义一个线性回归模型。
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// 为训练生成一些合成数据
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// 使用数据训练模型
model.fit(xs, ys, {epochs: 10}).then(() => {
  // 在该模型从未看到过的数据点上使用模型进行推理
  model.predict(tf.tensor2d([5], [1, 1])).print();
  //  打开浏览器开发工具查看输出
});
```

## 3. Tensorflow.js 核心概念

TensorFlow.js 是一个用于机器智能的开源基于 WebGL 加速的 JavaScript 库。 它将高性能机器学习构建块带到您的指尖，使您能够在浏览器中训练神经网络或在推理模式下运行预先训练的模型。 

TensorFlow.js 为机器学习提供低级构建模块，以及构建神经网络的高级 Keras 启发式 API。 我们来看看库的一些核心组件。

### 3.1 张量：tensors

```js
/ 2x3 Tensor
const shape = [2, 3]; // 2 行, 3 列
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // 打印张量值
// 输出:    [[1 , 2 , 3 ],
//          [10, 20, 30]]

// shape也可以用下面的方式实现:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
// 输出:    [[1 , 2 , 3 ],
//          [10, 20, 30]]
```

但是，为了构造低秩张量，我们推荐使用下面的函数来增强代码的可读性：`tf.scalar`（零维）,` tf.tensor1d`（一维）, `tf.tensor2d`（二维）, `tf.tensor3d`（三维）、`tf.tensor4d`（四维）以及 `tf.ones`（值全是1）或者`tf.zeros`（值全是0） ，如下所示：

```js
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
```

在TensorFlow.js中，张量是不变的; 一旦创建你就不能改变它们的值。 但是，您可以对它们执行操作来生成新的张量。

**变量由张量生成，且张量不可变而变量可变。**





























