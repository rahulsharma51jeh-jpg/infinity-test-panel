import { NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import type { TranslationKey } from "../i18n";

const NAV: { to: string; key: TranslationKey; icon: string }[] = [
  { to: "/", key: "navDashboard", icon: "🏠" },
  { to: "/generate", key: "navGenerate", icon: "🤖" },
  { to: "/pyq", key: "navPyq", icon: "📜" },
  { to: "/analytics", key: "navAnalytics", icon: "📊" },
  { to: "/admin", key: "navAdmin", icon: "🧑‍🏫" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  // Hide chrome during an active exam for a focused environment
  const isExam = location.pathname.startsWith("/test/");

  return (
    <div className="app-shell">
      {!isExam && (
        <header className="topbar">
          <NavLink to="/" className="brand">
            <span className="logo">∞</span>
            <span>
              {t("appName")}
              <small>{t("appTagline")}</small>
            </span>
          </NavLink>

          <nav className="nav-links">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"}>
                {t(n.key)}
              </NavLink>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              className="icon-btn lang-btn"
              onClick={toggleLang}
              title="Switch language / भाषा बदलें"
              aria-label="Switch language"
            >
              {lang === "en" ? "हिं" : "EN"}
            </button>
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </header>
      )}

      <main className="container">{children}</main>

      {!isExam && (
        <nav className="bottom-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"}>
              <span className="bn-icon">{n.icon}</span>
              {t(n.key)}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
