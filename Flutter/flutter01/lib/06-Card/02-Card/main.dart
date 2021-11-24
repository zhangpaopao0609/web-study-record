import 'package:flutter/material.dart';
import '03-List/data/index.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home:  Scaffold(
        appBar: AppBar(
          title: const Text('flutter'),
        ),
        body: LayoutDemo()
      ),
    );
  }
}
 
class LayoutDemo extends StatelessWidget {
  @override   
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Card(
          margin: EdgeInsets.all(10),
          child: Column(
            children: const [
              ListTile(
                title: Text('张三', style: TextStyle(fontSize: 28),),
                subtitle: Text('高级工程师'),
              ),
              ListTile(
                title: Text('电话： xxxxx'),
              ),
              ListTile(
                title: Text('地址： xxxxx'),
              )
            ],
          ),
        )
      ],
    );
  }
}
