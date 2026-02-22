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
- **Featured Projects** — 3 projects including a peer-reviewed published AI paper
- **Certifications** — IBM · Google · AWS · Tableau · Deloitte · Alteryx
- **Contact** — Email + LinkedIn links

**Interactive effects:**
- Indigo dotted cursor trail (canvas-based)
- Scroll progress bar (top of page)
- Scroll-aware navbar + active section highlighting
- AOS scroll animations

---

### `cognizant-faq.html` — CTS Newcomer Guide
An interactive FAQ page for people joining Cognizant, with an AI chatbot powered by the Gemini API.

**Key features:**
- **AI Chatbot** — Powered by `gemini-2.5-flash` with full context about Rahul's Cognizant experience
  - Client-side rate limiting: 30 msgs/day, 10 msgs/min (via `localStorage`)
  - Visual usage progress bar
  - "Ask Rahul Directly" fallback (LinkedIn + Email) when AI is uncertain
- **FAQ Accordion** — 7 topic categories with smooth open/close animations
- **Category Filter** — Filter FAQs by topic (Interview, Documents, Training, etc.)
- **Pro Tip Boxes** — Highlighted insider tips within FAQ answers

**Interactive effects:**
- Teal dotted cursor trail (distinct from portfolio's indigo)
- Animated mesh orbs in hero section
- Scroll progress bar
- Floating FAQ read badge (tracks topics explored)
- AOS scroll animations

---

## 🛠️ Tech Stack

| Layer | Details |
|---|---|
| **Markup** | Semantic HTML5 |
| **Styling** | Pure Vanilla CSS (no Tailwind, no frameworks) |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Icons** | Phosphor Icons (CDN) |
| **Animations** | AOS (Animate On Scroll) + custom CSS keyframes |
| **AI** | Google Gemini API (`gemini-2.5-flash`) |
| **Analytics** | Datafa.st |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |

---

## 📁 File Structure

```
web-update-main/
├── index.html                  # Main portfolio page
├── cognizant-faq.html          # CTS Newcomer Guide + AI chatbot
├── S_Rahul_Resume_10-Feb.pdf   # Downloadable CV
├── Rahul S - Photograph.png    # Profile photo
├── style.css                   # Legacy styles (not active)
├── advanced-effects.css        # Legacy effects (not active)
├── script.js                   # Legacy JS (not active)
├── CNAME                       # GitHub Pages custom domain
└── README.md                   # This file
```

> **Note:** `style.css`, `advanced-effects.css`, and `script.js` are legacy files. The active pages (`index.html`, `cognizant-faq.html`) use fully inline CSS and JS for robustness.

---

## 🤖 AI Chatbot Setup

The chatbot uses the **Google Gemini API** (free tier). The API key is embedded client-side — acceptable for free-tier personal use with rate limiting enabled.

**Model:** `gemini-2.5-flash`  
**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

To replace the API key, search for `const API_KEY` in `cognizant-faq.html`.

> For production/high-traffic use, proxy the API key through a backend to avoid key exposure.

---

## 🚀 Deployment

Hosted via **GitHub Pages** with a custom domain configured through `CNAME`.

To deploy changes: push to the `main` branch — GitHub Pages auto-deploys.

---

## 👤 About

**Rahul S** — Analyst Trainee (Data Engineering) at Cognizant Technology Solutions, Chennai.  
BS CS with Data Analytics, Sri Ramakrishna College of Arts & Science (CGPA 7.87).  
Published researcher in AI/ML · 8 certifications · IBM DataStage · Informatica · Power BI

📧 subbiahrahul007@gmail.com  
🔗 [linkedin.com/in/rahuls6120](https://linkedin.com/in/rahuls6120)  
💻 [github.com/rahuls6120](https://github.com/rahuls6120)