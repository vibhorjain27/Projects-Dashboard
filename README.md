# 🚀 Projects Dashboard

A curated portfolio of projects built with Claude AI, showcasing work across fintech analytics, automation, and data tools.

**Live URL:** https://vibhorjain27.github.io/Projects-Dashboard/

---

## Projects

| Project | Category | Live URL |
|---|---|---|
| NBFC Benchmarking Dashboard | Professional | [nbfc-dashboard.streamlit.app](https://nbfc-dashboard.streamlit.app/) |
| NBFC Branch Intelligence | Professional | [Branch Locator](https://vibhorjain27.github.io/Branch-Locator/) |
| BMS Auto-Booking | Personal | — |
| Sports Betting Simulator | Personal | — |

---

## Adding a New Project

Open `projects.js` and append a new object to the `PROJECTS` array:

```js
{
  id: "your-project-id",          // unique slug
  title: "Your Project Title",
  category: "professional",        // "professional" | "personal"
  shortDesc: "One-liner for the card.",
  fullDesc: "Full description shown in the detail modal.",
  tags: ["Python", "Tag2"],
  liveUrl: "https://...",          // or null
  githubUrl: "https://github.com/vibhorjain27/...",
  featured: false,
  status: "live",                  // "live" | "wip" | "archived"
  icon: "🚀"
}
```

That's it — the dashboard auto-renders everything.

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript — zero dependencies, zero build step
- Hosted on GitHub Pages
- Google Fonts (Inter + Fira Code) via CDN

## Local Preview

```bash
# Any static server works, e.g.:
npx serve .
# or
python -m http.server 8080
```
