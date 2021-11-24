import 'package:flutter/material.dart';

class CategoryPage extends StatefulWidget {
  CategoryPage({Key? key}) : super(key: key);

  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 10,
      child: Scaffold(
        appBar: AppBar(
          title: Row(
            children: const [
              Expanded(
                child: TabBar(
                  isScrollable: true,
                  tabs: [
                    Tab(text: '热销'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                    Tab(text: '推荐'),
                  ],
                ),
              )
            ],
          )
        ),
        body: const TabBarView(
          children: [
            Text('热销'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
            Text('推荐'),
          ],
        ),
      )
      );
  }
}
