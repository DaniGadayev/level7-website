export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  blurb: string;
  intro: string;
  points: { title: string; desc: string }[];
  outcome: string;
};

export const services: Service[] = [
{
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    tagline: "Show up the moment someone searches for what you sell.",
    blurb: "Paid search campaigns managed daily, tuned for return on ad spend rather than clicks.",
    intro:
      "Google Ads puts you in front of people at the exact moment they are looking for what you offer. It is the highest intent traffic money can buy, and also the easiest place to burn a budget. The difference between the two is management. We build campaigns around your numbers, then optimize them every single day.",
    points: [
      {
        title: "Built on your economics",
        desc: "We start from your margins and customer value, so bids and budgets are set around what a customer is actually worth to you.",
      },
      {
        title: "Daily optimization",
        desc: "Search terms, bids, audiences and creative get reviewed and adjusted daily. Small corrections every day beat big fixes every quarter.",
      },
      {
        title: "Landing pages that close the deal",
        desc: "The click is half the story. We align the page after the click with the promise in the ad, so traffic turns into leads.",
      },
    ],
    outcome: "Campaigns that pay for themselves, with returns you can read in plain numbers.",
  },
{
    slug: "facebook-ads",
    name: "Facebook Advertising",
    shortName: "Facebook Ads",
    tagline: "The biggest audience on earth, narrowed down to yours.",
    blurb: "Campaigns on Meta's largest platform, engineered for lead flow and measured by return.",
    intro:
      "Facebook remains the workhorse of digital advertising. The audience is enormous, the data is deep, and the lead volume it can generate is unmatched. It is also crowded, which means average campaigns get average results. Ours are not average, because every campaign runs inside our full lead system: filtered on the way in, warmed after they arrive.",
    points: [
      {
        title: "Campaigns built for lead flow",
        desc: "Offers, creative and forms engineered together to generate a steady, predictable stream of leads for your sales team.",
      },
      {
        title: "Filtering before your CRM",
        desc: "Smart qualification separates the curious from the serious, so your pipeline holds real opportunities, not noise.",
      },
      {
        title: "Scaling what works",
        desc: "Once a campaign proves its return, we scale budgets methodically, protecting the economics as the volume grows.",
      },
    ],
    outcome: "A dependable lead machine with economics you can scale.",
  },
{
    slug: "instagram-ads",
    name: "Instagram Advertising",
    shortName: "Instagram Ads",
    tagline: "Turn scrolling into shopping.",
    blurb: "Paid campaigns across feed, stories and reels that make your product impossible to scroll past.",
    intro:
      "Instagram is where brands are discovered. People come to browse, get inspired and shop, often all in the same session. A well-built Instagram campaign does not interrupt that experience. It becomes part of it, putting your product in front of people whose behavior says they are ready for it.",
    points: [
      {
        title: "Creative for every placement",
        desc: "Feed, stories and reels each behave differently. We design for each one instead of stretching one asset across all three.",
      },
      {
        title: "Audiences built on behavior",
        desc: "Lookalikes of your buyers, engagers of your content, visitors of your site. We layer signals until the targeting is sharp.",
      },
      {
        title: "Retargeting that converts",
        desc: "Most people do not buy on the first touch. Our sequences bring them back with the right message at the right moment.",
      },
    ],
    outcome: "A visual presence that sells, with cost per result you can build a business on.",
  },
{
    slug: "linkedin-ads",
    name: "LinkedIn Advertising",
    shortName: "LinkedIn Ads",
    tagline: "Reach decision makers where they talk business.",
    blurb: "B2B campaigns that put your offer in front of the exact titles, industries and companies you want.",
    intro:
      "No other platform lets you target by job title, seniority, company size and industry the way LinkedIn does. That precision comes at a price, so LinkedIn campaigns only work when the offer, the audience and the follow-up are all engineered together. That is exactly how we run them.",
    points: [
      {
        title: "Surgical B2B targeting",
        desc: "CFOs at logistics companies. HR directors at firms with 200 or more employees. If you can describe your buyer, we can reach them.",
      },
      {
        title: "Offers worth a professional's time",
        desc: "Decision makers do not click ads out of boredom. We build lead magnets and messages that speak to a real business problem.",
      },
      {
        title: "Professional connection building",
        desc: "Beyond the ads, we help you build presence and relationships in the feed your buyers read every morning.",
      },
    ],
    outcome: "Qualified B2B conversations with the people who sign the contracts.",
  },
{
    slug: "tiktok-ads",
    name: "TikTok Advertising",
    shortName: "TikTok Ads",
    tagline: "Short videos. Serious reach.",
    blurb: "Native short-form campaigns that make your brand part of the feed instead of an interruption to it.",
    intro:
      "TikTok is not a kids' app anymore. It is where a huge share of buying decisions start, across almost every age group. But it punishes anything that looks like an ad. Winning on TikTok means making content that belongs in the feed: fast, honest and native to the platform.",
    points: [
      {
        title: "Creative that feels native",
        desc: "We produce short videos that look and sound like TikTok, because on this platform, polish loses to authenticity.",
      },
      {
        title: "Rapid testing cycles",
        desc: "Hooks, formats and angles get tested in fast iterations. The platform tells us what works within days, and we double down.",
      },
      {
        title: "Full-funnel setup",
        desc: "Views are not the goal. We wire TikTok traffic into landing pages and lead capture, so attention becomes pipeline.",
      },
    ],
    outcome: "A brand that shows up where attention actually lives, with numbers to justify it.",
  },
{
    slug: "youtube-ads",
    name: "YouTube Advertising",
    shortName: "YouTube Ads",
    tagline: "Tell your story where people come to watch.",
    blurb: "Paid video campaigns on the world's second largest search engine, targeted by intent and interest.",
    intro:
      "YouTube combines the reach of television with the targeting of Google. Your ad can appear exactly when someone watches content related to your industry, or right after they searched for what you sell. Video builds trust faster than any other format, and trust is what sells.",
    points: [
      {
        title: "Intent-based placement",
        desc: "We target viewers by what they search, watch and shop for, so your budget goes to people already leaning your way.",
      },
      {
        title: "Videos built to hold attention",
        desc: "The first five seconds decide everything. We script and structure ads that earn the view instead of getting skipped.",
      },
      {
        title: "Measurable outcomes",
        desc: "View-through conversions, site visits and leads, all tracked. You will know exactly what your video budget returned.",
      },
    ],
    outcome: "Your story in front of the right viewers, at a fraction of TV costs, with real tracking.",
  },
{
    slug: "native-advertising",
    name: "Native Advertising",
    shortName: "Native Ads",
    tagline: "Your story inside the world's biggest news sites.",
    blurb: "Taboola and Outbrain campaigns that reach massive audiences through content they already trust.",
    intro:
      "Native advertising places your content on major news and media sites, recommended alongside the articles people came to read. Done poorly it is clickbait. Done well it is one of the cheapest ways to reach enormous audiences with a story instead of a banner. The craft is in the funnel behind the click.",
    points: [
      {
        title: "Stories, not banners",
        desc: "We write advertorial content that earns the click honestly and pre-sells your offer before the reader ever hits your site.",
      },
      {
        title: "Scale at low cost",
        desc: "Native inventory is vast and clicks cost a fraction of search. With the right funnel, that math becomes very attractive.",
      },
      {
        title: "Relentless optimization",
        desc: "Headlines, thumbnails and placements get tested continuously. Small percentage gains compound into big cost advantages.",
      },
    ],
    outcome: "Reach at a scale social platforms cannot match, at a cost per lead that makes sense.",
  },
{
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "Social Media",
    tagline: "Reach the audience that scrolls past everyone else.",
    blurb: "Strategy, content and community management that turns followers into a real sales channel.",
    intro:
      "Most businesses post into the void. A photo here, a holiday greeting there, and no plan connecting any of it to revenue. We treat social media as a sales channel with its own funnel: attention first, trust second, action third. Every post has a job.",
    points: [
      {
        title: "A strategy before a single post",
        desc: "Who you are talking to, what they care about, and what makes them stop scrolling. We define it before we create anything.",
      },
      {
        title: "Content people actually want",
        desc: "Stories, proof and personality. The kind of content that builds a brand people remember when it is time to buy.",
      },
      {
        title: "From engagement to pipeline",
        desc: "Comments, DMs and interest get captured and routed into your funnel, so social activity turns into measurable leads.",
      },
    ],
    outcome: "A brand people follow, trust and buy from, across every network that matters to you.",
  },
  {
    slug: "search-visibility",
    name: "SEO & AI Search (GSO)",
    shortName: "SEO & AI Search",
    tagline: "Own the results page, and the AI answer above it.",
    blurb: "One organic engine for both worlds: Google rankings that compound, and citations inside ChatGPT, Gemini and AI Overviews.",
    intro:
      "Search is now two games played at once. People still type questions into Google and scroll the results. But more of them every month ask an AI and get a single answer back. Winning one game and losing the other means losing customers you never even saw. We treat organic search and AI visibility as one discipline, because for your buyers, it is one moment: the moment they ask.",
    points: [
      {
        title: "Revenue keywords first",
        desc: "We map the searches that actually end in a purchase in your market, then build your site's authority around exactly those.",
      },
      {
        title: "Visibility inside AI engines",
        desc: "Structure, entities and authority signals that make ChatGPT, Gemini, Perplexity and Google's AI Overviews cite you as the trusted answer in your category.",
      },
      {
        title: "Technical foundations",
        desc: "Site speed, structure, indexing and internal linking. The invisible work that decides whether both Google and the AI engines take you seriously.",
      },
    ],
    outcome: "You get found by the people who are ready to buy, whether they ask Google or ask an AI.",
  },
{
    slug: "crm-automation",
    name: "CRM & Marketing Automation",
    shortName: "CRM Automation",
    tagline: "No lead waits. No lead gets forgotten.",
    blurb: "Smart bots and automated flows that filter, warm and route every lead the moment it arrives.",
    intro:
      "Speed wins deals. A lead answered within five minutes is many times more likely to close than one answered the next day. Our automation layer makes sure every lead gets an instant, intelligent response, gets qualified through the right questions, and arrives at your sales team warm, informed and ready to talk.",
    points: [
      {
        title: "Smart bots that filter and warm",
        desc: "Automated conversations qualify each lead, answer first questions and build trust before a human ever gets involved.",
      },
      {
        title: "The after-lead journey",
        desc: "Follow-up sequences across email and messaging keep prospects engaged, so the trust keeps building between touchpoints.",
      },
      {
        title: "A CRM that runs itself",
        desc: "Routing, reminders, status updates and handoffs happen automatically. Your team sells. The system does the bookkeeping.",
      },
    ],
    outcome: "Higher close rates from the same leads, because none of them slip through the cracks.",
  },
{
    slug: "web-development",
    name: "Website Development",
    shortName: "Websites",
    tagline: "Websites built to sell, not just to look good.",
    blurb: "Fast, conversion-focused sites and landing pages designed around one goal: turning visitors into customers.",
    intro:
      "A website is not a brochure. It is your hardest working salesperson, on shift 24 hours a day. We design and build sites where every section, headline and button exists for a reason, and that reason is conversion. Beautiful, yes. But beautiful in service of the numbers.",
    points: [
      {
        title: "Conversion-first design",
        desc: "Structure, copy and calls to action are engineered from real buyer psychology, not from what happens to look trendy.",
      },
      {
        title: "Fast on every device",
        desc: "Speed is a ranking factor and a conversion factor. We build sites that load instantly on any phone, anywhere.",
      },
      {
        title: "Built to plug into your funnel",
        desc: "Analytics, pixels, CRM and automation are wired in from day one, so the site is a working part of your lead system.",
      },
    ],
    outcome: "A site that earns its keep, measured in leads and sales rather than compliments.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
