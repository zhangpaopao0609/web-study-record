# toRaw 和 markRaw
- toRaw 返回 reactive 或 readonly 带来的原始对象。这是一个转义口。可用于临时读取而不会引起代理访问/跟踪开销，也可用于写入而不会触发更改
- markRaw 标记一个对象，使其永远不会转换为代理。返回对象本身