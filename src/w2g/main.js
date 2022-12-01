"use strict";

console.log("w2g");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const cookie = {
    sharedId: document.cookie.match(/_sharedID=.+?;/g).toString(),
    w2glang: document.cookie.match(/w2glang=.+?;/g).toString(),
    w2gintro: document.cookie.match(/w2g_init=.+?;/g).toString(),
    w2ginit: document.cookie.match(/w2g_intro=.+?;/g).toString(),
  };

  const roomURL = document
    .getElementById("w2g-top-inviteurl")
    .children[0].value.split("/")[3];

  const playlistURL = document.getElementsByClassName(
    "dropdown fluid selection ui"
  )[0].value;

  fetch(
    `https://api.w2g.tv/rooms/${roomURL}/playlists/${playlistURL}/playlist_items/sync_update`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: `{"add_items":[{"url":"${message.url}","title":"${message.title}","thumb":"${message.thumb}"}]}`,
    }
  ).then((fetchResponose) => {
    if (!fetchResponose.ok) {
      console.log(fetchResponose);
    }
  });
});
