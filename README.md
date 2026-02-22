# Rahul S — Personal Portfolio Website

> **Live at:** [www.its-rahul.tech](https://www.its-rahul.tech)

A modern, interactive personal portfolio built with pure HTML, CSS, and JavaScript — no frameworks, no build tools. Features an AI-powered CTS Newcomer Guide chatbot backed by the Gemini API.

---

## 📄 Pages

### `index.html` — Main Portfolio
The primary portfolio page showcasing professional experience, skills, projects, certifications, and contact.

**Key sections:**
- **Hero** — Status badge, animated gradient title, social links, CV download
- **Stats Strip** — 55+ Daily ETL Jobs · 8 Certifications · 80.36% ML Accuracy · Published Research
- **Expertise / About** — Bento grid with bio, Core Stack, ETL & Engineering, BI & AI skills
- **Experience** — Cognizant Technology Solutions (Jun 2025–Present) + GEP Solutions internship (Dec 2024–Mar 2025)
- **Featured Projects** — 3 projects including a peer-reviewed published AI paper (IJRPR Mar 2025)
- **Certifications** — IBM · Google · AWS · Tableau · Deloitte · Alteryx
- **Contact** — Email + LinkedIn links

**Interactive effects:**
- Indigo dotted cursor trail (canvas-based)
- Scroll progress bar (top of page)
- Scroll-aware navbar + active section highlighting
- AOS scroll animations
- Mobile-responsive layout (hamburger menu, stacked bento grid, responsive timeline)

---

### `cognizant-faq.html` — CTS Newcomer Guide *(unlisted)*
An interactive FAQ page for people joining Cognizant, with an AI chatbot powered by the Gemini API.

> ⚠️ **This page is not linked from the main portfolio.** It exists as a direct-share resource — share the URL only when someone asks.

**12 FAQ topics covering:**
- Interview process & tips
- Arts vs Engineering rounds & package differences (2.8 LPA vs higher)
- Document requirements (on-campus vs off-campus)
- Week 1 onboarding experience
- Training structure (up to 3 months)
- RAG grading system (Green/Yellow/Red) — assessment + 2 SME interviews
- Domain assignment (not your choice)
- Work location policy (no guarantee)
- BGV process (affidavit, notary, re-upload policy)
- Day 1 joining checklist (what to bring, no personal laptop)
- Salary / package by background
- What happens after training

**AI Chatbot features:**
- Powered by `gemini-2.5-flash` with full context of Rahul's experience
- Client-side rate limiting: 30 msgs/day, 10 msgs/min (via `localStorage`)
- Visual usage progress bar
- "Ask Rahul Directly" fallback (LinkedIn + Email) when AI is uncertain
- Quick-chip suggestions

**Interactive effects:**
- Teal dotted cursor trail
- Animated mesh orbs in hero
- Scroll progress bar
- Floating FAQ read badge (tracks topics explored, "0/12")
- Category filter tabs (Interview, Onboarding, Training, Career)
- Mobile-responsive: chat panel stacks above FAQs on small screens

---

## 🛠️ Tech Stack

| Layer | Details |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | Pure Vanilla CSS (fully inline, no Tailwind) |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Icons** | Phosphor Icons (CDN) |
| **Animations** | AOS (Animate On Scroll) + custom CSS keyframes |
| **AI** | Google Gemini API (`gemini-2.5-flash`) |
| **Analytics** | Datafa.st (both pages) |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |

---

## 📁 File Structure

```
web-update-main/
├── index.html                  # Main portfolio page
├── cognizant-faq.html          # CTS Newcomer Guide + AI chatbot (unlisted)
├── S_Rahul_Resume_10-Feb.pdf   # Downloadable CV
├── Rahul S - Photograph.png    # Profile photo
├── style.css                   # Legacy (not active)
├── advanced-effects.css        # Legacy (not active)
├── script.js                   # Legacy (not active)
├── CNAME                       # GitHub Pages custom domain
└── README.md                   # This file
```

---

## 🤖 AI Chatbot Setup

**Model:** `gemini-2.5-flash` — confirmed accessible on the API key's free tier (5 RPM / 20 RPD)  
**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

To replace the API key, search for `const API_KEY` in `cognizant-faq.html`.

> For production/high-traffic use, proxy the API call through a backend to protect the key.

---

## 🚀 Deployment

Hosted via **GitHub Pages** with a custom domain (`www.its-rahul.tech`) configured through `CNAME`.

Push to `main` branch → GitHub Pages auto-deploys.

---

## 👤 About

**Rahul S** — Analyst Trainee (Data Engineering) at Cognizant Technology Solutions, Chennai.  
BS CS with Data Analytics, Sri Ramakrishna College of Arts & Science (CGPA 7.87).  
Published researcher · 8 certifications · IBM DataStage · Informatica · Power BI

📧 subbiahrahul007@gmail.com  
🔗 [linkedin.com/in/rahuls6120](https://linkedin.com/in/rahuls6120)  
💻 [github.com/rahuls6120](https://github.com/rahuls6120)