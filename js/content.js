//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
var pageTitle = document.title;
chrome.runtime.sendMessage({title: pageTitle});

