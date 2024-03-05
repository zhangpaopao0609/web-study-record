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
        res.write(`data: ${new Date().toISOString()}\n\n`);
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
