import 'package:flutter/material.dart';

class RegisterFirstPage extends StatefulWidget {
  const RegisterFirstPage({Key? key}) : super(key: key);

  @override
  _RegisterFirstPageState createState() => _RegisterFirstPageState();
}

class _RegisterFirstPageState extends State<RegisterFirstPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('注册——输入手机号'),
      ),
      body: Center(
        child: Column(
          children: [
            const SizedBox(height: 40,),
            const Text("这是注册的第一步，请输入手机号，然后点击下一步"),
            ElevatedButton(
              child: const Text('下一步'),
              onPressed: () {
                Navigator.of(context).pushNamed('/register_second');
                // Navigator.of(context).pushReplacementNamed('/register_second');
              },
            )
          ],
        ),
      ),
    );
  }
}