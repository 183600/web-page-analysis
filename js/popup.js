//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
function getSource(){return "<html>"+document.getElementsByTagName('html')[0].innerHTML+"</html>";};
    var str = getSource();
console.log(str);
alert(str);
var zuizhongstr = new Array();
    const segmenterJa = new Intl.Segmenter("zh-CN", { granularity: "word" });
    const segments = segmenterJa.segment(str);
marray = Array.from(segments)
// 创建按钮
var buttonContainer = document.getElementById('buttonContainer');
for (let index = 0; index < marray.length; index++) {
  var button = document.createElement('button');
  button.innerHTML = marray[index].segment;
      button.style.backgroundColor = 'lightblue';
  buttonContainer.appendChild(button);

// 添加点击事件
var buttons = document.getElementsByTagName('button');
for (var j = 0; j < buttons.length; j++) {
  buttons[j].addEventListener('click', function() {
if (this.innerHTML === '复制') {
console.log(this.innerHTML);
    } else if (this.innerHTML === '搜索'){
console.log(this.innerHTML);
    } else {
if (this.style.backgroundColor === 'lightblue') {
      this.style.backgroundColor = 'royalblue';
      this.style.color = 'white';
zuizhongstr[zuizhongstr.length] = this.innerHTML;
    console.log(zuizhongstr.length,this.innerHTML);
    console.log(zuizhongstr);
    } else {
      this.style.backgroundColor = 'lightblue';
      this.style.color = '#000000';
zuizhongstr[zuizhongstr.length] = "";
    }
    }
  });
};
var sousuoButton = document.getElementById('sousuoButton');
sousuoButton.addEventListener('click', function() {
var zuizhongstr2 = "";
for (var j = 0; j < zuizhongstr.length; j++) {
zuizhongstr2 = zuizhongstr2 + zuizhongstr[j]
};
console.log(zuizhongstr2 , zuizhongstr);
chrome.tabs.create({url: "https://www.baidu.com/s?ie=utf-8&wd=" + zuizhongstr2});
});
var fuzhiButton = document.getElementById('fuzhiButton');
fuzhiButton.addEventListener('click', function() {
var zuizhongstr2 = "";
for (var j = 0; j < zuizhongstr.length; j++) {
zuizhongstr2 = zuizhongstr2 + zuizhongstr[j]
};
console.log(zuizhongstr2 , zuizhongstr);
navigator.clipboard.writeText(zuizhongstr2);
});
});
