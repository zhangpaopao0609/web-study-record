import 'package:flutter/material.dart';

import '../form.dart';

class CategoryPage extends StatefulWidget {
  CategoryPage({Key? key}) : super(key: key);

  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text("我是 CategoryPage 组件"),
        ElevatedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/form');
          }, 
          child: const Text('跳转到表单页面并传值!!'),
        ),
      ],
    );
    
  }
}