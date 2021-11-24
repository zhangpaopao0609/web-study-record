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
    return Center(
      child: Stack(
        // alignment: Alignment.center,
        alignment: const Alignment(-1, -1),
        children: [
          Container(
            height: 400,
            width: 300,
            color: Colors.red,
          ),
          const Text(
            "文本1",
            style: TextStyle(
              fontSize: 40,
              color: Colors.white
            ),  
          ),
        ],
      ),
    );
  }
}
