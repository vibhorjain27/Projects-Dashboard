/**
 * projects.js — Central data file for the portfolio dashboard
 *
 * To add a new project, just append a new object to the `projects` array.
 *
 * Required fields: id, title, category, description, tags, githubUrl
 * Optional fields: liveUrl, thumbnail, featured, status
 */

const PROJECTS = [
  {
    id: "nbfc-benchmarking",
    title: "NBFC Benchmarking Dashboard",
    category: "professional",
    shortDesc: "Interactive analytics platform for benchmarking Non-Banking Financial Companies across key performance indicators.",
    fullDesc: "An interactive analytics platform for benchmarking Non-Banking Financial Companies (NBFCs) across key performance indicators. Enables comparative analysis of asset quality, growth metrics, and financial ratios across the NBFC sector — built for analysts and researchers navigating the Indian fintech landscape.",
    tags: ["Python", "Streamlit", "Finance", "Analytics", "Data Viz"],
    liveUrl: "https://nbfc-dashboard.streamlit.app/",
    githubUrl: "https://github.com/vibhorjain27/nbfc-dashboard",
    featured: true,
    status: "live",       // 'live' | 'wip' | 'archived'
    icon: "📊"
  },
  {
    id: "nbfc-branch-intelligence",
    title: "NBFC Branch Intelligence",
    category: "professional",
    shortDesc: "Geospatial intelligence tool that maps and analyzes NBFC branch networks across India.",
    fullDesc: "A geospatial intelligence tool that maps NBFC branch networks across India. Helps identify coverage gaps, understand the geographic distribution of financial services, and support data-driven decisions around branch placement strategy and market expansion.",
    tags: ["JavaScript", "Maps", "Geospatial", "Finance", "Analytics"],
    liveUrl: "https://vibhorjain27.github.io/Branch-Locator/",
    githubUrl: "https://github.com/vibhorjain27/Branch-Locator",
    featured: true,
    status: "live",
    icon: "🗺️"
  },
  {
    id: "bms-auto-booking",
    title: "BMS Auto-Booking",
    category: "personal",
    shortDesc: "Automated monitoring and notification system for BookMyShow seat availability.",
    fullDesc: "An automated monitoring and notification system for BookMyShow. Tracks seat availability for concerts, sports events, and shows in real time — and triggers instant alerts when preferred seats open up. Never miss out on a sold-out event again.",
    tags: ["Python", "Automation", "Web Scraping", "Notifications"],
    liveUrl: null,
    githubUrl: "https://github.com/vibhorjain27/BMS-Notification",
    featured: false,
    status: "live",
    icon: "🎟️"
  },
  {
    id: "sports-betting-simulator",
    title: "Sports Betting Simulator",
    category: "personal",
    shortDesc: "IPL cricket betting simulator that models match outcomes using real statistical data.",
    fullDesc: "An IPL cricket betting simulator that models match outcomes using real statistical data. Test your betting strategies, explore probability dynamics, and understand risk — all without any real money on the line. Built for cricket fans who love numbers as much as the game.",
    tags: ["Python", "Statistics", "Sports", "Simulation", "IPL"],
    liveUrl: null,
    githubUrl: "https://github.com/vibhorjain27/IPL",
    featured: false,
    status: "live",
    icon: "🏏"
  }

  ,
  {
    id: "imdb-watchlist-recommender",
    title: "IMDB Watchlist Recommendation Engine",
    category: "personal",
    shortDesc: "AI-powered engine that analyses your IMDB watchlist and surfaces personalised movie & show recommendations.",
    fullDesc: "An AI-powered recommendation engine that digs into your IMDB watchlist to understand your taste — genres, directors, eras, themes — and surfaces movies and shows you're actually likely to enjoy. No more scrolling endlessly through streaming catalogues; just smart, personalised picks backed by data.",
    tags: ["AI", "Recommendations", "Movies", "IMDB", "NLP"],
    liveUrl: "https://beautiful-nasturtium-01caad.netlify.app/",
    githubUrl: null,
    featured: true,
    status: "live",
    icon: "🎬"
  }

  // ─── Add new projects below this line ───────────────────────────────────────
  //
  // {
  //   id: "your-project-id",
  //   title: "Your Project Title",
  //   category: "professional",   // or "personal"
  //   shortDesc: "One-liner description shown on the card.",
  //   fullDesc: "Longer description shown in the modal/expanded view.",
  //   tags: ["Tag1", "Tag2"],
  //   liveUrl: "https://...",      // or null if no live URL
  //   githubUrl: "https://github.com/vibhorjain27/...",
  //   featured: false,
  //   status: "live",
  //   icon: "🚀"
  // },

];
