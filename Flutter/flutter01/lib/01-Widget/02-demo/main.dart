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
        child: Image.network(
          "https://avatars.githubusercontent.com/u/44194929?v=4",
          alignment: Alignment.topLeft,
          // color: Colors.yellow,
          // colorBlendMode: BlendMode.luminosity,
          // fit: BoxFit.fill,
          // repeat: ImageRepeat.repeat,
        ),
        width: 300,
        height: 300,
        padding: const EdgeInsets.all(1),
        decoration: const BoxDecoration(
          color: Colors.yellow,
        ),
      ),
    );
  }
}