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
  Widget _getData (context, index) {
    return Container(
      child: ListTile(
        title: Text(listData[index]['title'].toString()),
        leading: Image.network(listData[index]['imageUrl'].toString()),
      ),
      margin: const EdgeInsets.fromLTRB(0, 0, 0, 10),
    ); 
  }

  @override   
  Widget build(BuildContext context) {
    return  SizedBox(
      child: ListView.builder(
        itemCount: listData.length,
        itemBuilder: _getData,
      ),
    );
  }
}