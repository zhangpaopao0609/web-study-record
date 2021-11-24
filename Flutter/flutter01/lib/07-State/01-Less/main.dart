import 'dart:ffi';

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
          title: const Text('Wrap'),
        ),
        body: MyState()
      ),
    );
  }
}
 
class MyState extends StatelessWidget {
  int count = 0;

  MyState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(child: 
      Column(
        children: [
          SizedBox(height: 200),
          Text("$count"),
          SizedBox(height: 50),
          ElevatedButton(
            onPressed: () {
              count += 1;
              print(count);
            }, 
            child: Text("按钮"),
            style: ElevatedButton.styleFrom(textStyle: TextStyle(color: Colors.red)),
          )
        ],
      )
    );
  }
}
