//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, function(response) {
        console.log(response)
    try {
      if (response && response.text) {
        let text = response.text;
        let words = tokenizeText(text);
        console.log(words)
        let wordCount = countWords(words);
        console.log(wordCount)
        let sortedWordCount = sortWordCount(wordCount);
        console.log(sortedWordCount)
        displayWordCount(sortedWordCount);
      } else {
        document.getElementById("wordCount").innerText = "No text found on the current page.";
      }
    } catch (error) {
      console.error("Error handling response: " + error.message);
    }
  });
});

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
  for (let item of sortedWordCount) {
    let wordDiv = document.createElement("div");
    wordDiv.innerText = item[0] + ": " + item[1];
    wordCountDiv.appendChild(wordDiv);
  }
}
