import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class SwiperDemoPage extends StatelessWidget {
  const SwiperDemoPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Swiper'),
      ),
      body: SingleChildScrollView(
        child: MySwiper(),
      ),
    );
  }
}

class MySwiper extends StatefulWidget {
  MySwiper({Key? key}) : super(key: key);

  @override
  _MySwiperState createState() => _MySwiperState();
}

class _MySwiperState extends State<MySwiper> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('1')
      ],
    );
  }
}