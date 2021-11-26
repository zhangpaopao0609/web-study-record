import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:date_format/date_format.dart';

class DateDemoPage extends StatefulWidget {
  DateDemoPage({Key? key}) : super(key: key);

  @override
  _DateDemoPageState createState() => _DateDemoPageState();
}

class _DateDemoPageState extends State<DateDemoPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("日期页面"),
      ),
      // body: SingleChildScrollView(
      //   child: MyDate(),
      // ),
      body: MyDate(),
    );
  }
}

class MyDate extends StatefulWidget {
  MyDate({Key? key}) : super(key: key);

  @override
  _MyDateState createState() => _MyDateState();
}

class _MyDateState extends State<MyDate> {
  DateTime _nowDate = DateTime.now();
  TimeOfDay _nowTime = TimeOfDay(hour: 12, minute: 00);

  void _showDatePicker() async {
    final res = await showDatePicker(
      context: context, 
      initialDate: _nowDate, 
      firstDate: DateTime(1980), 
      lastDate: DateTime(2100),
      locale: Locale('zh'),
    );
    setState(() => _nowDate = res ?? _nowDate);
  }

  void _showTimePicker() async {
    final res = await showTimePicker(
      context: context, 
      initialTime: _nowTime,
      builder: (BuildContext context, Widget? child) {
        return Localizations(
          locale: const Locale('zh'),
          child: child,
          delegates: const [
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
          ],
        );
      },
    );
    setState(() => _nowTime = res ?? _nowTime);
  }

  @override
  void initState() {
    super.initState();
    print(formatDate(DateTime.now(), [yyyy, '-', mm, '-', dd]));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            InkWell(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(formatDate(_nowDate, [yyyy, '-', mm, '-', dd])),
                  Icon(Icons.arrow_drop_down)
                ],
              ),
              onTap: _showDatePicker,
            ),
            SizedBox(width: 10,),
            InkWell(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(_nowTime.format(context)),
                  Icon(Icons.arrow_drop_down)
                ],
              ),
              onTap: _showTimePicker,
            ),
          ],
        )
        
        
      ],
    );
  }
}