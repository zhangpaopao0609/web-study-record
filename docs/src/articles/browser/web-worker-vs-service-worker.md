# web workers 和 service workers

https://www.dhiwise.com/post/web-workers-vs-service-workers-in-javascript

## 1. Web Workers

Web Workers 是现代Web平台提供的一个功能，它允许开发者在浏览器中运行脚本操作，而这些操作是在与主JavaScript执行线程（通常是负责UI的线程）分离的后台线程中执行的。这意味着Web Workers可以执行耗时的计算任务，而不会阻塞UI线程，从而提高了Web应用程序的性能和响应性。

### 1.1 主要特点

1. **并行执行**：Web Workers运行在与主线程分离的后台线程中，可以并行处理任务。
2. **不阻塞UI**：由于Web Workers在后台执行，它们不会影响页面的加载和用户界面的响应。
3. **无DOM访问**：Web Workers不能直接访问DOM，这避免了多线程访问DOM时可能出现的并发问题。
4. **通信机制**：Web Workers通过`postMessage`方法和`onmessage`事件与主线程通信。
5. **限制的全局环境**：Web Workers没有访问window、document等浏览器特定的全局变量，但它们可以使用如`navigator`或`location`的一些全局属性。

### 1.2 使用Web Workers

要使用Web Workers，你需要创建一个新的`Worker`对象，并指定一个脚本文件，该文件包含将在Worker线程中运行的代码。

```javascript
// 创建一个新的Worker
var myWorker = new Worker('worker.js');
```

在`worker.js`文件中，你可以编写将在Worker线程中执行的代码。例如：

```javascript
// worker.js
self.onmessage = function(e) {
  var result = performComplexCalculation(e.data);
  self.postMessage(result);
};

function performComplexCalculation(data) {
  // 复杂计算
  return data; // 返回结果
}
```

在主线程中，你可以通过`postMessage`方法向Worker发送消息，并通过监听`onmessage`事件来接收来自Worker的消息。

```javascript
// 向Worker发送数据
myWorker.postMessage(data);

// 接收来自Worker的消息
myWorker.onmessage = function(e) {
  console.log('Message received from worker', e.data);
};
```

### 1.3 终止Web Workers

如果你需要停止一个Worker的执行，可以调用`terminate`方法：

```javascript
myWorker.terminate();
```

调用`terminate`后，Worker线程将立即停止，不再执行任何操作。

### 1.4 Web Workers的类型

1. **专用Workers（Dedicated Workers）**：只能被创建它们的脚本所使用，不能与其他脚本或Workers共享。
2. **共享Workers（Shared Workers）**：可以被多个脚本共享，即使这些脚本在不同的窗口、iframe或其他Workers中运行。

### 1.5 使用场景

Web Workers适合用于执行那些可能会阻塞UI线程的耗时任务，例如：

- 图像处理
- 大数据集的排序或其他计算
- 拉取和处理大量数据
- 复杂的数学计算
- 实时数据处理

### 1.6 注意事项

- Web Workers中的代码不能直接修改UI，所有的UI更新必须通过主线程来完成。
- 由于Web Workers运行在不同的全局上下文中，它们不能访问主线程中的变量或函数。
- Web Workers的使用可能会增加内存和CPU资源的消耗，因此应当谨慎使用。

Web Workers提供了一种强大的方式来提高Web应用程序的并行性和性能，但它们应该用于那些确实需要后台处理的任务，以避免不必要的资源消耗。

Service Workers 是一种在Web浏览器中运行的脚本，它们充当客户端和服务器之间的代理服务器。Service Workers 可以拦截和处理网络请求，包括在后台同步数据、响应资源请求、管理缓存等。它们是实现渐进式Web应用（Progressive Web Apps, PWAs）的关键技术之一，允许Web应用在离线时仍然可用，并提供类似原生应用的体验。

## 2. Service Workers

### 2.1 主要特点

1. **生命周期**：Service Workers 有自己的生命周期，独立于Web页面。
2. **离线体验**：可以拦截请求并提供缓存的响应，使应用能够在没有网络连接的情况下工作。
3. **后台同步**：即使在用户关闭页面后，也能在后台同步数据。
4. **推送通知**：可以接收服务器的推送消息，并向用户显示通知。
5. **网络代理**：充当Web应用和网络之间的代理，允许开发者控制如何响应资源请求。

### 2.2 使用Service Workers

要使用Service Workers，你需要在你的JavaScript代码中注册一个Service Worker 文件。

```javascript
// 检查Service Worker是否可用
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      // 注册成功
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(function(error) {
      // 注册失败
      console.log('ServiceWorker registration failed: ', error);
    });
}
```

在Service Worker 文件中，你可以监听并响应生命周期事件，如`install`、`activate`和`fetch`。

```javascript
// service-worker.js

// 安装Service Worker
self.addEventListener('install', function(event) {
  // 执行安装步骤
});

// 激活Service Worker
self.addEventListener('activate', function(event) {
  // 清理旧缓存等
});

// 拦截网络请求
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 缓存命中，返回响应
        if (response) {
          return response;
        }
        // 重要：克隆请求。请求是一个流，只能消费一次。
        var fetchRequest = event.request.clone();

        // 尝试网络请求
        return fetch(fetchRequest).then(
          function(response) {
            // 检查是否得到有效的响应
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：克隆响应。因为响应是一个流，只能消费一次。
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
```

### 2.3 生命周期

Service Workers 的生命周期包括以下几个阶段：

- **安装（Install）**：在这个阶段，通常会缓存应用的静态资源。
- **激活（Activate）**：当Service Worker 安装后，它将接收激活事件。在这个阶段，通常会清理旧版本的缓存。
- **拦截请求（Fetch）**：Service Worker 可以监听页面发出的网络请求，并决定如何响应这些请求，例如从缓存中提供资源或者向服务器发起请求。

### 2.4 注意事项

- Service Workers 运行在HTTPS环境下，以确保安全。在本地开发时，`localhost` 通常被视为安全的例外。
- Service Workers 是异步的，它们依赖于Promises。
- Service Workers 完全独立于Web页面，不可以直接访问DOM。它们通过`postMessage`接口与页面通信。
- Service Workers 可以被浏览器在不活跃时终止，以节省资源，然后在需要时重新启动。

Service Workers 的出现极大地增强了Web应用的能力，使得开发者可以创建更加可靠、快速且富有原生体验的Web应用。
