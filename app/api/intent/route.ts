import { NextResponse } from "next/server";
import { openai } from "@/lib/ai/openai";
import { INTENT_EXTRACTION_PROMPT } from "@/lib/ai/prompts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, sourceApp = "Gmail", sender = "Unknown" } = body;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Optimized for speed and cost in YC demos
      messages: [
        { role: "system", content: INTENT_EXTRACTION_PROMPT },
        { role: "user", content: `Message content:\n"${text}"` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Low temp for predictable JSON
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");

    // Construct the final payload for the frontend
    const payload = {
      id: `task-${Date.now()}`,
      sourceApp,
      sender,
      snippet: text.substring(0, 50) + "...",
      fullText: text,
      urgency: aiResponse.urgency || "Medium",
      actions: aiResponse.actions?.map((action: any, index: number) => ({
        id: `action-${Date.now()}-${index}`,
        ...action
      })) || [],
      simulation: aiResponse.simulation || {
        timeSavedMinutes: 5,
        contextSwitchesAvoided: 2,
        insight: "Automating this sequence reduces mental friction."
      }
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Intent Extraction Error:", error);
    return NextResponse.json({ error: "Failed to parse intent" }, { status: 500 });
  }
}