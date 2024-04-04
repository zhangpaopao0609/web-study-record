# SameSite 详解

## 1. SameSite

`SameSite` 是一个用于防止 CSRF 攻击和用户追踪的 HTTP cookie 属性。它允许服务器声明某个特定的 cookie 不应该随着跨站请求一起发送，这样可以为用户提供一定程度的保护。`SameSite` 属性可以有以下几个值：

1. **Strict**：当 `SameSite` 设置为 `Strict` 时，浏览器将只在当前网站的请求中发送 cookie，即只有当请求的来源与目标网站相同的情况下。这意味着如果用户点击了另一个网站上的链接到当前网站，或者通过第三方网站的表单提交到当前网站，cookie 都不会被发送。

2. **Lax**：与 `Strict` 相比，`Lax` 模式稍微宽松一些。在这种模式下，cookie 会随着顶级导航请求一起发送，例如用户通过地址栏输入 URL、书签或者点击链接等情况。但是，对于通过第三方网站发起的 POST 请求、图片加载、XHR 或者 iframe 等，cookie 仍然不会被发送。

3. **None**：如果 `SameSite` 设置为 `None`，则无论是否为跨站请求，cookie 总是会被发送。但是，如果设置了 `SameSite=None`，必须同时设置 `Secure` 属性，这意味着 cookie 只能通过安全的 HTTPS 连接发送。

在没有明确设置 `SameSite` 属性的情况下，不同的浏览器可能有不同的默认行为。一些浏览器可能默认将 `SameSite` 设置为 `Lax`，以提高用户的安全性。

## 2. 如何设置 SameSite 属性

`SameSite` 属性可以通过两种方式设置：

1. **通过 Set-Cookie 响应头**：服务器可以在发送 Set-Cookie 响应头时指定 SameSite 属性。例如：

   ```
   Set-Cookie: sessionId=abc123; SameSite=Lax
   ```

2. **通过 JavaScript**：在客户端，可以通过 JavaScript 的 `document.cookie` API 设置 cookie，并指定 SameSite 属性。例如：

   ```javascript
   document.cookie = "sessionId=abc123; SameSite=Lax";
   ```

## 3. 注意事项

- `SameSite=None` 必须与 `Secure` 属性一起使用，否则 cookie 可能会被拒绝。
- 对于跨域请求，如 API 调用或第三方资源加载，如果需要携带 cookie，可能需要显式地设置 `SameSite=None; Secure`。
- 由于 `SameSite` 属性是一个相对较新的标准，老版本的浏览器可能不支持它。在这些浏览器中，设置 `SameSite` 属性可能没有任何效果。

通过正确使用 `SameSite` 属性，开发者可以增强 Web 应用的安全性，减少 CSRF 攻击的风险，并对用户的隐私提供更好的保护。

## 4. 后记

`SameSite=None` 必须与 `Secure` 属性一起使用的原因是出于安全考虑。`SameSite=None` 允许 cookie 在跨站请求中被发送，这意味着 cookie 可以在不同域之间传递。如果这些请求不是通过安全的 HTTPS 连接发送的，那么 cookie 就有可能被第三方截获，从而导致敏感信息泄露，比如会话标识符等。

为了防止这种风险，浏览器要求当 `SameSite=None` 被设置时，必须同时设置 `Secure` 属性。`Secure` 属性确保 cookie 只能通过 HTTPS 连接发送，而不是通过不安全的 HTTP 连接。这样，即使 cookie 在跨站请求中被发送，也能保证传输过程的安全性。

当提到 cookie 可能会被拒绝时，意思是如果开发者设置了 `SameSite=None` 但没有同时设置 `Secure` 属性，那么一些浏览器可能会完全忽略这个 cookie，不会将它存储在用户的浏览器中。这是因为浏览器认为这样的 cookie 配置是不安全的，不符合安全最佳实践。

### 4.1 Secure 属性

`Secure` 属性是一个 HTTP cookie 的属性，它告诉浏览器只有当请求是通过 HTTPS 协议发起的时候，才能发送这个 cookie。如果一个请求是通过 HTTP 发起的，即使请求的其他部分是合法的，带有 `Secure` 属性的 cookie 也不会被包含在内。这样可以防止 cookie 被截获，特别是在开放的 Wi-Fi 网络等不安全的网络环境中。

### 4.2 如何设置 Secure 属性

`Secure` 属性可以通过以下两种方式设置：

1. **通过 Set-Cookie 响应头**：服务器在发送 Set-Cookie 响应头时指定 Secure 属性。例如：

   ```
   Set-Cookie: sessionId=abc123; Secure
   ```

2. **通过 JavaScript**：在客户端，可以通过 JavaScript 的 `document.cookie` API 设置 cookie，并指定 Secure 属性。例如：

   ```javascript
   document.cookie = "sessionId=abc123; Secure";
   ```

总之，`SameSite=None; Secure` 的组合是为了确保在 cookie 跨站传输时，传输过程是安全的。这是一个重要的安全措施，有助于保护用户数据不被恶意第三方所利用。

https://stackoverflow.com/questions/59990864/what-is-the-difference-between-samesite-lax-and-samesite-strict
