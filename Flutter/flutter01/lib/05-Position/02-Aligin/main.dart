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
      child: Container(
        height: 400,
        width: 300,
        color: Colors.red,
        child: Stack(
          children: const [
            Align(
              alignment: Alignment.center,
              child: Icon(
                Icons.home,
                size: 40,
                color: Colors.white
              ),
            ),
            Align(
              alignment: Alignment.topRight,
              child: Icon(
                Icons.select_all,
                size: 30,
                color: Colors.orange
              ),
            ),
            Align(
              alignment: Alignment.topLeft,
              child: Icon(
                Icons.search,
                size: 60,
                color: Colors.yellow
              ),
            ),
          ],
        ),
      ),
    );
  }
}
