chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.count !== undefined) {
    chrome.action.setBadgeText({ text: message.count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  }
});

// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("assignments.html")
  });
});
