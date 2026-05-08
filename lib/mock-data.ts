export type ActionNode = {
  id: string;
  app: "Linear" | "Slack" | "Calendar" | "Trello" | "Notion";
  action: string;
  details: string;
};

export type IntentPayload = {
  id: string;
  sourceApp: "Gmail" | "Slack";
  sender: string;
  snippet: string;
  fullText: string;
  urgency: "High" | "Medium" | "Low";
  actions: ActionNode[];
  simulation: {
    timeSavedMinutes: number;
    contextSwitchesAvoided: number;
    insight: string;
  };
};

export const MOCK_INTENTS: IntentPayload[] = [
  {
    id: "task-1",
    sourceApp: "Gmail",
    sender: "Alex (Co-founder)",
    snippet: "Need final launch assets by Friday...",
    fullText: "Hey, can you prepare the final launch assets by Friday? Also let Sarah know so she can prep the marketing copy.",
    urgency: "High",
    actions: [
      { id: "a1", app: "Linear", action: "Create Issue", details: "Prepare final launch assets" },
      { id: "a2", app: "Calendar", action: "Set Deadline", details: "Friday 10:00 AM" },
      { id: "a3", app: "Slack", action: "Notify Sarah", details: "Assets in progress for marketing copy." },
    ],
    simulation: {
      timeSavedMinutes: 14,
      contextSwitchesAvoided: 3,
      insight: "Automating this sequence reduces follow-up probability by 42% based on previous team patterns.",
    }
  },
  {
    id: "task-2",
    sourceApp: "Slack",
    sender: "Investors Channel",
    snippet: "Can we get the Q3 metrics deck?",
    fullText: "Can we get the Q3 metrics deck updated before the board meeting on Tuesday?",
    urgency: "High",
    actions: [
      { id: "b1", app: "Notion", action: "Duplicate Template", details: "Q3 Metrics Deck" },
      { id: "b2", app: "Calendar", action: "Block Time", details: "Monday 2:00 PM (Deep Work)" },
    ],
    simulation: {
      timeSavedMinutes: 8,
      contextSwitchesAvoided: 2,
      insight: "Pre-emptively blocking deep work time ensures completion before Tuesday's meeting.",
    }
  }
];