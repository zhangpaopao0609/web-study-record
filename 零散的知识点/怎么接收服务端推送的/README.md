# 服务端推送全貌

摘要：前端是如何接收服务端推送的消息的呢？后端又是如何推送的呢？

一个网页获取新的数据通常是发送一个请求到服务器，这是前端主动发起后被动发送的，但有时候需要后端主动向前端发送一些数据，前端拿着这些数据做对应的渲染，比如 App 的推送弹窗。

使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。这些被推送进来的信息可以在这个页面上作为 *[Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) + data* 的形式来处理。





`**EventSource**` 是服务器推送的一个网络事件接口。一个 EventSource 实例会对 HTTP 服务开启一个持久化的连接，以`text/event-stream` 格式发送事件，会一直保持开启直到被要求关闭。

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

### [事件接收器](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#事件接收器)

- [`EventSource.onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/error_event)

  Is an `event handler` called when an error occurs and the [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/error_event) event is dispatched on an `EventSource` object.

- [`EventSource.onmessage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/message_event)

  Is an `event handler` called when a [`message` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/message_event) event is received, that is when a message is coming from the source.

- [`EventSource.onopen`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/open_event)

  Is an `event handler` called when an [`open`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/open_event) event is received, that is when the connection was just opened.

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#方法)

*此接口从其父接口 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 继承方法。*

- [`EventSource.close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/close)

  如果存在，则关闭连接，并且设置 `readyState` 属性为 `CLOSED`。如果连接已经被关闭，此方法不会再进行任何操作。

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#事件)

- [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/error_event)

  Fired when a connection to an event source failed to open.

- [`message` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/message_event)

  Fired when data is received from an event source.

- [`open`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/open_event)

  Fired when a connection to an event source has opened.

Additionally, the event source itself may send messages with an event field, which will create ad-hoc events keyed to that value.

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource#示例)

In this basic example, an `EventSource` is created to receive unnamed events from the server; a page with the name `sse.php` is responsible for generating the events.

```
var evtSource = new EventSource('sse.php');
var eventList = document.querySelector('ul');

evtSource.onmessage = function(e) {
  var newElement = document.createElement("li");

  newElement.textContent = "message: " + e.data;
  eventList.appendChild(newElement);
}
```

Copy to Clipboard

Each received event causes our `EventSource` object's `onmessage` event handler to be run. It, in turn, creates a new [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/li) element and writes the message's data into it, then appends the new element to the list element already in the document.

**Note**: You can find a full example on GitHub — see [Simple SSE demo using PHP.](https://github.com/mdn/dom-examples/tree/master/server-sent-events)

To listen to named events, you'll require a listener for each type of event sent.

```
  const sse = new EventSource('/api/v1/sse');

  /* This will listen only for events
   * similar to the following:
   *
   * event: notice
   * data: useful data
   * id: someid
   *
   */
  sse.addEventListener("notice", function(e) {
    console.log(e.data)
  })

  /* Similarly, this will listen for events
   * with the field `event: update`
   */
  sse.addEventListener("update", function(e) {
    console.log(e.data)
  })

  /* The event "message" is a special case, as it
   * will capture events without an event field
   * as well as events that have the specific type
   * `event: message` It will not trigger on any
   * other event type.
   */
  sse.addEventListener("message", function(e) {
    console.log(e.data)
  })
```





https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events