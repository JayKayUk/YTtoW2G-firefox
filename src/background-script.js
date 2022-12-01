"use strict";

browser.runtime.onInstalled.addListener(() => {
  console.log("YTtoW2G installed");
});

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
  browser.tabs.query({ url: "https://w2g.tv/*/room/*" }).then((tabs) => {
    console.log(tabs[0].id);
    browser.tabs.sendMessage(tabs[0].id, { message });
  });
});

// fetch(
//   "https://api.w2g.tv/rooms/gcmxwjue1f9feg1zru/playlists/0b8ast7zmgrr91y33ue2cfew16rpjg0u/playlist_items/sync_update",
//   {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: '{"add_items":[{"url":"//www.youtube.com/watch?v=27P-3hWwqSo","title":"Er war die erste Nummer 1 | Smitty Werben Jagger Man Jensen","thumb":"https://i.ytimg.com/vi/27P-3hWwqSo/mqdefault.jpg"}]}',
//   }
// );
