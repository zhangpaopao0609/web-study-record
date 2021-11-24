import 'package:flutter/material.dart';
import '../taps.dart';

class RegisterSecondPage extends StatefulWidget {
  RegisterSecondPage({Key? key}) : super(key: key);

  @override
  _RegisterSecondPageState createState() => _RegisterSecondPageState();
}

class _RegisterSecondPageState extends State<RegisterSecondPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('第二步：完成注册'),
      ),
      body: Center(
        child: Column(
          children: [
            const SizedBox(height: 40,),
            const Text("输入密码完成注册"),
            ElevatedButton(
              child: const Text('确定'),
              onPressed: () {
                // Navigator.of(context).pushNamed('/setting');
                // Navigator.of(context).pop();
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => const Tabs(index: 2)),
                  (route) => false,
                );
              },
            )
          ],
        ),
      ),
    );
  }
}