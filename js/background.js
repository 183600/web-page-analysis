//Copyright 2024 183600
//本项目基于chrome-extensions-samples-main修改，并且此文件修改了
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
