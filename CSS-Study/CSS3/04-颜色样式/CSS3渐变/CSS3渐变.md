# CSS3渐变

## 线性渐变
```css
background: linear-gradient(方向，开始颜色，结束颜色)
```

## 径向渐变
```css
background: radial-gradient(position, shape size, start-color, stop-color);
```
1. 圆心位置 position
- top center left right 
- 长度值

2. shape size
参数 shape 用于定义径向渐变的"形状"，而参数 size 用于定义径向渐变的”大小“

参数 shape
|属性值|说明|
|---|:---|
ellipse | 椭圆形 （默认）
circle | 圆形

参数 size
|属性值|说明|
|---|:---|
closest-side | 指定径向渐变的半径长度为从圆心到离圆心最近的边
closest-corner | 指定径向渐变的半径长度为从圆心到离圆心最近的角
farthest-side | 指定径向渐变的半径长度为从圆心到离圆心最近的边
farthest-corner | 指定径向渐变的半径长度为从圆心到离圆心最近的角