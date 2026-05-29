export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  branch: string;
  semester: number;
  enrollmentNo: string;
  joinedDate: string;
  plan: "Free" | "Pro" | "Elite";
  testsCompleted: number;
  avgScore: number;
  rank: number;
  totalStudents: number;
}

export const STUDENT: StudentProfile = {
  id: "stu-001",
  name: "Rahul Sharma",
  email: "rahul.sharma@beu.ac.in",
  avatar: "",
  branch: "cse",
  semester: 5,
  enrollmentNo: "BEU2022CSE042",
  joinedDate: "2022-08-15",
  plan: "Pro",
  testsCompleted: 87,
  avgScore: 74,
  rank: 12,
  totalStudents: 480,
};

export const PERFORMANCE_TREND = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 65 },
  { month: "Mar", score: 68 },
  { month: "Apr", score: 71 },
  { month: "May", score: 74 },
  { month: "Jun", score: 72 },
  { month: "Jul", score: 78 },
  { month: "Aug", score: 76 },
  { month: "Sep", score: 80 },
  { month: "Oct", score: 82 },
  { month: "Nov", score: 79 },
  { month: "Dec", score: 84 },
];

export const SUBJECT_MASTERY = [
  { subject: "DSA", mastery: 85 },
  { subject: "OS", mastery: 72 },
  { subject: "DBMS", mastery: 78 },
  { subject: "CN", mastery: 65 },
  { subject: "ML", mastery: 70 },
  { subject: "SE", mastery: 82 },
];

export const DIFFICULTY_SPLIT = [
  { name: "Easy", value: 45, color: "#10b981" },
  { name: "Medium", value: 35, color: "#f59e0b" },
  { name: "Hard", value: 20, color: "#ef4444" },
];

export const WEAK_TOPICS = [
  { topic: "Graph Algorithms", subject: "DSA", accuracy: 42 },
  { topic: "Virtual Memory", subject: "OS", accuracy: 48 },
  { topic: "Network Security", subject: "CN", accuracy: 51 },
  { topic: "Normalization", subject: "DBMS", accuracy: 55 },
  { topic: "Neural Networks", subject: "ML", accuracy: 58 },
];

export const RECENT_TESTS = [
  { id: "t1", name: "DSA Mock Test 5", date: "2024-12-10", score: 82, total: 30, time: "45 min", difficulty: "Medium" },
  { id: "t2", name: "OS Unit 2 Practice", date: "2024-12-08", score: 68, total: 25, time: "35 min", difficulty: "Hard" },
  { id: "t3", name: "DBMS SQL Quiz", date: "2024-12-05", score: 90, total: 20, time: "20 min", difficulty: "Easy" },
  { id: "t4", name: "CN Full Mock", date: "2024-12-02", score: 71, total: 40, time: "60 min", difficulty: "Medium" },
  { id: "t5", name: "ML Classification", date: "2024-11-28", score: 76, total: 25, time: "40 min", difficulty: "Medium" },
];

export const ACHIEVEMENTS = [
  { id: "a1", title: "Speed Demon", description: "Complete a test in under 10 minutes", icon: "Zap", unlocked: true },
  { id: "a2", title: "Perfect Score", description: "Score 100% on any test", icon: "Crown", unlocked: true },
  { id: "a3", title: "Streak Master", description: "Maintain a 30-day streak", icon: "Flame", unlocked: true },
  { id: "a4", title: "Subject Expert", description: "Score 90%+ in all units of a subject", icon: "Star", unlocked: false },
  { id: "a5", title: "Night Owl", description: "Complete 10 tests after midnight", icon: "Moon", unlocked: false },
  { id: "a6", title: "Social Learner", description: "Share 50 questions with peers", icon: "Share2", unlocked: false },
];

export const LEADERBOARD = [
  { rank: 1, name: "Priya Patel", branch: "CSE", score: 92, tests: 124, avatar: "" },
  { rank: 2, name: "Amit Kumar", branch: "CSE", score: 89, tests: 116, avatar: "" },
  { rank: 3, name: "Sneha Reddy", branch: "IT", score: 87, tests: 108, avatar: "" },
  { rank: 4, name: "Vikram Singh", branch: "AI&DS", score: 86, tests: 98, avatar: "" },
  { rank: 5, name: "Neha Gupta", branch: "CSE", score: 85, tests: 112, avatar: "" },
  { rank: 6, name: "Arjun Nair", branch: "ECE", score: 84, tests: 95, avatar: "" },
  { rank: 7, name: "Kavya Sharma", branch: "CSE", score: 83, tests: 102, avatar: "" },
  { rank: 8, name: "Rohit Das", branch: "IT", score: 82, tests: 89, avatar: "" },
  { rank: 9, name: "Ananya Joshi", branch: "AI&DS", score: 81, tests: 94, avatar: "" },
  { rank: 10, name: "Karthik Menon", branch: "CSE", score: 80, tests: 88, avatar: "" },
  { rank: 11, name: "Divya Rao", branch: "ECE", score: 79, tests: 82, avatar: "" },
  { rank: 12, name: "Rahul Sharma", branch: "CSE", score: 74, tests: 87, avatar: "" },
];

export const STREAK_DAYS = 23;
