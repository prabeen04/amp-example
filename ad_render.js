console.log("ad_render");
const ampScript = document.getElementById("amp-script-id");
ampScript.innerHTML = `

<div class="iframe-ad" id="ad-container">
<img id="close-icon" src=${getCloseIconSRC()} alt="Ad Close Icon"/>
<div id="iframe-ad-backdrop"></div>
</div>
`;
injectInterstitialStyles();
const adContainer = document.getElementById("ad-container");

const apiKey = "123";
const elem = document.createElement("div");
let gptDivId = `gpt-passback-${apiKey}`;
elem.setAttribute("id", gptDivId);

adContainer.appendChild(elem);
try {
  console.log("try");
  let gptScript = document.createElement("script");
  gptScript.async = true;
  gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
  adContainer.appendChild(gptScript);

  window.googletag = window.googletag || { cmd: [] };
  googletag.cmd.push(function () {
    googletag
      .defineSlot(
        "/22387492205/Banner_Test_320x50",
        [
          [300, 100],
          [300, 50],
          [320, 50],
          [320, 100],
        ],
        gptDivId
      )
      .addService(googletag.pubads());

    googletag.enableServices();
    googletag.display(gptDivId);
    googletag.pubads().addEventListener("slotRenderEnded", (event) => {
      console.log("slotRenderEnded", event);
      var slotId = event.slot.getSlotElementId();
      if (slotId == gptDivId) {
        if (event.isEmpty) {
          if (document.getElementById(gptDivId)) {
            document.getElementById(gptDivId).style.display = "none";
          }
        } else {
          document.getElementById("close-icon").style.display = "unset";
          document.getElementById("iframe-ad-backdrop").style.display = "unset";
          document.getElementById("ad-container").style.bottom = "40%";
          return;
        }
      }
    });
  });
} catch (error) {
  console.log("catch");
  console.error("error >>", error);
}
console.log(adContainer);

function closeAd(e) {
  document.getElementById("ad-container").remove();
}

const closeBtn = document
  .getElementById("close-icon")
  .addEventListener("click", closeAd);

const backDrop = document
  .getElementById("iframe-ad-backdrop")
  .addEventListener("click", closeAd);

function getCloseIconSRC() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAbFJREFUSEu1VoFxgzAMVCaAEcgEMAJMUDpByQZ0AmCCskHTCUomgA0KEzQjwAStnkOc6xpMmqI7XXxY/n9Lsp0DrZvH0w/sITvGwRTe8u+VvWG/TGMj0mEBH2AZe2IRINNnHhQmIhNBzIGv7O5GcAnreXBir9R1OgEUA/weAwl2NJpKAOXv9yArax9lJ0Lg8YePP6RlSQ/SdWTvhQBbevon9QLzxoMEBFD/aQL3fZ/iOKayLGkYhh8hjuNQmqZUVRV1Xbek7QiClP3FFJFlGeV5Tm3bUhiGMwnAm6ahIAjG+aJAhxrtGQRoKxymX+a6LtV1PQIJCYIEHN+iKKK+R8qNdgEBTqW/FKGTIE4ILeAIbUHwtQQu31WScZVd+Qy5iUDNuRCoNVkTaE2RCg7laoo2kHSrRdbBkXOYXni9hZUdjUXe1KZqQdWaWNr0tHrQ0C1y0PRWBIkcNEmdoRbjQYOd2Xe7KkDgofvYHVvLbpzHvQLM+bLDul2vaxGW8GC3B0dIsBPU5NZ0IS0QuPpkCgnyl99QeNz9iL/qNVr6V6ESYUfhVDS5FPEAAAxqGxOwAHwDKES0JgVwUV0AAAAASUVORK5CYII=";
}

function injectInterstitialStyles() {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    #close-icon {
        z-index: 1;
        position: absolute;
        right: -4px;
        top: -20px;
        display: none;
        z-index: 1;
      }
      .iframe-ad {
        position: fixed;
        bottom: 2%;
        left: 10px;
        width: calc(100% - 2px - 20px);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #iframe-ad-backdrop {
        content: "";
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(3, 5, 12, 0.403);
        top: 0px;
        display: none;
        z-index: -1;
        backdrop-filter: blur(5px);
      }
      #amp-script-id {
        opacity: 1 !important;
      }
     
  `;
  document.getElementsByTagName("head")[0].appendChild(style);
}
