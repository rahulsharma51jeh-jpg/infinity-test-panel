import { useLanguage } from "../context/LanguageContext";

const FEATURES_LIVE = [
  ["🤖", "AI Auto Test Generator", "Balances papers by class, subject, chapter, difficulty & BSEB pattern."],
  ["🎚️", "Difficulty levels", "Easy, Medium, Hard and Mixed."],
  ["🧪", "Smart test modes", "Chapter, Topic, Full Syllabus, Weekly, Board Mock, PYQ, Revision."],
  ["⏱️", "Exam simulation", "Real timer, question palette, mark-for-review, OMR-style answering."],
  ["📜", "PYQ integration", "Bihar Board previous-year questions with repeated-question highlights."],
  ["📊", "Student analytics", "Accuracy, speed, weak-chapter detection, progress heatmap & streaks."],
  ["🧑‍🏫", "Teacher / Admin panel", "Add questions, draft with AI, approve suggestions, see bank summary."],
  ["💡", "Explanations & solutions", "Step-by-step solutions and concept explanations after each test."],
  ["🌐", "Bilingual + themes", "Hindi/English toggle, dark/light mode, mobile-first & low-data friendly."],
  ["💾", "Offline-friendly", "Works in the browser with local persistence — no login needed to try."],
];

const FEATURES_ROADMAP = [
  ["🧠", "LLM-powered generation & doubt solver", "Plug a real model into the generator & add a chat doubt-solver."],
  ["🗣️", "Voice assistant + auto subjective grading", "Speech learning aid and AI evaluation of written answers."],
  ["☁️", "Cloud backend & accounts", "Secure login, real-time DB, school-wise tests, rank system, PDF export."],
  ["📚", "Full licensed content", "Complete 5–7 yr PYQ bank for every subject + NEET/JEE foundation & Olympiad."],
];

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="fade-in">
      <section className="hero">
        <div className="deco" />
        <h1>∞ {t("appName")}</h1>
        <p>{t("appTagline")} — Class 6 to 12.</p>
      </section>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <div className="card pad">
          <h3>✅ Live in this build</h3>
          {FEATURES_LIVE.map(([icon, title, desc]) => (
            <div className="feature" key={title}>
              <span className="f-icon">{icon}</span>
              <div>
                <strong>{title}</strong>
                <p style={{ margin: "2px 0 0", fontSize: "0.86rem" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card pad">
          <h3>🚧 Roadmap (next phases)</h3>
          {FEATURES_ROADMAP.map(([icon, title, desc]) => (
            <div className="feature" key={title}>
              <span className="f-icon">{icon}</span>
              <div>
                <strong>{title}</strong>
                <p style={{ margin: "2px 0 0", fontSize: "0.86rem" }}>{desc}</p>
              </div>
            </div>
          ))}
          <p className="muted" style={{ fontSize: "0.82rem", marginTop: 10 }}>
            Note: This is an MVP foundation. The architecture (data-driven curriculum,
            pluggable question bank, generator engine) is built so these phases slot in
            without rewrites.
          </p>
        </div>
      </div>
    </div>
  );
}
