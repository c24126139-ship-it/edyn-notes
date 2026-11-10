// MathJax 設定與自訂巨集（新增巨集時，請同步更新 CLAUDE.md 第 6 節）
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    tags: "ams",
    macros: {
      vb: ["\\mathbf{#1}", 1],
      vu: ["\\hat{\\mathbf{#1}}", 1],
      grad: "\\nabla",
      div: "\\nabla\\cdot",
      curl: "\\nabla\\times",
      dd: ["\\,\\mathrm{d}#1", 1],
      scr: "\\unicode{x1D4C7}",
      kk: "\\frac{1}{4\\pi\\epsilon_0}"
    }
  },
  options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] }
};
