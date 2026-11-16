/**
 * 個人筆記整理網站 - 原生 JavaScript 邏輯 (Vanilla JS)
 * 遵循零建置、純相對路徑、相容 GitHub Pages
 */

// 內建預設備援資料（確保在本地 file:// 協議被瀏覽器同源政策阻擋時依然能正常展示）
const FALLBACK_NOTES = [
  {
    id: "r-exercise-collection",
    title: "R 語言統計計算與程式設計練習題庫總覽",
    filename: "r-exercise-collection.md",
    tags: ["R語言", "統計學", "資料分析", "程式設計"],
    createdAt: "2026-11-16",
    updatedAt: "2026-11-16",
    summary: "整理國立政治大學統計學系吳漢銘老師之《R 練習題 (v2021.09)》，包含基礎物件、程式設計、繪圖、微積分線代、機率統計、資料處理與分析等九大單元目錄與重點架構。"
  },
  {
    id: "project-specification",
    title: "個人筆記整理網站規範與核心規劃",
    filename: "project-specification.md",
    tags: ["專案規範", "AGENTS"],
    createdAt: "2026-11-16",
    updatedAt: "2026-11-16",
    summary: "彙整個人筆記整理網站之專案目的、運作方式、技術限制與同主題合併原則。",
    content: `# 個人筆記整理網站規範與核心規劃

> 📅 **建立日期**：2026-11-16 ｜ 🔄 **最後更新**：2026-11-16  
> 🏷️ **標籤**：\`#專案規範\` \`#AGENTS\`  
> 📝 **核心摘要**：本筆記整理個人筆記整理網站之架構目的、技術限制與 AI 維護規則，嚴格落實「一個主題一篇」與「只整理使用者給的資料」之最高原則。

---

## 1. 核心概念與概述

本專案旨在打造一個輕量、乾淨且易於閱讀的個人知識整理網站，完全免除複雜前端框架的依賴，以最純粹的靜態技術呈現。

- **核心架構精神**：嚴格落實「一個主題一篇筆記」，避免資訊碎片化。
- **資料處理原則**：僅整理使用者提供的資料，不自行杜撰或腦補任何外部內容。
- **同主題合併原則**：未來提供相同主題的新資訊時，直接擴充至本篇對應章節，並更新最後修改日期。

---

## 2. 詳細內容與知識重點

### 技術規格與限制
- **純原生網頁技術**：Vanilla HTML5、CSS3、現代原生 JavaScript (ES6+)。
- **無建置步驟（No Build Step）**：不使用 Webpack、Vite、npm build，原始碼可直接開箱運行。
- **GitHub Pages 相容**：所有資源路徑皆採用相對路徑。

### 檔案目錄規劃
- \`index.html\`：單頁閱讀入口。
- \`css/style.css\`：Notion 極簡風主題樣式。
- \`js/app.js\`：讀取筆記索引、Markdown 解析、切換與即時搜尋。
- \`notes/index.json\`：管理各篇筆記之中繼資料。
- \`notes/*.md\`：各主題獨立 Markdown 筆記。

---

## 3. 常見問題與注意事項

- **為什麼堅持一個主題一篇？**  
  確保知識系統化累積，使用者查找特定主題時能在單一頁面中完整閱讀該主題的全貌與演進歷程。
- **如何增加新筆記？**  
  於 \`notes/\` 新增對應 \`.md\` 檔案，並在 \`notes/index.json\` 註冊該主題資料即可。`
  }
];

class NotesApp {
  constructor() {
    this.notes = [];
    this.activeNoteId = null;
    this.selectedTag = "all";
    this.searchQuery = "";

    this.initElements();
    this.initTheme();
    this.bindEvents();
    this.loadNotes();
  }

  initElements() {
    this.notesListEl = document.getElementById("notes-list");
    this.noteContentEl = document.getElementById("note-content");
    this.searchInputEl = document.getElementById("search-input");
    this.tagsBarEl = document.getElementById("tags-bar");
    this.themeToggleBtn = document.getElementById("theme-toggle-btn");
    this.sidebarEl = document.getElementById("sidebar");
    this.menuToggleBtn = document.getElementById("menu-toggle-btn");
  }

  initTheme() {
    const savedTheme = localStorage.getItem("pn_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  updateThemeIcon(theme) {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
      this.themeToggleBtn.title = theme === "dark" ? "切換至淺色模式" : "切換至深色模式";
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("pn_theme", newTheme);
    this.updateThemeIcon(newTheme);
  }

  bindEvents() {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    if (this.searchInputEl) {
      this.searchInputEl.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderSidebar();
      });
    }

    if (this.menuToggleBtn && this.sidebarEl) {
      this.menuToggleBtn.addEventListener("click", () => {
        this.sidebarEl.classList.toggle("open");
      });
    }

    window.addEventListener("hashchange", () => {
      this.handleHashChange();
    });
  }

  async loadNotes() {
    try {
      // 嘗試讀取 notes/index.json
      const response = await fetch("notes/index.json");
      if (!response.ok) throw new Error("Fetch index.json failed");
      this.notes = await response.json();
    } catch (err) {
      console.warn("無法透過 HTTP fetch 讀取 notes/index.json（可能是本地 file:// 協議），啟用預設備援資料。", err);
      this.notes = FALLBACK_NOTES;
    }

    this.renderTags();
    this.renderSidebar();

    // 依 URL Hash 或預設第一篇載入
    this.handleHashChange();
  }

  renderTags() {
    if (!this.tagsBarEl) return;
    const tagSet = new Set();
    this.notes.forEach((note) => {
      if (Array.isArray(note.tags)) {
        note.tags.forEach((tag) => tagSet.add(tag));
      }
    });

    const tags = ["all", ...Array.from(tagSet)];
    this.tagsBarEl.innerHTML = tags
      .map(
        (tag) => `
        <button class="tag-btn ${this.selectedTag === tag ? "active" : ""}" data-tag="${tag}">
          ${tag === "all" ? "全部" : `#${tag}`}
        </button>
      `
      )
      .join("");

    this.tagsBarEl.querySelectorAll(".tag-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedTag = btn.dataset.tag;
        this.renderTags();
        this.renderSidebar();
      });
    });
  }

  getFilteredNotes() {
    return this.notes.filter((note) => {
      // 標籤篩選
      const matchesTag =
        this.selectedTag === "all" ||
        (Array.isArray(note.tags) && note.tags.includes(this.selectedTag));

      // 搜尋字串篩選
      const matchesQuery =
        !this.searchQuery ||
        note.title.toLowerCase().includes(this.searchQuery) ||
        (note.summary && note.summary.toLowerCase().includes(this.searchQuery)) ||
        (Array.isArray(note.tags) &&
          note.tags.some((t) => t.toLowerCase().includes(this.searchQuery)));

      return matchesTag && matchesQuery;
    });
  }

  renderSidebar() {
    if (!this.notesListEl) return;
    const filtered = this.getFilteredNotes();

    if (filtered.length === 0) {
      this.notesListEl.innerHTML = `<div style="padding: 16px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">無相符筆記</div>`;
      return;
    }

    this.notesListEl.innerHTML = filtered
      .map(
        (note) => `
      <button class="note-item ${this.activeNoteId === note.id ? "active" : ""}" data-id="${note.id}">
        <span class="note-item-title">${this.escapeHtml(note.title)}</span>
        <div class="note-item-meta">
          <span>${note.updatedAt || note.createdAt || ""}</span>
          <span>${Array.isArray(note.tags) && note.tags[0] ? "#" + note.tags[0] : ""}</span>
        </div>
      </button>
    `
      )
      .join("");

    this.notesListEl.querySelectorAll(".note-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.selectNote(id);
        if (this.sidebarEl) this.sidebarEl.classList.remove("open");
      });
    });
  }

  handleHashChange() {
    const hash = window.location.hash.replace("#", "");
    if (hash && this.notes.some((n) => n.id === hash)) {
      this.selectNote(hash);
    } else if (this.notes.length > 0) {
      this.selectNote(this.notes[0].id);
    }
  }

  async selectNote(noteId) {
    this.activeNoteId = noteId;
    window.location.hash = noteId;
    this.renderSidebar();

    const note = this.notes.find((n) => n.id === noteId);
    if (!note) return;

    this.noteContentEl.innerHTML = `<div class="empty-state">載入筆記中...</div>`;

    let markdown = "";
    if (note.content) {
      markdown = note.content;
    } else {
      try {
        const res = await fetch(`notes/${note.filename}`);
        if (!res.ok) throw new Error("Fetch note file failed");
        markdown = await res.text();
      } catch (err) {
        console.warn(`讀取 notes/${note.filename} 失敗，檢查備援資料:`, err);
        const fallback = FALLBACK_NOTES.find((n) => n.id === noteId);
        markdown = fallback ? fallback.content : "# 讀取失敗\n無法載入此筆記檔案。";
      }
    }

    this.renderMarkdown(markdown);
  }

  renderMarkdown(markdown) {
    if (typeof marked !== "undefined" && marked.parse) {
      this.noteContentEl.innerHTML = marked.parse(markdown);
    } else {
      // 簡易替代轉換
      this.noteContentEl.innerHTML = `<pre style="white-space: pre-wrap;">${this.escapeHtml(markdown)}</pre>`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// 頁面就緒初始化
document.addEventListener("DOMContentLoaded", () => {
  window.notesApp = new NotesApp();
});
