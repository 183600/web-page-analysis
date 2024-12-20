// 找到要添加点击事件的按钮元素
alert(
  `以下内容可以在关于中查看
快捷键:
1.退出分析模式：c
2.临时自定义分析相关性的词的最大数量：s
3.查看此元素详细词频（某些情况下用不了）：ed
4.查看此元素所在的列表详细词频（某些情况下用不了）：ld

使用方法:
点击扩展在浏览器顶部的图标可以查看本网页频繁出现的词的词频，这时候会显示整个网页的词频的词云图，再点击选择元素单独分析，再点击网页中的列表的某个列表项可以分析这个列表项和这个列表。

提示:
1.分析网页时可能不会获取到网页所有的文字
2.不保证此软件结果准确

本项目使用MIT许可开源，链接https://gitee.com/qwe12345678/web-page-analysis

本项目使用的一些开源项目:
chrome-extensions-samples-main（使用Apache License 2.0许可）（我在2023年和2024年修改），github地址https://github.com/GoogleChrome/chrome-extensions-samples
layui（使用MIT许可），gitee地址https://gitee.com/layui/

chrome-extensions-samples-main中的一些版权信息:` +
    "`chrome-extensions-samples` are authored by Google and are licensed under the [Apache License, Version 2.0](/LICENSE)." +
    `// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
`,
);
var button = document.getElementById("gitee");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href = "https://gitee.com/qwe12345678";
  window.location.href = "https://gitee.com/qwe12345678";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("gitcode");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href = "https://gitcode.com/m0_49178139";
  window.location.href = "https://gitcode.com/m0_49178139";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("kuan");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href = "https://www.coolapk.com/u/1910517";
  window.location.href = "https://www.coolapk.com/u/1910517";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagitee");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href = "https://gitee.com/qwe12345678/web-page-analysis";
  window.location.href = "https://gitee.com/qwe12345678/web-page-analysis";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagitcode");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href =
    "https://gitcode.com/m0_49178139/web-page-analysis/overview";
  window.location.href =
    "https://gitcode.com/m0_49178139/web-page-analysis/overview";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("qun");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href =
    "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=UbtLs1ReDi94nOH-CVfcXwMuNblBeiYD&authKey=%2BuJcSuT9YZ3z%2Faf7mCxE1W5KBiC7xDJUDZ1JR8qqqQ2Tlv7GSCoo98qX8I6%2B4g11&noverify=0&group_code=854260276";
  window.location.href =
    "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=UbtLs1ReDi94nOH-CVfcXwMuNblBeiYD&authKey=%2BuJcSuT9YZ3z%2Faf7mCxE1W5KBiC7xDJUDZ1JR8qqqQ2Tlv7GSCoo98qX8I6%2B4g11&noverify=0&group_code=854260276";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagiteefirefoxban");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href =
    "https://gitee.com/qwe12345678/web-page-analysis_firefoxban";
  window.location.href =
    "https://gitee.com/qwe12345678/web-page-analysis_firefoxban";
});

// 找到要添加点击事件的按钮元素
var button = document.getElementById("yuanmagitcodefirefoxban");

// 添加点击事件监听器
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href =
    "https://gitcode.com/m0_49178139/web-page-analysis_firefoxban";
  window.location.href =
    "https://gitcode.com/m0_49178139/web-page-analysis_firefoxban";
});
var lista = "的,和,中,在,或,是";
// 获取输入值
var list = lista.split(",");
// 保存设置
chrome.storage.sync.set({ list: list }, function () {
});
// 保存设置
chrome.storage.sync.set({ switch: true }, function () {
});
