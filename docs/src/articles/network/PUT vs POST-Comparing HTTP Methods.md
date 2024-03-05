[toc]

# PUT vs POST - Comparing HTTP Methods



原文链接： https://www.keycdn.com/support/put-vs-post

## PUT vs POST

存在各种各样的HTTP方法，每个方法用于不同的目的。最常用的HTTP方法是GET方法，用于从web服务器检索数据。例如，如果要从特定网站加载图像，浏览器将使用以下命令向web服务器发出请求：

```none
GET https://website.com/path/to/image.jpg
```

然而，除了GET请求以外，还有其它类型的 [http](https://www.tutorialspoint.com/http/http_methods.htm) 方法，如下：

- HEAD
- POST
- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE

其中有两种方法在使用时我们经常会感到困惑，何时该用哪一个。这两个方法就是PUT和POST。在这篇文章中，我们将具体地讨论PUT和POST的区别以及我们应该如何正确地使用每个方法。

## 2. PUT方法做了什么？

PUT方法将会完全地替代目标URL下的资源，不论目标URL下是否存在资源。使用这个方法，你可以创建一个全新的资源或覆盖有一个已经存在的资源，前提是您知道确切的请求URI。使用PUT方法创建新资源的示例如下：

```none
PUT /forums/<new_thread> HTTP/2.0
Host: yourwebsite.com
```

其中<new_thread>是线程的实际名称或ID号。或者，用于覆盖现有资源的PUT方法可以如下所示：

```none
PUT /forums/<existing_thread> HTTP/2.0
Host: yourwebsite.com
```

简而言之，PUT方法用于创建或覆盖浏览器认识的指定URL下的资源。

## 3. POST方法做了什么？

POST方法用于发送用户生成的数据发送到web服务器。比如说，当一个用户对论坛进行了评论或者上传了头像，这时候就应该使用POST方法。如果您不知道新创建的资源应该驻留在哪里，没有确定的URL，那么也应该使用POST方法。换言之，如果创建了一个新的论坛线程，并且没有指定线程路径，那么您可以使用如下所示：

```none
POST /forums HTTP/2.0
Host: yourwebsite.com
```

使用此方法，源服务器将会返回URL path，您将收到类似以下内容的响应：

```none
HTTP/2.0 201 Created
Location: /forums/<new_thread>
```

总之，POST方法应该用于创建一个下级（或者说孩子）资源的标识，通过请求URI。在上面的例子中，根据源定义，请求URI 是`/forums`以及下级或孩子应该是 `<new_thread>` 

## 4. 何时使用？

1. 当您知道要创建或覆盖的内容的URL时，应该使用PUT方法。
2. 当您只知道要创建内容的对象的类别或子部分的URL，请使用POST方法。



## 































