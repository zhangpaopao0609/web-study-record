import 'package:flutter/material.dart';

class FormPage extends StatelessWidget {
  final arguments;
  late String title;

  FormPage({Key? key, this.title="表单", this.arguments }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(arguments != null ? arguments["title"] : '11'),
      ),
      body: const Text('Form页面内容区域'),
      floatingActionButton: FloatingActionButton(
        child: const Text("返回"),
        onPressed: () {
          
        },
      ),
    );
  }
}