import type { ClassLevel, Subject } from "./types";

/**
 * BSEB / NCERT-aligned curriculum structure for Class 6–12.
 * This is a representative structure covering the major subjects and chapters.
 * It is intentionally data-driven so chapters/topics can be expanded without
 * touching UI code. Class 10 & 12 carry the most detail (board priority).
 */

// ---- Reusable subject definitions (chapters trimmed to representative sets) ----

const math10: Subject = {
  id: "math",
  name: "Mathematics",
  nameHi: "गणित",
  icon: "📐",
  chapters: [
    { id: "real-numbers", name: "Real Numbers", nameHi: "वास्तविक संख्याएँ", topics: ["Euclid's Lemma", "HCF & LCM", "Irrational Numbers"] },
    { id: "polynomials", name: "Polynomials", nameHi: "बहुपद", topics: ["Zeroes of Polynomial", "Division Algorithm"] },
    { id: "linear-equations", name: "Pair of Linear Equations", nameHi: "दो चर वाले रैखिक समीकरण", topics: ["Substitution", "Elimination", "Graphical Method"] },
    { id: "quadratic", name: "Quadratic Equations", nameHi: "द्विघात समीकरण", topics: ["Roots", "Discriminant", "Nature of Roots"] },
    { id: "ap", name: "Arithmetic Progressions", nameHi: "समांतर श्रेढ़ी", topics: ["nth Term", "Sum of n Terms"] },
    { id: "triangles", name: "Triangles", nameHi: "त्रिभुज", topics: ["Similarity", "Pythagoras Theorem"] },
    { id: "trigonometry", name: "Introduction to Trigonometry", nameHi: "त्रिकोणमिति", topics: ["Ratios", "Identities"] },
    { id: "circles", name: "Circles", nameHi: "वृत्त", topics: ["Tangents"] },
    { id: "statistics", name: "Statistics", nameHi: "सांख्यिकी", topics: ["Mean", "Median", "Mode"] },
    { id: "probability", name: "Probability", nameHi: "प्रायिकता", topics: ["Simple Events"] },
  ],
};

const science10: Subject = {
  id: "science",
  name: "Science",
  nameHi: "विज्ञान",
  icon: "🔬",
  chapters: [
    { id: "chemical-reactions", name: "Chemical Reactions and Equations", nameHi: "रासायनिक अभिक्रियाएँ एवं समीकरण", topics: ["Types of Reactions", "Balancing", "Redox"] },
    { id: "acids-bases", name: "Acids, Bases and Salts", nameHi: "अम्ल, क्षारक एवं लवण", topics: ["pH Scale", "Salts", "Indicators"] },
    { id: "metals-nonmetals", name: "Metals and Non-metals", nameHi: "धातु एवं अधातु", topics: ["Reactivity Series", "Corrosion"] },
    { id: "carbon-compounds", name: "Carbon and its Compounds", nameHi: "कार्बन एवं उसके यौगिक", topics: ["Covalent Bond", "Hydrocarbons", "Functional Groups"] },
    { id: "life-processes", name: "Life Processes", nameHi: "जैव प्रक्रम", topics: ["Nutrition", "Respiration", "Transportation", "Excretion"] },
    { id: "control-coordination", name: "Control and Coordination", nameHi: "नियंत्रण एवं समन्वय", topics: ["Nervous System", "Hormones"] },
    { id: "reproduction", name: "How do Organisms Reproduce?", nameHi: "जीव जनन कैसे करते हैं", topics: ["Asexual", "Sexual"] },
    { id: "heredity", name: "Heredity and Evolution", nameHi: "आनुवंशिकता एवं जैव विकास", topics: ["Mendel's Laws"] },
    { id: "light", name: "Light – Reflection and Refraction", nameHi: "प्रकाश – परावर्तन तथा अपवर्तन", topics: ["Mirrors", "Lenses", "Refractive Index"] },
    { id: "human-eye", name: "The Human Eye and the Colourful World", nameHi: "मानव नेत्र तथा रंगबिरंगा संसार", topics: ["Defects of Vision", "Dispersion"] },
    { id: "electricity", name: "Electricity", nameHi: "विद्युत", topics: ["Ohm's Law", "Resistance", "Power"] },
    { id: "magnetic-effects", name: "Magnetic Effects of Electric Current", nameHi: "विद्युत धारा के चुम्बकीय प्रभाव", topics: ["Magnetic Field", "Electromagnetic Induction"] },
  ],
};

const sst10: Subject = {
  id: "sst",
  name: "Social Science",
  nameHi: "सामाजिक विज्ञान",
  icon: "🌏",
  chapters: [
    { id: "nationalism-europe", name: "The Rise of Nationalism in Europe", nameHi: "यूरोप में राष्ट्रवाद का उदय", topics: ["French Revolution", "Unification"] },
    { id: "nationalism-india", name: "Nationalism in India", nameHi: "भारत में राष्ट्रवाद", topics: ["Non-Cooperation", "Civil Disobedience"] },
    { id: "resources-development", name: "Resources and Development", nameHi: "संसाधन एवं विकास", topics: ["Land", "Soil"] },
    { id: "water-resources", name: "Water Resources", nameHi: "जल संसाधन", topics: ["Dams", "Rainwater Harvesting"] },
    { id: "power-sharing", name: "Power Sharing", nameHi: "सत्ता की साझेदारी", topics: ["Belgium", "Sri Lanka"] },
    { id: "federalism", name: "Federalism", nameHi: "संघवाद", topics: ["Centre-State", "Local Government"] },
    { id: "development-eco", name: "Development", nameHi: "विकास", topics: ["Income", "HDI"] },
    { id: "sectors-economy", name: "Sectors of the Indian Economy", nameHi: "भारतीय अर्थव्यवस्था के क्षेत्रक", topics: ["Primary", "Secondary", "Tertiary"] },
  ],
};

const english10: Subject = {
  id: "english",
  name: "English",
  nameHi: "अंग्रेज़ी",
  icon: "📖",
  chapters: [
    { id: "grammar", name: "Grammar", nameHi: "व्याकरण", topics: ["Tenses", "Voice", "Narration"] },
    { id: "reading", name: "Reading Comprehension", nameHi: "पठन बोध", topics: ["Unseen Passage"] },
    { id: "writing", name: "Writing Skills", nameHi: "लेखन कौशल", topics: ["Letter", "Essay"] },
    { id: "literature", name: "Literature", nameHi: "साहित्य", topics: ["Prose", "Poetry"] },
  ],
};

const hindi10: Subject = {
  id: "hindi",
  name: "Hindi",
  nameHi: "हिन्दी",
  icon: "📝",
  chapters: [
    { id: "gadya", name: "Gadya Khand (Prose)", nameHi: "गद्य खंड", topics: ["पाठ आधारित प्रश्न"] },
    { id: "padya", name: "Padya Khand (Poetry)", nameHi: "पद्य खंड", topics: ["कविता आधारित प्रश्न"] },
    { id: "vyakaran", name: "Vyakaran (Grammar)", nameHi: "व्याकरण", topics: ["संधि", "समास", "अलंकार"] },
    { id: "rachna", name: "Rachna (Composition)", nameHi: "रचना", topics: ["निबंध", "पत्र"] },
  ],
};

const sanskrit10: Subject = {
  id: "sanskrit",
  name: "Sanskrit",
  nameHi: "संस्कृत",
  icon: "🕉️",
  chapters: [
    { id: "gadyam", name: "Gadyam", nameHi: "गद्यम्", topics: ["पाठ"] },
    { id: "padyam", name: "Padyam", nameHi: "पद्यम्", topics: ["श्लोक"] },
    { id: "vyakaranam", name: "Vyakaranam", nameHi: "व्याकरणम्", topics: ["सन्धि", "शब्दरूप", "धातुरूप"] },
  ],
};

// Senior secondary (11-12) science stream subjects
const physics12: Subject = {
  id: "physics",
  name: "Physics",
  nameHi: "भौतिकी",
  icon: "🧲",
  chapters: [
    { id: "electrostatics", name: "Electric Charges and Fields", nameHi: "विद्युत आवेश तथा क्षेत्र", topics: ["Coulomb's Law", "Electric Field", "Gauss's Law"] },
    { id: "potential-capacitance", name: "Electrostatic Potential and Capacitance", nameHi: "स्थिर वैद्युत विभव तथा धारिता", topics: ["Potential", "Capacitor"] },
    { id: "current-electricity", name: "Current Electricity", nameHi: "विद्युत धारा", topics: ["Ohm's Law", "Kirchhoff's Laws"] },
    { id: "moving-charges", name: "Moving Charges and Magnetism", nameHi: "गतिमान आवेश तथा चुम्बकत्व", topics: ["Biot-Savart", "Ampere's Law"] },
    { id: "em-induction", name: "Electromagnetic Induction", nameHi: "वैद्युतचुम्बकीय प्रेरण", topics: ["Faraday's Law", "Lenz's Law"] },
    { id: "ray-optics", name: "Ray Optics and Optical Instruments", nameHi: "किरण प्रकाशिकी", topics: ["Lenses", "Total Internal Reflection"] },
    { id: "dual-nature", name: "Dual Nature of Radiation and Matter", nameHi: "विकिरण तथा द्रव्य की द्वैत प्रकृति", topics: ["Photoelectric Effect"] },
    { id: "atoms-nuclei", name: "Atoms and Nuclei", nameHi: "परमाणु तथा नाभिक", topics: ["Bohr Model", "Radioactivity"] },
    { id: "semiconductors", name: "Semiconductor Electronics", nameHi: "अर्धचालक इलेक्ट्रॉनिकी", topics: ["Diode", "Transistor"] },
  ],
};

const chemistry12: Subject = {
  id: "chemistry",
  name: "Chemistry",
  nameHi: "रसायन विज्ञान",
  icon: "⚗️",
  chapters: [
    { id: "solutions", name: "Solutions", nameHi: "विलयन", topics: ["Concentration", "Colligative Properties"] },
    { id: "electrochemistry", name: "Electrochemistry", nameHi: "वैद्युतरसायन", topics: ["Nernst Equation", "Cells"] },
    { id: "chemical-kinetics", name: "Chemical Kinetics", nameHi: "रासायनिक बलगतिकी", topics: ["Rate of Reaction", "Order"] },
    { id: "d-f-block", name: "d- and f-Block Elements", nameHi: "d एवं f ब्लॉक के तत्व", topics: ["Transition Metals"] },
    { id: "coordination", name: "Coordination Compounds", nameHi: "उपसहसंयोजन यौगिक", topics: ["Nomenclature", "Isomerism"] },
    { id: "haloalkanes", name: "Haloalkanes and Haloarenes", nameHi: "हैलोऐल्केन तथा हैलोऐरीन", topics: ["Reactions"] },
    { id: "alcohols", name: "Alcohols, Phenols and Ethers", nameHi: "ऐल्कोहॉल, फीनॉल तथा ईथर", topics: ["Preparation", "Properties"] },
    { id: "biomolecules", name: "Biomolecules", nameHi: "जैव अणु", topics: ["Carbohydrates", "Proteins"] },
  ],
};

const biology12: Subject = {
  id: "biology",
  name: "Biology",
  nameHi: "जीव विज्ञान",
  icon: "🧬",
  chapters: [
    { id: "reproduction-organisms", name: "Reproduction in Organisms", nameHi: "जीवों में जनन", topics: ["Asexual", "Sexual"] },
    { id: "human-reproduction", name: "Human Reproduction", nameHi: "मानव जनन", topics: ["Gametogenesis"] },
    { id: "genetics", name: "Principles of Inheritance and Variation", nameHi: "वंशागति तथा विविधता के सिद्धांत", topics: ["Mendel", "Linkage"] },
    { id: "molecular-basis", name: "Molecular Basis of Inheritance", nameHi: "वंशागति का आण्विक आधार", topics: ["DNA", "Replication"] },
    { id: "evolution", name: "Evolution", nameHi: "विकास", topics: ["Darwin", "Natural Selection"] },
    { id: "human-health", name: "Human Health and Disease", nameHi: "मानव स्वास्थ्य तथा रोग", topics: ["Immunity", "Pathogens"] },
    { id: "ecosystem", name: "Ecosystem", nameHi: "पारितंत्र", topics: ["Energy Flow", "Nutrient Cycle"] },
  ],
};

// Commerce / Humanities seniors
const accounts12: Subject = {
  id: "accounts",
  name: "Accountancy",
  nameHi: "लेखाशास्त्र",
  icon: "📒",
  chapters: [
    { id: "partnership", name: "Accounting for Partnership Firms", nameHi: "साझेदारी फर्मों का लेखांकन", topics: ["Profit Sharing", "Goodwill"] },
    { id: "company-accounts", name: "Accounting for Companies", nameHi: "कंपनी लेखांकन", topics: ["Shares", "Debentures"] },
    { id: "financial-statements", name: "Financial Statement Analysis", nameHi: "वित्तीय विवरण विश्लेषण", topics: ["Ratios", "Cash Flow"] },
  ],
};

const economics12: Subject = {
  id: "economics",
  name: "Economics",
  nameHi: "अर्थशास्त्र",
  icon: "📈",
  chapters: [
    { id: "national-income", name: "National Income", nameHi: "राष्ट्रीय आय", topics: ["GDP", "GNP"] },
    { id: "money-banking", name: "Money and Banking", nameHi: "मुद्रा एवं बैंकिंग", topics: ["RBI", "Credit Creation"] },
    { id: "consumer-equilibrium", name: "Consumer Equilibrium", nameHi: "उपभोक्ता संतुलन", topics: ["Utility", "Demand"] },
  ],
};

const polsci12: Subject = {
  id: "polsci",
  name: "Political Science",
  nameHi: "राजनीति विज्ञान",
  icon: "🏛️",
  chapters: [
    { id: "cold-war", name: "The Cold War Era", nameHi: "शीत युद्ध का दौर", topics: ["Bipolarity", "NAM"] },
    { id: "end-bipolarity", name: "The End of Bipolarity", nameHi: "दो ध्रुवीयता का अंत", topics: ["USSR Disintegration"] },
    { id: "indian-politics", name: "Challenges of Nation Building", nameHi: "राष्ट्र निर्माण की चुनौतियाँ", topics: ["Partition", "Integration"] },
  ],
};

const geography12: Subject = {
  id: "geography",
  name: "Geography",
  nameHi: "भूगोल",
  icon: "🗺️",
  chapters: [
    { id: "human-geography", name: "Human Geography: Nature and Scope", nameHi: "मानव भूगोल: प्रकृति एवं विषय क्षेत्र", topics: ["Branches"] },
    { id: "population", name: "Population", nameHi: "जनसंख्या", topics: ["Distribution", "Density"] },
    { id: "resources-geo", name: "Resources and Development", nameHi: "संसाधन एवं विकास", topics: ["Agriculture", "Minerals"] },
  ],
};

const computer: Subject = {
  id: "computer",
  name: "Computer Science",
  nameHi: "कंप्यूटर विज्ञान",
  icon: "💻",
  chapters: [
    { id: "fundamentals", name: "Computer Fundamentals", nameHi: "कंप्यूटर के मूल सिद्धांत", topics: ["Hardware", "Software"] },
    { id: "programming", name: "Introduction to Programming", nameHi: "प्रोग्रामिंग का परिचय", topics: ["Algorithms", "Python Basics"] },
    { id: "internet", name: "Internet and Networking", nameHi: "इंटरनेट एवं नेटवर्किंग", topics: ["Protocols", "Web"] },
  ],
};

// ---- Middle-school generic subjects (Class 6–8) ----
function middleSchool(): Subject[] {
  return [
    {
      id: "math",
      name: "Mathematics",
      nameHi: "गणित",
      icon: "📐",
      chapters: [
        { id: "integers", name: "Integers", nameHi: "पूर्णांक", topics: ["Operations"] },
        { id: "fractions", name: "Fractions and Decimals", nameHi: "भिन्न एवं दशमलव", topics: ["Operations"] },
        { id: "algebra-basic", name: "Simple Equations / Algebra", nameHi: "सरल समीकरण / बीजगणित", topics: ["Expressions"] },
        { id: "geometry-basic", name: "Lines and Angles", nameHi: "रेखाएँ एवं कोण", topics: ["Angles"] },
        { id: "mensuration", name: "Perimeter and Area", nameHi: "परिमाप एवं क्षेत्रफल", topics: ["Rectangle", "Triangle"] },
      ],
    },
    {
      id: "science",
      name: "Science",
      nameHi: "विज्ञान",
      icon: "🔬",
      chapters: [
        { id: "food", name: "Food and Nutrition", nameHi: "भोजन एवं पोषण", topics: ["Components"] },
        { id: "materials", name: "Materials Around Us", nameHi: "हमारे आस-पास के पदार्थ", topics: ["Separation"] },
        { id: "living-world", name: "The Living World", nameHi: "सजीव जगत", topics: ["Plants", "Animals"] },
        { id: "motion-basic", name: "Motion and Measurement", nameHi: "गति एवं मापन", topics: ["Units"] },
      ],
    },
    {
      id: "sst",
      name: "Social Science",
      nameHi: "सामाजिक विज्ञान",
      icon: "🌏",
      chapters: [
        { id: "history-basic", name: "History: Our Past", nameHi: "इतिहास: हमारा अतीत", topics: ["Sources"] },
        { id: "civics-basic", name: "Civics: Our Government", nameHi: "नागरिक शास्त्र: हमारी सरकार", topics: ["Democracy"] },
        { id: "geo-basic", name: "Geography: Our Earth", nameHi: "भूगोल: हमारी पृथ्वी", topics: ["Maps"] },
      ],
    },
    english10,
    hindi10,
    sanskrit10,
  ];
}

// ---- Assemble classes ----
const secondarySubjects: Subject[] = [
  math10,
  science10,
  sst10,
  english10,
  hindi10,
  sanskrit10,
  computer,
];

const seniorScienceCommerce: Subject[] = [
  physics12,
  chemistry12,
  biology12,
  english10,
  hindi10,
  accounts12,
  economics12,
  polsci12,
  geography12,
  computer,
];

export const CURRICULUM: ClassLevel[] = [
  { id: 6, subjects: middleSchool() },
  { id: 7, subjects: middleSchool() },
  { id: 8, subjects: middleSchool() },
  { id: 9, subjects: secondarySubjects },
  { id: 10, subjects: secondarySubjects },
  { id: 11, subjects: seniorScienceCommerce },
  { id: 12, subjects: seniorScienceCommerce },
];

export function getClass(classId: number): ClassLevel | undefined {
  return CURRICULUM.find((c) => c.id === classId);
}

export function getSubject(classId: number, subjectId: string): Subject | undefined {
  return getClass(classId)?.subjects.find((s) => s.id === subjectId);
}

export function getChapter(classId: number, subjectId: string, chapterId: string) {
  return getSubject(classId, subjectId)?.chapters.find((c) => c.id === chapterId);
}

export function localizedSubjectName(s: Subject, lang: "en" | "hi") {
  return lang === "hi" && s.nameHi ? s.nameHi : s.name;
}

export function localizedChapterName(
  c: { name: string; nameHi?: string },
  lang: "en" | "hi"
) {
  return lang === "hi" && c.nameHi ? c.nameHi : c.name;
}
