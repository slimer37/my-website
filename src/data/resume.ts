// Edit this file to change the résumé content shown on the home page.

export type Role = {
  org: string
  title?: string
  start: string
  end: string // "Present" marks a current role
  bullets: string[]
}

export type SkillGroup = {
  label: string
  items: string[]
  level?: 'proficient' | 'intermediate'
}

export const experience = {
  relevant: [
    {
      org: "SD Studios",
      title: "Lead Programmer and 3D Artist",
      start: "Aug 2025",
      end: "Present",
      bullets: [
        "Reduce individual asset creation time by >75% with custom Unity Editor tools",
        "Lead coding and 3D asset creation with Unity and Blender",
        "Design and program UX/UI for game HUDs and menus using XML and C#",
      ],
    },
    {
      org: "SanDisk AI Image Analysis App",
      title: "Application Developer",
      start: "Jan 2025",
      end: "May 2025",
      bullets: [
        "Introduced REST API to allow sharing of expensive GPUs running image-processing ML models",
        "Refactored over 1000 lines of old logic and PyQt frontend to improve readability and debug",
        "Documented user stories and use cases as directed by SanDisk",
      ],
    },
    {
      org: "Game Server Administration",
      start: "Sep 2023",
      end: "Present",
      bullets: [
        "Maintain Ubuntu system with game server and Discord bot",
        "Configure nginx to serve personal websites and files",
        "Automate game-world backups",
      ],
    },
    {
      org: "UC Merced Game Development Club",
      title: "President",
      start: "Jan 2023",
      end: "May 2025",
      bullets: [
        "Presented 5 workshops regarding game-making software, drawing on hobby experience",
        "Hosted annual school-wide 48-hour game jams, the largest with 30+ participants",
        "Organized $2k towards workshops, jams, and fun events like movies, improving attendance by 50%",
      ],
    },
  ] satisfies Role[],

  work: [
    {
      org: "SavvyStack",
      title: "Fullstack Developer",
      start: "Aug 2026",
      end: "Present",
      bullets: [
        "Develop client web applications using React w/ Next.js, Supabase, and Tailwind CSS",
        "Implement frontend features and backend functionality, including authentication APIs and Supabase integration",
        "Collaborate through Git, Jira, Slack, and Toggl to manage development tasks and document progress",
      ],
    },
    {
      org: "Toontown Rewritten Team",
      title: "3D Artist",
      start: "Jun 2026",
      end: "Present",
      bullets: [
        "Produce low-poly 3D props based on concept art in Blender",
        "Communicate with artists and directors for artistic revisions or updates",
        "Unwrap models efficiently and create temporary textures",
      ],
    },
    {
      org: "DataAnnotation.tech",
      title: "Annotator",
      start: "Jan 2024",
      end: "Present",
      bullets: [
        "Annotate and correct training data for programming-focused GenAI models (LLMs)",
        "Constantly adapt to differing project needs and styles",
        "Complete 100+ tasks per month, from reviewing data to testing interactions",
      ],
    },
    {
      org: "UC Merced Games Change Minds Lab",
      title: "Lead Unity3D Developer",
      start: "Sep 2022",
      end: "Aug 2025",
      bullets: [
        "Maintained a clean GitHub repository and support non-technical members with access",
        "Implemented 15+ new game mechanics with over 1500 lines of C#, including online multiplayer",
        "Kept documentation and provide support for asset integration and testing methods",
      ],
    },
    {
      org: "Target",
      title: "Fulfillment Expert",
      start: "Apr 2023",
      end: "Dec 2023",
      bullets: [
        "Completed time-limited orders while politely assisting customers",
        "Worked with a team of other fulfillment experts to ensure order completeness",
        "Managed time and routes to efficiently pick orders in under 2 hours",
      ],
    },
    {
      org: "Manteca Unified School District",
      title: "IT Intern",
      start: "Jun 2022",
      end: "Jul 2022",
      bullets: [
        "Managed inventory control for technology worth $30k+",
        "Disassembled and salvaged components from non-functional units",
        "Deployed OS images and updates to new laptop shipments, troubleshooting issues as needed",
      ],
    },
  ] satisfies Role[],
}

export const education = {
  degree: {
    school: "University of California, Merced",
    program: "B.S. in Computer Science & Engineering with High Honors",
    date: "May 2025",
    highlights: ["GPA: 3.98", "3x Chancellor's List Recipient"],
    coursework: [
      "Software Engineering", "Algorithms", "Data Structures", "Computer Networks",
      "Full Stack Web Development", "Machine Learning", "Computer Architecture", "Compiler Construction",
    ],
  },
  certificate: {
    name: "Google Career Certificates",
    detail: "Coursera Specialization: IT Automation with Python",
    date: "Mar 2022",
  },
}

export const skills: SkillGroup[] = [
  { label: "Languages & Frameworks", level: 'proficient', items: ["C#", "C/C++", "Python", "Flask", "HTML/CSS", "JavaScript", "TypeScript", "React"] },
  { label: "Also working knowledge of", level: 'intermediate', items: ["SQL (SQLite)", "Lua", "Java"] },
  { label: "IDEs", items: ["Visual Studio", "VSCode", "JetBrains Rider", "IntelliJ IDEA"] },
  { label: "Tools", items: ["Git (GitHub)", "Jira", "Arduino", "Microsoft Office Suite"] },
  { label: "AI Tools", items: ["Claude Code", "GPT Codex", "Gemini CLI"] },
]
