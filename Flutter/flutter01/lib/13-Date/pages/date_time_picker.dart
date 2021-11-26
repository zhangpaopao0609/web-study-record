import 'package:date_time_picker/date_time_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

class DateTimePickerPage extends StatefulWidget {
  DateTimePickerPage({Key? key}) : super(key: key);

  @override
  _DateTimePickerPageState createState() => _DateTimePickerPageState();
}

class _DateTimePickerPageState extends State<DateTimePickerPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("date_time_picker"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(left: 20, right: 20, top: 10),
        child: MyDateTimePicker(),
      ),
    );
  }
}

class MyDateTimePicker extends StatefulWidget {
  MyDateTimePicker({Key? key}) : super(key: key);

  @override
  _MyDateTimePickerState createState() => _MyDateTimePickerState();
}

class _MyDateTimePickerState extends State<MyDateTimePicker> {
  late TextEditingController _controller1;
  String _valueChanged1 = '';
  String _valueToValidate1 = '';
  String _valueSaved1 = '';

  @override
  void initState() {
    super.initState();
    _controller1 = TextEditingController(text: DateTime.now().toString());
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DateTimePicker(
          type: DateTimePickerType.dateTimeSeparate,
          dateMask: 'd MMM, yyyy',
          controller: _controller1,
          firstDate: DateTime(2000),
          lastDate: DateTime(2100),
          icon: Icon(Icons.event),
          dateLabelText: 'Date',
          timeLabelText: "Hour",
          locale: Locale('zh'),
          selectableDayPredicate: (date) {
            if (date.weekday == 6 || date.weekday == 7) {
              return false;
            }
            return true;
          },
          onChanged: (val) => setState(() => _valueChanged1 = val),
          validator: (val) {
            setState(() => _valueToValidate1 = val ?? '');
            return null;
          },
          onSaved: (val) => setState(() => _valueSaved1 = val ?? ''),
        )
      ],
    );
  }
}
