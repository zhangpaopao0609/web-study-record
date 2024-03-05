# 服务端推送全貌

摘要：前端是如何接收服务端推送的消息的呢？后端又是如何推送的呢？

一个网页获取新的数据通常是发送一个请求到服务器，这是前端主动发起后被动发送的，但有时候需要后端主动向前端发送一些数据，前端拿着这些数据做对应的渲染，比如 App 的推送弹窗。

使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。这些被推送进来的信息可以在这个页面上作为 *[Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) + data* 的形式来处理。


`EventSource` 是服务器推送的一个网络事件接口。一个 `EventSource` 实例会对 HTTP 服务开启一个持久化的连接，以`text/event-stream` 格式发送事件，会一直保持开启直到被要求关闭。

一旦连接开启，来自服务端传入的消息会以事件的形式分发至你代码中。如果接收消息中有一个事件字段，触发的事件与事件字段的值相同。如果没有事件字段存在，则将触发通用事件。

与 [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API),不同的是，服务端推送是单向的。数据信息被单向从服务端到客户端分发。当不需要以消息形式将数据从客户端发送到服务器时，这使它们成为绝佳的选择。例如，对于处理社交媒体状态更新，新闻提要或将数据传递到客户端存储机制（如 IndexedDB 或 Web 存储）之类的，EventSource 无疑是一个有效方案。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#构造函数)

- [`EventSource()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/EventSource)

  以指定的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/API/USVString) 创建一个新的 `EventSource`。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#属性)

*此接口从其父接口 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 继承属性。*

- [`EventSource.onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/error_event)

  是一个 `event handler`，当发生错误时被调用，并且在此对象上派发 `error (en-US)` 事件。

- [`EventSource.onmessage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/message_event)

  是一个 `event handler`，当收到一个 `message` 事件，即消息来自源头时被调用。

- [`EventSource.onopen`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/open_event)

  是一个 `event handler`，当收到一个 `open `事件，即连接刚打开时被调用。

- [`EventSource.readyState` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/readyState) 只读

  一个 `unsigned ``short` 值，代表连接状态。可能值是 `CONNECTING` (`0`), `OPEN` (`1`), 或者 `CLOSED` (`2`)。

- [`EventSource.url` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/url) 只读

  一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，代表事件源的 URL。

## 示例

服务端推送示例

服务端代码

```js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // 每隔一秒发送一个时间戳
    setInterval(() => {
        res.write(`data: ${new Date().toISOString()}`);
    }, 1000);

    // 当客户端关闭连接时，停止发送事件
    req.on("close", () => {
        clearInterval();
        res.end();
    });
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
```

其中最为关键的是 `res.setHeader("Content-Type", "text/event-stream")` 即服务端代码发送 events 是需要将 MIME 设置为 `text/event-stream`。

客户端代码

```html
<!DOCTYPE html>
<html>

<body>
  <div id="events"></div>
  <button id="btn">点击关闭</button>
  <script>
    const eventSource = new EventSource('http://localhost:8000/events');
    eventSource.onmessage = (event) => {
      const newElement = document.createElement("p");
      const eventList = document.getElementById('events');

      newElement.innerHTML = "Received timestamp: " + event.data;
      eventList.appendChild(newElement);
    }

    const btn = document.getElementById('btn');
    btn.onclick = () => {
      eventSource.close();
    }
  </script>
</body>

</html>
```

创建一个 `EventSource`，然后通过 `onmessage` 去接收，也可以调用 `close` 去关闭。

更多详细内容请查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

[示例代码可见](https://github.com/zhangpaopao0609/web-study-record/tree/master/examples/ServerSentEvents)