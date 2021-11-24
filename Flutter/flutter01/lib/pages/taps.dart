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
    );
  }
}