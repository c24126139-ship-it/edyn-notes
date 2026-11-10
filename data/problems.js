// 題目索引：首頁列表與上一題/下一題導覽的唯一資料來源。
// 新增題目時依 id 排序插入。規則見 CLAUDE.md 第 8 節。
window.CHAPTERS = {
  ch01: "向量分析 Vector Analysis",
  ch02: "靜電學 Electrostatics",
  ch03: "位勢的求法 Potentials",
  ch04: "物質中的電場 Electric Fields in Matter",
  ch05: "靜磁學 Magnetostatics",
  ch06: "物質中的磁場 Magnetic Fields in Matter",
  ch07: "電動力學 Electrodynamics"
};

window.PROBLEMS = [
  {
    id: "ch02-p01",
    chapter: "ch02",
    title: "均勻帶電實心球的電場與電位",
    source: "範例題",
    difficulty: 1,
    tags: ["gauss-law", "potential", "spherical-symmetry"]
  },
  {
    id: "ch03-p01",
    chapter: "ch03",
    title: "點電荷與接地無限大導體平面（鏡像法）",
    source: "範例題",
    difficulty: 2,
    tags: ["method-of-images", "conductor", "boundary-condition", "force"]
  }
];
