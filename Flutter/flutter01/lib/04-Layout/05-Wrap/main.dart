import 'dart:ffi';

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
          title: const Text('Wrap'),
        ),
        body: LayoutDemo()
      ),
    );
  }
}
 
class LayoutDemo extends StatelessWidget {
  @override   
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      alignment: WrapAlignment.spaceBetween,
      // runAlignment: WrapAlignment.end, 
      children: const [
        MyButton('第1集'),
        MyButton('第1集'),
        MyButton('第1集第2集'),
        MyButton('第1集'),
        MyButton('第1集第2集'),
        MyButton('第1集'),
        MyButton('第1集'),
        MyButton('第1集'),
      ],
    );
  }
}


class MyButton extends StatelessWidget {
  final String text;
  const MyButton(this.text, {Key? key}) : super(key: key);

  @override   
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      child: Text(text),
      style: ElevatedButton.styleFrom(
        textStyle: const TextStyle(fontSize: 20)
      ),
    );
  }
}