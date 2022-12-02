"use strict";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const roomURL = document
    .getElementById("w2g-top-inviteurl")
    .children[0].value.split("/")[3];

  const playlistURL = document.getElementsByClassName(
    "dropdown fluid selection ui"
  )[0].value;

  const code = `fetch(
    "https://api.w2g.tv/rooms/${roomURL}/playlists/${playlistURL}/playlist_items/sync_update",
    {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: '{"add_items":[{"url":"${message.url}","title":"${message.title}","thumb":"${message.thumb}"}]}',
    }
  ).then((fetchResponose) => {
    if (!fetchResponose.ok) {
      console.log(fetchResponose);
    }
  });`;

  const script = document.createElement("script");
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
});
