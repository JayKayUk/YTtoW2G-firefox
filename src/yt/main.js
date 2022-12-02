"use strict";

let arrayOfVideosTiles = [];

function addListeners() {
  // Run until arrayOfVideosTiles is filled in a grid mode old UI
  const interval = setInterval(() => {
    arrayOfVideosTiles = document.getElementsByTagName(
      "ytd-grid-video-renderer"
    );
    const buttonHTMLstring = "<button id='YTtoW2G'>Button</button>";

    if (arrayOfVideosTiles.length > 0) {
      clearInterval(interval);

      // add listeners for every video in a grid
      for (let i = 0; i < arrayOfVideosTiles.length; i++) {
        // add button at the end of ytd-grid-video-render node on mouse enter. Need to getElementById because can't add listener to element that does not exist
        arrayOfVideosTiles[i].addEventListener("mouseenter", (e) => {
          const videoTile = e.currentTarget;
          videoTile.insertAdjacentHTML("beforeend", buttonHTMLstring);
          const button = document.getElementById("YTtoW2G");
          button.addEventListener("click", () => {
            const videoURL = videoTile.querySelector("#thumbnail").href;
            const thumbnailSource = videoTile.querySelector("img").src;
            const videoTitle = videoTile.querySelector("#video-title").title;
            browser.runtime.sendMessage({
              url: videoURL,
              thumb: thumbnailSource,
              title: videoTitle,
            });
          });
        });

        // remove button when cursour leaves ytd-grid-video-render node. No need to remove listener as the engine just ignores addEventListener if a listener exists already
        arrayOfVideosTiles[i].addEventListener("mouseleave", (e) => {
          const buttonToRemove = document.getElementById("YTtoW2G");
          e.currentTarget.removeChild(buttonToRemove);
        });
      }
    }

    console.log("YTtoW2G - Number of videos:" + arrayOfVideosTiles.length);
  }, 100);
}

addListeners();
