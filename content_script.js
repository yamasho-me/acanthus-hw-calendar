window.addEventListener('load', () => {
  const assignments = [];

  // 対象カテゴリ一覧
  const validCategories = ['課題', 'レポート', '試験', 'テスト', 'アンケート'];

  document.querySelectorAll('.cl-contentsList_listGroupItem').forEach(section => {
    const titleElement = section.querySelector('.cm-contentsList_contentName a, .cm-contentsList_contentName div');
    const title = titleElement?.innerText.trim() || '無題';

    const linkElement = section.querySelector('.cm-contentsList_contentName a');
    const url = linkElement?.href || null;

    const category = section.querySelector('.cl-contentsList_categoryLabel')?.innerText.trim() || '不明';

    // 有効なカテゴリだけを抽出
    if (validCategories.includes(category)) {
      assignments.push({ title, url, category });
    }
  });

  console.log("抽出された課題一覧：", assignments);

  // バッジに表示する課題数を送信
  chrome.runtime.sendMessage({ count: assignments.length });

  // assignments をローカルストレージに保存（重複を防ぎたいなら工夫必要）
  chrome.storage.local.get(['assignments'], (result) => {
    const previous = result.assignments || [];
    const updated = previous.concat(assignments);
    chrome.storage.local.set({ assignments: updated });
  });

  // デバッグ表示（任意）
  const box = document.createElement('div');
  box.style.position = 'fixed';
  box.style.top = '10px';
  box.style.right = '10px';
  box.style.padding = '10px';
  box.style.background = '#fff';
  box.style.border = '1px solid #ccc';
  box.style.zIndex = 9999;
  box.innerText = `課題数: ${assignments.length}`;
  document.body.appendChild(box);
});
