"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log("YTtoW2G installed");
});

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
  browser.tabs.query({ url: "https://w2g.tv/*/room/*" }).then((data) => {
    console.log(data[0].id);
  });
});
