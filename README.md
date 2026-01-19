# MIS 233 Final Project – Grafana Panel Plugin

## Student
**Developed by Yaren Dalkıran (MIS 233)**

## Project Summary
This project is a custom **Grafana Panel Plugin**.
It builds successfully, loads in Grafana, and shows the student name inside the plugin UI (mandatory requirement).

## Mandatory Requirement (PASS)
✅ Plugin builds successfully  
✅ Plugin loads inside Grafana  
✅ Plugin UI displays: **“Developed by Yaren Dalkıran (MIS 233)”**

Location in code:
- `src/components/SimplePanel.tsx`

---

## Bonus Features Implemented (Panel Plugin)

### 1) Render real data from a Grafana query ✅
- The panel reads numeric values from `data.series` and shows:
  - Last / Avg / Min / Max

### 2) Panel configuration options (1–2+) ✅
Right-side panel options:
- Chart Type (Circle / Bar / Line)
- Chart Color
- Chart Label

### 3) Simple interactivity ✅
- Hover: shows Query Summary box
- Click: pins/unpins the summary box

### 4) Responsive design improvements ✅
- SVG uses `viewBox` and scales with panel size.

### 5) AI in JS (WOW) ✅
- Simple trend insight (Trend up / down / flat) based on query data.

---

## Requirements
- Node.js **18 or 20 (LTS)**
- npm
- Git
- Docker (used by the included Grafana dev server)

---

## Install
```bash
npm install
