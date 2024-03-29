//Copyright 2024 183600
//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
function displaySpecialCharactersInfo(text) {
  let newlineCount = (text.match(/\n/g) || []).length;
  let spaceCount = (text.match(/ /g) || []).length;

  let newlineCountDiv = document.getElementById("newlineCountxianshi");
  let spaceCountDiv = document.getElementById("spaceCountxianshi");
  newlineCountDiv.innerHTML = "换行符数量: " + newlineCount + "<br>";
  spaceCountDiv.innerHTML = "空格数量: " + spaceCount + "<br>";
}

// 在合适的地方调用 displaySpecialCharactersInfo() 方法，传入相应的文本内容
// 例如，如果你有一个名为 text 的变量存储了文本内容，可以使用以下代码来调用该方法：
// displaySpecialCharactersInfo(text);
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, function(response) {
    try {
      if (response && response.text) {
        let text = response.text;
        let words = tokenizeText(text);
        let wordCount = countWords(words);
        let sortedWordCount = sortWordCount(wordCount);
        //displayWordCount(sortedWordCount);
        displaySpecialCharactersInfo(text);
	console.log(text,words,wordCount,sortedWordCount)

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
	var wc = new Js2WordCloud(document.getElementById('main'))
    wordFreqData =sortedWordCount
var colors = ['#D77127', '#484965', '#2D9D87'];

	function getRandomColor() {
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
	option = {
        //https://ecomfe.github.io/echarts-wordcloud/example/logo.png
        //imageShape:'https://ecomfe.github.io/echarts-wordcloud/example/logo.png',
        tooltip: {
            show: true,
        },
        list: wordFreqData,
        fontSizeFactor:10,
        maxFontSize: 310, //最大字号
        minFontSize: 25, //最小字号
        color: getRandomColor,//random-light/random-dark
colors: colors,
        rotateRatio: 0, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
noDataLoadingOption: {                                  // 无数据提示。
        backgroundColor: '#FFFFFF',
        text: '暂无数据',
        textStyle: {
            color: '#213547',
            fontSize: 14
        }
    }

    }
    wc.setOption(option)
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
    if (wordCount[word] >= 10) { // 只有当数字大于等于 10 时才放入 sortedWordCount 中
      sortedWordCount.push([word, wordCount[word]+100000]);
    }
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


