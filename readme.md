# ResuMate 🧩

**ResuMate** is a modern, fully client-side resume builder that allows users to create, customize, and export professional resumes directly from the browser. It is designed to be **privacy-first, offline-capable, and ATS-friendly**, with a clean SaaS-style user experience.

> 🔒 No backend • ⚡ Offline-first • 📄 Clickable PDF export • 🧠 Product-grade UX

---

## ✨ Key Highlights
- 100% client-side (no server, no authentication)
- Works offline — all data stays in the browser
- Live resume preview with real-time updates
- Multiple resumes & templates
- High-quality, clickable PDF export
- ATS-friendly, selectable text PDFs

---

## 🚀 Features

### 🧾 Resume Management
- Create unlimited resumes
- Rename, duplicate, and delete resumes
- Auto-save using `localStorage`
- Import / export resume data as JSON

### ✍️ Resume Editor
- Personal Information
- Professional Summary
- Work Experience (multiple entries)
- Projects
- Education
- Technical Skills
- Certifications
- Key Achievements

### 🎨 Customization
- Font family selection
- Font size & line spacing controls
- Accent color selection
- Layout spacing adjustments
- Optional profile photo

### 👀 Live Preview
- Real-time resume preview
- Clean, professional single-column layout
- Preview matches exported PDF

### 📄 PDF Export
- Export resumes as **text-based PDFs**
- Clickable links (GitHub, LinkedIn, Portfolio)
- Selectable text (ATS-friendly)
- A4 print-optimized layout

### 🌙 App Experience
- Light / Dark mode
- SaaS-style dashboard UI
- Responsive, desktop-first design

---

## 🏗️ Architecture & Design Decisions

### Fully Client-Side
ResuMate intentionally avoids a backend to:
- Protect user privacy
- Enable offline usage
- Reduce complexity and hosting cost

All resume data is stored locally using `localStorage`.

---

### PDF Export Strategy

ResuMate uses **`react-to-print`** to generate PDFs by printing the existing resume preview.

#### Why this approach?
- Preserves HTML text (not images)
- Keeps links clickable in the PDF
- Produces ATS-friendly documents
- Avoids layout issues from canvas-based libraries

Print-specific CSS is applied during export to remove UI-only elements (buttons, shadows) while keeping the preview visually unchanged during normal usage.

---

## 🛠️ Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- React Context + Hooks
- **react-to-print** (PDF export)
- `localStorage` (data persistence)

---

## 📁 Project Structure

```txt
src/
 ├─ components/
 │   ├─ Sidebar/
 │   ├─ Header/
 │   ├─ Editor/
 │   ├─ Preview/
 │   └─ Customizer/
 ├─ context/
 │   ├─ AppContext.tsx
 │   ├─ ResumeContext.tsx
 │   └─ CustomizationContext.tsx
 ├─ hooks/
 │   ├─ useLocalStorage.ts
 │   └─ useReactToPrint.ts
 ├─ styles/
 │   └─ print.css
 └─ App.tsx
```

---

## 🖥️ Getting Started

```bash
# Clone the repository
git clone https://github.com/AyushPandey218/ResuMate

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 📌 Why ResuMate?

ResuMate focuses on **real-world usability**:
- No forced signups
- No data leaving the browser
- Clean resumes that recruiters and ATS systems can read

It is built as a **product-first project**, not just a demo.

---

## 🏆 Portfolio & Interview Value

ResuMate demonstrates:
- Advanced React state management
- Client-side persistence
- Real-world PDF export strategy
- UX-focused product decisions
- Clean, maintainable frontend architecture

> “A fully client-side resume builder with live preview, ATS-friendly PDF export, and zero backend.”

---

## 📜 License

MIT License

---

**ResuMate — Your resume. Your rules.**

