(function() {
  // 获取响应元素
  const regexInput = document.getElementById('regex');
  const textInput = document.getElementById('text');
  const runBtn = document.getElementById('run');
  const errBox = document.getElementById('err');
  const resultBox = document.getElementById('result');

  // 绑定点击事件
  runBtn.onclick = function() {
    // 清除错误和结果
    errBox.innerHTML = '';
    resultBox.innerHTML = '';

    // 获取正则和文本
    let text = textInput.value;
    let regex = regexInput.value;

    if(regex == "") {
      errBox.innerHTML = "请输入正则表达式";
    }else if(text == "") {
      errBox.innerHTML = "请输入测试文本";
    }else {
      regex = createRegex(regex);
      if(!regex) return;
      let result, results = [];

      // 没有修饰符g的哈，会死循环
      if(regex.global) {
        while(result = regex.exec(text)) {
          results.push(result);
        }
      }else {
        results.push(regex.exec(text));
      };

      if(results[0] == null) {
        resultBox.innerHTML = "匹配到0个结果！";
        return;
      };

      // 倒序
      for(let i = results.length - 1; i >= 0; i--) {
        const result = results[i];
        const match = result[0];
        const prefix = text.substr(0, result.index);
        const suffix = text.substr(result.index + match.length);
        text = prefix
              + '<span class="info">'
              + match 
              + '</span>'
              + suffix;
      }
      resultBox.innerHTML = "匹配到" + results.length + "个结果： <br>" + text;
    }
  };

  function createRegex(regex) {
    try {
      if(regex[0] == "/"){
        regex = regex.split("/");
        regex.shift();
        const flags = regex.pop();
        regex = regex.join("/");
        regex = new RegExp(regex, flags);
      }else {
        regex = new RegExp(regex, "g");
      };
      return regex;
    } catch (error) {
      errBox.innerHTML = "无效的正则表达式";
      return false;
    };
  }
})();
