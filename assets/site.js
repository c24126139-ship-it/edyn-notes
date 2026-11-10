// 全站共用腳本：首頁卡片列表、搜尋、題目頁的上一題/下一題、頁尾。
// 資料來源：data/problems.js（window.PROBLEMS, window.CHAPTERS）
(function () {
  const body = document.body;
  const root = body.dataset.root || "./";
  const problems = (window.PROBLEMS || [])
    .filter(p => !p.hidden)
    .sort((a, b) => a.id.localeCompare(b.id));
  const chapters = window.CHAPTERS || {};
  const stars = n => "★".repeat(n || 1) + "☆".repeat(3 - (n || 1));
  const urlOf = p => `${root}problems/${p.chapter}/${p.id}.html`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---- 首頁 ----
  const listBox = document.getElementById("problem-list");
  if (listBox) {
    const input = document.getElementById("search");
    const render = (q = "") => {
      q = q.trim().toLowerCase();
      const hit = p =>
        !q ||
        p.id.includes(q) ||
        p.title.toLowerCase().includes(q) ||
        (p.source || "").toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.includes(q));
      let html = "";
      Object.keys(chapters).forEach(ch => {
        const items = problems.filter(p => p.chapter === ch && hit(p));
        if (!items.length) return;
        html += `<div class="chapter-head"><span class="no">${esc(ch.toUpperCase())}</span>` +
                `<h2>${esc(chapters[ch])}</h2><span class="n">${items.length} 題</span></div><div class="cards">`;
        items.forEach(p => {
          html += `<a class="card" href="${urlOf(p)}">` +
                  `<div class="top"><span class="pid">${esc(p.id)}</span><span class="stars">${stars(p.difficulty)}</span></div>` +
                  `<div class="title">${esc(p.title)}</div>` +
                  `<div class="src">來源：${esc(p.source || "—")}</div>` +
                  `<ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul></a>`;
        });
        html += "</div>";
      });
      listBox.innerHTML = html || `<p class="empty">找不到符合「${esc(q)}」的題目。</p>`;
    };
    render();
    if (input) input.addEventListener("input", e => render(e.target.value));
    const count = document.getElementById("count");
    if (count) count.textContent = problems.length;
  }

  // ---- 題目頁：上一題 / 下一題 ----
  const id = body.dataset.id;
  if (id) {
    const i = problems.findIndex(p => p.id === id);
    const prev = problems[i - 1], next = problems[i + 1];
    const nav = document.createElement("nav");
    nav.className = "pager";
    nav.innerHTML =
      (prev ? `<a class="prev" href="${urlOf(prev)}">← ${esc(prev.id)}<br>${esc(prev.title)}</a>` : "<span></span>") +
      `<a class="home" href="${root}index.html">目錄</a>` +
      (next ? `<a class="next" href="${urlOf(next)}">${esc(next.id)} →<br>${esc(next.title)}</a>` : "<span></span>");
    body.appendChild(nav);
  }

  // ---- 頁尾 ----
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.textContent = "電動力學解題筆記站 · 依 CLAUDE.md 規則維護";
  body.appendChild(footer);
})();
