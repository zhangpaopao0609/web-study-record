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
        width: 300,
        height: 300,
        padding: const EdgeInsets.all(1),
        decoration: BoxDecoration(
          color: Colors.yellow,
          // borderRadius: BorderRadius.all(
          //   Radius.circular(150)
          // )
          borderRadius: BorderRadius.circular(150),
          image:const DecorationImage(
            image: NetworkImage(
              'https://avatars.githubusercontent.com/u/44194929?v=4'
            ),
            fit: BoxFit.cover,
          )
        ),
      ),
    );
  }
}