chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.count !== undefined) {
    chrome.action.setBadgeText({ text: message.count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  }
});
