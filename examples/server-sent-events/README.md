服务端推送示例

服务端代码

```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // 每隔一秒发送一个时间戳
  setInterval(() => {
    res.write(`data: ${new Date().toISOString()}`);
  }, 1000);

  // 当客户端关闭连接时，停止发送事件
  req.on('close', () => {
    clearInterval();
    res.end();
  });
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
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
