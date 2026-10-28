import { NextResponse } from 'next/server';
import {
  experiences,
  projects,
  services,
  skills,
  heroData,
  contactInfo,
  aboutData,
} from '@/lib/portfolio-data';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const model = 'gemini-3.8-flash';

function buildPortfolioContext() {
  const servicesSummary = services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join('\n');

  const projectsSummary = projects
    .map(
      (p) =>
        `- ${p.title} (Status: ${p.status}): ${p.description} Tech stack: ${p.techStack.join(', ')}. Scope: ${p.features.join('; ')}`
    )
    .join('\n');

  const experienceSummary = experiences
    .map(
      (e) =>
        `- ${e.jobTitle} at ${e.company} (${e.duration || 'Practical experience'}): ${e.description} Responsibilities: ${e.responsibilities.join('; ')}`
    )
    .join('\n');

  const skillsSummary = skills
    .map((s) => `- ${s.category}: ${s.items.join(', ')}`)
    .join('\n');

  return `
You are Adore Assistant, the professional portfolio assistant for Cyubahiro Ntwali Adore.
Your role is to answer questions accurately, concisely, and truthfully based ONLY on the verified portfolio facts below.

Verified Profile:
- Name: ${heroData.name}
- Professional Role: ${heroData.role}
- Location: ${contactInfo.location}
- Email: ${contactInfo.email}
- Phone: ${contactInfo.phone}
- Summary: ${aboutData.paragraphs.join(' ')}

Core Facts:
Services:
${servicesSummary}

Projects:
${projectsSummary}

Experience:
${experienceSummary}

Skills:
${skillsSummary}

Strict Guidelines:
1. NEVER invent or claim:
   - Fictional years of experience (do NOT say 5+ years).
   - Arbitrary client counts (do NOT say 20+ clients).
   - Unverified employers, certifications, degrees, or awards.
   - Specific pricing or hourly rates (state that project scope determines requirements and invite them to email ${contactInfo.email}).
   - Fake repository or live demo links.
2. Accurately represent his background:
   - Practical robotics teleoperation at Neotix (handheld controllers, VR headsets, YAM-YAM leader-follower robotic arms).
   - Standard Operating Procedure (SOP) video review and quality assurance (validating/rejecting recordings).
   - Modern web development with React.js, Node.js, and MySQL.
   - UI/UX design and modern web applications.
3. Keep answers concise, clear, and professional (typically 2 to 4 sentences).
4. Direct business inquiries to the contact form or email (${contactInfo.email}).
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
    return NextResponse.json({
      text: "Portfolio Assistant Demo Mode: An active GEMINI_API_KEY is not configured in this environment. Cyubahiro is a Software Developer with practical experience in Robotics Teleoperation, Video QA at Neotix, and Web Development. You can reach him directly at cyubahirontwaliadore@gmail.com.",
      isDemo: true,
    });
  }

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!messages?.length) {
      return NextResponse.json({ error: 'Messages are required.' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: buildPortfolioContext() }],
          },
          contents: toGeminiContents(messages),
          generationConfig: {
            temperature: 0.5,
            topP: 0.85,
            maxOutputTokens: 250,
          },
        }),
      },
    );
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error?.message || 'Gemini request failed.';
      console.error('Gemini error:', errorMessage);
      return NextResponse.json({
        text: `Portfolio Assistant: Currently unable to process live AI requests (${errorMessage}). Please connect directly with Cyubahiro at ${contactInfo.email}.`,
        error: errorMessage,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? '')
        .join('')
        .trim() ||
      `I can share details about Cyubahiro's robotics teleoperation experience at Neotix, video quality assurance, or web projects like SIMS and SendFlow.`;

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Assistant route error:', error);
    return NextResponse.json(
      {
        text: `Portfolio Assistant: A server connection error occurred. Please reach Cyubahiro directly at ${contactInfo.email}.`,
      },
      { status: 500 },
    );
  }
}
