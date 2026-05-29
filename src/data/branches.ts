import { Branch, Semester } from "./types";

export const BRANCHES: Branch[] = [
  { id: "cse", name: "Computer Science & Engineering", code: "CSE", icon: "Cpu", gradient: "from-blue-500 to-indigo-600", students: 480, description: "Algorithms, AI, systems programming, and software engineering" },
  { id: "it", name: "Information Technology", code: "IT", icon: "Network", gradient: "from-cyan-500 to-blue-600", students: 360, description: "Networking, web technologies, databases, and cyber security" },
  { id: "aids", name: "AI & Data Science", code: "AI&DS", icon: "BrainCircuit", gradient: "from-purple-500 to-pink-600", students: 240, description: "Machine learning, deep learning, big data, and analytics" },
  { id: "ece", name: "Electronics & Communication", code: "ECE", icon: "RadioTower", gradient: "from-green-500 to-teal-600", students: 360, description: "Signal processing, VLSI, embedded systems, and communications" },
  { id: "ee", name: "Electrical Engineering", code: "EE", icon: "Zap", gradient: "from-yellow-500 to-orange-600", students: 240, description: "Power systems, control systems, machines, and renewable energy" },
  { id: "me", name: "Mechanical Engineering", code: "ME", icon: "Cog", gradient: "from-red-500 to-rose-600", students: 360, description: "Thermodynamics, manufacturing, robotics, and CAD/CAM" },
  { id: "ce", name: "Civil Engineering", code: "CE", icon: "Building2", gradient: "from-amber-500 to-yellow-600", students: 240, description: "Structures, geotechnical, transportation, and environmental engineering" },
  { id: "mech", name: "Mechatronics Engineering", code: "MCT", icon: "Bot", gradient: "from-indigo-500 to-violet-600", students: 120, description: "Integration of mechanical, electronics, and computer systems" },
  { id: "chem", name: "Chemical Engineering", code: "CHE", icon: "FlaskConical", gradient: "from-emerald-500 to-green-600", students: 120, description: "Process engineering, petrochemicals, and materials science" },
];

export const SEMESTERS: Semester[] = [
  { number: 1, label: "Semester 1" },
  { number: 2, label: "Semester 2" },
  { number: 3, label: "Semester 3" },
  { number: 4, label: "Semester 4" },
  { number: 5, label: "Semester 5" },
  { number: 6, label: "Semester 6" },
  { number: 7, label: "Semester 7" },
  { number: 8, label: "Semester 8" },
];

export function getBranch(id: string): Branch | undefined {
  return BRANCHES.find(b => b.id === id);
}
