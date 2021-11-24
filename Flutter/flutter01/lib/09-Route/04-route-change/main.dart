import 'package:flutter/material.dart';

import 'routes/routes.dart';
void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      initialRoute: '/',
      onGenerateRoute: onGenerateRoute,
    );
  }
}
