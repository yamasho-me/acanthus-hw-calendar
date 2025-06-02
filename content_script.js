window.addEventListener('load', () => {
  const assignments = [];

  document.querySelectorAll('.cl-contentsList_listGroupItem').forEach(section => {
    const titleElement = section.querySelector('.cm-contentsList_contentName a, .cm-contentsList_contentName div');
    const title = titleElement?.innerText.trim() || '無題';

    const linkElement = section.querySelector('.cm-contentsList_contentName a');
    const url = linkElement?.href || null;

    const category = section.querySelector('.cl-contentsList_categoryLabel')?.innerText.trim() || '不明';

    // 課題のみカウントしたいなら条件をここで入れてもOK
    assignments.push({ title, url, category });
  });

  console.log("抽出された課題一覧：", assignments);

  // 「課題」としてカウント
  const count = assignments.filter(a => a.category === '課題').length;

  // バッジ表示のために background にメッセージ送信
  chrome.runtime.sendMessage({ count });

  // 任意で画面に表示（デバッグ用）
  const box = document.createElement('div');
  box.style.position = 'fixed';
  box.style.top = '10px';
  box.style.right = '10px';
  box.style.padding = '10px';
  box.style.background = '#fff';
  box.style.border = '1px solid #ccc';
  box.style.zIndex = 9999;
  box.innerText = `課題数: ${count}`;
  document.body.appendChild(box);
});
