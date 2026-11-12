import type { StudentYear } from "./types";

/**
 * Everything that makes this app "Law AI Tutor - Commercial" lives here.
 * The Civil, Commercial and Taxation apps share the same code; only this file,
 * the topic files in /sources and the docs differ.
 *
 * Scope follows the Syllabus for the 2027 Bar Examinations
 * (Bar Bulletin No. 1-2027, 16 September 2026), Commercial and Taxation Laws, Parts I to VI (Commercial).
 */
export interface SubjectConfig {
  /** Shown in the header, page title and tutor prompt. */
  appName: string;
  /** The bar subject, e.g. "Civil Law". */
  subjectName: string;
  /** Exact 2027 Bar syllabus heading for this subject. */
  barSyllabusTitle: string;
  /** Subject areas in the order law schools teach them (topic `subject:` values). */
  areas: string[];
  /** Areas shown to each student year. Year 4 and bar reviewees always see every area. */
  yearAreas: Record<1 | 2 | 3, string[]>;
  /** Used in the demo banner: "This topic was drafted from {demoSourceNote} for demonstration". */
  demoSourceNote: string;
}

export const SUBJECT: SubjectConfig = {
  appName: "Law AI Tutor - Commercial",
  subjectName: "Commercial Law",
  barSyllabusTitle: "Commercial and Taxation Laws (Commercial Law part, I to VI)",
  // In the order of the 2027 Bar syllabus outline (I.A, I.A.11, I.B, II, III, IV.A-D, IV.E, V, VI.A-E).
  areas: [
    "Corporations",
    "Foreign Investments",
    "Partnership",
    "Insurance",
    "Transportation",
    "Banking",
    "Anti-Money Laundering",
    "Intellectual Property",
    "Securities Regulation",
    "Financial Rehabilitation and Insolvency",
    "Electronic Commerce",
    "Competition Law",
    "Public Services",
  ],
  yearAreas: {
    1: [],
    2: ["Corporations", "Partnership", "Insurance", "Transportation", "Intellectual Property"],
    3: [
      "Foreign Investments",
      "Banking",
      "Anti-Money Laundering",
      "Securities Regulation",
      "Competition Law",
    ],
  },
  demoSourceNote: "the Revised Corporation Code, the Civil Code, the Insurance Code, other special laws and Supreme Court decisions",
};

/** Areas a student in this year sees. Year 4 sees every area. */
export function areasForYear(year: StudentYear): string[] {
  if (year === 4) return SUBJECT.areas;
  return SUBJECT.yearAreas[year];
}

/** Years that have at least one area (Year 4 always does). Years with none are hidden. */
export function offeredYears(): StudentYear[] {
  return ([1, 2, 3, 4] as StudentYear[]).filter((y) => areasForYear(y).length > 0);
}

/** "Persons and Family Relations and Obligations and Contracts" → readable list. */
export function listAreas(areas: string[]): string {
  if (areas.length <= 1) return areas.join("");
  if (areas.length === 2) return `${areas[0]} and ${areas[1]}`;
  return `${areas.slice(0, -1).join(", ")} and ${areas[areas.length - 1]}`;
}
