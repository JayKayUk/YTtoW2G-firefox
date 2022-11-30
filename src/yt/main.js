"use strict";

let arrayOfVideosTiles = [];

// Run until arrayOfVideosTiles is filled in a grid mode old UI
const interval = setInterval(() => {
  arrayOfVideosTiles = document.getElementsByTagName("ytd-grid-video-renderer");
  const buttonHTMLstring = "<button id='YTtoW2G'>Button</button>";

  if (arrayOfVideosTiles.length > 0) {
    clearInterval(interval);

    // add listeners for every video in a grid
    for (let i = 0; i < arrayOfVideosTiles.length; i++) {
      // add button at the end of ytd-grid-video-render node on mouse enter. Need to getElementById because can't add listener to element that does not exist
      arrayOfVideosTiles[i].addEventListener("mouseenter", (e) => {
        e.currentTarget.insertAdjacentHTML("beforeend", buttonHTMLstring);
        const button = document.getElementById("YTtoW2G");
        button.addEventListener("click", () => {
          console.log("YTtoW2G");
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
