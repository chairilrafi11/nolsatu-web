import * as React from "react";

import type {
  ChapterProgress,
  CreateSubmissionInput,
  ReviewSubmissionInput,
  Submission,
  TrackDetail,
  TrackProgress,
  UpdateUserInput,
  User,
} from "@/lib/api/types";
import { mockChapters, mockTracks } from "@/lib/mock/content";
import {
  mockCreateSubmission,
  mockCurrentUser,
  mockGetSubmission,
  mockListSubmissions,
  mockListUsers,
  mockReviewSubmission,
  mockSignIn,
  mockSignOut,
  mockSignUp,
  mockStats,
  mockUpdateUser,
  subscribeMock,
} from "@/lib/mock/store";

/**
 * Satu-satunya pintu data untuk halaman. Semua fungsi di sini membaca mock store
 * sekarang; implementasi API akan masuk di file ini juga tanpa mengubah komponen.
 */

function useMockSnapshot<T>(read: () => T): T {
  return React.useSyncExternalStore(subscribeMock, read, read);
}

export function useCurrentUser(): User | null {
  return useMockSnapshot(mockCurrentUser);
}

export function useTrackList(): TrackProgress[] {
  return useMockSnapshot(() => {
    const user = mockCurrentUser();
    const stats = mockStats(user?.id ?? "");
    return mockTracks
      .filter((track) => track.published)
      .map((track) => {
        const bucket = stats.chaptersPerTrack.get(track.slug);
        return {
          track,
          approvedCount: bucket?.approved ?? 0,
          pendingCount: bucket?.pending ?? 0,
          totalCount: bucket?.total ?? 0,
        };
      });
  });
}

export function useTrackDetail(slug: string): TrackDetail | null {
  return useMockSnapshot(() => {
    const track = mockTracks.find((item) => item.slug === slug);
    if (!track?.published) return null;
    const user = mockCurrentUser();
    const submissions = user ? mockListSubmissions(user.id) : [];
    const trackSubmissions = submissions.filter((submission) => submission.trackSlug === slug);

    const chapters: ChapterProgress[] = (mockChapters[slug] ?? [])
      .filter((chapter) => chapter.published)
      .map((chapter) => {
        const forChapter = trackSubmissions.filter(
          (submission) => submission.chapterSlug === chapter.slug,
        );
        const approved = forChapter.find((submission) => submission.status === "approved");
        const pending = forChapter.find((submission) => submission.status === "pending");
        const rejected = forChapter.find((submission) => submission.status === "rejected");

        const status: ChapterProgress["status"] = approved
          ? "approved"
          : pending
            ? "pending"
            : rejected
              ? "rejected"
              : "not_started";

        const latest = approved ?? pending ?? rejected ?? null;
        return {
          ...chapter,
          status,
          submissionId: latest?.id ?? null,
          lastSubmittedAt: latest?.createdAt ?? null,
        };
      });

    return {
      track,
      chapters,
      approvedCount: chapters.filter((chapter) => chapter.status === "approved").length,
      pendingCount: chapters.filter((chapter) => chapter.status === "pending").length,
      totalCount: chapters.length,
    };
  });
}

export function useChapter(trackSlug: string, chapterSlug: string): ChapterProgress | null {
  return useMockSnapshot(() => {
    const chapter = mockChapters[trackSlug]?.find((item) => item.slug === chapterSlug);
    if (!chapter?.published) return null;

    const user = mockCurrentUser();
    const submissions = user
      ? mockListSubmissions(user.id).filter(
          (submission) =>
            submission.trackSlug === trackSlug && submission.chapterSlug === chapterSlug,
        )
      : [];

    const approved = submissions.find((submission) => submission.status === "approved");
    const pending = submissions.find((submission) => submission.status === "pending");
    const rejected = submissions.find((submission) => submission.status === "rejected");
    const latest = approved ?? pending ?? rejected ?? null;

    return {
      ...chapter,
      status: approved ? "approved" : pending ? "pending" : rejected ? "rejected" : "not_started",
      submissionId: latest?.id ?? null,
      lastSubmittedAt: latest?.createdAt ?? null,
    };
  });
}

export function useMySubmissions(): Submission[] {
  const user = useCurrentUser();
  return useMockSnapshot(() => (user ? mockListSubmissions(user.id) : []));
}

export function useSubmission(id: string): Submission | null {
  return useMockSnapshot(() => mockGetSubmission(id) ?? null);
}

export function useAllSubmissions(): Submission[] {
  return useMockSnapshot(() => mockListSubmissions());
}

export function useUsers(): User[] {
  return useMockSnapshot(mockListUsers);
}

export function useDashboard() {
  const user = useCurrentUser();
  const tracks = useTrackList();
  const submissions = useMySubmissions();

  return React.useMemo(() => {
    const stats = mockStats(user?.id ?? "");
    const activeTrack = tracks.find((item) => item.track.status === "live") ?? tracks[0] ?? null;
    const nextChapter =
      activeTrack && user
        ? ((mockChapters[activeTrack.track.slug] ?? []).find((chapter) => {
            const chapterSubs = submissions.filter(
              (submission) =>
                submission.trackSlug === activeTrack.track.slug &&
                submission.chapterSlug === chapter.slug,
            );
            return !chapterSubs.some((submission) => submission.status === "approved");
          }) ?? null)
        : null;

    return {
      user,
      tracks,
      submissions,
      stats,
      nextChapter: nextChapter
        ? { trackSlug: activeTrack?.track.slug ?? "", chapter: nextChapter }
        : null,
    };
  }, [user, tracks, submissions]);
}

/** Aksi — sengaja bukan hook supaya bisa dipanggil dari event handler mana pun. */
export const actions = {
  signIn: (email: string, password: string) => mockSignIn(email, password),
  signUp: (name: string, email: string, password: string) => mockSignUp(name, email, password),
  signOut: () => mockSignOut(),
  createSubmission: (user: User, input: CreateSubmissionInput) => mockCreateSubmission(user, input),
  reviewSubmission: (id: string, reviewer: User, input: ReviewSubmissionInput) =>
    mockReviewSubmission(id, reviewer, input),
  updateUser: (id: string, patch: UpdateUserInput) => mockUpdateUser(id, patch),
};
