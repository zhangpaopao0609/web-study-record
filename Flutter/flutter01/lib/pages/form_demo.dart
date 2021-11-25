import 'package:flutter/material.dart';

class FormDemoPage extends StatefulWidget {
  const FormDemoPage({Key? key}) : super(key: key);

  @override
  _FormDemoPageState createState() => _FormDemoPageState();
}

class _FormDemoPageState extends State<FormDemoPage> {
  var _username = TextEditingController();
  var _password;
  bool? flag = true;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _username.text = '初始值';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('表单演示页面'),
      ),
      body: Column(
        children: [
          TextField(
            controller: _username,
            decoration: InputDecoration(
              hintText: '请输入用户名'
            ),
            onChanged: (value) {
              setState(() {
                _username.text = value;
              });
              print(_username.text);
            },
          ),
          SizedBox(height: 10,),
          TextField(
            decoration: InputDecoration(
              hintText: '请输入密码'
            ),
            onChanged: (value) {
              setState(() {
                _password = value;
              });
              print(_password);
            },
          ),
          SizedBox(height: 10,),
          Container(
            width: double.infinity,
            margin: EdgeInsets.fromLTRB(20, 0, 20, 0),
            child: ElevatedButton(
              child: Text('登录'),
              onPressed: () {
                print(_username.text);
              },
              style: ButtonStyle(
                foregroundColor: MaterialStateProperty.all(Colors.blue),
                backgroundColor: MaterialStateProperty.all(Colors.white),
              ),
            ),
          ),
          SizedBox(height: 10,),
          Checkbox(
            value: flag,
            onChanged: (v) {
              setState(() {
                flag = v;
              });
              print(flag);
            },
          ),
          Divider(),
          SizedBox(height: 10,),
          CheckboxListTile(
            value: flag,
            title: Text("标题"),
            subtitle: Text("这是二级标题"),
            secondary: Icon(Icons.help),
            onChanged: (v) {
              setState(() {
                flag = v;
              });
              print(flag);
            },
          ),
          // TextDemo()
        ],
      ),
    );
  }
}


class TextDemo extends StatelessWidget {
  const TextDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
        children: const [
          TextField(),
          SizedBox(height: 10,),
          TextField(
            decoration: InputDecoration(
              hintText: "请输入搜索的内容",
              border: OutlineInputBorder()
            ),
          ),
          SizedBox(height: 10,),
          TextField(
            maxLines: 4,
            decoration: InputDecoration(
              hintText: "多行文本框",
              border: OutlineInputBorder()
            ),
          ),
          SizedBox(height: 10,),
          TextField(
            decoration: InputDecoration(
              hintText: "请输入用户名",
              border: OutlineInputBorder(),
              labelText: "用户名",
            ),
          ),
          SizedBox(height: 10,),
          TextField(
            obscureText: true,
            decoration: InputDecoration(
              hintText: "密码框",
              border: OutlineInputBorder(),
              labelText: "密码",
            ),
          ),
          SizedBox(height: 10,),
          TextField(
            decoration: InputDecoration(
              hintText: "用户名",
              icon: Icon(Icons.people)
            ),
          )
        ],
      );
  }
}