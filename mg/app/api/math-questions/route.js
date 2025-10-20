import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function generateMathQuestions() {
  const questions = [];

  function generateWrongAnswers(correctAnswer, count = 3) {
    const wrongAnswers = new Set();
    const range = Math.max(15, Math.abs(correctAnswer) * 0.4);

    while (wrongAnswers.size < count) {
      const offset = Math.floor(Math.random() * range * 2) - range;
      let wrongAnswer = correctAnswer + offset;
      if (Number.isInteger(correctAnswer)) {
        wrongAnswer = Math.round(wrongAnswer);
      }
      if (wrongAnswer !== correctAnswer && !wrongAnswers.has(wrongAnswer)) {
        wrongAnswers.add(wrongAnswer);
      }
    }

    return Array.from(wrongAnswers);
  }

  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 300) + 100;
    const b = Math.floor(Math.random() * 100) + 20;
    const answer = a - b;
    questions.push({
      question: `${a} - ${b} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "subtraction",
    });
  }

  for (let i = 0; i < 15; i++) {
    const a = Math.floor(Math.random() * 30) + 10;
    const b = Math.floor(Math.random() * 25) + 5;
    const answer = a * b;
    questions.push({
      question: `${a} × ${b} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "multiplication",
    });
  }

  for (let i = 0; i < 10; i++) {
    const b = Math.floor(Math.random() * 12) + 3;
    const answer = Math.floor(Math.random() * 30) + 5;
    const a = b * answer;
    questions.push({
      question: `${a} ÷ ${b} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "division",
    });
  }

  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 15) + 5;
    const b = Math.floor(Math.random() * 12) + 5;
    const c = Math.floor(Math.random() * 30) + 10;
    const answer = a * b + c;
    questions.push({
      question: `${a} × ${b} + ${c} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "mixed",
    });
  }

  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 20) + 10;
    const b = Math.floor(Math.random() * 10) + 3;
    const c = Math.floor(Math.random() * 50) + 10;
    const answer = a * b - c;
    questions.push({
      question: `${a} × ${b} - ${c} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "mixed",
    });
  }

  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 15) + 5;
    const answer = a * a;
    questions.push({
      question: `${a}² = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "square",
    });
  }

  for (let i = 0; i < 10; i++) {
    const percentage = [15, 20, 25, 35, 50, 75][Math.floor(Math.random() * 6)];
    const number = Math.floor(Math.random() * 100) + 50;
    const answer = (number * percentage) / 100;
    questions.push({
      question: `${percentage}% of ${number} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "percentage",
    });
  }

  for (let i = 0; i < 5; i++) {
    const nums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 50) + 10);
    const answer = Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
    questions.push({
      question: `Average of ${nums.join(", ")} = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "average",
    });
  }

  for (let i = 0; i < 10; i++) {
    const answer = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 40) + 5;
    const a = answer + b;
    questions.push({
      question: `x + ${b} = ${a}, x = ?`,
      correct_answer: answer.toString(),
      incorrect_answers: generateWrongAnswers(answer).map(String),
      type: "equation",
    });
  }

  return questions;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get("count")) || 15;
    const allQuestions = generateMathQuestions();
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(count, 100));
    return NextResponse.json({
      results: selectedQuestions,
      total: selectedQuestions.length,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}