import 'package:flutter/material.dart';

class AppBarDemoPage extends StatelessWidget {
  const AppBarDemoPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AppBarDemo'),
        centerTitle: true,
        // backgroundColor: Colors.red,
        leading: IconButton(
          icon: Icon(Icons.menu),
          onPressed: () {

          },
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {

            },
          ),
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {

            },
          )
        ],
      ),
      body: Text('我是AppBarDemo'),
    );
  }
}