import 'package:flutter/material.dart';

class UserInfoFormPage extends StatefulWidget {
  UserInfoFormPage({Key? key}) : super(key: key);

  @override
  _UserInfoFormPageState createState() => _UserInfoFormPageState();
}

class _UserInfoFormPageState extends State<UserInfoFormPage> {
  String _username = "";
  int _gender = 1;
  final List _hobbies = [
    {
      "checked": true,
      "title": "吃饭",
    },
    {
      "checked": false,
      "title": "睡觉",
    },
    {
      "checked": false,
      "title": "打飞机",
    },
  ];
  String _info = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('user_info_form'),
      ),
      body: SingleChildScrollView(
        child: Padding(
        padding: EdgeInsets.all(10),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Expanded(
                  flex: 0,
                  child: Text("请输入姓名："),
                ),
                Expanded(
                  flex: 1,
                  child: TextField(
                    onChanged: (v) => setState(() => _username = v),
                    decoration: const InputDecoration(
                      hintText: "请输入姓名",
                      // border: OutlineInputBorder()
                    ),
                  )
                )
              ],
            ),
            Row(
              children: [
                const Text("请选择性别："),
                Row(
                  children: [
                    Radio<int>(
                      value: 1,
                      groupValue: _gender,
                      onChanged: (v) => setState(() => _gender = v ?? 1),
                    ),
                    const Text("男"),
                  ],
                ),
                Row(
                  children: [
                    Radio<int>(
                      value: 2,
                      groupValue: _gender,
                      onChanged: (v) => setState(() => _gender = v ?? 1),
                    ),
                    const Text("女"),
                  ],
                ),
              ],
            ),
            Row(
              children: [
                const Text("请选择爱好："),
                ..._hobbies.map((item) => 
                  Row(
                    // crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                    Checkbox(
                      value: item["checked"],
                      onChanged: (v) => setState(() => item["checked"] = !item["checked"]),
                    ),
                    Text(item["title"]),
                  ],)
                ).toList()
              ],
            ),
            
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Expanded(
                  flex: 0,
                  child: Text("请输入其它："),
                ),
                Expanded(
                  flex: 1,
                  child: TextField(
                    maxLines: 3,
                    onChanged: (v) => setState(() => _username = v),
                    decoration: const InputDecoration(
                      hintText: "请输入其它信息",
                      border: OutlineInputBorder()
                    ),
                  )
                )

              ],
            ),
            Wrap(
              children: [
                const Text("所有数据："),
                Row(children: [Text(_username),],),
                Text(_gender.toString()),
                Text(_hobbies.toString()),
                Text(_info.toString()),
              ],
            ),
            
            
            Container(
              width: double.infinity,
              margin: const EdgeInsets.fromLTRB(20, 10, 20, 0),
              child: ElevatedButton(
                child: const Text('提交信息'),
                onPressed: () => {

                },
              ),
            )
          ],
        ),
      ),
    ));
  }
}
