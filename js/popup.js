//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, function(response) {
    let text = response.text;
    let wordCount = countWords(text);
    document.getElementById("wordCount").innerText = JSON.stringify(wordCount);
  });
});

function countWords(text) {
  let words = text.split(/\s+/);
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
