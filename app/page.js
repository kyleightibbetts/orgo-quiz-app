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
        "A pi bond attacks HBr to form an alkene."
      ],
      explanation: "SN1 is a two-step substitution reaction with a carbocation intermediate."
    },
    {
      topic: "SN2",
      type: "Stereochemistry",
      question: "What stereochemical outcome is expected in an SN2 reaction?",
      answer: "Inversion of configuration",
      choices: [
        "Inversion of configuration",
        "Complete racemization",
        "No stereochemical change",
        "Syn addition"
      ],
      explanation: "SN2 occurs by backside attack, which flips the stereochemistry."
    },
    {
      topic: "E1",
      type: "Mechanism",
      question: "Which intermediate is formed during an E1 reaction?",
      answer: "Carbocation",
      choices: [
        "Carbocation",
        "Carbanion",
        "Radical only",
        "No intermediate"
      ],
      explanation: "E1 is a two-step elimination that forms a carbocation before alkene formation."
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
        "Peroxides and radical bromination"
      ],
      explanation: "E2 is concerted and requires the beta hydrogen and leaving group to be anti-periplanar."
    },
    {
      topic: "Alkene",
      type: "Product Prediction",
      question: "What is the major outcome when an alkene reacts with HBr without peroxides?",
      answer: "Markovnikov addition",
      choices: [
        "Markovnikov addition",
        "Anti-Markovnikov addition",
        "No reaction",
        "Only oxidation"
      ],
      explanation: "Without peroxides, HBr adds through a carbocation and follows Markovnikov's rule."
    },
    {
      topic: "Alkene",
      type: "Reagent Effect",
      question: "What changes when HBr reacts with an alkene in the presence of peroxides?",
      answer: "The reaction becomes anti-Markovnikov.",
      choices: [
        "The reaction becomes anti-Markovnikov.",
        "The reaction becomes SN1.",
        "The alkene cannot react.",
        "The product is always an alcohol."
      ],
      explanation: "Peroxides cause a radical pathway, leading to anti-Markovnikov addition of HBr."
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
        "The base must always attack the least substituted carbon."
      ],
      explanation: "Carbocation rearrangements happen when a shift creates a more stable carbocation."
    },
    {
      topic: "Comparison",
      type: "Reaction Choice",
      question: "A strong nucleophile attacking a primary alkyl halide most likely favors which reaction?",
      answer: "SN2",
      choices: ["SN2", "SN1", "E1", "No reaction"],
      explanation: "Primary substrates and strong nucleophiles favor SN2 because backside attack is accessible."
    },
    {
      topic: "Comparison",
      type: "Reaction Choice",
      question: "A tertiary alkyl halide in a polar protic solvent with a weak nucleophile most likely favors which reaction?",
      answer: "SN1",
      choices: ["SN1", "SN2", "Radical halogenation", "Anti-Markovnikov addition"],
      explanation: "Tertiary substrates form stable carbocations, and polar protic solvents support SN1."
    },
    {
      topic: "Comparison",
      type: "Reaction Choice",
      question: "A tertiary alkyl halide with a strong bulky base most likely favors which reaction?",
      answer: "E2",
      choices: ["E2", "SN2", "SN1 only", "Hydration"],
      explanation: "Strong bulky bases favor elimination, especially with tertiary substrates."
    }
  ];

  function generateQuiz() {
    let selected = [...examQuestions];

    const lowerNotes = notes.toLowerCase();

    if (lowerNotes.includes("sn1")) selected = selected.filter(q => q.topic === "SN1" || q.topic === "Comparison" || q.topic === "Carbocation");
    if (lowerNotes.includes("sn2")) selected = selected.filter(q => q.topic === "SN2" || q.topic === "Comparison");
    if (lowerNotes.includes("e1")) selected = selected.filter(q => q.topic === "E1" || q.topic === "Comparison" || q.topic === "Carbocation");
    if (lowerNotes.includes("e2")) selected = selected.filter(q => q.topic === "E2" || q.topic === "Comparison");
    if (lowerNotes.includes("alkene") || lowerNotes.includes("hbr")) selected = selected.filter(q => q.topic === "Alkene" || q.topic === "Carbocation");

    if (selected.length < 5) selected = [...examQuestions];

    const questions = shuffle(selected).slice(0, 8).map((q, index) => ({
      ...q,
      id: index + 1,
      choices: shuffle(q.choices)
    }));

    setQuiz(questions);
    setAnswers({});
    setShowResults(false);
  }

  function getScore() {
    let score = 0;
    quiz.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      <h1>Organic Chemistry Exam Practice</h1>

      <p>
        Paste your topic notes below. This free version creates exam-style organic chemistry questions without AI.
      </p>

      <textarea
        placeholder="Example: SN1, SN2, E1, E2, alkene reactions, HBr, carbocations..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{
          width: "100%",
          height: 180,
          marginBottom: 10,
          padding: 10,
          fontSize: 14
        }}
      />

      <br />

      <button onClick={generateQuiz} style={{ padding: 12, marginBottom: 20 }}>
        Generate Exam Quiz
      </button>

      {quiz.length > 0 && (
        <div>
          {quiz.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 20,
                borderRadius: 8,
              }}
            >
              <p>
                <b>{q.id}. {q.question}</b>
              </p>

              <p>
                <b>Topic:</b> {q.topic} | <b>Question Type:</b> {q.type}
              </p>

              {q.choices.map((choice) => (
                <div key={choice}>
                  <button
                    onClick={() => setAnswers({ ...answers, [q.id]: choice })}
                    style={{
                      margin: 5,
                      padding: 8,
                      backgroundColor: answers[q.id] === choice ? "#d9eaff" : "white",
                      border: "1px solid #999",
                      borderRadius: 5,
                      cursor: "pointer"
                    }}
                  >
                    {choice}
                  </button>
                </div>
              ))}

              {showResults && (
                <div style={{ marginTop: 10 }}>
                  <p>
                    <b>Correct answer:</b> {q.answer}
                  </p>
                  <p>
                    <b>Explanation:</b> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          <button onClick={() => setShowResults(true)} style={{ padding: 12 }}>
            Check Answers
          </button>

          {showResults && (
            <h2>
              Score: {getScore()} / {quiz.length}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}