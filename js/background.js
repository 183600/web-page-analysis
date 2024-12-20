//     Copyright 2024 183600
//     本项目基于chrome-extensions-samples-main修改，并且此文件可能修改了，以下为原项目的版权声明
//  Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: "welcome.html" });
});
// chrome.action.onClicked.addListener((tab) => {
//   chrome.sidePanel.setOptions({ matchAboutPages: true }); // 选项可按需更改
//   chrome.sidePanel.setHtml({ file: "sidebar.html" }); // 指定要加载的HTML文件
// });
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "open_sidebar") {
//     chrome.sidePanel.setHtml({ file: "sidebar.html" });
//   }
// });
chrome.runtime.onMessage.addListener((message, sender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === "open_side_panel") {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab.id,
        path: "sidebar.html",
        enabled: true,
      });
    }
  })();
});

// chrome.runtime.onInstalled.addListener(() => {
//   // chrome.tabs.create({ url: "welcome.html" });
//   chrome.contextMenus.create({
//     id: "myContextMenu",
//     title: "选择元素",
//     contexts: ["all"], // 可以是 "all", "page", "selection", "link", "image", "video", "audio"
//   });
// });
// chrome.contextMenus.onClicked.addListener(
//   function (info, tab, a, b, c, d, e, f, g) {
//     console.log(info, tab, a, b, c, d, e, f, g);
//     // if (info.menuItemId == "yourMenuItemId") {
//     // 执行点击菜单项后的操作
//     // 假设你想发送消息到当前活跃的标签页
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       // 确保查询到了标签页
//       // if (Array.isArray(tabs) && tabs.length > 0) {
//       var tab = tabs[0];
//       // 发送消息到这个标签页
//       chrome.tabs.sendMessage(tab.id, {
//         action: "getElement",
//         width: tab.width,
//         height: tab.height,
//       }, function (response) {
//       });
//       // }
//     });
//     // }
//   },
// );
//
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message, sender, sendResponse);
//   //
//   // // 处理消息
//   // const response = { status: "success", data: "Processed data" };
//   //
//   // // 发送响应回content.js
//   // sendResponse(response);
//   //
//   // 注意：在Manifest V3中，service worker不能保持长时间的监听，需要尽快返回结果
//   return true; // 表示异步发送响应
// });
