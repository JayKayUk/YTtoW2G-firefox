"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log("YTtoW2G installed");
});

browser.runtime.onMessage.addListener((message) => {
  browser.tabs.query({ url: "https://w2g.tv/*/room/*" }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, message);
  });
});
