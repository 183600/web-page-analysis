// 获取已保存设置
chrome.storage.sync.get(["list"], function (result) {
  if (result.list === undefined || result.list === "undefined") {
    document.getElementById("list").value = "的,和,中,在,或,是";
  } else {
    document.getElementById("list").value = result.list;
  }
});

// 处理表单提交
document.getElementById("save").addEventListener("click", function () {

  // 获取输入值
  var list3 = document.getElementById("list").value;

  // 保存设置
  chrome.storage.sync.set({ list: list3 }, function () {});
});

// 处理按钮点击事件
var button = document.getElementById("guanyu");
button.addEventListener("click", function () {
  // 在点击事件发生后访问链接
  window.location.href = "welcome.html";
});

// 使用 layui
layui.use(["form", "layer"], function () {
  var form = layui.form;
  var layer = layui.layer;

  // checkbox 事件
  form.on("checkbox(demo-checkbox-filter)", function (data) {
    var elem = data.elem; // 获得 checkbox 原始 DOM 对象
    var checked = elem.checked; // 获得 checkbox 选中状态
    var value = elem.value; // 获得 checkbox 值
    var othis = data.othis; // 获得 checkbox 元素被替换后的 jQuery 对象
    chrome.storage.sync.set({ switch: checked }, function () {
      console.log("Switch saved");
    });
    layer.msg("checked 状态: " + elem.checked);
  });
});
