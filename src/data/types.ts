export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "MCQ" | "MSQ" | "Numerical" | "True/False" | "Fill in the Blank" | "Match the Following" | "Assertion & Reason";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  subjectId: string;
  unitId: string;
  topic: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  tags: string[];
}

export interface Unit {
  id: string;
  name: string;
  topics: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  branchIds: string[];
  units: Unit[];
  credits: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  icon: string;
  gradient: string;
  students: number;
  description: string;
}

export interface Semester {
  number: number;
  label: string;
}

export const QUESTION_TYPES: QuestionType[] = [
  "MCQ", "MSQ", "Numerical", "True/False", "Fill in the Blank", "Match the Following", "Assertion & Reason"
];

export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];
