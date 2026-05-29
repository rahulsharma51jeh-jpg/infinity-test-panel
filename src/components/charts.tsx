/** Lightweight, dependency-free chart primitives (great for low-internet). */

export function BarChart({
  data,
  max = 100,
  suffix = "%",
}: {
  data: { label: string; value: number }[];
  max?: number;
  suffix?: string;
}) {
  if (data.length === 0) return null;
  const ceiling = Math.max(max, ...data.map((d) => d.value)) || 1;
  return (
    <div className="chart-wrap">
      <div className="bar-track">
        {data.map((d, i) => (
          <div className="bar-col" key={i}>
            <span className="bar-val">
              {d.value}
              {suffix}
            </span>
            <div
              className="bar"
              style={{ height: `${(d.value / ceiling) * 100}%` }}
              title={`${d.label}: ${d.value}${suffix}`}
            />
            <span className="bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressRow({
  label,
  value,
  right,
}: {
  label: string;
  value: number; // 0..100
  right?: string;
}) {
  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.85rem",
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        <span>{label}</span>
        <span className="muted">{right ?? `${value}%`}</span>
      </div>
      <div className="progress-line">
        <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function Heatmap({ data }: { data: { date: string; count: number }[] }) {
  const level = (c: number) => (c === 0 ? "" : c === 1 ? "heat-1" : c === 2 ? "heat-2" : c === 3 ? "heat-3" : "heat-4");
  return (
    <div className="chart-wrap">
      <div className="heatmap">
        {data.map((d, i) => (
          <div
            key={i}
            className={`heat-cell ${level(d.count)}`}
            title={`${d.date}: ${d.count} test(s)`}
          />
        ))}
      </div>
    </div>
  );
}
