chrome.storage.local.get("assignments", (data) => {
  const list = document.getElementById("assignment-list");
  const assignments = data.assignments || [];

  // 締切でソート（簡易：文字列比較）
  assignments.sort((a, b) => a.deadline.localeCompare(b.deadline));

  assignments.forEach(({ title, url, category }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = `${title}（${category}）`;
    a.href = url || "#";
    a.target = "_blank";
    li.appendChild(a);
    list.appendChild(li);
  });
});

// popup.js または background.js に記述
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: chrome.runtime.getURL('assignments.html') });
  });
});
