//     Copyright 2024 183600
//     本项目基于chrome-extensions-samples-main修改，并且此文件在修改了，以下为原项目的版权声明
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
// var array = [];
// var allText = "";
// let allTextleiji = "";
// function onload() {
//   var tags = document.body.getElementsByTagName("*");
//   for (var i = 0; i < tags.length; i++) {
//     if (
//       tags[i].nodeName != "SCRIPT" && tags[i].nodeName != "STYLE" &&
//       tags[i].nodeName != "TEXTAREA"
//     ) {
//       //过滤script、style和textarea标签
//       array.push(getText(tags[i]));
//     }
//   }
// }
// var getText = function (dom) {
//   allText = dom.innerHTML;
//   allText = allText.replace(/<\/?.+?\/?>/g, ""); //去除标签
//   allText = allText.replace(/\s+/g, ""); //去除空格
//   if (allText == "") return;
//   allTextleiji += allText;
//   return allText;
// };
// onload();
//点击扩展在浏览器顶部的图标可以查看本网页频繁出现的词的词频，点击选择元素单独分析，再点击网页中的列表的某个列表项可以分析这个列表项和这个列表。
isTheSidebarOpen = false;
analyzeAfterClickingTheListItem = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getText") {
    let allText = document.body.innerText;
    sendResponse({ text: allText });
  } else if (request.action === "selectElement") {
    analyzeAfterClickingTheListItem = true;
    // 添加事件监听器到整个文档
    document.addEventListener("click", function (event) {
      if (isTheSidebarOpen) {
        close2(sidebar, elements);
      }
      var clickedElement = event.target;
      if (clickedElement === document.getElementById("close8r4ufhx9v")) {}
      else {
        var textContent = clickedElement.textContent ||
          clickedElement.innerText;
        // console.log(textContent);

        var id = clickedElement.id;
        var className = clickedElement.className;
        // console.log(className);
        text2 = "";
        textContentTable = [];
        wordCountcishuTable = [];
        wordszong = [];

        // var elements = document.getElementsByClassName(className);
        elements = findElementsWithSameAttributes(clickedElement);
        // console.log(elements);
        // elements是一个HTMLCollection，你可以像数组一样遍历它
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.border = "3px solid black";
          // 对每个元素进行操作
          var textContent2 = elements[i].textContent || elements[i].innerText;
          text2 = text2 + " " + textContent2;
          let words = tokenizeText(textContent2);
          let wordCountcishu = countWords2(words);
          wordCountcishuTable.push(wordCountcishu);
          textContentTable.push(textContent2);
          wordszong = wordszong.concat(words);
        }

        chrome.storage.sync.get(["switch", "list"], function (result) {
          if (result.switch) {
            text = filterSymbols(textContent);
          }
          let words = tokenizeText(text);
          // console.log(result.list);
          if (result.hasOwnProperty("list")) {
            var mywords2 = filterWords(words, result.list);
          } else {
            let mywords2 = words;
          }
          let wordCountcishu = countWords(mywords2);
          let wordCount = wordCountcishu[0];
          delete wordCount[" "];
          // console.log(wordCount);
          let sortedWordCount = sortWordCount(wordCount);
          sortedWordCount.sort((a, b) => b[1] - a[1]);
          let wordCount2 = "";
          for (let i = 0; i < 5; i++) {
            wordCount2 += sortedWordCount[i][0] + " ";
          }

          if (result.switch) {
            text = filterSymbols(text2);
          }
          let words2 = tokenizeText(text);
          // console.log(result.list);
          if (result.hasOwnProperty("list")) {
            var mywords3 = filterWords(words2, result.list);
          } else {
            let mywords3 = words2;
          }
          let wordCountcishu2 = countWords(mywords3);
          let wordCount3 = wordCountcishu2[0];
          delete wordCount3[" "];
          // console.log(wordCount3);
          let sortedWordCount2 = sortWordCount(wordCount3);
          sortedWordCount2.sort((a, b) => b[1] - a[1]);
          let wordCount4 = "";
          for (let i = 0; i < 5; i++) {
            wordCount4 += sortedWordCount2[i][0] + " ";
          }
          // console.log(wordCount4);
          // console.log(sortedWordCount2);
          // wordCountcishuTable2 = [];
          // console.log(wordCountcishuTable);
          // wordCountcishuTable.forEach((wordFrequencyOfListItems) => {
          //   console.log(wordFrequencyOfListItems);
          //   console.log(findWords(wordFrequencyOfListItems));
          //   findWords(wordFrequencyOfListItems).forEach((item2) => {
          //     wordCountcishuTable2[item2] = wordFrequencyOfListItems[item2];
          //   });
          //   // wordCountcishuTable2.push(...wordFrequencyOfListItems);
          //   // wordCountcishuTable2 = wordCountcishuTable2.concat(
          //   //   wordFrequencyOfListItems,
          //   // );
          // });
          // console.log(wordCountcishuTable2);
          // wordCountcishuTable2.sort((a, b) => b - a);
          // console.log(wordCountcishuTable);
          // console.log(wordCountcishuTable2);
          // wordCountcishuTable2 = wordCountcishuTable2.slice(0, 5);
          // console.log(wordCountcishuTable2);
          // let wordCount4 = "";
          // wordCountcishuTable2.forEach((word) => {
          //   wordCount4 += word + " ";
          // });
          // console.log(wordCount4);

          similarities = calculateWordSimilarities(
            wordCountcishuTable,
            8,
            // wordszong,
          ); // 计算相关性
          // console.log(similarities);

          function createSidebar() {
            // 创建侧栏容器
            sidebar = document.createElement("div");
            isTheSidebarOpen = true;
            sidebar.style.cssText = `
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 300px;
    height: 100%;
    background-color: white;
    padding: 16px;
    box-sizing: border-box;
    z-index: 9999;
  `;
            //         sidebar.style.cssText = `
            //   position: fixed;
            //   width: 300px;
            //   height: 100%;
            //   background-color: white;
            //   padding: 16px;
            //   box-sizing: border-box;
            //   z-index: 9999;
            // `;
            // const similaritiesText = Object.entries(similarities).map((
            //   [pair, correlation],
            // ) => `${pair}: ${correlation.toFixed(2)}`).join("<br/>");
            sidebar.innerHTML = `
<p style="font-size: 16px;color: #2e63ff;" id="close8r4ufhx9v">关闭</p>
    <p style="font-size: 20px;color: rgba(255, 0, 0, 0);">分割</p>
    <span style="font-size: 24px;">此元素</span>
    <p style="font-size: 10px;color: rgba(255, 0, 0, 0);">分割</p>
<p style="font-size: 16px;">词频前五</p>
    <p style="font-size: 3px;color: rgba(255, 0, 0, 0);">分割</p>
    <p style="font-size: 18px;">${wordCount2}</p>
    <p style="font-size: 25px;color: rgba(255, 0, 0, 0);">分割</p>
    <span style="font-size: 24px;">此元素所在的列表</span>
    <p style="font-size: 10px;color: rgba(255, 0, 0, 0);">分割</p>
<p style="font-size: 16px;">词频前五</p>
    <p style="font-size: 3px;color: rgba(255, 0, 0, 0);">分割</p>
    <p style="font-size: 18px;">${wordCount4}</p>
    <p style="font-size: 12px;color: rgba(255, 0, 0, 0);">分割</p>
<p style="font-size: 16px;">各列表项词频相关性</p>
    <p style="font-size: 3px;color: rgba(255, 0, 0, 0);">分割</p>
<p style="font-size: 13px;">此功能组合出一对词，会获取两个词在各个列表的词频，再获取相关性</p>
<p style="font-size: 13px;">格式：第一个词(在多少个列表项中有这个词)-第二个词(在多少个列表项中有这个词) 相关性</p>
    <p style="font-size: 3px;color: rgba(255, 0, 0, 0);">分割</p>
            <pre style="font-size: 15px;" id="similarities138ru">${similarities}</pre>
  `;
            {/* <div id="tableContainer"></div> */}
            {/* <button id="selectWords" type="button">选择一组词分析相关性</button> */}
            //     <div style="display: inline-block;">
            //     <div style="width: 42px;">
            //           <button id="close" type="button">×</button>
            // </div>
            //     <div>
            {/* </div> */}
            {/* </div> */}
            document.body.appendChild(sidebar);
            document.getElementById("close8r4ufhx9v").addEventListener(
              "click",
              function () {
                close2(sidebar, elements);
                analyzeAfterClickingTheListItem = false;
              },
            );
            similarities138ru = document.getElementById(
              "similarities138ru",
            );
            similarities138ru.style.cssText = `
  /* 设置最大高度 */
  max-height: 268px;
  /* 设置滚动条样式 */
  overflow: auto;
               `;
            //           let close = document.getElementById("close");
            //           close.style.cssText = `
            //   background-color: #2e63ff;
            // color: #ffffff;
            //   padding: 10px 20px; /* 内边距 */
            //   border: none; /* 无边框 */
            //   border-radius: 10px; /* 圆角 */
            //   text-align: center; /* 文字居中 */
            //   font-size: 16px; /* 字体大小 */
            //   width: 100%; /* 按钮宽度填满父容器 */
            //   `;
          }

          // 注入侧栏
          createSidebar();
          // 监听键盘按下事件
          document.addEventListener("keydown", function (event) {
            if (event.key === "c") {
              // 阻止默认事件（例如，防止浏览器保存页面）
              event.preventDefault();

              close2(sidebar, elements);
              analyzeAfterClickingTheListItem = false;
            } else if (event.key === "s") {
              // 阻止默认事件（例如，防止浏览器保存页面）
              event.preventDefault();

              var userInput = prompt(
                "输入分析相关性的词的最大数量(会挑选词频最大的几个词)：",
                "8",
              );
              if (userInput != null) {
                similarities = calculateWordSimilarities(
                  wordCountcishuTable,
                  userInput,
                  // wordszong,
                ); // 计算相关性
                similarities138ru = document.getElementById(
                  "similarities138ru",
                );
                // 设置<pre>元素显示的文本
                similarities138ru.textContent = similarities;
              }
            } else if (event.key === "l") {
              shifoanleljian = true;
            } else if (event.key === "e") {
              shifoanleejian = true;
            } else if (event.key === "d") {
              if (shifoanleejian) {
                alert("此元素详细词频" + displayWordCount(sortedWordCount));
              } else if (shifoanleljian) {
                alert(
                  "此元素所在的列表详细词频" +
                    displayWordCount(sortedWordCount2),
                );
              }
            }
          });
          // console.log(456);
        });

        // 检查并输出id和class
        if (id) {
          console.log("Clicked element ID:", id);
        } else {
          console.log("Clicked element has no ID");
        }

        if (className) {
          console.log("Clicked element class:", className);
        } else {
          console.log("Clicked element has no class");
        }
      }
    });
  }
  return true;
});
function tokenizeText(text) {
  let segmenter = new Intl.Segmenter("zh", { granularity: "word" });
  let segmenterIterator = segmenter.segment(text);
  let words = [];
  for (let segment of segmenterIterator) {
    words.push(segment.segment);
  }
  // console.log(words);
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
function countWords2(words) {
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
    if (wordCount[word] >= 0) {
      // 只有当数字大于等于 10 时才放入 sortedWordCount 中
      sortedWordCount.push([word, wordCount[word]]); //+ 100000
    }
  }
  sortedWordCount.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortedWordCount;
}

// 过滤单词函数
function filterWords(words, filterList) {
  return words.filter((word) => !filterList.includes(word));
}

function filterSymbols(text) {
  // console.log(text);
  return text.replace(/[^\w\s\u4e00-\u9fa5]/g, ""); // 过滤掉所有非字母、非空格和非中文字符
}

function pearsonCorrelationCoefficient(x, y) {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }

  let n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
    sumYY += y[i] * y[i];
  }

  let numerator = n * sumXY - sumX * sumY;
  let denominator = Math.sqrt(
    (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
  );

  if (denominator === 0) {
    return 0; //Correlation coefficient is not defined in this case
  }

  return numerator / denominator;
}

// 计算 Pearson 相关系数
function calculatePearsonCorrelation(x, y) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY),
  );

  return denominator === 0 ? 0 : numerator / denominator; // 防止除以零
}
function pearsonCorrelationCoefficient(x, y) {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }

  let n = x.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumXX += x[i] * x[i];
    sumYY += y[i] * y[i];
  }

  let numerator = n * sumXY - sumX * sumY;
  let denominator = Math.sqrt(
    (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
  );

  if (denominator === 0) {
    return 0; //Correlation coefficient is not defined in this case
  }

  return numerator / denominator;
}
// 定义一个函数来找到特定的词
function findWords(array) {
  var foundWords = [];

  // 遍历数组
  array.forEach((item) => {
    for (var key in item) {
      // 将找到的词添加到结果数组中
      foundWords.push(key);
    }
  });

  return foundWords;
}

// 计算词频相关性
function calculateWordSimilarities(wordCountTables, numberOfIterations2) {
  const words = findWords(wordCountTables); // 获取所有词
  // filter = []; // 获取所有词
  // for (let word in wordCount3) {
  //   value = wordCount3[word];
  //   console.log(word, value);
  //   if (value === 1) {
  //     filter.push(word);
  //   }
  // }
  // console.log(filter);
  words.sort(function (a, b) {
    return b - a;
  });
  // console.log(words, wordCountTables);
  const similarities = {};
  if (words.length > numberOfIterations2 - 1) {
    numberOfIterations = numberOfIterations2;
  } else {
    numberOfIterations = words.length;
  }
  // wordCountTables.forEach(function (element) {
  //   console.log(element);
  // });

  for (let i = 0; i < numberOfIterations; i++) {
    for (let j = i + 1; j < numberOfIterations; j++) {
      const word1 = words[i];
      const word2 = words[j];
      // console.log(filter.includes(word1));
      // if (!filter.includes(word1) || !filter.includes(word2)) {
      const x = wordCountTables.map((table) => table[word1] || 0); // 词1的频率
      const y = wordCountTables.map((table) => table[word2] || 0); // 词2的频率

      // console.log(x, y);
      // console.log(word1, word2);
      const correlation = pearsonCorrelationCoefficient(x, y).toFixed(2);
      occurrence1 = 0;
      x.forEach(function (value) {
        if (value !== 0) {
          occurrence1++;
        }
      });
      occurrence2 = 0;
      y.forEach(function (value) {
        if (value !== 0) {
          occurrence2++;
        }
      });
      similarities[
        `${word1}(${occurrence1})-${word2}(${occurrence2})`
      ] = correlation; // 存储相关性
      // similarities[`${word1}-${word2}`] = correlation; // 存储相关性
      // similarities[
      //   `${word1}(共${wordCount3[word1]}次)-${word2}(共${
      //     wordCount3[word1]
      //   }次)`
      // ] = correlation; // 存储相关性
      // }
    }
  }
  // 将similarities对象转换为数组
  let similaritiesArray = Object.entries(similarities);

  // 对数组进行排序，根据相关系数从大到小排序
  similaritiesArray.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

  // 现在similaritiesArray已经按照相关系数从大到小排序
  // console.log(similaritiesArray);

  // 如果需要将排序后的数组转换回对象
  let sortedSimilarities = {};
  similaritiesArray.forEach(([key, value]) => {
    sortedSimilarities[key] = value;
  });
  // console.log(sortedSimilarities);
  // sortedSimilaritiesstring=Object.entries(similarities).map(([key, words]) => `${key}: ${words.join(', ')}`).join('<br>');
  sortedSimilaritiesstring = Object.entries(sortedSimilarities).map((
    [words, correlation],
  ) => `${words}: ${correlation}`).join("\n");
  // console.log(sortedSimilaritiesstring);
  return sortedSimilaritiesstring;
}
function findElementsWithSameAttributes(targetElement) {
  // console.log(targetElement.localName);
  // 获取目标元素的所有属性
  const targetAttributes = targetElement.attributes;
  const sameAttrsElements = [];

  // console.log(targetAttributes);
  // 获取这个元素的标签名
  var tagName = targetElement.localName.toLowerCase(); // 将标签名转换为小写

  // 使用getElementsByTagName方法查找所有相同类型的元素
  var elementsOfType = document.getElementsByTagName(tagName);
  // console.log(elementsOfType);
  // 遍历元素
  for (var element of elementsOfType) {
    // 检查元素属性的数量是否相同
    if (element.attributes.length === targetAttributes.length) {
      let attrsMatch = true;

      // 遍历目标元素的所有属性
      for (let i = 0; i < targetAttributes.length; i++) {
        const targetAttr = targetAttributes[i];

        // 检查当前元素是否有相同的属性名和属性值
        if (
          !element.hasAttribute(targetAttr.name) ||
          element.getAttribute(targetAttr.name) !== targetAttr.value
        ) {
          attrsMatch = false;
          break;
        }
      }

      // 如果所有属性都匹配，则添加到结果数组中
      if (attrsMatch) {
        sameAttrsElements.push(element);
      }
    }
  }

  return sameAttrsElements;
}
function close2(sidebar, elements) {
  // elements是一个HTMLCollection，你可以像数组一样遍历它
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.border = "none";
  }
  sidebar.remove();
  isTheSidebarOpen = false;
}

// 使用示例
// const targetElement = document.querySelector("#yourElementId"); // 替换为目标元素的ID
// const matchingElements = findElementsWithSameAttributes(targetElement);
// console.log(matchingElements); // 输出匹配的元素
function displayWordCount(sortedWordCount) {
  let wordCountOutput = "";

  for (let i = 0; i < sortedWordCount.length; i++) {
    let word = sortedWordCount[i][0]; //.trim(); 使用 trim() 方法去掉单词两端的空格
    if (word !== "") {
      let count = sortedWordCount[i][1];
      wordCountOutput += word + ": " + count + "\n";
    }
  }
  return wordCountOutput;
}
