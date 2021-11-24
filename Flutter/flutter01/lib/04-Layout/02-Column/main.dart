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
    return Container(
      height: 400,
      width: 400,
      color: Colors.pink,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          IconContainer(Icons.search, backgroundColor: Colors.blue,),
          IconContainer(Icons.home),
          IconContainer(Icons.select_all, backgroundColor: Colors.yellow,),
        ],
      ),
    );
  }
}

class IconContainer extends StatelessWidget {
  double? size;
  Color? backgroundColor;
  IconData icon;

  IconContainer(
    this.icon,
    {
      this.backgroundColor=Colors.red,
      this.size=32,
    }
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      width: 100,
      color: backgroundColor,
      child: Center(
        child: Icon(
          icon,
          size: size
        ),
      ),
    );
  }
}