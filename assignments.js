document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['assignments'], (result) => {
    const assignments = result.assignments || [];
    const tbody = document.querySelector('#assignment-table tbody');

    assignments.forEach(item => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${item.title}</td>
        <td>${item.category}</td>
        <td><a href="${item.url}" target="_blank">リンク</a></td>
      `;

      tbody.appendChild(tr);
    });
  });
});
