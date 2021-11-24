import 'package:flutter/material.dart';

import 'pages/taps.dart';
import 'pages/form.dart';
import 'pages/search.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Tabs(),
      routes: {
        '/form': (context) => FormPage(),
        '/search': (context) => const SearchPage(),
      },
    );
  }
}
