"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log("YTtoW2G installed");
});

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
  browser.tabs.query({ url: "https://w2g.tv/*/room/*" }).then((tabs) => {
    console.log(tabs[0].id);
    browser.tabs
      .sendMessage(tabs[0].id, { message: "check" })
      .then((response) => {
        console.log(response);
      });
  });
});
