//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
function displaySpecialCharactersInfo(text) {
  let specialCharactersDiv = document.getElementById("specialCharactersInfo");
  let specialCharactersInfo = "";

  let newlineCount = (text.match(/\n/g) || []).length;
  let spaceCount = (text.match(/ /g) || []).length;

  specialCharactersInfo += "换行符数量: " + newlineCount + "<br>";
  specialCharactersInfo += "空格数量: " + spaceCount + "<br>";

  specialCharactersDiv.innerHTML = specialCharactersInfo;
}

// 在合适的地方调用 displaySpecialCharactersInfo() 方法，传入相应的文本内容
// 例如，如果你有一个名为 text 的变量存储了文本内容，可以使用以下代码来调用该方法：
// displaySpecialCharactersInfo(text);
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, function(response) {
    try {
      if (response && response.text) {
        let texta = response.text;
let text = texta.replace(/[^\w\s]/gi, '');
        let words = tokenizeText(text);
        let wordCount = countWords(words);
        let sortedWordCount = sortWordCount(wordCount);
        //displayWordCount(sortedWordCount);
        displaySpecialCharactersInfo(text);

        // 将词频用词云图显示出来
        displayWordCloud(sortedWordCount);

      } else {
        document.getElementById("wordCount").innerText = "No text found on the current page.\n请刷新网页，或者切换到除浏览器和扩展意外的页面";
      }
    } catch (error) {
      console.error("Error handling response: " + error.message);
    }
  });
});

// 创建一个新的函数来生成词云图并将其显示在页面上
function displayWordCloud(sortedWordCount) {
  let wordCloudData = [];

  // 将 sortedWordCount 转换为 WordCloud.js 需要的数据格式
  for (let i = 0; i < sortedWordCount.length; i++) {
    let word = sortedWordCount[i][0].trim();
    if (word !== "") {
      let count = sortedWordCount[i][1];
      wordCloudData.push({ text: word, size: count });
    }
  }

  // 使用 WordCloud.js 创建词云图
  WordCloud(document.getElementById('wordcloud'), { list: sortedWordCount 
    width: 600px;
    height: 600px;
  });
}
// ... (其他函数保持不变)

function tokenizeText(text) {
  let segmenter = new Intl.Segmenter("zh", {granularity: "word"});
  let segmenterIterator = segmenter.segment(text);
  let words = [];
  for (let segment of segmenterIterator) {
    words.push(segment.segment);
  }
  return words;
}

function countWords(words) {
  let wordCount = {};
  for (let word of words) {
    if (wordCount[word]) {
      wordCount[word]++;
    } else {
      wordCount[word] = 1;
    }
  }
  return wordCount;
}

function sortWordCount(wordCount) {
  let sortedWordCount = [];
  for (let word in wordCount) {
    sortedWordCount.push([word, wordCount[word]]);
  }
  sortedWordCount.sort(function(a, b) {
    return b[1] - a[1];
  });
  return sortedWordCount;
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
