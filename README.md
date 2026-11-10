# 電動力學解題筆記站

電動力學（Electrodynamics 1）解題筆記，一題一頁，每頁都照「題目 → 思路 → 推導 → 結果 → 檢查」五段整理。

- 純 HTML/CSS/JS ＋ MathJax，不需要建置工具，直接用 GitHub Pages 部署
- AI 協作規則寫在 [`CLAUDE.md`](./CLAUDE.md)（`AGENTS.md` 會指向它）

## 新增一題

把題目（文字或照片）交給 AI，並說「請依照 CLAUDE.md 新增一題」。AI 會：

1. 從 `templates/problem-template.html` 複製出 `problems/chNN/chNN-pMM.html`
2. 依五段結構填好內容
3. 在 `data/problems.js` 登錄該題，首頁和上一題／下一題導覽會自動更新

## 本機預覽

直接用瀏覽器打開 `index.html` 即可（MathJax 需要網路）。
