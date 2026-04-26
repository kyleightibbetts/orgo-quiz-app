import OpenAI from "openai";

export async function POST(req) {
  try {
    const { notes } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
You are an organic chemistry tutor.

Create a JSON quiz from these notes.

Return ONLY valid JSON in this format:
{
  "questions": [
    {
      "question": "...",
      "choices": ["A", "B", "C", "D"],
      "answer": "...",
      "explanation": "..."
    }
  ]
}

Make 5 multiple choice questions.

Notes:
${notes}
`,
    });

    return Response.json({ quiz: response.output_text });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}