//Copyright 2024 183600
//本项目可能基于chrome-extensions-samples-main修改，并且此文件可能修改了
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({url: 'welcome.html'});
});
