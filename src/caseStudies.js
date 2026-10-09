// Long-form case studies, keyed by slug. A post in posts.json opts in with
// `"caseStudy": "<slug>"`, which turns its card into a link to /work/<slug>.
//
// Body strings use the same lightweight markdown as post copy (links, bold,
// italic, inline code); `items` render as a list, `tree` as a stepped outline,
// and `decisions` as question / options / call blocks.

const caseStudies = {
  'care-plans': {
    title: 'Care Plans',
    subtitle: 'Giving people a reason to come back and re-measure.',
    year: '2024',
    tags: ['Forward'],
    meta: [
      { label: 'Role', value: 'Product lead; wrote the PRD' },
      { label: 'Team', value: '1 PM, 1 designer, 2 app engineers, clinical partners' },
      { label: 'Timeline', value: 'Fall 2024, ~5-week first ship' },
      { label: 'Status', value: 'Specced and in build when Forward shut down' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          "Forward's CarePod gave members a full-body diagnostic in a single visit: blood draw, body scan, vitals, reviewed remotely by a clinician. The first visit worked. The second one mostly didn't happen.",
          'Members tended to drift away around 60 days in. For a business priced on membership, that cliff was the whole game. I worked the goal down from the company mission to something a single team could own:',
        ],
        tree: [
          'Deliver great healthcare to a lot of people, affordably',
          'Hit target profit per member, which means longer retention',
          'Get members back to the CarePod before day 60',
          'Give every member a reason to return',
          'Get every member engaged in a plan that includes re-measurement',
          'Get every member to create a plan',
        ],
      },
      {
        heading: 'The insight',
        body: [
          "The only real reason to revisit a CarePod is to re-measure: your weight, your blood, your body. So why does anyone re-measure? Roughly two motivations: you're **afraid things got worse**, or you're **hopeful things got better**. Each comes with or without a strong reason to believe it.",
          "The quadrant worth designing for was *hopeful, with a strong reason to believe*. If someone has spent six weeks swapping orange juice for water and walking after lunch, they want to know whether it worked. The app's job was to give members that plausible reason, and the CarePod's job was to be the place you find out.",
          'Members had already told us what they valued in the app: education, accountability, and a way to reach Forward. Habits could deliver all three.',
        ],
      },
      {
        heading: 'The bet',
        body: [
          'Turn the care plan from something a clinician hands you into something you build with Forward. After a diagnosis, members would walk through three parts of a plan, **lifestyle, medication, and monitoring**, and choose a few concrete daily habits anchored to clinical guidance. "Limit high-glycemic foods" became "swap orange juice for a glass of water at breakfast."',
          'The first ship was scoped as a learning tool, with four questions:',
        ],
        items: [
          'Will members accept habits as part of a care plan?',
          'Will they keep engaging with them?',
          'Do habits drive CarePod re-measurement?',
          'Do habits move health outcomes?',
        ],
        after: [
          'Just as important was what it would *not* test: a fully doctorless plan, or an asynchronous prescription flow. Those were planned as follow-on ships, so the first one could stay small enough to build in about five weeks.',
        ],
      },
      {
        heading: 'The hard calls',
        body: [
          'I wrote the PRD as a set of forks: each open question laid out with its options and a recommendation, so engineering, design, and clinical could argue with specific choices instead of a vague direction. A few that mattered most:',
        ],
        decisions: [
          {
            question: 'Which condition do we pilot on?',
            options: 'Weight loss, diabetes, cholesterol, or blood pressure.',
            call: "Cholesterol. Re-measuring weight or blood pressure is easy at home, so the CarePod adds little. A blood panel isn't something you do in your kitchen, which makes the return trip worth it. Bloodwork also reads as more \"medical,\" so Forward's guidance carries more weight. Cholesterol beat diabetes because it measures more values and was more common among our members.",
          },
          {
            question: 'How do we bring up medication without a doctor visit?',
            options: "Nine options, weighed on regulatory risk, clinical correctness, overlap with upcoming platform work, and build cost. The tension: if software changes what clinical content a member sees based on data no clinician has confirmed, it starts to look like a regulated medical device.",
            call: 'Clinicians were already reviewing every member\'s results. So we asked them to make one more lightweight decision during that review: yes, no, or needs more info on medication. That recorded decision, not raw lab values, drives what the app shows. It kept regulatory risk low, matched how a doctor actually decides, and cost little to build.',
          },
          {
            question: 'One medication option, or three?',
            options: 'Earlier flows showed three options to give a sense of choice.',
            call: 'One. In research calls, many members were hesitant about medication to begin with, and many were overwhelmed by choice and just wanted the doctor\'s answer. It\'s a two-way door: the flow could show more options later if objections suggested choice would help.',
          },
          {
            question: 'When do members see their plan?',
            options: 'Show every recommended item immediately, only after the whole flow, or as each part is completed.',
            call: "As each part is completed. Showing the full plan before the member does anything undercuts the sense that they built it. Waiting until the very end risks them leaving before seeing anything useful. Revealing pieces as they go splits the difference, and it was a front-end filter rather than a change to clinical systems.",
          },
          {
            question: 'What do we tell someone whose numbers are normal?',
            options: '"Nothing to do here," send them back to their main dashboard, or keep them in the app with a prevention story.',
            call: 'A prevention story. You\'re in range today, conditions like this develop over time, and regular screening plus a few good habits keep you there. Come back in six months. Healthy members are still members, and "no action needed" is a reason to leave.',
          },
        ],
      },
      {
        heading: 'How we would have measured it',
        body: [
          'Every metric compared members with habit-based plans against members with the existing, simpler plans:',
        ],
        items: [
          '**Acceptance:** how many members chose to select habits, and how many bounced from the habit screen',
          '**Stickiness:** app opens and active days in the first 30 days, and engagement by days since plan creation',
          '**Engagement:** CarePod revisit rate, the number the whole project existed to move',
          '**Effectiveness:** change in the related lab values between visits',
        ],
      },
      {
        heading: 'What happened',
        body: [
          'Forward shut down in November 2024, partway through the build, so Deep Plans never reached members and I never got the answers to those four questions. That still stings a little.',
          'What I took from it: the most useful thing I made was the structure, not the feature. Working the goal down from the mission to "every member creates a plan" kept the team pointed at retention instead of at shipping screens. Writing every open question as a fork with a recommendation turned slow, ambiguous debates with clinical and engineering into quick decisions, and the cases where we disagreed became the most useful parts of the document.',
        ],
      },
    ],
  },
};

export default caseStudies;
