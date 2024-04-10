神奇的 keyof

```ts
interface Foo {
  name: string;
  age: string;
};

interface Coo {
  name: string;
  gender: number;
};

type K = keyof (Foo | Coo);
```

这里很神奇，K 只有一个 name 了，来看看是为什么吧。

在TypeScript中，`keyof`操作符用于获取一个类型的**所有公共属性键的联合**。当你对一个联合类型使用`keyof`时，结果是这些类型共有的属性键的联合。

在你的例子中，我们有三个类型：`Foo`、`Bar`和`Coo`。然后你创建了一个新的类型`cc`，它是`Foo`和`Coo`的联合类型的键的联合。

```typescript
type Foo = {
  name: string;
  age: string;
};

type Coo = {
  name: string;
  gender: number;
};

type cc = keyof (Foo | Coo); // type cc = "name"
```

当你对`Foo | Coo`这个联合类型使用`keyof`时，TypeScript会计算出只有那些在所有成员类型中都存在的属性键。在这个例子中，`Foo`和`Coo`都有一个公共的属性`name`，但是`age`只存在于`Foo`中，而`gender`只存在于`Coo`中。因此，`keyof (Foo | Coo)`的结果只包含`name`，因为它是唯一的共有属性。

这就是为什么类型`cc`被解析为只包含`"name"`的类型。这个行为确保了当你访问一个联合类型的属性时，你只能访问那些在所有可能的类型中都是安全的属性。这样可以防止运行时错误，因为你不能保证联合类型的具体实现是哪一个类型，所以只能安全地访问它们共有的属性。

那么 keyof （Foo & Coo） 呢？

在TypeScript中，当你对一个交叉类型使用`keyof`操作符时，结果是这些类型所有属性键的联合。交叉类型`Foo & Coo`表示一个类型，它同时包含`Foo`和`Coo`的所有属性。

给定你的类型定义：

```typescript
type Foo = {
  name: string;
  age: string;
};

type Coo = {
  name: string;
  gender: number;
};
```

当我们创建一个交叉类型`Foo & Coo`时，我们得到一个类型，它包含`Foo`的所有属性加上`Coo`的所有属性。如果两个类型中有相同名称的属性，那么这个属性在交叉类型中的类型将是这些属性类型的交叉。

因此，`Foo & Coo`的结果是一个包含`name`、`age`和`gender`属性的类型。其中`name`属性是`string`类型，因为`Foo`和`Coo`中的`name`属性都是`string`类型。

现在，如果我们对这个交叉类型使用`keyof`：

```typescript
type cc = keyof (Foo & Coo); // type cc = "name" | "age" | "gender"
```

类型`cc`将是`"name" | "age" | "gender"`，因为这些是交叉类型`Foo & Coo`中的所有属性键。

这与使用`keyof`在联合类型上的行为相反，因为联合类型的`keyof`会得到所有类型共有的属性键，而交叉类型的`keyof`会得到所有属性键的联合。
