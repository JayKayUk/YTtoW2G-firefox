"use strict";

console.log("w2g");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  sendResponse({ response: "response" });
});
