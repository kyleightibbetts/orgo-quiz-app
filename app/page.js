"use client";

import { useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const examQuestions = [
    {
      topic: "SN1",
      type: "Mechanism",
      question: "Which mechanism best describes an SN1 reaction?",
      answer: "Leaving group leaves first, forming a carbocation, then the nucleophile attacks.",
      choices: [
        "Leaving group leaves first, forming a carbocation, then the nucleophile attacks.",
        "Nucleophile attacks and leaving group leaves at the same time.",
        "Strong base removes a proton as the leaving group leaves.",
        "A pi bond attacks HBr to form an alkene.",
      ],
      explanation: "SN1 is a two-step substitution reaction with a carbocation intermediate.",
    },
    {
      topic: "SN2",
      type: "Stereochemistry",
      question: "What stereochemical outcome is expected in an SN2 reaction?",
      answer: "Inversion of configuration",
      choices: ["Inversion of configuration", "Complete racemization", "No stereochemical change", "Syn addition"],
      explanation: "SN2 occurs by backside attack, which flips the stereochemistry.",
    },
    {
      topic: "E1",
      type: "Mechanism",
      question: "Which intermediate is formed during an E1 reaction?",
      answer: "Carbocation",
      choices: ["Carbocation", "Carbanion", "Radical only", "No intermediate"],
      explanation: "E1 forms a carbocation before alkene formation.",
    },
    {
      topic: "E2",
      type: "Mechanism",
      question: "What is required for an E2 reaction to occur efficiently?",
      answer: "Strong base and anti-periplanar geometry",
      choices: [
        "Strong base and anti-periplanar geometry",
        "Weak nucleophile and carbocation formation",
        "Water and racemization",
        "Peroxides and radical bromination",
      ],
      explanation: "E2 is concerted and requires anti-periplanar alignment.",
    },
    {
      topic: "Alkene",
      type: "Product Prediction",
      question: "What is the major outcome when an alkene reacts with HBr without peroxides?",
      answer: "Markovnikov addition",
      choices: ["Markovnikov addition", "Anti-Markovnikov addition", "No reaction", "Only oxidation"],
      explanation: "Without peroxides, HBr adds through a carbocation and follows Markovnikov's rule.",
    },
    {
      topic: "Carbocation",
      type: "Stability",
      question: "Why can rearrangements occur in SN1, E1, or alkene addition reactions?",
      answer: "A hydride or alkyl shift can form a more stable carbocation.",
      choices: [
        "A hydride or alkyl shift can form a more stable carbocation.",
        "The nucleophile attacks before the leaving group leaves.",
        "The reaction avoids intermediates.",
        "The base attacks the least substituted carbon.",
      ],
      explanation: "Rearrangements happen when a shift creates a more stable carbocation.",
    },
    {
      topic: "Comparison",
      type: "Reaction Choice",
      question: "A primary alkyl halide with a strong nucleophile most likely favors which reaction?",
      answer: "SN2",
      choices: ["SN2", "SN1", "E1", "No reaction"],
      explanation: "Primary substrates and strong nucleophiles favor SN2.",
    },
    {
      topic: "Comparison",
      type: "Reaction Choice",
      question: "A tertiary alkyl halide with a strong bulky base most likely favors which reaction?",
      answer: "E2",
      choices: ["E2", "SN2", "SN1 only", "Hydration"],
      explanation: "Strong bulky bases favor elimination, especially with tertiary substrates.",
    },
  ];

  function generateQuiz() {
    const lowerNotes = notes.toLowerCase();
    let selected = [...examQuestions];

    if (lowerNotes.includes("sn1")) selected = selected.filter(q => q.topic === "SN1" || q.topic === "Comparison" || q.topic === "Carbocation");
    if (lowerNotes.includes("sn2")) selected = selected.filter(q => q.topic === "SN2" || q.topic === "Comparison");
    if (lowerNotes.includes("e1")) selected = selected.filter(q => q.topic === "E1" || q.topic === "Comparison" || q.topic === "Carbocation");
    if (lowerNotes.includes("e2")) selected = selected.filter(q => q.topic === "E2" || q.topic === "Comparison");
    if (lowerNotes.includes("alkene") || lowerNotes.includes("hbr")) selected = selected.filter(q => q.topic === "Alkene" || q.topic === "Carbocation");

    if (selected.length < 5) selected = [...examQuestions];

    const questions = shuffle(selected).slice(0, 8).map((q, index) => ({
      ...q,
      id: index + 1,
      choices: shuffle(q.choices),
    }));

    setQuiz(questions);
    setAnswers({});
    setShowResults(false);
  }

  function getScore() {
    return quiz.reduce((score, q) => score + (answers[q.id] === q.answer ? 1 : 0), 0);
  }

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.badge}>Organic Chemistry Study Tool</p>
        <h1 style={styles.title}>Organic Chemistry Quiz Generator</h1>
        <p style={styles.subtitle}>
          Create exam-style practice questions for SN1, SN2, E1, E2, alkene reactions, carbocations, and stereochemistry.
        </p>
      </section>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Enter your study topics</h2>
        <p style={styles.helper}>
          Example: SN1, SN2, E1, E2, HBr, alkenes, carbocation rearrangements, stereochemistry
        </p>

        <textarea
          placeholder="Paste your organic chemistry topics or notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={generateQuiz} style={styles.primaryButton}>
          Generate Exam Quiz
        </button>
      </section>

      {quiz.length > 0 && (
        <section style={styles.quizSection}>
          {quiz.map((q) => (
            <div key={q.id} style={styles.questionCard}>
              <div style={styles.questionTop}>
                <span style={styles.tag}>{q.topic}</span>
                <span style={styles.tagLight}>{q.type}</span>
              </div>

              <h3 style={styles.question}>
                {q.id}. {q.question}
              </h3>

              <div>
                {q.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setAnswers({ ...answers, [q.id]: choice })}
                    style={{
                      ...styles.choiceButton,
                      backgroundColor: answers[q.id] === choice ? "#dbeafe" : "#ffffff",
                      borderColor: answers[q.id] === choice ? "#2563eb" : "#d1d5db",
                    }}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              {showResults && (
                <div style={styles.answerBox}>
                  <p><strong>Correct answer:</strong> {q.answer}</p>
                  <p><strong>Explanation:</strong> {q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <button onClick={() => setShowResults(true)} style={styles.secondaryButton}>
            Check Answers
          </button>

          {showResults && (
            <div style={styles.scoreBox}>
              Score: {getScore()} / {quiz.length}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#111827",
  },
  hero: {
    maxWidth: 900,
    margin: "0 auto 24px",
    padding: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    fontWeight: "bold",
    fontSize: 13,
  },
  title: {
    fontSize: 42,
    margin: "16px 0 8px",
  },
  subtitle: {
    fontSize: 17,
    color: "#4b5563",
    lineHeight: 1.6,
  },
  card: {
    maxWidth: 900,
    margin: "0 auto 24px",
    padding: 26,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 24,
  },
  helper: {
    color: "#6b7280",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    height: 190,
    padding: 14,
    fontSize: 15,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    outline: "none",
    marginBottom: 16,
  },
  primaryButton: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },
  quizSection: {
    maxWidth: 900,
    margin: "0 auto",
  },
  questionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
  },
  questionTop: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },
  tagLight: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "bold",
  },
  question: {
    fontSize: 18,
    lineHeight: 1.5,
  },
  choiceButton: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: 12,
    margin: "8px 0",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontSize: 14,
  },
  answerBox: {
    marginTop: 14,
    padding: 14,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    border: "1px solid #bbf7d0",
  },
  secondaryButton: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },
  scoreBox: {
    marginTop: 16,
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    fontSize: 22,
    fontWeight: "bold",
    boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
  },
};