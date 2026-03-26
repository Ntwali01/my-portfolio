import { NextResponse } from 'next/server';
import { experiences, projects, services, skills } from '@/lib/portfolio-data';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const model = 'gemini-2.0-flash';

function buildPortfolioContext() {
  const servicesSummary = services.map((service) => `${service.title}: ${service.description}`).join('\n');
  const projectsSummary = projects
    .map((project) => `${project.title} (${project.status ?? 'active'}) - ${project.longDescription}`)
    .join('\n');
  const experienceSummary = experiences
    .map((experience) => `${experience.jobTitle} at ${experience.company} - ${experience.description}`)
    .join('\n');
  const skillsSummary = skills
    .map((group) => `${group.category}: ${group.items.join(', ')}`)
    .join('\n');

  return `
You are Adore AI Receptionist for Cyubahiro Ntwali Adore's portfolio website.
Your job is to answer questions professionally, briefly, and clearly.
You should sound like a polished AI receptionist for a freelance full-stack developer and AI builder.

Rules:
- Focus only on portfolio-related questions, services, projects, skills, experience, and starting collaboration.
- Be helpful for leads and guide visitors toward contacting Cyubahiro for serious inquiries.
- If asked about pricing, do not invent numbers. Say pricing depends on scope and recommend using the contact section.
- If asked something unrelated to the portfolio, redirect back to portfolio topics.
- Keep answers concise, ideally 2 to 5 sentences.
- Do not claim actions you cannot actually perform.
- If you are unsure, say so and suggest contacting through the portfolio form.

Portfolio facts:
Services:
${servicesSummary}

Projects:
${projectsSummary}

Experience:
${experienceSummary}

Skills:
${skillsSummary}
  `.trim();
}

function toGeminiContents(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.text }],
  }));
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GEMINI_API_KEY on the server.' },
      { status: 500 },
    );
  }

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!messages?.length) {
      return NextResponse.json({ error: 'Messages are required.' }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: buildPortfolioContext() }],
          },
          contents: toGeminiContents(messages),
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 220,
          },
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || 'Gemini request failed.';
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? '')
        .join('')
        .trim() || 'I can help with projects, services, and AI receptionist work. Tell me what you need.';

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Assistant route error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
