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
                    Tab(text: '日期'),
                    Tab(text: '三方日期'),
                    Tab(text: 'swiper'),
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
        body: TabBarView(
          children: [
            Column(
              children: [
                ElevatedButton(
                  child: Text("点击跳转到日期页面"),
                  onPressed: () => Navigator.of(context).pushNamed("/date_demo"),
                )
              ],
            ),
            Column(
              children: [
                ElevatedButton(
                  child: Text("点击跳转到三方库日期页面"),
                  onPressed: () => Navigator.of(context).pushNamed("/date_time_picker"),
                )
              ],
            ),
            Column(
              children: [
                ElevatedButton(
                  child: Text("点击跳转到Swiper页面"),
                  onPressed: () => Navigator.of(context).pushNamed("/swiper_demo"),
                )
              ],
            ),
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
