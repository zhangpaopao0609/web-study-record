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
    return listData.map((item) => 
      SizedBox(
        child: Column(
          children: [
            Image.network(
              item["imageUrl"].toString(),
            ),
            Text(
              item["title"].toString(),
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 50),
            )
          ],
        ),
      )
    ).toList();
  }

  @override   
  Widget build(BuildContext context) {
    return  GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 20,
      mainAxisSpacing: 300,
      children: _getData(),
    );
  }
}