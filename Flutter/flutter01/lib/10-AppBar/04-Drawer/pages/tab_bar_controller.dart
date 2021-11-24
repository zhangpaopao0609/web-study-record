import 'package:flutter/material.dart';

class TabBarControllerPage extends StatefulWidget {
  const TabBarControllerPage({Key? key}) : super(key: key);

  @override
  _TabBarControllerPageState createState() => _TabBarControllerPageState();
}

class _TabBarControllerPageState extends State<TabBarControllerPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();

    _tabController = TabController(
      vsync: this,
      length: 2
    );
    _tabController.addListener(() {
      print(_tabController.index);
    });
  }

  @override
  void dispose() {
    super.dispose();
    _tabController.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TabBarControllerPage'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: '热销',),
            Tab(text: '推荐',),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          Center(
            child: Text('热销'),
          ),
           Center(
            child: Text('推荐'),
          )
        ],
      ),
    );
  }
}