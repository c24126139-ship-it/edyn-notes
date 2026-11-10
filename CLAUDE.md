# CLAUDE.md — 電動力學解題筆記站（Electrodynamics Solution Notes）

> 這份文件是給 AI（Claude / Codex 等）讀的專案規則。
> 每次新增或修改內容前，請先完整讀完本文件，並嚴格遵守。

---

## 1. 專案目的

- 把電動力學（Electrodynamics 1）的作業題、課本習題、考古題整理成**一題一頁**的解題筆記。
- 每一頁都要讓「沒上過課的同學」也看得懂：先講思路，再推導，最後檢查答案。
- 網站是純靜態網頁，部署在 GitHub Pages，不需要任何建置工具（no build step）。

## 2. 技術規格

| 項目 | 規定 |
|---|---|
| 網頁 | 純 HTML + CSS + 原生 JavaScript，不使用框架、不使用 npm |
| 數學 | MathJax 3（CDN），設定集中在 `assets/mathjax-config.js` |
| 樣式 | 只寫在 `assets/style.css`，**頁面內不得寫 `<style>` 或 inline style** |
| 腳本 | 只寫在 `assets/site.js`，頁面內不得寫 `<script>` 邏輯 |
| 題目索引 | `data/problems.js`（唯一的資料來源，首頁與上一題/下一題導覽都靠它） |
| 語言 | 內文用繁體中文；物理名詞第一次出現時括號附英文，例如「邊界條件（boundary condition）」 |

## 3. 資料夾結構

```
/
├── CLAUDE.md                 ← 本文件（AI 規則）
├── AGENTS.md                 ← 指向本文件
├── README.md                 ← 給人看的簡介
├── index.html                ← 首頁：依章節列出所有題目＋搜尋
├── .nojekyll
├── assets/
│   ├── style.css
│   ├── site.js
│   └── mathjax-config.js     ← MathJax 設定與自訂巨集
├── data/
│   └── problems.js           ← 章節與題目索引
├── templates/
│   └── problem-template.html ← 新題目一律從這裡複製
└── problems/
    ├── ch02/
    │   └── ch02-p01.html
    └── ch03/
        └── ch03-p01.html
```

## 4. 命名規則

- 章節資料夾：`problems/chNN/`，`NN` 為兩位數章節號（`ch02`、`ch10`）。
- 題目檔名：`chNN-pMM.html`，`MM` 為該章流水號，從 `01` 開始，**不跳號、不重用**。
- 題目 `id` 與檔名主檔名相同，例如 `ch03-p02`。
- 章節對應（以 Griffiths《Introduction to Electrodynamics》章節為準）：

| 代號 | 章節 |
|---|---|
| ch01 | 向量分析 Vector Analysis |
| ch02 | 靜電學 Electrostatics |
| ch03 | 位勢的求法 Potentials（Laplace 方程、鏡像法、分離變數、多極展開） |
| ch04 | 物質中的電場 Electric Fields in Matter |
| ch05 | 靜磁學 Magnetostatics |
| ch06 | 物質中的磁場 Magnetic Fields in Matter |
| ch07 | 電動力學 Electrodynamics（Faraday、Maxwell 方程） |

若新增上表以外的章節，要同時更新本表與 `data/problems.js` 的 `CHAPTERS`。

## 5. 每一題頁面的固定結構（最重要）

每個題目頁**必須**依序包含以下五個 `<section>`，class 名稱與標題不可更改：

| 順序 | class | 標題 | 內容要求 |
|---|---|---|---|
| 1 | `problem` | 題目 | 用自己的話重述題目，列出已知量與所求。**不可整段照抄課本原文。** |
| 2 | `idea` | 思路 | 2–5 句說明「為什麼選這個方法」：對稱性、該用哪條定律、邊界條件是什麼。 |
| 3 | `derivation` | 推導 | 分步驟（`<h3>Step 1 …</h3>`），每一步先一句中文說明，再接公式。 |
| 4 | `result` | 結果 | 最終答案放在 `<div class="answer">` 中，用 `\boxed{}` 框起來。 |
| 5 | `check` | 檢查 | **至少兩項**：單位/因次、極限情況（r→0、r→∞）、邊界連續性、對稱性、與已知結果比較。 |

頁首 `<header>` 內需有：題目標題、`<p class="meta">`（章節、來源、難度）、`<ul class="tags">`（標籤）。

頁尾由 `site.js` 自動產生「上一題／下一題／回目錄」，**不要手寫**。

## 6. 數學書寫規則

- 行內公式用 `\( … \)`，獨立公式用 `\[ … \]`；多行推導用 `\begin{aligned} … \end{aligned}`。
- **不要使用 `$…$`**（避免與一般文字中的錢字號衝突）。
- 單位制一律 **SI**。常數寫作 `\epsilon_0`、`\mu_0`。
- 向量一律用自訂巨集，**不要混用箭頭**：

| 寫法 | 意義 |
|---|---|
| `\vb{E}` | 粗體向量 **E** |
| `\vu{r}` | 單位向量 r̂ |
| `\grad V`、`\div \vb{E}`、`\curl \vb{B}` | 梯度、散度、旋度 |
| `\scr` | Griffiths 的「分離向量」 𝓇（source → field point） |
| `\dd{\tau}` | 體積元素 dτ |
| `\kk` | \( \frac{1}{4\pi\epsilon_0} \) |

- 巨集定義在 `assets/mathjax-config.js`，新增巨集時要同步更新本表。

## 7. 難度與標籤

- 難度只能是：`★`（直接套公式）、`★★`（需要一兩步技巧）、`★★★`（多步推導或需要數學技巧）。
- 標籤用小寫英文 kebab-case，優先使用既有標籤，避免同義詞：
  `gauss-law`、`potential`、`method-of-images`、`separation-of-variables`、`multipole`、`boundary-condition`、`conductor`、`dielectric`、`biot-savart`、`ampere-law`、`vector-potential`、`magnetization`、`faraday-law`、`energy`、`force`、`spherical-symmetry`、`cylindrical-symmetry`、`planar-symmetry`
- 要新增標籤時，先確認上面沒有意思相同的，再加到本清單。

## 8. 新增一題的標準流程（AI 必須照做）

1. 決定章節 `chNN`，找出該章目前最大的流水號，新題目用下一號 `pMM`。
2. 複製 `templates/problem-template.html` → `problems/chNN/chNN-pMM.html`。
3. 填寫 `<body data-id="chNN-pMM" data-root="../../">` 與 `<title>`。
4. 依第 5 節的五段結構填入內容，數學依第 6 節規則。
5. 在 `data/problems.js` 的 `PROBLEMS` 陣列**依 id 排序**插入一筆：
   ```js
   { id: "ch03-p02", chapter: "ch03", title: "…", source: "HW4 #2", difficulty: 2, tags: ["…"] }
   ```
6. 自我檢查（見第 10 節）。

使用者可能只給你「一張題目照片」或「一段題目文字」，你仍然要依照以上流程產出完整頁面。
若使用者提供了自己的解法，以使用者的解法為主，整理成固定格式；發現錯誤時在 `check` 段落用 `<p class="warn">` 註明，不要默默改掉。

## 9. 修改既有內容的規則

- 不可更改既有題目的 `id` 或檔名（會讓連結失效）。
- 修正錯誤時，在該頁 `check` 段落最後加上 `<p class="note">更新：YYYY-MM-DD，修正了 …</p>`。
- 改動 `style.css` 或 `site.js` 時，必須確認**所有**既有頁面仍正常顯示。
- 不刪除題目；若題目作廢，在 `problems.js` 加上 `hidden: true`。

## 10. 完成前的檢查清單

- [ ] 五個 section 都在，順序正確，class 正確
- [ ] 最終答案有 `\boxed{}`，且放在 `.answer` 中
- [ ] `check` 至少兩項
- [ ] 沒有 `$…$`、沒有 inline style、沒有頁內 `<script>`
- [ ] `data/problems.js` 已新增該題，id 與檔名一致
- [ ] 本機開啟 `index.html` 能看到新題目，點進去數學正常渲染，上一題/下一題正確

## 11. 風格

- 整體走「乾淨的講義感」：白底、深藍主色、內文寬度約 760px，方便手機閱讀。
- 不加入與解題無關的動畫或裝飾圖。
- 圖示（若需要）用 inline SVG 放在 `<figure>` 中，並加 `<figcaption>`。
