"use strict";

function sanitizeString(text) {
  return text.replace(/['"`/\\]/g, "");
}

function getData() {
  const videoURL = window.location.href;
  const thumbnailSource = document.querySelector('link[as="image"]').href;
  const videoTitle = sanitizeString(
    document.querySelector(
      "h1.ytd-watch-metadata > yt-formatted-string:nth-child(1)"
    ).textContent
  );
  console.log(window.location.href);

  const data = {
    videoURL,
    thumbnailSource,
    videoTitle,
  };

  console.log(data);
  return data;
}

function sendMsgToBgScript(data) {
  browser.runtime.sendMessage({
    url: data.videoURL,
    thumb: data.thumbnailSource,
    title: data.videoTitle,
  });
}

const observerOptions2 = { childList: true, subtree: true };
const observerTarget2 = document;
const observer2 = new MutationObserver(() => {
  if (document.querySelector("#YTtoW2G-videoPage")) {
    console.log("znalazlem1");
    observer2.disconnect();
    console.log("znalazlem2");
    return;
  }

  if (!document.querySelector("yt-button-shape#button-shape")) return;

  console.log("lol");

  const dotsButton = document.querySelector("yt-button-shape#button-shape");

  console.log(dotsButton);

  const buttonHTMLstring = `<button id='YTtoW2G-videoPage'><img src='${browser.runtime.getURL(
    "icons/main-icon-2048.png"
  )}'></button>`;

  dotsButton.insertAdjacentHTML("afterend", buttonHTMLstring);

  const button = document.getElementById("YTtoW2G-videoPage");
  button.addEventListener("click", () => {
    console.log("dziala");
    sendMsgToBgScript(getData());
  });

  observer2.disconnect();
});
observer2.observe(observerTarget2, observerOptions2);
