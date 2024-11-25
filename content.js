console.log("L'extension fonctionne !");
chrome.storage.local.get("timer", function (result) {
  if (result.timer == null) {
    chrome.runtime.sendMessage({ action: "openPopup" });
  }
});
