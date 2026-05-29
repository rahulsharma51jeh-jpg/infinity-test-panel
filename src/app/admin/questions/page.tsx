"use client";
import { AppShell } from "@/components/app-shell";
import { QuestionBankManager } from "@/components/admin/question-bank";

export default function AdminQuestionsPage() {
  return (
    <AppShell admin>
      <QuestionBankManager />
    </AppShell>
  );
}
