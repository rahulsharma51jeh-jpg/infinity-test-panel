import { Question, Difficulty, QuestionType } from "./types";
import { SUBJECTS } from "./subjects";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const CURATED_QUESTIONS: Question[] = [
  { id: "q1", text: "What is the time complexity of binary search?", type: "MCQ", difficulty: "Easy", subjectId: "dsa", unitId: "dsa-u5", topic: "Searching", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: 1, explanation: "Binary search divides the search space in half each iteration, giving O(log n).", tags: ["complexity","searching"] },
  { id: "q2", text: "Which data structure uses LIFO principle?", type: "MCQ", difficulty: "Easy", subjectId: "dsa", unitId: "dsa-u2", topic: "Stack Implementation", options: ["Queue", "Stack", "Linked List", "Tree"], correctAnswer: 1, explanation: "Stack follows Last-In-First-Out (LIFO) principle.", tags: ["stack","fundamentals"] },
  { id: "q3", text: "Worst case time complexity of Quick Sort is:", type: "MCQ", difficulty: "Medium", subjectId: "dsa", unitId: "dsa-u5", topic: "Quick Sort", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], correctAnswer: 1, explanation: "Quick Sort degrades to O(n^2) when pivot selection is poor (already sorted input).", tags: ["sorting","complexity"] },
  { id: "q4", text: "The eigenvalues of an identity matrix of order 3 are:", type: "MCQ", difficulty: "Easy", subjectId: "math1", unitId: "math1-u1", topic: "Eigenvalues", options: ["0, 0, 0", "1, 1, 1", "1, 0, 0", "1, 2, 3"], correctAnswer: 1, explanation: "Identity matrix has all eigenvalues equal to 1.", tags: ["eigenvalues","matrices"] },
  { id: "q5", text: "Divergence of a curl of any vector is always:", type: "MCQ", difficulty: "Medium", subjectId: "math1", unitId: "math1-u4", topic: "Divergence", options: ["1", "Infinity", "Zero", "Undefined"], correctAnswer: 2, explanation: "Divergence of curl is always zero (vector identity).", tags: ["vector calculus"] },
  { id: "q6", text: "In a PN junction, depletion region is formed due to:", type: "MCQ", difficulty: "Easy", subjectId: "phy1", unitId: "phy1-u4", topic: "PN Junction", options: ["Drift of carriers", "Diffusion of carriers", "Both drift and diffusion", "Recombination only"], correctAnswer: 1, explanation: "Depletion region forms due to diffusion of majority carriers across the junction.", tags: ["semiconductors"] },
  { id: "q7", text: "SQL command to remove a table from database:", type: "MCQ", difficulty: "Easy", subjectId: "dbms", unitId: "dbms-u2", topic: "DDL", options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "CLEAR TABLE"], correctAnswer: 2, explanation: "DROP TABLE is the DDL command to remove a table schema and data.", tags: ["sql","ddl"] },
  { id: "q8", text: "ACID in database stands for:", type: "MCQ", difficulty: "Easy", subjectId: "dbms", unitId: "dbms-u4", topic: "ACID Properties", options: ["Atomicity, Consistency, Isolation, Durability", "Addition, Consistency, Isolation, Data", "Atomicity, Concurrency, Isolation, Durability", "Atomicity, Consistency, Integration, Durability"], correctAnswer: 0, explanation: "ACID stands for Atomicity, Consistency, Isolation, Durability - the four properties that guarantee reliable transactions.", tags: ["transactions"] },
  { id: "q9", text: "Which scheduling algorithm may cause starvation?", type: "MCQ", difficulty: "Medium", subjectId: "os", unitId: "os-u1", topic: "Scheduling", options: ["Round Robin", "FCFS", "SJF", "SRTF"], correctAnswer: 2, explanation: "Shortest Job First can cause starvation for longer processes if short processes keep arriving.", tags: ["scheduling","os"] },
  { id: "q10", text: "Page fault occurs when:", type: "MCQ", difficulty: "Medium", subjectId: "os", unitId: "os-u2", topic: "Virtual Memory", options: ["Page is in memory", "Page is not in memory", "Page is corrupted", "Segmentation fault"], correctAnswer: 1, explanation: "A page fault occurs when a referenced page is not found in main memory and must be loaded from disk.", tags: ["memory","paging"] },
  { id: "q11", text: "In TCP/IP, which layer is responsible for routing?", type: "MCQ", difficulty: "Easy", subjectId: "cn", unitId: "cn-u2", topic: "IP Addressing", options: ["Application", "Transport", "Network", "Data Link"], correctAnswer: 2, explanation: "The Network layer (IP layer) handles routing of packets between networks.", tags: ["networking","layers"] },
  { id: "q12", text: "Nyquist sampling rate for a signal with bandwidth 5kHz:", type: "MCQ", difficulty: "Medium", subjectId: "signals", unitId: "sig-u3", topic: "CTFT", options: ["5 kHz", "10 kHz", "2.5 kHz", "20 kHz"], correctAnswer: 1, explanation: "Nyquist rate is twice the maximum frequency: 2 x 5kHz = 10kHz.", tags: ["sampling","signals"] },
  { id: "q13", text: "Carnot efficiency of an engine operating between 600K and 300K:", type: "MCQ", difficulty: "Medium", subjectId: "thermo", unitId: "thermo-u3", topic: "Carnot Cycle", options: ["25%", "50%", "75%", "100%"], correctAnswer: 1, explanation: "Carnot efficiency = 1 - Tc/Th = 1 - 300/600 = 50%.", tags: ["thermodynamics","efficiency"] },
  { id: "q14", text: "Reynolds number for turbulent flow in pipes is greater than:", type: "MCQ", difficulty: "Easy", subjectId: "fmech", unitId: "fm-u4", topic: "Turbulent Flow", options: ["500", "2000", "4000", "10000"], correctAnswer: 2, explanation: "Flow in pipes is turbulent when Reynolds number exceeds 4000.", tags: ["fluid mechanics"] },
  { id: "q15", text: "The normal form that eliminates transitive dependency is:", type: "MCQ", difficulty: "Medium", subjectId: "dbms", unitId: "dbms-u3", topic: "Functional Dependencies", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswer: 2, explanation: "3NF (Third Normal Form) eliminates transitive dependencies.", tags: ["normalization"] },
  { id: "q16", text: "In a BST, inorder traversal gives:", type: "MCQ", difficulty: "Easy", subjectId: "dsa", unitId: "dsa-u3", topic: "BST", options: ["Random order", "Sorted order", "Reverse sorted", "Level order"], correctAnswer: 1, explanation: "Inorder traversal of a BST always produces elements in sorted (ascending) order.", tags: ["trees","traversal"] },
  { id: "q17", text: "Which layer in OSI model handles encryption?", type: "MCQ", difficulty: "Medium", subjectId: "cn", unitId: "cn-u5", topic: "Cryptography", options: ["Network", "Transport", "Presentation", "Session"], correctAnswer: 2, explanation: "The Presentation layer handles data encryption, compression, and translation.", tags: ["osi","security"] },
  { id: "q18", text: "Virtual memory uses which of the following?", type: "MCQ", difficulty: "Easy", subjectId: "os", unitId: "os-u2", topic: "Virtual Memory", options: ["RAM only", "Disk only", "Both RAM and Disk", "Cache only"], correctAnswer: 2, explanation: "Virtual memory uses both RAM and disk space to give illusion of larger memory.", tags: ["memory"] },
  { id: "q19", text: "The Laplace transform of e^(at) is:", type: "MCQ", difficulty: "Easy", subjectId: "math2", unitId: "math2-u1", topic: "Analytic Functions", options: ["1/(s-a)", "1/(s+a)", "s/(s-a)", "a/(s-a)"], correctAnswer: 0, explanation: "L{e^(at)} = 1/(s-a) for s > a.", tags: ["laplace","transforms"] },
  { id: "q20", text: "SVM stands for:", type: "MCQ", difficulty: "Easy", subjectId: "ml", unitId: "ml-u1", topic: "SVM", options: ["Super Vector Machine", "Support Vector Machine", "System Vector Method", "Sorted Vector Machine"], correctAnswer: 1, explanation: "SVM stands for Support Vector Machine, a supervised learning algorithm.", tags: ["ml","classification"] },
  { id: "q21", text: "Which of the following is a loss function for regression?", type: "MCQ", difficulty: "Medium", subjectId: "ml", unitId: "ml-u1", topic: "Linear Regression", options: ["Cross-entropy", "Hinge loss", "Mean Squared Error", "Log loss"], correctAnswer: 2, explanation: "Mean Squared Error (MSE) is the standard loss function for regression problems.", tags: ["regression","loss"] },
  { id: "q22", text: "DH parameters are used in:", type: "MCQ", difficulty: "Medium", subjectId: "robo", unitId: "robo-u1", topic: "DH Parameters", options: ["Computer vision", "Robot kinematics", "Signal processing", "Database design"], correctAnswer: 1, explanation: "Denavit-Hartenberg parameters describe the geometry of robot links and joints for kinematic analysis.", tags: ["robotics","kinematics"] },
  { id: "q23", text: "In cloud computing, IaaS provides:", type: "MCQ", difficulty: "Easy", subjectId: "cc", unitId: "cc-u1", topic: "Service Models", options: ["Only software", "Infrastructure resources", "Only platforms", "Only networking"], correctAnswer: 1, explanation: "Infrastructure as a Service provides virtualized computing resources like VMs, storage, and networks.", tags: ["cloud","iaas"] },
  { id: "q24", text: "Fick's first law relates to:", type: "MCQ", difficulty: "Easy", subjectId: "masstrans", unitId: "mt-u1", topic: "Fick's Law", options: ["Heat transfer", "Mass diffusion", "Momentum transfer", "Radiation"], correctAnswer: 1, explanation: "Fick's first law describes steady-state mass diffusion relating flux to concentration gradient.", tags: ["mass transfer"] },
  { id: "q25", text: "The degree of static indeterminacy of a fixed beam is:", type: "MCQ", difficulty: "Medium", subjectId: "struc", unitId: "str-u1", topic: "Static Indeterminacy", options: ["0", "1", "2", "3"], correctAnswer: 3, explanation: "A fixed beam has 3 degrees of static indeterminacy (3 extra reactions beyond equilibrium equations).", tags: ["structures"] },
];

function generateQuestionsForUnit(subjectId: string, unitId: string, topics: string[], seed: number): Question[] {
  const rand = seededRandom(seed);
  const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
  const questions: Question[] = [];

  topics.forEach((topic, tIdx) => {
    const count = 4 + Math.floor(rand() * 3);
    for (let i = 0; i < count; i++) {
      const diff = difficulties[Math.floor(rand() * 3)];
      const qId = `${unitId}-gen-${tIdx}-${i}`;
      questions.push({
        id: qId,
        text: `[${topic}] Question ${i + 1}: Analyze the concept of ${topic} in the context of ${diff.toLowerCase()} level problems.`,
        type: "MCQ" as QuestionType,
        difficulty: diff,
        subjectId,
        unitId,
        topic,
        options: [
          `Option A for ${topic}`,
          `Option B for ${topic} (Correct)`,
          `Option C for ${topic}`,
          `Option D for ${topic}`,
        ],
        correctAnswer: 1,
        explanation: `This tests understanding of ${topic}. The correct answer demonstrates core principles.`,
        tags: [topic.toLowerCase().replace(/\s+/g, "-"), diff.toLowerCase()],
      });
    }
  });
  return questions;
}

let _questionBank: Question[] | null = null;

export function getQuestionBank(): Question[] {
  if (_questionBank) return _questionBank;
  const generated: Question[] = [...CURATED_QUESTIONS];
  let seed = 42;
  SUBJECTS.forEach(subject => {
    subject.units.forEach(unit => {
      const unitQuestions = generateQuestionsForUnit(subject.id, unit.id, unit.topics, seed);
      generated.push(...unitQuestions);
      seed += 97;
    });
  });
  _questionBank = generated;
  return generated;
}

export function filterQuestions(opts: { subjectId?: string; unitId?: string; difficulty?: Difficulty; type?: QuestionType; topic?: string }): Question[] {
  let qs = getQuestionBank();
  if (opts.subjectId) qs = qs.filter(q => q.subjectId === opts.subjectId);
  if (opts.unitId) qs = qs.filter(q => q.unitId === opts.unitId);
  if (opts.difficulty) qs = qs.filter(q => q.difficulty === opts.difficulty);
  if (opts.type) qs = qs.filter(q => q.type === opts.type);
  if (opts.topic) qs = qs.filter(q => q.topic.toLowerCase().includes(opts.topic!.toLowerCase()));
  return qs;
}

export function getMcqsForTest(subjectId: string, count: number, difficulty?: Difficulty): Question[] {
  let pool = filterQuestions({ subjectId, difficulty });
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function questionStats() {
  const bank = getQuestionBank();
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  const bySubject: Record<string, number> = {};
  bank.forEach(q => {
    byDifficulty[q.difficulty]++;
    bySubject[q.subjectId] = (bySubject[q.subjectId] || 0) + 1;
  });
  return { total: bank.length, byDifficulty, bySubject };
}
