// Long-form case studies, keyed by slug. A post in posts.json opts in with
// `"caseStudy": "<slug>"`, which turns its card into a link to /work/<slug>.
//
// Body strings use the same lightweight markdown as post copy (links, bold,
// italic, inline code); `items` render as a list, `tree` as a stepped outline,
// and `decisions` as question / options / call blocks.
//
// Care Plans content is drawn from the Deep Plans PRD. Internal figures,
// names, and links are left out; wording follows the PRD where possible.

const caseStudies = {
  'care-plans': {
    title: 'Care Plans',
    subtitle: 'Deep Plans: plan co-creation with habits. Give members a plausible reason why their health may have improved, so they are motivated to re-measure.',
    year: '2024',
    tags: ['Forward'],
    meta: [
      { label: 'Role', value: 'Author of the Deep Plans PRD' },
      { label: 'Team', value: '1 PM, 1 designer, 2 apps engineers; supported by clinical product, clinical platform, and doctor champions' },
      { label: 'Planned build', value: 'Nov–Dec 2024, 4–6 weeks' },
      { label: 'Tracer app', value: 'Cholesterol' },
    ],
    sections: [
      {
        heading: 'Problem',
        body: [
          "The PRD starts from Forward's mission and works down to the thing this ship had to change:",
        ],
        tree: [
          "Deliver the world's best healthcare, to 1 billion people, for free",
          'Hit a gross profit per member target at scale, which depends on months of retention',
          'Maximize 60-day retention',
          'Every member revisits the CarePod before day 60',
          'Every member has scheduled a revisit before day 60',
          'Every member has a reason to revisit the CarePod',
          'Every member is engaged in a Plan with re-measurement items',
          'Every member creates a Plan',
        ],
      },
      {
        heading: 'Context',
        body: [
          'Members had been to the CarePod. To retain them past the ~60-day cliff, Forward needed to deliver value both in the mobile app and through the CarePod.',
          'Members told us the most valuable things the app could offer were education, accountability, and a way to interact with Forward. And to many of them, it wasn\'t clear why they would return to the CarePod, or that doing so was worth the commute.',
          'The reason to revisit is to re-measure: weight, blood, body model. The motivations to re-measure are roughly:',
        ],
        items: [
          "I'm afraid things have gotten worse, with or without a strong reason to believe they have",
          "I'm hopeful things have gotten better, **and I have a strong reason to believe they have**",
          "I'm hopeful things have gotten better, without a strong reason to believe it",
        ],
        after: [
          'The goal, from both a health-improvement and an engagement standpoint, was to give members a plausible reason why their health may have improved, so they are motivated to re-measure.',
          'One assumption shaped everything: reduce dependence on chat, with no virtual visits, no synchronous doctor time, and no member expectation of synchronous doctor time.',
        ],
      },
      {
        heading: 'Ship 1: plan co-creation with habits',
        body: [
          'After diagnosis, members build their Care Plan across lifestyle, medication, and monitoring. Lifestyle includes **habits**: small actions members choose themselves, organized under clinically indicated suggestions. For example, "Limit foods with high glycemic index" becomes "swap orange juice for a glass of water at breakfast." The anchoring matters because people largely know which habits aren\'t helping their health, but don\'t connect those habits to their condition or understand the size of the impact.',
          'Goals for the ship:',
        ],
        items: [
          'Evaluate the acceptance of habits as part of Care Plans',
          'Evaluate ongoing engagement with habits',
          'Evaluate the effectiveness of habits as a driver of CarePod re-measurement',
          'Evaluate the impact of habits on health outcomes',
        ],
        after: [
          'Non-goals: evaluating a doctorless plan creation experience, or an asynchronous medication acceptance flow. Both were left to future ships, with product and design work already underway.',
        ],
      },
      {
        heading: 'What the member experience covered',
        items: [
          '**Diagnosis and health status delivery:** a diagnosis delivered differently depending on whether the member has a condition and whether they reported a related one in their health profile',
          '**Plan introduction:** a short segment on the holistic, personalized approach of Care Plans: lifestyle, medication, monitoring',
          '**Plan creation navigation:** recommended plan items as cards; completed modules become plan items on the app home screen, and the "build care plan" call to action becomes "enrich care plan"',
          '**Habit selection:** likely habits grouped by focus area, each focus tied to clinical guidance in the care plan templates',
          '**Habit check-ins and tracking:** an accountability loop where members track habits and can add or pause them at any time',
          '**Minimal medication selection:** an explanation of Forward\'s approach to medication, the member\'s perspective on it, and a hand-off to clinician review',
        ],
      },
      {
        heading: 'Forks',
        body: [
          'The PRD is organized around forks: each open question with its options and a recommendation, worked through with clinical, design, and engineering partners.',
        ],
        decisions: [
          {
            question: 'Which app should we use as the tracer?',
            options: 'Weight loss, diabetes, cholesterol, or blood pressure, compared on how many members each affects, how strongly a CarePod revisit is differentiated, competing trusted sources, how much of the plan is already medication, and the blast radius of changes.',
            call: 'Cholesterol. For the blood-draw apps, re-measuring at the CarePod is well differentiated: members are more likely to have a scale or blood pressure cuff at home than a phlebotomist. Blood-measured issues also read as more "medical" than "lifestyle," so Forward carries more authority. Between the two blood-draw apps, cholesterol measures more analytes and is more prevalent in the CarePod population.',
          },
          {
            question: 'What should drive showing medication as relevant in plan creation?',
            options: 'Nine options, scored on software-as-a-medical-device (SaMD) classification risk, whether each correctly models clinical decisions, overlap with upcoming protocols work, build complexity, and whether it served the user stories. With our clinical leads, we ruled out using analyte values in a range to drive the UI directly: the SaMD risk was too high.',
            call: 'A lightweight clinical decision made during the clinician\'s overread (for example, a task answered yes, no, or more information required) drives the medication UI in the app. Clinicians are already making a batch of decisions at overread; this asks for one more. In the longer term, I recommended clinicians create draft, pre-authorized medication orders at overread, which members could request, reject, ask about, or come back to later.',
          },
          {
            question: 'How many medication options should we show at once?',
            options: 'In the past, Forward showed three options to create a sense of choice and control.',
            call: 'Show one, for now. In research calls, many people were hesitant to accept medication, and many were overwhelmed by choice and wanted an answer from "the doctor." One versus three is a two-way door: if objections showed that choice would raise acceptance, the step could become "review suggested medication(s)."',
          },
          {
            question: 'Should members see plan items before completing any plan creation modules?',
            options: 'Show everything right away; show items only once the whole flow is complete; or show items as each related module is completed.',
            call: 'Show items as their module is completed. Showing items before the member takes any action works against the sense of co-creation; showing them only after everything is done risks never delivering information we think they should have. This relied on front-end filtering, which is simpler than changing back-end systems or clinical processes.',
          },
          {
            question: 'What is the story for members with normal cholesterol?',
            options: 'Treat "no condition" like a condition to manage; congratulate them and send them back to their dashboard; or use the app to monitor for early warning signs and support optimization.',
            call: 'Monitor for early warning signs and support optimization: you\'re in range today, but the condition can develop over time; regular screening and healthy habits keep you on track; come back in six months, set habit goals, and read up. Our clinical lead cautioned that this must not pull focus from areas where a member\'s values are abnormal.',
          },
        ],
        after: [
          'Other recommendations in the PRD: anchor the cholesterol app on the member\'s diagnosis; build on the existing app and plan architecture rather than migrate first; let members log habits and change them at any time; and model user-driven habit goals as FHIR Goals with Observations, pending costing.',
        ],
      },
      {
        heading: 'Metrics',
        body: [
          'Comparing deep plans with habits against the existing plans without them:',
        ],
        items: [
          '**Stability:** crash rate from changes to the cholesterol app',
          '**Acceptance:** click rate on "select habits" the first time a member sees plan navigation, and bounce rate on the habit screen',
          '**Stickiness:** active days in the first 30 days, app open rate, and engagement by days since plan creation',
          '**Engagement:** CarePod revisit rate',
          '**Effectiveness:** change in related values',
        ],
      },
      {
        heading: 'Plan and future ships',
        body: [
          'The ship was planned as roughly 4–6 weeks of build across November and December 2024, with PRD and design lock first, then engineering specs and build, and medication last. Future ships in the PRD:',
        ],
        items: [
          'An asynchronous medication flow, to learn whether Forward could manage medication for more of the members it was indicated for',
          'Integrated CarePod scheduling for diagnostic plan items, to learn whether it raises the revisit rate',
          'Apple HealthKit and Android Health Connect feeding habit trends',
        ],
      },
    ],
  },
};

export default caseStudies;
