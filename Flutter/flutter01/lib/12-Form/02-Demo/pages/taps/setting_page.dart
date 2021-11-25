import 'package:flutter/material.dart';

class SettingPage extends StatefulWidget {
  SettingPage({Key? key}) : super(key: key);

  @override
  _SettingPageState createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text("这是设置页面"),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/login');
                },
                child: const Text('跳转到登陆页面!!'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/register_first');
                },
                child: const Text('跳转到注册页面!!'),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/user_info_form');
                },
                child: const Text('跳转到个人页面!!'),
              )
            ],
          )
        )
      ],
    );
  }
}
