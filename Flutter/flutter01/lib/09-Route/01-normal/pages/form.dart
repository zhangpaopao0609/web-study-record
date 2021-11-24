import 'package:flutter/material.dart';

class FormPage extends StatelessWidget {
  late String title;

  FormPage({Key? key, this.title="表单" }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: const Text('Form页面内容区域'),
      floatingActionButton: FloatingActionButton(
        child: const Text("返回"),
        onPressed: () {
          Navigator.of(context).pop();
        },
      ),
    );
  }
}