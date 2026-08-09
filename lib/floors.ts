/*
 * The original LEVEL7 building — the vision the company was founded on.
 * Taglines, audiences, AI descriptions and pricing are preserved verbatim
 * from the first site.
 */

export type Floor = {
  num: string;
  label: string;
  name: string;
  tagline: string;
  who: string;
  ai: string;
  pricing: string;
  free: boolean;
};

export const floors: Floor[] = [
  {
    num: "L",
    label: "Lobby",
    name: "Offer & Strategy",
    tagline: "You don't need a better product. You need to know who you're selling to.",
    who: "Starting out or stuck with a vague offer. No stable income, no defined audience.",
    ai: "Answer 15 questions and the AI builds your value proposition, then tells you which floor to start on.",
    pricing: "Free",
    free: true,
  },
  {
    num: "1",
    label: "Floor 1",
    name: "Organic Marketing",
    tagline: "No one will find you if you don't exist.",
    who: "Has a defined offer but zero digital presence. Not publishing content. Not on any platform.",
    ai: "Define audience and offer, and the AI generates platform-optimized content weekly. You just hit publish.",
    pricing: "Monthly subscription",
    free: false,
  },
  {
    num: "2",
    label: "Floor 2",
    name: "Paid Marketing",
    tagline: "A lead machine that works while you sleep.",
    who: "Organic is working but volume is too small. Needs leads without the time dependency.",
    ai: "Automatic campaign optimization, performance alerts, audience expansion. All around the clock.",
    pricing: "Subscription + media %",
    free: false,
  },
  {
    num: "3",
    label: "Floor 3",
    name: "Sales",
    tagline: "Leads without a sales process is a leaky bucket.",
    who: "Has leads but isn't closing. Every call is different. No defined structure.",
    ai: "Auto-builds sales scripts by business type. An AI coach analyzes call recordings with scoring.",
    pricing: "Subscription + setup",
    free: false,
  },
  {
    num: "4",
    label: "Floor 4",
    name: "Team & Staff",
    tagline: "Your business is stuck because it's built around you, not a system.",
    who: "Sales are good but overwhelmed. Everything runs through the founder.",
    ai: "A smart ops dashboard aggregating all departments. The AI writes SOPs and job descriptions.",
    pricing: "Subscription + coaching",
    free: false,
  },
  {
    num: "5",
    label: "Floor 5",
    name: "Finance",
    tagline: "You're not poor in money. You're poor in financial information.",
    who: "Has stable revenue but no visibility on where money goes. Discovers problems too late.",
    ai: "A real-time financial dashboard: profit, cash flow, money leak alerts, forecasting.",
    pricing: "Software + course",
    free: false,
  },
  {
    num: "6",
    label: "Floor 6",
    name: "Scale",
    tagline: "Your next growth won't come from you. It'll come from the system you build.",
    who: "Profitable business with a small team. Growth is stuck. Wants to become a brand.",
    ai: "Automatic KPI tracking, ambassador identification, community management, media monitoring.",
    pricing: "High subscription",
    free: false,
  },
  {
    num: "7",
    label: "Floor 7",
    name: "Empire",
    tagline: "A real business is one that works without you.",
    who: "Large profitable business where the founder is still the bottleneck.",
    ai: "The founder dashboard: sees everything, manages nothing. AI replaces the founder in routine decisions.",
    pricing: "Partner + software",
    free: false,
  },
];
