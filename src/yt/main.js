"use strict";

function sanitizeString(text) {
  return text.replace(/['"`/\\]/g, "");
}

function addButton(e) {
  const videoTile = e.currentTarget;

  if (videoTile.querySelector("#YTtoW2G")) {
    return;
  }

  const buttonHTMLstring = `<button id='YTtoW2G'><img src='${browser.runtime.getURL(
    "icons/main-icon-2048.png"
  )}'></button>`;
  videoTile.insertAdjacentHTML("beforeend", buttonHTMLstring);

  addButtonListener(videoTile);
}

function addButtonListener(videoTile) {
  const button = document.getElementById("YTtoW2G");
  button.addEventListener("click", () => {
    sendMsgToBgScript(getDataFromTile(videoTile));
  });
}

function getDataFromTile(videoTile) {
  const videoURL = videoTile.querySelector("#thumbnail").href;
  const thumbnailSource = videoTile.querySelector("img").src;
  const videoTitle = sanitizeString(
    videoTile.querySelector("#video-title")?.title ||
      videoTile.querySelector("#video-title-link")?.title ||
      videoTile.querySelector("#video-title")?.textContent
  );
  const data = {
    videoURL,
    thumbnailSource,
    videoTitle,
  };
  return data;
}

function sendMsgToBgScript(data) {
  browser.runtime.sendMessage({
    url: data.videoURL,
    thumb: data.thumbnailSource,
    title: data.videoTitle,
  });
}

function removeButton(e) {
  const buttonToRemove = document.getElementById("YTtoW2G");
  e.currentTarget.removeChild(buttonToRemove);
}

const observerOptions = { childList: true, subtree: true };
const observerTarget = document;
const observer = new MutationObserver(() => {
  const videos = [];
  videos.push(...document.getElementsByTagName("ytd-video-renderer"));
  videos.push(...document.getElementsByTagName("ytd-grid-video-renderer"));
  videos.push(...document.getElementsByTagName("ytd-rich-item-renderer"));
  videos.push(...document.getElementsByTagName("ytd-compact-video-renderer"));

  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener("mouseenter", addButton);
    videos[i].addEventListener("mouseleave", removeButton);
  }
});
observer.observe(observerTarget, observerOptions);
