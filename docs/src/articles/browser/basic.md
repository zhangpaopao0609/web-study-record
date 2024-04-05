# 浏览器基础

## 1. 浏览器渲染进程的线程有哪些

浏览器的渲染进程的线程总共有五种：

<PaoImages
  src="./images/render-thread.png"
  width="80%"
  title="render-thread"
/>

1. GUI 渲染线程

负责渲染浏览器页面，解析 HTML、CSS，构建 DOM 树、构建 CSSOM 树、 构建渲染树和绘制页面；当界面需要重绘或由于某种操作引发回流时， 该线程就会执行。

注意：GUI 渲染线程和 JS 引擎线程是互斥的，当 JS 引擎执行时 GUI 线程会被挂起，GUI 更新会被保存在一个队列中等到 JS 引擎空闲时 立即被执行。

2. JS 引擎线程

JS 引擎线程也称为 JS 内核，负责处理 Javascript 脚本程序，解析 Javascript 脚本，运行代码；JS 引擎线程一直等待着任务队列中任 务的到来，然后加以处理，一个 Tab 页中无论什么时候都只有一个 JS 引擎线程在运行 JS 程序；

注意：GUI 渲染线程与 JS 引擎线程的互斥关系，所以如果 JS 执行的 时间过长，会造成页面的渲染不连贯，导致页面渲染加载阻塞。

3. 事件触发线程

事件触发线程属于浏览器而不是 JS 引擎，用来控制事件循环；当 JS 引擎执行代码块如 setTimeOut 时（也可是来自浏览器内核的其他线 程,如鼠标点击、AJAX 异步请求等），会将对应任务添加到事件触发线程中；当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理；

注意：由于 JS 的单线程关系，所以这些待处理队列中的事件都得排队等待 JS 引擎处理（当 JS 引擎空闲时才会去执行）；

4. 定时器触发进程

定时器触发进程即 setInterval 与 setTimeout 所在线程；浏览器定时计数器并不是由 JS 引擎计数的，因为 JS 引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确性；因此使用单独线程来计时 并触发定时器，计时完毕后，添加到事件队列中，等待 JS 引擎空闲 后执行，所以定时器中的任务在设定的时间点不一定能够准时执行， 定时器只是在指定时间点将任务添加到事件队列中；

注意：W3C 在 HTML 标准中规定，定时器的定时时间不能小于 4ms，如 果是小于 4ms，则默认为 4ms。

5. 异步 http 请求线程

XMLHttpRequest 连接后通过浏览器新开一个线程请求；检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将回调函数放入事件队列中，等待 JS 引擎空闲后执行；

## 2. JS 为什么是单线程的

JavaScript最初被设计为在浏览器中运行的脚本语言，用于执行简单的任务，如表单验证、页面动态效果等。以下是JavaScript设计为单线程的几个主要原因：

1. 简化脚本逻辑：
   由于JavaScript主要用于操作DOM和处理用户事件，单线程模型简化了开发者的编程模型。在单线程环境中，开发者不需要担心多线程编程中常见的问题，如线程同步、死锁、竞态条件等。

2. 避免DOM操作冲突：
   JavaScript直接与DOM交互，如果JavaScript是多线程的，那么多个线程可能会同时对DOM进行读写操作，导致DOM状态不一致。单线程模型确保了在任何时刻，只有一个操作可以修改DOM，从而避免了并发操作带来的复杂性。

3. 减少复杂性：
   对于大多数Web应用来说，单线程已经足够满足需求。单线程模型减少了浏览器的实现复杂性，同时也使得脚本的执行更加可预测。

4. 历史原因：
   当JavaScript被创建时，它的用途相对简单，并没有考虑到现代Web应用程序的复杂性和对性能的要求。随着时间的推移，虽然Web应用程序变得越来越复杂，但JavaScript的单线程模型已经深入人心，并且在Web开发中得到了广泛的应用。

尽管JavaScript是单线程的，但现代浏览器和JavaScript环境提供了一些机制来处理耗时任务和并行计算，例如：

- Web Workers：允许开发者创建后台线程来执行耗时的计算，而不会阻塞主线程。
- 异步编程：通过回调函数、Promises、async/await等机制，JavaScript可以非阻塞地执行I/O密集型任务，如网络请求、文件操作等。

这些机制使得JavaScript可以在保持单线程模型的同时，也能够处理复杂的场景和提高应用程序的性能。

> 不，Web Workers 不能直接操作 DOM。Web Workers 是在浏览器中运行的后台线程，它们与主线程（通常是负责更新UI的线程）是完全独立的。Web Workers 的设计目的是允许开发者在不影响用户界面响应性的情况下执行耗时的计算任务。
>
> 由于 Web Workers 运行在与主线程分离的环境中，它们没有访问 DOM 的权限。这样做的原因是为了避免并发问题，比如竞态条件，这些问题可能在多个线程尝试同时读写同一个DOM元素时发生。如果 Web Workers 能够直接操作 DOM，就会引入复杂的同步问题，这与 Web Workers 的设计初衷相悖。
>
> 尽管 Web Workers 不能直接操作 DOM，但它们可以通过与主线程通信来间接影响页面。Web Workers 可以发送消息给主线程，主线程接收到消息后可以根据这些消息来更新 DOM。这种通信通常通过 `postMessage` 方法和 `onmessage` 事件处理器来实现。例如：
>
> ```javascript
> // 在主线程中
> var worker = new Worker('worker.js');
> worker.onmessage = function(event) {
>   // 接收来自 worker 的数据，并更新 DOM
>   document.getElementById('output').textContent = event.data;
> };
> worker.postMessage('开始工作'); // 向 worker 发送消息
>
> // 在 Web Worker ('worker.js') 中
> self.onmessage = function(event) {
>   // 接收来自主线程的消息
>   var data = event.data;
>   // 执行任务...
>   // 将结果发送回主线程
>   self.postMessage('任务完成');
> };
> ```
>
> 在这个例子中，主线程创建了一个 Web Worker，并通过 `postMessage` 方法向它发送消息。Web Worker 接收消息，执行任务，然后将结果发送回主线程。主线程收到结果后，可以更新 DOM。这种方式允许 Web Workers 间接地对页面内容产生影响，同时避免了直接操作 DOM 所带来的并发问题。

> 异步编程可以操作DOM的原因在于，尽管异步操作本身是在事件循环中排队执行的，但它们最终的回调函数或者Promise的解决（resolve）/拒绝（reject）处理都是在主线程中执行的。主线程是唯一可以操作DOM的线程。
>
> 当你使用异步编程模式，如回调、Promises、async/await等，你实际上是在告诉JavaScript引擎：“现在开始这个任务，但是不要阻塞主线程，当任务完成时，再回到主线程执行提供的函数。”这样，即使是异步的HTTP请求、定时器或其他异步API，它们的执行结果（例如请求的响应数据）都会通过事件循环机制返回到主线程，然后在主线程中调用回调函数或者解决Promise。
>
> 由于所有的DOM操作都是在主线程中执行的，因此即使是异步任务触发的代码，也能够安全地访问和修改DOM，而不会引起并发问题。这是因为JavaScript的事件循环和单线程模型确保了在任何给定时刻，只有一个代码块在执行，从而避免了多线程环境中的数据竞争和同步问题。
>
> 总结来说，异步编程之所以可以操作DOM，是因为：
>
> 1. 异步任务的回调函数在主线程中执行。
> 2. JavaScript的事件循环确保了代码的串行执行。
> 3. 即使是异步的，所有的DOM操作都是在单一的主线程中进行，避免了并发冲突。

## 3. GUI 渲染线程和 JS 引擎线程为什么是互斥的

在浏览器中，GUI渲染线程（负责渲染浏览器界面，即绘制页面）和JavaScript引擎线程（负责解析和执行JavaScript代码）通常是互斥的，这是因为JavaScript可以修改DOM，而DOM的变化可能会影响页面的内容和布局。如果两个线程同时运行，可能会导致竞态条件（race condition），其中的一个线程读取或写入的数据可能会被另一个线程的操作所破坏。

以下是GUI渲染线程和JavaScript引擎线程互斥的几个主要原因：

1. 避免竞态条件：
   如果JavaScript引擎线程在修改DOM的同时，GUI渲染线程也在读取或写入相同的DOM结构，就可能发生竞态条件。这会导致渲染的不确定性，可能出现页面布局错误、内容显示不一致等问题。

2. 保证渲染的一致性：
   为了保证用户界面的一致性和稳定性，浏览器需要确保在渲染过程中DOM结构是稳定的。如果允许JavaScript在渲染过程中修改DOM，就无法保证渲染的结果是正确和一致的。

3. 提高性能：
   通过互斥机制，浏览器可以优化渲染性能。当JavaScript线程执行时，GUI渲染线程会暂停，这样可以避免不必要的布局计算和重绘操作，因为这些操作可能会被JavaScript的DOM操作所无效化。

4. 避免死锁：
   如果两个线程可以同时运行并且都试图修改相同的资源，可能会导致死锁，其中每个线程都在等待另一个线程释放资源。通过互斥，浏览器可以避免这种情况。

为了协调这种互斥关系，浏览器采用了事件循环（event loop）机制。JavaScript引擎线程在执行脚本时，GUI渲染线程会被挂起；当JavaScript引擎线程空闲时，GUI渲染线程会继续进行页面的布局和绘制工作。此外，浏览器还会通过任务队列（task queue）来管理事件、脚本执行、布局、绘制等任务的执行顺序，确保它们不会相互干扰。

## 2. 僵尸进程和孤儿进程是什么？

- 孤儿进程
  父进程退出了，而它的一个或多个进程还在运行，那这些 子进程都会成为孤儿进程。孤儿进程将被 init 进程(进程号为 1)所 收养，并由 init 进程对它们完成状态收集工作。

- 僵尸进程
  子进程比父进程先结束，而父进程又没有释放子进程占用 的资源，那么子进程的进程描述符仍然保存在系统中，这种进程称之 为僵死进程。

## 3. 如何实现浏览器内多个标签页之间的通信?

在浏览器内多个标签页之间进行通信可以通过几种不同的方法实现，每种方法都有其适用场景和限制。以下是一些常用的实现方式：

1. 使用 `localStorage` 或 `sessionStorage` 事件

当`localStorage`或`sessionStorage`中的数据发生变化时，会触发一个`storage`事件，该事件可以在同源的其他标签页中被监听到。这可以用来在标签页之间传递消息。

```javascript
// 在一个标签页中设置localStorage
localStorage.setItem('myKey', 'myValue');

// 在其他标签页中监听storage事件
window.addEventListener('storage', function(event) {
  if (event.key === 'myKey') {
    console.log('New value for myKey is: ' + event.newValue);
  }
});
```

2. 使用 `BroadcastChannel` API

`BroadcastChannel` API 允许同源的不同标签页、iframe或workers之间进行简单的通信。

```javascript
// 创建一个BroadcastChannel
const channel = new BroadcastChannel('my_channel');

// 发送消息
channel.postMessage('Hello from one tab!');

// 在其他标签页中接收消息
channel.onmessage = function(event) {
  console.log('Received message:', event.data);
};

// 记得关闭channel
channel.close();
```

3. 使用 `SharedWorker`

`SharedWorker` 是一种特殊类型的Web Worker，它可以被多个脚本共享，即使这些脚本在不同的浏览器窗口或标签页中运行。

```javascript
// 创建一个SharedWorker
const mySharedWorker = new SharedWorker('shared-worker.js');

// 发送消息到SharedWorker
mySharedWorker.port.postMessage('Hello from one tab!');

// 在SharedWorker中监听连接和消息
// shared-worker.js
self.addEventListener('connect', function(event) {
  const port = event.ports[0];

  port.addEventListener('message', function(event) {
    console.log('Received message:', event.data);
  });

  port.start();
});
```

4. 使用 `Window.postMessage` 方法

如果你可以获得其他标签页的`window`引用（例如，通过`window.open`打开的窗口或iframe），你可以使用`Window.postMessage`方法进行安全的跨文档通信。

```javascript
// 在父窗口中
const childWindow = window.open('http://example.com/page.html');

// 发送消息到子窗口
childWindow.postMessage('Hello from parent!', 'http://example.com');

// 在子窗口中监听消息
window.addEventListener('message', function(event) {
  if (event.origin === 'http://example.com') {
    console.log('Received message:', event.data);
  }
});
```

5. 使用服务器作为中介

你可以使用WebSocket或其他实时通信技术（如SSE - Server-Sent Events）来与服务器建立连接，服务器再将消息转发到其他标签页。

```javascript
// 建立WebSocket连接
const socket = new WebSocket('ws://example.com/socket');

// 发送消息到服务器
socket.send('Hello from one tab!');

// 从服务器接收消息
socket.onmessage = function(event) {
  console.log('Received message:', event.data);
};
```

选择哪种方法取决于你的具体需求，比如是否需要跨域通信、是否需要服务器参与、以及浏览器的兼容性等因素。在实现时，还需要考虑安全性，确保只接收和处理来自可信来源的消息。

当然，下面是每种通信方式的限制和注意事项：

1. 使用 `localStorage` 或 `sessionStorage` 事件

**限制**：

- 仅限于同源标签页之间的通信。
- `localStorage`是持久的，而`sessionStorage`仅在会话期间存在。
- 存储空间有限（通常为5MB）。
- 数据必须是字符串形式，对于复杂数据结构需要序列化。
- `storage`事件不会在触发更改的标签页中触发。

**注意事项**：

- 需要对存储的数据进行管理，避免存储溢出。
- 对于敏感数据，需要考虑安全性和隐私性。

2. 使用 `BroadcastChannel` API

**限制**：

- 不是所有浏览器都支持`BroadcastChannel`，特别是在一些旧版浏览器和某些移动浏览器中。
- 仅限于同源标签页之间的通信。

**注意事项**：

- 需要在不再需要时关闭`BroadcastChannel`，以释放资源。
- 对于敏感数据，需要考虑安全性和隐私性。

3. 使用 `SharedWorker`

**限制**：

- `SharedWorker`的支持在不同浏览器中有所不同，特别是在移动端和某些桌面浏览器中可能不被支持。
- 仅限于同源标签页之间的通信。

**注意事项**：

- `SharedWorker`可能会被浏览器在不活跃时终止，需要考虑重新连接的逻辑。
- 对于敏感数据，需要考虑安全性和隐私性。

4. 使用 `Window.postMessage` 方法

**限制**：

- 需要有对其他标签页的`window`对象的引用，这通常意味着它们是由当前页面打开的，或者是嵌入的iframe。
- 对于跨域通信，需要特别注意安全性，验证消息的来源。

**注意事项**：

- 在发送和接收消息时，应始终指定精确的目标源，并验证消息的来源。
- 消息内容应该尽可能简洁，避免发送大量数据。

5. 使用服务器作为中介

**限制**：

- 需要服务器支持WebSocket或其他实时通信协议。
- 可能会增加服务器的负载和复杂性。
- 依赖于网络连接的稳定性和速度。

**注意事项**：

- 需要在服务器端实现消息的路由逻辑。
- 需要处理网络延迟和连接中断的情况。
- 对于敏感数据，需要考虑通信的加密和安全性。

在选择通信方式时，除了考虑上述限制和注意事项外，还需要考虑应用的具体需求、目标用户群体的浏览器兼容性以及开发和维护的成本。通常，为了确保最佳的兼容性和用户体验，可能需要结合使用多种方法。
