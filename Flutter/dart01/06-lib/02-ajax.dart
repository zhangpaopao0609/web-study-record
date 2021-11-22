import 'dart:convert';
import 'dart:io';

getDataFromZhihuAPI() async {
  final httpClient = new HttpClient();
  final uri = new Uri.http('news-at.zhihu.com', '/api/3/stories/latest');
  final request = await httpClient.getUrl(uri);
  final response = await request.close();
  return await response.transform(utf8.decoder).join();
}

void main(List<String> args) async {
  final result = await getDataFromZhihuAPI();
  print(result);
}

