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
    return Center(
      child: Container(
        child: const Text(
          '我是张跑跑我是张跑跑我是张跑跑我是张跑跑',
          textAlign: TextAlign.right,
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
          textScaleFactor: 2,
          style: TextStyle(
            fontSize: 16,
            color: Colors.red,
            fontWeight: FontWeight.w800,
            fontStyle: FontStyle.italic,
            decoration: TextDecoration.underline,
            decorationColor: Colors.blueAccent,
            decorationThickness: 2,
            decorationStyle: TextDecorationStyle.dotted,
            letterSpacing: 5,
          ),
        ),
        width: 300,
        height: 300,
        padding: const EdgeInsets.all(10),
        // margin: const ,
        transform: Matrix4.translationValues(10, 0, 0),
        // alignment: Alignment.bottomLeft,
        decoration: BoxDecoration(
          color: Colors.yellow,
          border: Border.all(
            color: Colors.blue,
            width: 2,
          ),
          borderRadius: const BorderRadius.all(
             Radius.circular(20)
          ),
        ),
      ),
    );
  }
}