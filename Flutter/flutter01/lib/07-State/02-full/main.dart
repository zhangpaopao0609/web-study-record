import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Wrap'),
          ),
          body: HomePage()),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int count = 0;
  List l = [];

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ListView(
        children: [
          Column(
            children: l.map((value) {
              return ListTile(
                title: Text(value["title"]),
                subtitle: Text(value["description"]),
              );
            }).toList(),
          ),
          const SizedBox(height: 50),
          ElevatedButton(
            onPressed: () {
              setState(() {
                count += 1;
                l.add({
                  "title": "我是第 $count 个",
                  "description": "我是第 ${count * 2} 个描述",
                });
              });
            },
            child: const Text("按钮"),
            style: ElevatedButton.styleFrom(
                textStyle: const TextStyle(color: Colors.red)),
          )
        ],
      ),
    );
  }
}


// class _HomePageState extends State<HomePage> {
//   int count = 0;
//   List l = [];

//   @override
//   Widget build(BuildContext context) {
//     return Center(child: 
//       Column(
//         children: [
//           const SizedBox(height: 200),
//           Text("$count"),
//           const SizedBox(height: 50),
//           // ListView.builder(
//           //   itemCount: l.length,
//           //   itemBuilder: (context, index) {
//           //     return ListTile(
//           //       title: Text(l[index]["title"]),
//           //       subtitle: Text(l[index]["description"]),
//           //     );
//           //   },
//           // ),
//           ListView(
//             children: [
//               Column(children: l.map((value){
//                 return ListTile(
//                   title: Text(value["title"]),
//                 );
//               }).toList(),)
//             ]
//           ),
//           const SizedBox(height: 50),
//           ElevatedButton(
//             onPressed: () {
//               setState(() {
//                 count += 1;
//                 l.add({
//                   "title": "我是第 $count 个",
//                   "description": "我是第 $count * 2 个描述",
//                 });
//               });
//             }, 
//             child: const Text("按钮"),
//             style: ElevatedButton.styleFrom(
//               textStyle: const TextStyle(color: Colors.red)
//             ),
//           )
//         ],
//       )
//     );
//   }
// }
