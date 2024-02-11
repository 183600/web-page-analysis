//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
// content.js

// 获取页面中的所有文字
function getAllText() {
  let allText = "";
  let allElements = document.getElementsByTagName("*");
  for (let i = 0; i < allElements.length; i++) {
    let element = allElements[i];
    if (element.tagName !== "SCRIPT" && element.tagName !== "STYLE") {
      allText += element.textContent + " ";
    }
  }
  return allText;
}

// 统计词频
function countWords(text) {
  let wordCount = {};
  let words = text.split(/\s+/);
  for (let word of words) {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  }
  return wordCount;
}

// 将词频数据转换为 ECharts 需要的格式
function convertToEChartsData(wordCount) {
  let eChartsData = [];
  for (let word in wordCount) {
    eChartsData.push({
      name: word,
      value: wordCount[word]
    });
  }
  return eChartsData;
}

// 获取页面中的所有文字
let allText = getAllText();

// 统计词频
let wordCount = countWords(allText);

// 将词频数据转换为 ECharts 需要的格式
let wordCloudData = convertToEChartsData(wordCount);

// 将生成的词云图数据发送给扩展的 popup 页面
chrome.runtime.sendMessage({wordCloudData: wordCloudData});
