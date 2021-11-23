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
    return ListView(
      children: const <Widget>[
        ListTile(
          title: Text(
            '1111',
            style: TextStyle(
              fontSize: 28,
            ),
          ),
          subtitle: Text('1111--2222'),
        ),
        ListTile(
          leading: Icon(
            Icons.search,
            color: Colors.teal,
            textDirection: TextDirection.rtl
          ),
          title: Text('2222'),
          subtitle: Text('2222--2222'),
        ),
        ListTile(
          title: Text('3333'),
          subtitle: Text('3333--2222'),
        )
      ],
      padding: const EdgeInsets.all(10),
    );
  }
}