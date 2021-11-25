import 'package:flutter/material.dart';
import 'taps/home_page.dart';
import 'taps/category_page.dart';
import 'taps/setting_page.dart';

class Tabs extends StatefulWidget {
  final int index;
  const Tabs({Key? key, this.index = 0 }) : super(key: key);

  @override
  _TabsState createState() => _TabsState(index);
}

class _TabsState extends State<Tabs> {
  int _currentIndex = 0;
  final Map _indexForPage = {
    0: HomePage(),
    1: CategoryPage(),
    2: SettingPage(),
  };

  _TabsState(index) {
    _currentIndex = index;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wrap'),
      ),
      body: _indexForPage[_currentIndex] ,
      floatingActionButton: Container(
        height: 60,
        width: 60,
        padding: EdgeInsets.all(8),
        margin: EdgeInsets.only(top: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          color: Colors.white
        ),
        child: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () {
            setState(() => _currentIndex = 1);
          },
          backgroundColor: _currentIndex == 1 ? Colors.blue : Colors.yellow, 
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (int index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '首页',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.category),
            label: '分类',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: '设置',
          )
        ],
      ),
      drawer: Drawer(
        child: Column(
          children: [
            Row(
              children: const [
                Expanded(
                  // child: DrawerHeader(
                  //   child: Text('你好 Flutter'),
                  //   decoration: BoxDecoration(
                  //     // color: Colors.blueAccent,
                  //     image: DecorationImage(
                  //       image: NetworkImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.16pic.com%2F00%2F21%2F16%2F16pic_2116285_b.jpg&refer=http%3A%2F%2Fpic.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640345960&t=98ef5f1191b390c44867c7e9727538d2'),
                  //       fit: BoxFit.cover,
                  //     )
                  //   ),
                  // )
                  child: UserAccountsDrawerHeader(
                    accountName: Text(
                      '张跑跑',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xff7A0100)
                      ),
                    ), 
                    accountEmail: Text(
                      "921095267@qq.com",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xff7A0100)
                      ),
                    ),
                    currentAccountPicture: CircleAvatar(
                      backgroundImage: NetworkImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.16pic.com%2F00%2F21%2F16%2F16pic_2116285_b.jpg&refer=http%3A%2F%2Fpic.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640345960&t=98ef5f1191b390c44867c7e9727538d2'),
                    ),
                    otherAccountsPictures: [
                      // CircleAvatar(
                      // backgroundImage: NetworkImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F15%2F20151115202348_KZtj3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640345960&t=24828ae89a0eb57bd2c0be7448e95042'),
                    // )
                    ],
                    decoration: BoxDecoration(
                      color: Colors.blueAccent,
                      image: DecorationImage(
                        image: NetworkImage("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F10%2F20170710102901_sBvQm.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640347108&t=d8fd820aebbdd6791628c56f09ff8ba9"),
                        fit: BoxFit.cover
                      )
                    ),
                  ),
                )
              ],
            ),
            const ListTile(
              leading: CircleAvatar(
                child: Icon(Icons.home),
              ),
              title: Text('我的空间'),
            ),
            const Divider(),
            const ListTile(
              leading: CircleAvatar(
                child: Icon(Icons.people),
              ),
              title: Text('用户中心'),
            ),
            const Divider(),
            ListTile(
              leading: const CircleAvatar(
                child: Icon(Icons.settings),
              ),
              title: const Text('设置中心'),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.pushNamed(context, '/tab_bar_controller');
              },
            ),
            const Divider(),
          ],
        ),
      ),
      endDrawer:Drawer(
        child: Text('右侧侧'),
      ) ,
    );
  }
}