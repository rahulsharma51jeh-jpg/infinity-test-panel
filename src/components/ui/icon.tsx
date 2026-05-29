"use client";
import { Cpu, Network, BrainCircuit, RadioTower, Zap, Cog, Building2, Bot, FlaskConical } from "lucide-react";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Cpu, Network, BrainCircuit, RadioTower, Zap, Cog, Building2, Bot, FlaskConical,
};

interface BranchIconProps {
  name: string;
  className?: string;
}

export function BranchIcon({ name, className = "w-5 h-5" }: BranchIconProps) {
  const Icon = iconMap[name] || Cpu;
  return <Icon className={className} />;
}
