import 'package:flutter/material.dart';

class AppBarDemoPage extends StatelessWidget {
  const AppBarDemoPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('AppBarDemo'),
          centerTitle: true,
          // backgroundColor: Colors.red,
          // leading: IconButton(
          //   icon: Icon(Icons.menu),
          //   onPressed: () {

          //   },
          // ),
          actions: [
            IconButton(
              icon: Icon(Icons.search),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.settings),
              onPressed: () {},
            )
          ],
          bottom: const TabBar(
            tabs: [
              Tab(text: "热门"),
              Tab(text: "推荐"),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            ListView(
              children: const [
                ListTile(
                  title: Text('第一个 bar'),
                ),
                ListTile(
                  title: Text('第一个 bar'),
                )
              ],
            ),
            ListView(
              children: const [
                ListTile(
                  title: Text('第二个 bar'),
                ),
                ListTile(
                  title: Text('第二个 bar'),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
