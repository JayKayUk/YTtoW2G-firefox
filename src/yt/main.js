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

  if (videoTile.tagName === "YTD-PLAYLIST-VIDEO-RENDERER") {
    videoTile.style.position = "relative";
    videoTile.querySelector("#YTtoW2G").style.left = "2.70em";
    videoTile.querySelector("#YTtoW2G").style.top = "0.5em";
  }

  addButtonListener(videoTile);
}

function addButtonListener(videoTile) {
  const button = document.getElementById("YTtoW2G");
  button.addEventListener("click", () => {
    sendMsgToBgScript(getData_videoTile(videoTile));
  });
}

function getData_videoTile(videoTile) {
  const videoURL = videoTile.querySelector("a#thumbnail").href;
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

function getData_videoPage() {
  const videoURL = window.location.href;
  const thumbnailSource = `https://img.youtube.com/vi/${videoURL.slice(
    32
  )}/mqdefault.jpg`;
  const videoTitle = sanitizeString(
    document.querySelector(
      "h1.ytd-watch-metadata > yt-formatted-string:nth-child(1)"
    ).textContent
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
  videos.push(...document.getElementsByTagName("ytd-playlist-video-renderer"));

  for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener("mouseenter", addButton);
    videos[i].addEventListener("mouseleave", removeButton);
  }

  if (!window.location.href.match(/.*watch/g)) {
    return;
  }

  if (document.querySelector("#YTtoW2G-videoPage")) {
    return;
  }

  if (!document.querySelector("yt-button-shape#button-shape:not([hidden=''])"))
    return;

  const dotsButton = document.querySelector(
    "yt-button-shape#button-shape:not([hidden=''])"
  );

  const buttonHTMLstring_videoPage = `<button id='YTtoW2G-videoPage'><img src='${browser.runtime.getURL(
    "icons/main-icon-2048.png"
  )}'></button>`;

  dotsButton.insertAdjacentHTML("afterend", buttonHTMLstring_videoPage);

  const button_videoPage = document.getElementById("YTtoW2G-videoPage");
  button_videoPage.addEventListener("click", () => {
    sendMsgToBgScript(getData_videoPage());
  });
});
observer.observe(observerTarget, observerOptions);
