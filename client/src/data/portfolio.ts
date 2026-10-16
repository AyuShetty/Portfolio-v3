export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  oneLiner: string;
  year: string;
  mode: "Solo" | "Team";
  stack: string[];
  color: string;
  overview: string;
  problem: string;
  objectives: string[];
  role: string;
  architecture: string;
  challenges: string;
  process: string;
  features: string[];
  implementation: string;
  future: string;
  lessons: string;
  related: string[];
};

export const heroConfig = {
  name: "YOUR NAME",
  title: "PRODUCT ENGINEER / SYSTEMS THINKER",
  tagline: "I build connected experiences for people, products, and possibilities.",
  // Set this to true only after the real frame files or hosted URLs have been added.
  frameSequenceReady: false,
  // Replace these with the ordered files generated from the supplied character video.
  frames: Array.from(
    { length: 120 },
    (_, index) => `/frames/hero/${String(index + 1).padStart(4, "0")}.jpg`,
  ),
};

export const identityCards = [
  { id: "01", label: "FIELD NOTE", note: "Photography slot", className: "identity-card--tall" },
  { id: "02", label: "OBJECT STUDY", note: "Photography slot", className: "identity-card--small" },
  { id: "03", label: "MOTION TEST", note: "Image or loop slot", className: "identity-card--wide" },
  { id: "04", label: "AFTER HOURS", note: "Photography slot", className: "identity-card--square" },
];

export const highlights = [
  { value: "200+", label: "published articles", x: 17, y: 27, z: 2, tone: "lime" },
  { value: "ETH", label: "Foundation grant contribution", x: 69, y: 16, z: 7, tone: "blue" },
  { value: "COPE", label: "President · mental health initiative", x: 80, y: 54, z: 4, tone: "peach" },
  { value: "30h", label: "mental health volunteering", x: 22, y: 76, z: 9, tone: "blue" },
  { value: "ENS", label: "Pool Prize · ETHMumbai 2026", x: 58, y: 76, z: 1, tone: "lime" },
  { value: "ESP", label: "Grant contributor", x: 45, y: 46, z: 11, tone: "peach" },
];

export const skillGroups = [
  {
    id: "01",
    title: "Frontend & Interaction",
    skills: ["React", "TypeScript", "Motion design", "Creative coding"],
  },
  {
    id: "02",
    title: "Systems & Cloud",
    skills: ["Web3", "Cloud architecture", "AI infrastructure", "IoT"],
  },
  {
    id: "03",
    title: "Process & Product",
    skills: ["Product strategy", "Research", "Writing", "Community"],
  },
];

export const projects: Project[] = [
  {
    id: "eth-ed",
    title: "Eth.Ed",
    eyebrow: "01 / EDUCATION PROTOCOL",
    oneLiner: "A sharper learning surface for the Ethereum ecosystem.",
    year: "2026",
    mode: "Team",
    stack: ["Next.js", "Solidity", "Figma"],
    color: "#E5FF39",
    overview: "Placeholder overview for a learning product designed to make Ethereum knowledge more approachable, practical, and social.",
    problem: "Complex ecosystems often hide their most useful knowledge behind fragmented sources and intimidating language.",
    objectives: ["Reduce entry friction", "Create a memorable learning rhythm", "Make progress visible"],
    role: "Product engineering, interaction design, and content systems.",
    architecture: "A modular learning surface connecting editorial content, structured curricula, and community prompts.",
    challenges: "Balancing serious protocol concepts with an experience that feels energetic rather than academic.",
    process: "Research → prototype → test narrative flow → build reusable learning blocks.",
    features: ["Guided learning paths", "On-chain concept explainers", "Progress moments"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Expand pathways, add collaborative learning, and connect project evidence to portfolios.",
    lessons: "A learning interface earns attention when structure and tone work together.",
    related: ["EIPsInsight", "EtherWorld iOS"],
  },
  {
    id: "local-ai",
    title: "Local AI Infrastructure",
    eyebrow: "02 / PRIVATE COMPUTE",
    oneLiner: "An on-device foundation for intelligent workflows that keep data close.",
    year: "2026",
    mode: "Solo",
    stack: ["Python", "Ollama", "Docker"],
    color: "#7C6CFF",
    overview: "Placeholder overview for a local-first AI environment built for private, reliable experimentation and automation.",
    problem: "Cloud-only intelligence can be expensive, opaque, and impractical for sensitive work.",
    objectives: ["Run models locally", "Make workflows repeatable", "Document reliable setup"],
    role: "Infrastructure design, automation, and developer experience.",
    architecture: "A portable local stack connecting models, storage, controlled tools, and concise interfaces.",
    challenges: "Resource constraints, model trade-offs, and making powerful local tooling approachable.",
    process: "Audit hardware → benchmark → script setup → document operational patterns.",
    features: ["Offline inference", "Composable workflows", "Environment checks"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Explore team-ready deployment profiles and richer observability.",
    lessons: "Local-first systems reward thoughtful defaults more than endless configuration.",
    related: ["AI Workflow Automation", "Smart Home IoT"],
  },
  {
    id: "ai-workflow",
    title: "AI Workflow Automation",
    eyebrow: "03 / OPERATIONS LAYER",
    oneLiner: "Small systems that turn messy repetition into deliberate flow.",
    year: "2025",
    mode: "Solo",
    stack: ["Python", "APIs", "n8n"],
    color: "#FF9F79",
    overview: "Placeholder overview for automations that translate recurring operational work into maintainable systems.",
    problem: "Teams lose creative energy to fragmented hand-offs, repetitive research, and unstructured inputs.",
    objectives: ["Cut manual loops", "Keep people in control", "Make processes legible"],
    role: "Workflow mapping, automation engineering, and interface design.",
    architecture: "Event-driven automations with observable stages and human approval points.",
    challenges: "Avoiding brittle automation and preserving trust in generated outputs.",
    process: "Map current state → locate friction → prototype narrow loop → harden edge cases.",
    features: ["Task routing", "Context-aware summaries", "Approval checkpoints"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Build a reusable operations playbook for adjacent teams.",
    lessons: "The best automation makes agency more visible, not less.",
    related: ["Local AI Infrastructure", "This Portfolio"],
  },
  {
    id: "smart-home",
    title: "Smart Home IoT",
    eyebrow: "04 / AMBIENT SYSTEMS",
    oneLiner: "A responsive domestic environment tuned around human routines.",
    year: "2025",
    mode: "Team",
    stack: ["ESP32", "MQTT", "React"],
    color: "#58D7FF",
    overview: "Placeholder overview for an IoT system that turns physical signals into practical, human-centered responses.",
    problem: "Most smart-home interfaces are collections of controls rather than a coherent system.",
    objectives: ["Reduce friction", "Expose useful signals", "Keep local control"],
    role: "Product engineering and interaction prototyping.",
    architecture: "Sensors and actuators connected through an event layer and lightweight control surface.",
    challenges: "Hardware reliability, noisy environmental data, and understandable states.",
    process: "Observe routines → prototype sensor rules → test physical feedback → simplify control.",
    features: ["Ambient cues", "Manual override", "Scenario controls"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Experiment with privacy-aware sensing and adaptive environmental presets.",
    lessons: "Physical interfaces demand fewer but clearer decisions.",
    related: ["AirGesture", "Local AI Infrastructure"],
  },
  {
    id: "facial-keygen",
    title: "Facial KeyGen",
    eyebrow: "05 / IDENTITY EXPERIMENT",
    oneLiner: "A speculative interface for turning presence into a cryptographic gesture.",
    year: "2025",
    mode: "Solo",
    stack: ["Computer Vision", "WebCrypto", "React"],
    color: "#FF4D92",
    overview: "Placeholder overview for an experimental identity interaction using facial signals as part of a key-generation ritual.",
    problem: "Digital identity is powerful but often feels abstract, detached, and hard to understand.",
    objectives: ["Explore embodied security", "Make key creation memorable", "Surface consent clearly"],
    role: "Concept, prototyping, and front-end implementation.",
    architecture: "A browser-based interaction pairing computer vision signals with client-side cryptographic primitives.",
    challenges: "Communicating consent and keeping a speculative experience grounded in responsible design.",
    process: "Frame ethical constraints → prototype ritual → test clarity → document boundaries.",
    features: ["Guided capture", "Clear consent states", "Local-only prototype mode"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Investigate alternative embodied interaction patterns with stronger accessibility.",
    lessons: "Identity experiences have to make their trade-offs visible.",
    related: ["AirGesture", "Eth.Ed"],
  },
  {
    id: "airgesture",
    title: "AirGesture",
    eyebrow: "06 / SPATIAL INPUT",
    oneLiner: "Interaction beyond the surface: gestures as direct commands.",
    year: "2025",
    mode: "Team",
    stack: ["MediaPipe", "TypeScript", "Canvas"],
    color: "#FFF4D6",
    overview: "Placeholder overview for a motion-control experiment that rethinks the cursor through lightweight computer vision.",
    problem: "Traditional input can be limiting when the interaction itself needs physical expression.",
    objectives: ["Test intuitive gestures", "Preserve feedback", "Reduce accidental triggers"],
    role: "Interaction design and front-end prototyping.",
    architecture: "Camera input processed in-browser, translated into gesture events and visible response states.",
    challenges: "Latency, gesture ambiguity, and avoiding fatigue.",
    process: "Map gestures → establish feedback → tune thresholds → test in natural environments.",
    features: ["Gesture vocabulary", "Live cursor feedback", "Calibration state"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Explore hybrid voice-and-gesture interactions.",
    lessons: "A new input mode only feels magical when feedback arrives before doubt.",
    related: ["Facial KeyGen", "Smart Home IoT"],
  },
  {
    id: "etherworld-ios",
    title: "EtherWorld iOS",
    eyebrow: "07 / MEDIA ON THE MOVE",
    oneLiner: "Ethereum intelligence, condensed into a mobile reading rhythm.",
    year: "2024",
    mode: "Team",
    stack: ["SwiftUI", "Firebase", "CMS"],
    color: "#72F4B1",
    overview: "Placeholder overview for a mobile reader translating Ethereum news and analysis into a focused daily habit.",
    problem: "Fast-moving ecosystem updates are hard to follow without signal, context, and a clear mobile format.",
    objectives: ["Prioritize the signal", "Make reading habitual", "Keep editorial tone distinct"],
    role: "Product engineering and experience design.",
    architecture: "A mobile content client paired with a structured publishing pipeline and recommendation layers.",
    challenges: "Making dense technical media feel light without making it shallow.",
    process: "Map content moments → prototype reading flow → refine retention loops → ship.",
    features: ["Curated feed", "Saved reading", "Contextual explainers"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Develop richer offline and community reading modes.",
    lessons: "Mobile media succeeds by respecting the reader’s attention budget.",
    related: ["Eth.Ed", "EIPsInsight"],
  },
  {
    id: "eips-insight",
    title: "EIPsInsight",
    eyebrow: "08 / PROTOCOL INTELLIGENCE",
    oneLiner: "A clearer way to trace the proposals shaping Ethereum.",
    year: "2024",
    mode: "Solo",
    stack: ["Next.js", "Data Viz", "LLMs"],
    color: "#B6A5FF",
    overview: "Placeholder overview for a research interface that maps Ethereum Improvement Proposals into accessible narratives.",
    problem: "EIPs are influential but intimidating; the context around them is often missing for new readers.",
    objectives: ["Clarify proposal status", "Connect related ideas", "Support non-expert curiosity"],
    role: "Research, product design, and engineering.",
    architecture: "A structured content model combining proposal metadata, explanations, and relationship mapping.",
    challenges: "Keeping complex data accurate while producing a friendly reading surface.",
    process: "Model data → define explainer language → visualize relationships → refine user pathways.",
    features: ["Proposal snapshots", "Relationship graph", "Plain-language summaries"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Add collaborative annotation and governance timelines.",
    lessons: "Transparency begins with making the system legible.",
    related: ["Eth.Ed", "EtherWorld iOS"],
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    eyebrow: "09 / PERSONAL INTERFACE",
    oneLiner: "A scroll-driven interface for the work, thinking, and space in between.",
    year: "2026",
    mode: "Solo",
    stack: ["React", "Canvas", "Motion"],
    color: "#FFFFFF",
    overview: "Placeholder overview for a portfolio designed as a sequence of different interaction systems rather than a standard archive.",
    problem: "Conventional portfolios flatten process into cards and pages, leaving little room for a distinct point of view.",
    objectives: ["Make the journey memorable", "Keep case studies readable", "Make updates data-driven"],
    role: "Creative direction, interface design, and engineering.",
    architecture: "A scene-based single-page composition with independent interaction modules and centralized content data.",
    challenges: "Creating contrast between scenes without sacrificing coherence or performance.",
    process: "Set a visual grammar → define scenes → build reusable systems → tune the scroll story.",
    features: ["Frame-sequence hero", "Constellation scene", "Scroll-scrubbed case studies"],
    implementation: "Replace with final technical implementation notes and links.",
    future: "Swap placeholders for final artwork, frame sequence, and detailed project narratives.",
    lessons: "A portfolio is more compelling when it feels authored rather than merely assembled.",
    related: ["AI Workflow Automation", "Eth.Ed"],
  },
];

export const experience = [
  {
    period: "SEP 2025 — PRESENT",
    company: "AVARCH",
    role: "Product Engineer (Trainee)",
    note: "Working across product engineering, systems thinking, and ambitious prototypes.",
  },
  {
    period: "MAR 2023 — SEP 2025",
    company: "AVARCH",
    role: "Marketing Executive (Intern)",
    note: "Turning complex initiatives into clear stories, campaigns, and community moments.",
  },
  {
    period: "JUN 2024 — JUL 2025",
    company: "COPE",
    role: "President",
    note: "Leading a mental-health initiative grounded in care, community, and action.",
  },
];

export const contactConfig = {
  email: "hello@yourdomain.com",
  resumePath: "/resume-placeholder.txt",
  writingUrl: "https://etherworld.co/",
};

export const designNotes = {
  heroFrameDirectory: "/frames/hero/0001.jpg … /frames/hero/0120.jpg",
  mobileStrategy:
    "The hero uses a static canvas fallback, constellation nodes flatten to a lightweight 2D field, and the project gallery becomes a vertical stack on small screens.",
};
