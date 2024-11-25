chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPopup") {
        chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup",
          width: 1920,
          height: 1080,
          left: 0,
          top: 0,
    });
  }
  if (String(message.action).includes("timerstart")) {
    const regex = new RegExp(/\d+/);
    let timer = parseInt(regex.exec(message.action)[0]);
    chrome.storage.local.set({ timer });
    timer = timer * 60
    const interval = setInterval(() => {
      chrome.action.onClicked.addListener((tab) => {
        clearInterval(interval);
        chrome.action.setBadgeText({ text: `` });
        chrome.storage.local.set({ timer : null });
      });
      timer--;
      if (timer <= 0) {
        clearInterval(interval);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.remove(tabs[0].id);
          }
        });
        chrome.action.setBadgeText({ text: `` });
      } else {
        let minutes = Math.floor((timer / 60))
        let seconde = timer % 60
        let timetoprint = `${minutes}:${seconde}`
        if (seconde < 10 ) {
          timetoprint = `${minutes}:0${seconde}`
        }
        chrome.action.setBadgeBackgroundColor({ color: "#048B9A" })
        chrome.action.setBadgeText({ text: `${timetoprint}` });
      }
    }, 1000);
  }
});

