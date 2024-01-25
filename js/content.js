//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
let allText = document.body.innerText;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getText") {
    sendResponse({text: allText});
  }
});
