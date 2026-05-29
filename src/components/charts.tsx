"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs shadow-lg border border-border">
      <p className="text-muted mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-foreground font-medium">{entry.name || "Value"}: {entry.value}</p>
      ))}
    </div>
  );
}

export function PerformanceAreaChart({ data }: { data: Array<{ month: string; score: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
        <YAxis tick={{ fontSize: 11, fill: "var(--color-muted)" }} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="score" stroke="var(--color-primary)" fill="url(#scoreGradient)" strokeWidth={2} name="Score" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MasteryRadar({ data }: { data: Array<{ subject: string; mastery: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
        <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--color-muted)" }} />
        <Radar name="Mastery" dataKey="mastery" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DifficultyPie({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BarMini({ data, dataKey = "value", color = "var(--color-primary)" }: { data: Array<Record<string, unknown>>; dataKey?: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-muted)" }} />
        <YAxis tick={{ fontSize: 10, fill: "var(--color-muted)" }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
