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
        body: BodyContent()
      ),
    );
  }
}

class BodyContent extends StatelessWidget {
  List<Widget> _getData() {
    var list = listData.map((item){
      return ListTile(
        leading: Image.network(item["imageUrl"].toString()),
        title: Text(item["title"].toString()),
        subtitle: Text(item["author"].toString()),
      );
    });

    return list.toList();

  }

  @override
  Widget build(BuildContext context) {
    return  SizedBox(
      child: ListView(
        children: _getData(),
        padding: EdgeInsets.zero,
      ),
      height: 200,
    );
  }
}