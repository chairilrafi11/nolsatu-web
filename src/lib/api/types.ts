/** Tipe kanonik NolSatu. Mock dan API wajib memakai bentuk yang sama. */

export type Role = "learner" | "admin";
export type SubmissionStatus = "pending" | "approved" | "rejected";
export type ChapterStatus = "not_started" | "pending" | "approved" | "rejected";
export type TrackStatus = "live" | "soon" | "archive";

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  isActive: boolean;
  joinedAt: string;
}

export interface Track {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Label bahasa untuk glyph dan filter. */
  language: "java" | "c" | "react";
  position: number;
  status: TrackStatus;
  published: boolean;
  chapterCount: number;
  estimatedHours: number;
}

export interface Chapter {
  trackSlug: string;
  slug: string;
  title: string;
  position: number;
  summary: string;
  contentMd: string;
  estimatedMinutes: number;
  published: boolean;
}

export interface ChapterProgress extends Chapter {
  status: ChapterStatus;
  submissionId: string | null;
  lastSubmittedAt: string | null;
}

export interface TrackProgress {
  track: Track;
  approvedCount: number;
  pendingCount: number;
  totalCount: number;
}

export interface TrackDetail extends TrackProgress {
  chapters: ChapterProgress[];
}

export interface SubmissionFile {
  id: number;
  filename: string;
  sizeBytes: number;
  mime: string;
  /** Hanya tersedia di mock; API memakai endpoint unduh ber-JWT. */
  previewText: string | null;
}

export interface Submission {
  id: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  trackSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  outputText: string;
  note: string;
  status: SubmissionStatus;
  createdAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  reviewNote: string | null;
  files: SubmissionFile[];
}

export interface CreateSubmissionInput {
  trackSlug: string;
  chapterSlug: string;
  outputText: string;
  note: string;
  files: { filename: string; sizeBytes: number; mime: string; text: string | null }[];
}

export interface ReviewSubmissionInput {
  status: Exclude<SubmissionStatus, "pending">;
  reviewNote: string;
}

export interface UpdateUserInput {
  role?: Role;
  isActive?: boolean;
  displayName?: string;
}

/** Batas yang juga akan ditegakkan API (spec §11). */
export const LIMITS = {
  maxFiles: 5,
  maxFileBytes: 5 * 1024 * 1024,
  maxOutputChars: 20_000,
  maxNoteChars: 1_000,
  maxReviewNoteChars: 2_000,
  allowedExtensions: [".java", ".c", ".h", ".txt", ".md"],
} as const;
