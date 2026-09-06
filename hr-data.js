/* HR / behavioral — one-pager notes + further reading
   Node: { n, h?, note?, code?, p?: [[num|"GFG"|"HI"|"AMZN"|"HBR"|"MUSE"|"LFY"|"EXP"|"EDU", slug|url, title, "E|M|H"], ...], c?: [...] }
*/
const HR = [

  { n: "Overview", h: "HR is not small talk. They test if you can work with people, stay, and be hired without drama. Same bar as DSA: short, specific, practiced out loud.", c: [
    { n: "What this round is for",
      note: "Recruiter / HR / hiring manager behavioral. They decide: <b>can we work with you</b>, <b>will you join and stay</b>, <b>are your stories real</b>. Technical rounds prove skill. This round proves judgment, ownership, and communication.<br>Typical 20–40 min: intro → walk résumé → why us / why leave → 2–3 STAR stories → salary / notice → your questions.<br>India product companies + FAANG-style loops all use the same skeleton. Amazon names it Leadership Principles; everyone else just asks the same questions without the poster.",
      p: [
        ["GFG", "https://www.geeksforgeeks.org/hr-interview-questions/", "GFG — HR interview questions", "E"],
        ["GFG", "https://www.geeksforgeeks.org/blogs/star-interview-method/", "GFG — STAR method", "E"],
        ["AMZN", "https://www.aboutamazon.com/news/workplace/amazon-interview-guide", "Amazon — official interview guide (STAR)", "M"],
        ["AMZN", "https://www.amazon.jobs/content/en/our-workplace/leadership-principles", "Amazon Leadership Principles", "M"],
        ["EXP", "https://www.tryexponent.com/blog/how-to-nail-amazons-behavioral-interview-questions", "Exponent — Amazon behavioral", "M"],
        ["MUSE", "https://www.themuse.com/advice/how-to-answer-the-31-most-common-interview-questions", "The Muse — 31 common questions", "E"],
      ]},
    { n: "Prep in one sitting",
      h: "Write 8 stories once. Reuse them. Do not invent a new novel per question.",
      note: "Build a <b>story bank</b> (8 cards, half a page each, STAR):<br>1. Biggest impact / metric you own.<br>2. Hard bug or production incident.<br>3. Disagreement with a teammate or manager — then you committed.<br>4. Missed deadline or failed idea — what you changed after.<br>5. Helped someone / mentored / unblocked the team.<br>6. Ambiguous problem, you scoped it.<br>7. Tight deadline, you cut scope and shipped.<br>8. You were wrong, took feedback.<br>Map each card to 2–3 question types (conflict, ownership, failure, leadership). Practice <b>90-second tell-me-about-yourself</b> and <b>why this company</b> until they sound like you, not a blog.",
      p: [
        ["HI", "https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery", "Hello Interview — how you deliver under questions", "E"],
        ["EDU", "https://www.educative.io/blog/crack-amazon-behavioral-interview-questions", "Educative — Amazon behavioral", "M"],
      ]},
    { n: "Map of this sheet",
      note: "<pre style='font-size:.8rem;line-height:1.45;overflow:auto'>HR\n├── STAR — how every story is built\n├── Pitch — tell me about yourself\n├── Why this company\n├── Why leaving\n├── Salary negotiation\n├── Questions you ask them\n├── Say / don't say\n├── Behavioral bank — conflict, failure, weakness…\n└── Offer, notice, joining</pre>" },
  ]},

  { n: "STAR", h: "Situation 10% · Task 10% · Action 60–70% · Result 10–20%. Interviewers grade Action + Result. Vague 'we did a lot' fails.", c: [
    { n: "The four beats",
      note: "<b>S — Situation</b> (1–2 sentences): company, team, time, stakes. Not a history of the org.<br><b>T — Task</b>: what <i>you</i> were on the hook for. One sentence.<br><b>A — Action</b>: what <i>you</i> did, in order. Decisions, trade-offs, how you unblocked. Use “I”. If the team did it, say what <i>your</i> piece was.<br><b>R — Result</b>: number if you have one (latency, $ cost, hours, incidents, adoption). Then <b>one lesson</b> — what you'd repeat or change.<br>Optional <b>L (STAR-L)</b>: “Next time I would …” — this is what senior interviewers wait for on failure questions.",
      code:
`S  Last quarter our IoT ingest jobs were blowing Databricks budget.
T  I owned finding why and cutting cost without dropping SLAs.
A  I pulled job metrics, found shuffle-heavy joins, added partition
   pruning + a cheaper warehouse for backfills, and gated the change
   behind a canary region.
R  ~$200K/year saved, same freshness. I'd profile cost before adding
   another cluster next time — not after finance pings.`,
      p: [
        ["GFG", "https://www.geeksforgeeks.org/blogs/star-interview-method/", "How to use STAR", "E"],
        ["AMZN", "https://www.aboutamazon.com/news/workplace/amazon-interview-guide", "Amazon: be specific, use I, use numbers", "M"],
      ]},
    { n: "Time and follow-ups",
      note: "Target <b>90 seconds–2 minutes</b> per story. Recruiter: shorter. Bar-raiser / HM: they will interrupt with “what did <i>you</i> do?”, “what was the alternative?”, “how did you measure?”, “what would you do differently?”.<br>If they cut you, jump to Action. If they go silent, stop after Result — don't keep talking.<br><b>Never</b> reuse the exact same 2-minute story in every round of one loop. Same bank, different angle (conflict vs metric vs failure).",
      p: [
        ["EXP", "https://www.tryexponent.com/blog/how-to-nail-amazons-behavioral-interview-questions", "How interviewers probe STAR", "M"],
      ]},
    { n: "What a bad STAR sounds like",
      note: "<b>Too much S:</b> five minutes of org chart, no action.<br><b>We-we-we:</b> interviewer can't hire a team; they hire you.<br><b>No result:</b> “it went well.” Ask yourself: what moved? time, money, reliability, people.<br><b>Hero fiction:</b> if you can't survive “who else was in the room?”, don't tell it.<br><b>No conflict:</b> a smooth story with no trade-off is forgettable. Put the hard part in Action." },
  ]},

  { n: "Tell me about yourself", h: "90 seconds. Present → past → future. Not your life story. End on why you are excited about *this* role.", c: [
    { n: "Structure",
      note: "<b>Present (20s):</b> title, company, 1-line what you own now.<br><b>Past (40s):</b> 2 proof points with numbers (systems, scale, impact). Skip school unless you are a new grad.<br><b>Future (20s):</b> what you want next — and why it matches <i>this JD</i>. Stop talking.<br>This is the trailer. The rest of the call is the movie. Do not dump every bullet from the résumé.",
      code:
`I'm a Software Engineer II at Smartsheet in Bengaluru. I work on
real-time IoT and CDC data platforms — streaming pipelines,
Databricks, Kafka, AWS.

Over the last few years I owned ingest reliability and cost: about
a $200K/year Databricks reduction, and pipelines on the order of
tens of TB a day across regions.

I'm looking for a role where I can go deeper on backend + data
systems at [this company's] scale — that's why this [team / product]
stood out.` },
    { n: "Variants",
      note: "<b>Walk me through your résumé:</b> same skeleton, 2 minutes, one beat per job, newest first. For each: what you were hired to do → one outcome → why you moved.<br><b>New grad:</b> internships + 1–2 projects with users or numbers. Class rank is optional; shipped work is not.<br><b>Career switch:</b> “I did X, I built Y on the side / in this team, I want Z because …” One bridge story, not an apology." },
  ]},

  { n: "Why this company", h: "They are screening 'I need any job'. Answer = product + role + you. If you could swap the company name and the answer still works, rewrite it.", c: [
    { n: "The three-layer answer",
      note: "<b>1. Product / mission</b> — one specific thing they ship that you actually use or respect. Not “you are a leader in cloud.”<br><b>2. Role / work</b> — JD language: the stack, the problem (scale, latency, data, customers). “This role owns X, which is the kind of system I already build.”<br><b>3. Fit / growth</b> — team, stage, how you'd add value in 6 months. Optional: a person, blog, or talk from the team.<br>Spend 20 minutes before the call: homepage, blog, latest news, JD, Glassdoor <i>only</i> for interview process not for ranting. Write 5 bullets. Speak 3.",
      code:
`I looked at [product]. The part that clicked is [specific: e.g. you
sync work across orgs / you stream events for IoT / you run X at
Y scale] — I've spent the last years on similar pipelines.

The JD calls out [Kafka / Spark / AWS / multi-region]. That's my
day job, and I want to do it on a problem I care about, not as a
generic backend ticket factory.

I'm also at a point where I want [ownership of a service / on-call
on a bigger surface / data + product in one team]. From [blog /
talk / JD], this team seems to operate that way.` },
    { n: "What not to say",
      note: "“I need a change.” “My friend said you pay well.” “I'll go anywhere that takes me.” “I love your brand” with zero product detail. “Google/Amazon/Meta is my dream” when you are in a Flipkart loop — they hear “you'll leave.”<br>Don't fake passion for a domain you didn't research. One honest technical reason beats three adjectives." },
    { n: "If they ask 'why not stay / why us vs others'",
      note: "Stay positive about the current job. Pivot: “I'm not running from X. I'm choosing Y because the problem / scale / ownership is a step up.” If you have other processes: “I'm speaking with a couple of teams that look similar on paper. I'm here because [this product] is the one I'd actually want to debug at 2am.” That's stronger than “you're my only option.”" },
  ]},

  { n: "Why leaving", h: "Pull, don't push. Growth and scope — never revenge, never 'toxic manager' on a first telling.", c: [
    { n: "Safe, true reasons",
      note: "Good: want broader ownership, different domain (product vs infra), scale, new stack you already started learning, team/product sunset, relocation, return to IC after a detour, layoff/RIF (honest, short).<br>Risky unless they probe: compensation only, commute only, “politics.” You can mention pay as <i>one</i> factor after growth — not the headline.<br>If you were PIP'd or fired: don't lie. “It wasn't a fit on [scope / performance]. I took [feedback], here's what I changed, here's a later result that shows it.” One minute, then forward.",
      code:
`I've learned a lot on the current platform — cost, reliability,
multi-region ingest. The work is starting to look like more of the
same tickets.

I want a seat closer to [product X / higher scale / a service I
own end-to-end]. That's why I started talking to teams like yours,
not because something blew up at work.` },
    { n: "Never do this",
      note: "Don't name-and-shame your manager. Don't say “they don't promote.” Don't leak confidential drama. Don't say “I'm bored” without a growth sentence after it — bored reads as checked-out.<br>If they press on “was there conflict?”: “There were the usual disagreements on priority. I raised it, we aligned, I shipped. I'm leaving for scope, not because of a person.”" },
    { n: "Short tenure / job hop / gap",
      note: "<b>&lt; 1 year:</b> address it before they invent a story. Contract ended, product cancelled, family move, wrong seat and you corrected fast. Show the next role lasted / you're being picky now.<br><b>Gap:</b> one line of truth (health, family, study, layoff) + what you did (projects, courses, OSS) + “I'm ready to go full-time.” Don't over-explain medical details.<br><b>Layoff:</b> “Role was eliminated in a reduction. My reviews were [fine / I can share]. I'm looking for a team that still needs this skill.” No bitterness." },
  ]},

  { n: "Salary", h: "Recruiter wants a number to bucket you. You want range + total comp. Never negotiate against yourself. One calm counter after the offer is normal.", c: [
    { n: "On the first HR call",
      note: "They will ask <b>current CTC</b> and <b>expected CTC</b> (India) or <b>range</b> (US). You don't have to dump your current number in places with salary-history bans; in India most recruiters still ask and filter on it.<br><b>Best:</b> “I'm targeting market for this level in Bengaluru. What's the band for this role?” If they insist:<br><b>Give a range</b> you can live with at the <i>bottom</i>, based on Levels.fyi / peers / last offer — not a fantasy top. Say <b>total CTC</b> (fixed + variable + bonus), and that ESOPs / joining bonus / notice buyout are part of the conversation later.<br>Don't say “negotiable” with no number — they will put you in the cheapest bucket.",
      code:
`I'm focusing on the role first. For this level in Bengaluru I've
seen [X–Y LPA] total CTC. If that's in band, we'll make the rest
work — joining bonus, variable, and stocks included.

I'm not optimizing for a 5% bump on the same work. I'm optimizing
for the team + a fair offer for the scope.` },
    { n: "How to pick the range",
      note: "Look up <b>level</b> (SDE2 / L4 / E4 / IC3), <b>city</b>, <b>company stage</b>. Use [Levels.fyi](https://www.levels.fyi) + 1–2 trusted peers. Bottom of range = walk-away. Mid = happy. Don't quote a number you would resent.<br>India: ask whether they mean <b>fixed vs CTC</b> (variable 10–20% is common). US: base vs bonus vs RSUs. Don't compare your CTC to their base blindly.",
      p: [
        ["LFY", "https://www.levels.fyi", "Levels.fyi — level and comp bands", "E"],
        ["HBR", "https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer", "HBR — 15 rules for negotiating an offer", "M"],
        ["MUSE", "https://www.themuse.com/advice/how-to-negotiate-salary-21-tips-you-need-to-know", "The Muse — salary negotiation tips", "E"],
      ]},
    { n: "After you have a written offer",
      note: "Say thank you. Sleep on it. Reply in 24–48h. <b>Always ask once</b> unless they said non-negotiable and you believe them. Script: excitement + one constraint + a specific ask (base, joining bonus, or RSUs — pick the lever they actually control).<br>If you have a competing offer, you may say the <i>number and level</i>, not a fake one. Lying here ends offers.<br>Don't negotiate by threatening to reject unless you mean it. Don't nickel-and-dime relocation after they already stretched. Get the final number <b>in writing</b> (email / offer letter).",
      code:
`Thank you — I'm excited about the team and I want this to work.

Based on market for this level and the scope we discussed, I was
hoping we could get closer to [number] CTC, or a joining bonus of
[amount] if base is tight. Is there flexibility on either?

I'm happy to sign once we land that.` },
    { n: "Traps",
      note: "Don't name a current CTC that's a lie (background / offer letter can expose it).<br>Don't accept “we'll review in 6 months” as a substitute for a real number unless you truly want the seat anyway.<br>Don't negotiate forever. One counter, maybe a small second if they move. Then decide.<br>Don't talk salary in a <i>technical</i> round unless they bring it up — it wastes the engineer's time and looks off-key." },
  ]},

  { n: "Questions to ask", h: "You are interviewing them. Empty 'no questions' reads as not interested. Ask about the work, not the canteen.", c: [
    { n: "Ask the hiring manager / engineer",
      note: "Pick <b>3</b>, not 10. Best ones:<br>• What does outstanding vs average look like in this role in 6 months?<br>• What's the hardest problem the team is in the middle of?<br>• How is on-call / paging set up? What's a recent incident?<br>• How do you split product work vs platform / debt?<br>• Why is this seat open — growth or backfill?<br>• How does the team review designs / PRs?<br>Listen to the answer. Ask one follow-up. That's how you sound senior.",
      p: [
        ["MUSE", "https://www.themuse.com/advice/51-interview-questions-you-should-be-asking", "The Muse — questions to ask them", "E"],
      ]},
    { n: "Ask HR / recruiter",
      note: "Process: remaining rounds, who you'll meet, take-home or not.<br>Leveling: which level is this, what's the next one, typical time in role.<br>Comp: band, variable %, stocks, joining bonus, notice-period buyout, probation.<br>Logistics: hybrid days, office, shift, background verification, joining date flexibility.<br>Save “how much leave” for after you like them — it's fine, just not your first question." },
    { n: "Don't ask (yet)",
      note: "“What does your company do?” — you should know.<br>“How soon can I be promoted?” as question 1 — sounds like you'll leave.<br>“Is on-call rare because I don't want it?” — ask how it's run, then decide privately.<br>Salary details in a pure technical screen.<br>Anything you could have read on the first Google result." },
  ]},

  { n: "Say / don't say", h: "Tone: calm, specific, no gossip. You can be honest without being unkind.", c: [
    { n: "Say this",
      note: "“I” + a number + a trade-off.<br>“I don't know that stack in production; here's the closest thing I shipped, I can ramp.”<br>“I disagreed, I said so, we picked a path, I committed.”<br>“I missed that. Here's the fix and the check I added.”<br>“I'm speaking with other teams; this is high on my list because …”<br>“Can I take 24 hours to look at the offer with the full break-up?”" },
    { n: "Don't say this",
      note: "“We did everything” (no owner).<br>“I hate my manager / team is toxic.”<br>“I'll take anything.”<br>“What's the package?” as greeting.<br>“I don't have questions.”<br>Jokes about not wanting to work, WFH only, or “I just need H1B / visa / onsite.”<br>Confidential numbers, customer names under NDA — anonymize (“a large retail client”).<br>Memorized TED-talk voice. If you sound like ChatGPT, they will probe until you don't." },
    { n: "Live recovery",
      note: "Blank on a story: “Let me pick a concrete one — two seconds.” Then STAR, even if small.<br>Wrong fact: “I misspoke. The number was X, not Y.”<br>Illegal / awkward (age, marriage, plans for kids — still happens): short redirect. “I can relocate / I can do the office policy we discussed. On the work itself …” You don't have to overshare.<br>They bash a competitor: don't pile on. “I haven't worked there. I'm here because of your problem space.”" },
  ]},

  { n: "Behavioral bank", h: "Same 8 stories, different question labels. Lead with the match ('this is a conflict story'), then STAR.", c: [
    { n: "Conflict / disagreement",
      note: "They want: you didn't explode, you didn't silently comply, you used data, you committed after the decision. Never end on “and I was right, they were dumb.” End on the outcome and the relationship.",
      code:
`S  PM wanted to ship a backfill that would have doubled cluster cost.
T  I owned the pipeline SLAs and the budget.
A  I showed one-week cost vs freshness, proposed a cheaper warehouse
   + weekend window. We disagreed in the doc, then aligned.
R  Shipped on the original date, cost stayed flat. Working relation
   with that PM is fine — we reuse the same cost table now.` },
    { n: "Failure / mistake / incident",
      note: "Pick a real miss you owned, not “I work too hard.” Show detection, mitigation, RCA, and the guardrail you added (alert, test, runbook). Blame-the-vendor stories score low.",
      p: [
        ["GFG", "https://www.geeksforgeeks.org/hr-interview-questions/", "Tell me about a time you failed", "M"],
      ]},
    { n: "Deadline / too much work",
      note: "Cut scope with a stakeholder. Communicate early. Don't secretly work 20-hour days as the plot. Result: shipped the must-haves, deferred the rest, no surprise." },
    { n: "Leadership without title",
      note: "Mentored a junior, wrote the design the team used, ran an incident, set a coding standard. Leadership = you made other people more effective, not that you had reports." },
    { n: "Strengths and weaknesses",
      note: "<b>Strength:</b> one skill they need (e.g. owning data cost + reliability) + a 20-second proof.<br><b>Weakness:</b> real, not “perfectionist.” Pair with what you do about it now. Example: “I used to dive into code before aligning on the interface. I now write a one-pager first; last design review was shorter because of that.” Never pick a core requirement of the job as the weakness (e.g. “I'm bad at backend” for a backend role)." },
    { n: "Where in 5 years",
      note: "Direction, not a title promise. “I want to be the person this team trusts on [data platform / distributed services], maybe tech-lead shape, still close to the code.” Don't say “your job” or “CEO.” Don't say “I don't think that far.”" },
    { n: "Are you interviewing elsewhere?",
      note: "Yes is fine. “I have a couple of processes in flight at similar-level backend/data teams. I'm not using them as a race — I'll choose on work + people + a fair offer.” Don't name competitors in a petty way. Don't claim 5 exploding offers if you don't." },
  ]},

  { n: "Offer, notice, joining", h: "HR owns dates and paperwork. Be precise. Surprises after verbal yes burn trust.", c: [
    { n: "Notice period",
      note: "State the real number (e.g. 60 / 90 days) and whether buyout or early release has happened before. Don't promise 15 days if policy is 90 — the new company will plan on your date and the old one may not help.<br>If they need you sooner: “I'll try for an early release after the offer letter; I can't guarantee it until manager + HR agree.”" },
    { n: "Yes, no, hold",
      note: "Verbal yes is not the finish. Wait for the letter: CTC break-up, variable, stocks, joining bonus, location, probation, background check.<br>If you need time: “I'd like until [day] to decide.” Then actually decide.<br>If you decline: thank them, one honest line (scope / comp / timing), leave the door open. Don't ghost." },
    { n: "Background check & résumé truth",
      note: "Dates, titles, degrees, CTC — must match documents. Inflated titles and fake experience are how offers die after you resigned. If something is messy (startup closed, contractor vs FTE), tell HR early with papers." },
  ]},

  { n: "Company flavors", h: "Same stories. Different vocabulary. Don't force Amazon slogans in a startup call.", c: [
    { n: "Amazon / LP-style",
      note: "Map your 8 stories to Ownership, Customer Obsession, Bias for Action, Deliver Results, Disagree and Commit, Earn Trust, Dive Deep, Invent and Simplify. Bar raiser will follow up hard on Action and metrics. Don't recite the poster; demonstrate it.",
      p: [
        ["AMZN", "https://www.amazon.jobs/content/en/our-workplace/leadership-principles", "Leadership Principles", "M"],
        ["AMZN", "https://www.aboutamazon.com/news/workplace/amazon-interview-guide", "Interview guide", "M"],
        ["EXP", "https://www.tryexponent.com/blog/how-to-nail-amazons-behavioral-interview-questions", "Exponent LP questions", "H"],
      ]},
    { n: "Google / Meta / Microsoft-style",
      note: "Google: “Googleyness” + role-related behavioral, plus you might get a hiring-committee flavored probe on collaboration. Meta: “tell me about a time” plus impact density. Microsoft: growth mindset, inclusion, how you work across teams. Still STAR. Still numbers." },
    { n: "Indian product / service / startup",
      note: "Service companies: more HR script (strengths, family, bond, location, night shift). Stay polite, keep answers short, don't overshare family.<br>Product: closer to US behavioral + notice + CTC.<br>Startup: they care if you'll wear multiple hats and if the pay cut / equity story is real. Ask about runway only if you're senior enough that it matters; otherwise ask about the problem and who you'd work with." },
  ]},
];
