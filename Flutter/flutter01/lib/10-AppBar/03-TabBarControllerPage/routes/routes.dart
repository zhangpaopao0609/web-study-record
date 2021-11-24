import 'package:flutter/material.dart';
import '../pages/taps.dart';
// import '../pages/taps/setting_page.dart';
import '../pages/form.dart';
import '../pages/search.dart';
import '../pages/product.dart';
import '../pages/user/login.dart';
import '../pages/user/register_first.dart';
import '../pages/user/register_second.dart';
import '../pages/app_bar_demo.dart';
import '../pages/tab_bar_controller.dart';

final Map<String, Function> routes = {
  '/': (context) => Tabs(),
  '/form': (context, { arguments }) => FormPage(arguments: arguments),
  '/search': (context) => const SearchPage(),
  '/product': (context) => ProductPage(),
  '/login': (context) => LoginPage(),
  '/register_first': (context) => RegisterFirstPage(),
  '/register_second': (context) => RegisterSecondPage(),
  '/app_bar_demo': (context) => AppBarDemoPage(),
  '/tab_bar_controller': (context) => TabBarControllerPage(),
};

Route onGenerateRoute(RouteSettings settings) {
  final String name = settings.name!;
  final Function pageContentBuilder = routes[name]!;
  if (settings.arguments != null) {
    final Route route = MaterialPageRoute(
      builder: (context) => 
        pageContentBuilder(context, arguments: settings.arguments)
    );
    return route;
  } else {
    final Route route = MaterialPageRoute(
      builder: (context) => pageContentBuilder(context)
    );
    return route;
  }
}