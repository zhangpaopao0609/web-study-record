# SharedWorker

`SharedWorker` 是 Web Workers 的一种特殊类型，它允许多个脚本（即使是来自不同的浏览器窗口、标签页、iframe或不同的Worker）共享同一个Worker线程。这意味着`SharedWorker`可以被多个上下文使用，以实现不同部分之间的数据共享和通信。

### 主要特点

1. **共享线程**：`SharedWorker`创建的是一个可以被多个运行相同源（same origin）下的脚本共享的线程。
2. **通信**：`SharedWorker`与连接到它的每个脚本之间通过消息传递（`postMessage`接口）进行通信。
3. **端口对象**：与`DedicatedWorker`（专用Worker）不同，`SharedWorker`使用`MessagePort`对象来与多个脚本建立通信。
4. **全局作用域**：`SharedWorker`在`SharedWorkerGlobalScope`中运行，这是一个特殊的全局上下文，不同于`DedicatedWorker`的`WorkerGlobalScope`。

### 使用SharedWorker

要使用`SharedWorker`，你需要创建一个新的`SharedWorker`对象，并指定一个脚本文件，该文件包含将在`SharedWorker`线程中运行的代码。

```javascript
// 创建一个新的SharedWorker
var mySharedWorker = new SharedWorker('shared-worker.js');
```

在`shared-worker.js`文件中，你可以编写将在`SharedWorker`线程中执行的代码。例如：

```javascript
// shared-worker.js
var connections = 0; // 计数器，追踪连接数

self.addEventListener('connect', function(event) {
  var port = event.ports[0];
  connections++;

  port.addEventListener('message', function(event) {
    // 处理消息
    port.postMessage('Hello from SharedWorker!');
  });

  port.start(); // 开始接收消息
});
```

在主脚本中，你可以通过`SharedWorker`的`port`属性来与`SharedWorker`通信。

```javascript
// 连接到SharedWorker
mySharedWorker.port.start();

// 向SharedWorker发送消息
mySharedWorker.port.postMessage('Hello, worker!');

// 从SharedWorker接收消息
mySharedWorker.port.onmessage = function(event) {
  console.log('Received message: ' + event.data);
};
```

### 生命周期

`SharedWorker`的生命周期与`DedicatedWorker`类似，但由于它可以被多个脚本共享，因此它的生命周期不仅仅与创建它的脚本相关联。`SharedWorker`会在所有连接到它的脚本都关闭连接后继续存在，直到没有脚本连接到它为止。

### 注意事项

- `SharedWorker`可以在不同的浏览器上下文中运行，但必须同源。
- `SharedWorker`的使用在Web开发中相对较少，部分原因是它的支持并不是所有浏览器都很好，特别是在移动端。
- `SharedWorker`可以用于实现跨标签页或窗口的状态同步，例如，一个用户在一个标签页中的操作可以实时反映到另一个标签页中。

由于`SharedWorker`的支持和使用情况可能会随着时间和浏览器的更新而变化，因此在决定使用`SharedWorker`时，建议检查当前的浏览器兼容性，并考虑是否有其他替代方案可以满足需求。
