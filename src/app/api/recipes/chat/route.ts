import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/ai/claude';
import { buildChatSystemPrompt } from '@/lib/ai/recipe-prompt';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const { success } = rateLimit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const { message, recipeTitle, history } = await request.json();

    if (!message || !recipeTitle) {
      return NextResponse.json({ error: 'Message and recipe title are required' }, { status: 400 });
    }

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Build conversation history for Gemini
    const chatHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: buildChatSystemPrompt(recipeTitle) + '\n\nPlease acknowledge you understand your role.' }] },
        { role: 'model', parts: [{ text: 'Understood! I\'m Cheffy, ready to help with questions about this recipe. Fire away!' }] },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
