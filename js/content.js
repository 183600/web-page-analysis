//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
var pageTitle = document.title;
chrome.runtime.sendMessage({title: pageTitle});
let allText = '';

function getTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    allText += node.textContent.trim() + ' ';
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      getTextNodes(node.childNodes[i]);
    }
  }
}

getTextNodes(document.body);

console.log(allText);

