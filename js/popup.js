//     Copyright 2024 183600
//     本项目基于chrome-extensions-samples-main修改，并且此文件修改了，以下为原项目的版权声明
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
function displaySpecialCharactersInfo(text, cishu) {
  let newlineCount = (text.match(/\n/g) || []).length;
  let spaceCount = (text.match(/ /g) || []).length;

  let newlineCountDiv = document.getElementById("newlineCountxianshi");
  let spaceCountDiv = document.getElementById("spaceCountxianshi");
  let cishuDiv = document.getElementById("cishuxianshi");
  newlineCountDiv.innerHTML = "换行符数量: " + newlineCount + "<br>";
  spaceCountDiv.innerHTML = "空格数量: " + spaceCount + "<br>";
  cishuDiv.innerHTML = "总词数: " + cishu + "<br>";
}

// 在合适的地方调用 displaySpecialCharactersInfo() 方法，传入相应的文本内容
// 例如，如果你有一个名为 text 的变量存储了文本内容，可以使用以下代码来调用该方法：
// displaySpecialCharactersInfo(text);
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "getText" },
    function (response) {
      try {
        if (response && response.text) {
          chrome.storage.sync.get(["switch", "list"], function (result) {
            let text = response.text;
            if (result.switch) {
              text = filterSymbols(text);
            }
            let words = tokenizeText(text);
            // 过滤文字功能
            if (result.hasOwnProperty("list")) {
              var mywords2 = filterWords(words, result.list);
            } else {
              let mywords2 = words;
            }
            let wordCountcishu = countWords(mywords2);
            let wordCount = wordCountcishu[0];
            let cishu = wordCountcishu[1];
            let sortedWordCount = sortWordCount(wordCount);
            // displayWordCount(sortedWordCount);
            displaySpecialCharactersInfo(text, cishu);

            // 将词频用词云图显示出来
            displayWordCloud(sortedWordCount);
          });
        }
      } catch (error) {
        console.error("Error handling response: " + error.message);
      }
    },
  );
});

// 创建一个新的函数来生成词云图并将其显示在页面上
function displayWordCloud(sortedWordCount) {
  var wc = new Js2WordCloud(document.getElementById("main"));
  wordFreqData = sortedWordCount;
  var colors = ["#D77127", "#484965", "#2D9D87"];

  function getRandomColor() {
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  option = {
    // https://ecomfe.github.io/echarts-wordcloud/example/logo.png
    // imageShape:'https://ecomfe.github.io/echarts-wordcloud/example/logo.png',
    tooltip: {
      show: true,
    },
    list: wordFreqData,
    fontSizeFactor: 10,
    maxFontSize: 310, // 最大字号
    minFontSize: 25, // 最小字号
    color: getRandomColor, // random-light/random-dark
    colors: colors,
    rotateRatio: 0, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
    noDataLoadingOption: {
      // 无数据提示。
      backgroundColor: "#FFFFFF",
      text: "暂无数据",
      textStyle: {
        color: "#213547",
        fontSize: 14,
      },
    },
  };
  wc.setOption(option);
}
// ... (其他函数保持不变)

// 过滤单词函数
function filterWords(words, filterList) {
  return words.filter((word) => !filterList.includes(word));
}

// 显示过滤后的单词
function displayFilteredWords(filteredWords) {
  let filteredWordsDiv = document.getElementById("filteredWords");
  let filteredWordsOutput = "";

  for (let word of filteredWords) {
    filteredWordsOutput += word + "<br>";
  }

  filteredWordsDiv.innerHTML = filteredWordsOutput;
}
function tokenizeText(text) {
  let segmenter = new Intl.Segmenter("zh", { granularity: "word" });
  let segmenterIterator = segmenter.segment(text);
  let words = [];
  for (let segment of segmenterIterator) {
    words.push(segment.segment);
  }
  return words;
}

function countWords(words) {
  let wordCount = {};
  let cishu = 0;
  for (let word of words) {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
    cishu++;
  }
  let wordCountcishu = [wordCount, cishu];
  return wordCountcishu;
}

function sortWordCount(wordCount) {
  let sortedWordCount = [];
  for (let word in wordCount) {
    if (wordCount[word] >= 0) {
      // 只有当数字大于等于 10 时才放入 sortedWordCount 中
      sortedWordCount.push([word, wordCount[word] + 100000]);
    }
  }
  sortedWordCount.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortedWordCount;
}
function filterSymbols(text) {
  return text.replace(/[^\w\s\u4e00-\u9fa5]/g, ""); // 过滤掉所有非字母、非空格和非中文字符
}

function displayWordCount(sortedWordCount) {
  let wordCountDiv = document.getElementById("wordCount");
  let wordCountOutput = "";

  for (let i = 0; i < sortedWordCount.length; i++) {
    let word = sortedWordCount[i][0].trim(); // 使用 trim() 方法去掉单词两端的空格
    if (word !== "") {
      let count = sortedWordCount[i][1];
      wordCountOutput += word + ": " + count + "<br>";
    }
  }

  wordCountDiv.innerHTML = wordCountOutput;
}
// 添加点击事件监听器
selectElement.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "selectElement" },
      function (response) {
        try {
        } catch (error) {
          console.error("Error handling response: " + error.message);
        }
      },
    );
  });
  // return true;
});
