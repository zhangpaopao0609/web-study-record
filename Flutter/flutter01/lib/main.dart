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
    return Container(
      padding: const EdgeInsets.all(10),
      child: Column(
        children: [   
          Container(height: 200, color: Colors.black,),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                flex: 2,
                child:  Container(
                  height: 100,
                  color: Colors.blue,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    Container(
                      height: 45,
                      color: Colors.yellow,
                    ),
                    const SizedBox(height: 10),
                    Container(
                      height: 45,
                      color: Colors.pink,
                    ),
                  ],
                )
              )
            ],
          )         
        ],
      )
    );
  }
}
