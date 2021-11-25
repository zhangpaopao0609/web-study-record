import 'package:flutter/material.dart';

class ButtonDemoPage extends StatelessWidget {
  const ButtonDemoPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('按钮演示页面'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                child: Text('1'),
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  elevation: 10,
                ),
              ),
              SizedBox(width: 10,),
              ElevatedButton.icon(
                onPressed: () {}, 
                icon: Icon(Icons.search), 
                label: Text("带图标的按钮")
              ),
              SizedBox(width: 10,),
              ElevatedButton.icon(
                onPressed: () {}, 
                icon: Icon(Icons.search), 
                label: Text("带图标的按钮"),
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10)
                  )
                ),
              )
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(width: 10,),
              Container(
                height: 80,
                child: ElevatedButton(
                  onPressed: () {}, 
                  child: Text("圆形按钮"),
                  style: ElevatedButton.styleFrom(
                    shape: CircleBorder(
                      side: BorderSide(
                        color: Colors.white
                      )
                    )
                  ),
                ),
              ),
              SizedBox(width: 10,),
              TextButton(
                onPressed: () {},
                child: Text("按钮"),
                style: TextButton.styleFrom(
                  backgroundColor: Colors.red,
                  primary: Colors.black,
                  textStyle: TextStyle(
                    fontSize: 20
                  )
                ),
              ),
              SizedBox(width: 10,),
              OutlinedButton(
                onPressed: () {},
                child: Text("按钮"),
                style: ButtonStyle(
                  foregroundColor: MaterialStateProperty.all(Colors.black),
                  side: MaterialStateProperty.all(
                    BorderSide(
                      width: 2,
                      color: Colors.red
                    )
                  )
                ),
              ),
              SizedBox(width: 10,),
              IconButton(
                onPressed: () {},
                icon: Icon(Icons.settings),
              )
            ],
          ),
          Row(
            children: [
              SizedBox(width: 10,),
              ButtonBar(
                children: [
                  ElevatedButton(
                    onPressed: () {}, 
                    child: Text("登陆")
                  ),
                  ElevatedButton(
                    onPressed: () {}, 
                    child: Text("注册"),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.red),
                      foregroundColor: MaterialStateProperty.all(Colors.black),
                      elevation: MaterialStateProperty.all(20)
                    ),
                  ),
                ],
              )
            ],
          )
        ],
      ),
    );
  }
}


// 自定义按钮组件
class MyButton extends StatelessWidget {
  final text;
  final pressed;
  const MyButton({Key? key, this.text='', this.pressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      child: Text(text),
      onPressed: pressed,
    );
  }
}