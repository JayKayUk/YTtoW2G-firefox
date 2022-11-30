"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log("YTtoW2G installed");
});

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
});
