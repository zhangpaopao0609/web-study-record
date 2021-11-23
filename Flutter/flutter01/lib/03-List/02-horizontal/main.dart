import 'package:flutter/material.dart';

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
        body: BodyContent()
      ),
    );
  }
}

class BodyContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  SizedBox(
      child: ListView(
        children: const [
          Text(
            '标题1',
            textAlign: TextAlign.center,
          ),
          SizedBox(
            height: 200,
            width: 100,
            child: Text(
              '中间',
              textAlign: TextAlign.center,
            ),
          ),
          Text(
            '标题2',
            textAlign: TextAlign.center,
          )
        ],
        scrollDirection: Axis.horizontal,
      ),
      height: 200,
    );
  }
}