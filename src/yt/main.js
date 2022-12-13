"use strict";

function sanitizeString(text) {
  return text.replace(/['"`/\\]/g, "");
}

function addButton(e) {
  const videoTile = e.currentTarget;

  // Check if button already exists
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
    sendMsgToBgScript(videoTile);
  });
}

function sendMsgToBgScript(videoTile) {
  const videoURL = videoTile.querySelector("#thumbnail").href;
  const thumbnailSource = videoTile.querySelector("img").src;
  const videoTitle = sanitizeString(
    videoTile.querySelector("#video-title").title
  );
  browser.runtime.sendMessage({
    url: videoURL,
    thumb: thumbnailSource,
    title: videoTitle,
  });
}

function removeButton(e) {
  const buttonToRemove = document.getElementById("YTtoW2G");
  e.currentTarget.removeChild(buttonToRemove);
}

const observerOptions = { childList: true, subtree: true };
const observerTarget = document;
const observer = new MutationObserver((mutationList) => {
  for (let i = 0; i < mutationList.length; i++) {
    if (
      mutationList[i].target.tagName === "YTD-VIDEO-RENDERER" ||
      mutationList[i].target.tagName === "YTD-GRID-VIDEO-RENDERER"
    ) {
      mutationList[i].target.addEventListener("mouseenter", addButton);
      mutationList[i].target.addEventListener("mouseleave", removeButton);
    }
  }
});
observer.observe(observerTarget, observerOptions);
