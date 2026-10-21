import type {
  CreateSubmissionInput,
  ReviewSubmissionInput,
  Submission,
  SubmissionStatus,
  UpdateUserInput,
  User,
} from "@/lib/api/types";
import { mockChapters, mockTracks } from "@/lib/mock/content";

const STORAGE_KEY = "nolsatu.mock.v1";

interface MockState {
  users: User[];
  submissions: Submission[];
  sessionUserId: string | null;
  nextIds: Record<string, number>;
}

const SEED_USERS: User[] = [
  {
    id: "u-admin",
    email: "admin@nolsatu.local",
    displayName: "Chairil (Admin)",
    role: "admin",
    isActive: true,
    joinedAt: "2026-10-01T08:00:00.000Z",
  },
  {
    id: "u-kiki",
    email: "kiki@nolsatu.local",
    displayName: "Kiki",
    role: "learner",
    isActive: true,
    joinedAt: "2026-10-05T10:15:00.000Z",
  },
  {
    id: "u-rangga",
    email: "rangga@nolsatu.local",
    displayName: "Rangga",
    role: "learner",
    isActive: true,
    joinedAt: "2026-10-11T13:40:00.000Z",
  },
  {
    id: "u-sari",
    email: "sari@nolsatu.local",
    displayName: "Sari",
    role: "learner",
    isActive: false,
    joinedAt: "2026-09-28T02:20:00.000Z",
  },
];

function chapterTitle(trackSlug: string, chapterSlug: string): string {
  return (
    mockChapters[trackSlug]?.find((chapter) => chapter.slug === chapterSlug)?.title ?? chapterSlug
  );
}

function seedSubmission(
  id: string,
  user: User,
  trackSlug: string,
  chapterSlug: string,
  status: SubmissionStatus,
  createdAt: string,
  extras: Partial<Submission> = {},
): Submission {
  return {
    id,
    userId: user.id,
    userDisplayName: user.displayName,
    userEmail: user.email,
    trackSlug,
    chapterSlug,
    chapterTitle: chapterTitle(trackSlug, chapterSlug),
    outputText:
      "Selamat datang di NolSatu!\nPilih track yang mau kamu pelajari.\nMulai dari Bab 1 dan jangan loncat.\n",
    note: "",
    status,
    createdAt,
    reviewedAt: status === "pending" ? null : createdAt,
    reviewedBy: status === "pending" ? null : "Chairil (Admin)",
    reviewNote:
      status === "approved"
        ? "Rapi. Output sesuai, penamaan variabel jelas."
        : status === "rejected"
          ? "Output belum sesuai: bagian akhir harus menampilkan total, bukan daftar."
          : null,
    files: [
      {
        id: 1,
        filename: "Main.java",
        sizeBytes: 742,
        mime: "text/x-java-source",
        previewText:
          'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Selamat datang di NolSatu!");\n        System.out.println("Pilih track yang mau kamu pelajari.");\n        System.out.println("Mulai dari Bab 1 dan jangan loncat.");\n    }\n}\n',
      },
    ],
    ...extras,
  };
}

function buildSeed(): MockState {
  const kiki = SEED_USERS[1];
  const rangga = SEED_USERS[2];

  return {
    users: SEED_USERS,
    submissions: [
      seedSubmission(
        "s-1001",
        kiki,
        "java",
        "pengenalan-java",
        "approved",
        "2026-10-06T09:12:00.000Z",
      ),
      seedSubmission(
        "s-1002",
        kiki,
        "java",
        "variabel-tipe-data",
        "approved",
        "2026-10-08T11:30:00.000Z",
        {
          files: [
            {
              id: 1,
              filename: "Main.java",
              sizeBytes: 918,
              mime: "text/x-java-source",
              previewText:
                'public class Main {\n    public static void main(String[] args) {\n        String hero = "Layla";\n        int hp = 2600;\n        double damage = 132.5;\n        boolean hidup = true;\n\n        System.out.println("Hero: " + hero);\n        System.out.println("HP: " + hp);\n        System.out.println("Damage: " + damage);\n        System.out.println("Hidup: " + hidup);\n    }\n}\n',
            },
          ],
          outputText: "Hero: Layla\nHP: 2600\nDamage: 132.5\nHidup: true\n",
        },
      ),
      seedSubmission(
        "s-1003",
        kiki,
        "java",
        "hello-world",
        "rejected",
        "2026-10-10T14:05:00.000Z",
        {
          note: "Sudah bisa run, tapi output masih ada typo.",
          outputText: "Hello Word\n",
          reviewNote:
            'Hampir! Ada typo di output: "Hello Word" seharusnya "Hello World". Perhatikan huruf terakhir, lalu submit ulang.',
        },
      ),
      seedSubmission(
        "s-1004",
        kiki,
        "java",
        "hello-world",
        "approved",
        "2026-10-11T08:20:00.000Z",
        {
          outputText: "Hello World\n",
          note: "Sudah saya perbaiki typo-nya.",
        },
      ),
      seedSubmission("s-1005", kiki, "java", "input", "pending", "2026-10-12T15:45:00.000Z", {
        note: "Scanner-nya sempat error, sudah saya perbaiki.",
        outputText: "Masukkan nama hero: Layla\nHalo, Layla!\n",
        files: [
          {
            id: 1,
            filename: "Main.java",
            sizeBytes: 1105,
            mime: "text/x-java-source",
            previewText:
              'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner input = new Scanner(System.in);\n        System.out.print("Masukkan nama hero: ");\n        String nama = input.nextLine();\n        System.out.println("Halo, " + nama + "!");\n        input.close();\n    }\n}\n',
          },
        ],
      }),
      seedSubmission(
        "s-1006",
        rangga,
        "java",
        "aritmatika",
        "pending",
        "2026-10-13T07:10:00.000Z",
        {
          outputText: "Damage total: 660\nSisa HP musuh: 1340\n",
          files: [
            {
              id: 1,
              filename: "Main.java",
              sizeBytes: 1320,
              mime: "text/x-java-source",
              previewText:
                'public class Main {\n    public static void main(String[] args) {\n        int damage = 220;\n        int hit = 3;\n        int hpMusuh = 2000;\n\n        int total = damage * hit;\n        System.out.println("Damage total: " + total);\n        System.out.println("Sisa HP musuh: " + (hpMusuh - total));\n    }\n}\n',
            },
          ],
        },
      ),
      seedSubmission(
        "s-1007",
        rangga,
        "java",
        "pengenalan-java",
        "approved",
        "2026-10-09T10:00:00.000Z",
      ),
      seedSubmission(
        "s-1008",
        kiki,
        "c",
        "kenalan-dengan-c",
        "approved",
        "2026-10-14T09:00:00.000Z",
        {
          outputText: "Halo dari C!\nSaya sedang belajar.\nBaris ketiga.\n",
          note: "Pertama kali pakai gcc.",
          files: [
            {
              id: 1,
              filename: "main.c",
              sizeBytes: 312,
              mime: "text/x-csrc",
              previewText:
                '#include <stdio.h>\n\nint main(void) {\n    printf("Halo dari C!\\n");\n    printf("Saya sedang belajar.\\n");\n    printf("Baris ketiga.\\n");\n    return 0;\n}\n',
            },
          ],
        },
      ),
      seedSubmission(
        "s-1009",
        kiki,
        "c",
        "variabel-tipe-data",
        "pending",
        "2026-10-15T11:20:00.000Z",
        {
          outputText: "Kiki, 19 tahun, tinggi 162.5 cm\n",
          files: [
            {
              id: 1,
              filename: "main.c",
              sizeBytes: 402,
              mime: "text/x-csrc",
              previewText:
                '#include <stdio.h>\n\nint main(void) {\n    char nama[] = "Kiki";\n    int umur = 19;\n    double tinggi = 162.5;\n\n    printf("%s, %d tahun, tinggi %.1f cm\\n", nama, umur, tinggi);\n    return 0;\n}\n',
            },
          ],
        },
      ),
    ],
    sessionUserId: "u-kiki",
    nextIds: { submission: 1010, file: 20, user: 10 },
  };
}

let cache: MockState | null = null;
type Listener = () => void;
const listeners = new Set<Listener>();

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function load(): MockState {
  if (cache) return cache;
  if (!isBrowser()) {
    cache = buildSeed();
    return cache;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cache = JSON.parse(raw) as MockState;
      return cache;
    }
  } catch {
    // localStorage rusak → mulai dari seed
  }
  cache = buildSeed();
  persist();
  return cache;
}

function persist(): void {
  if (!isBrowser() || !cache) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // quota penuh → biarkan state in-memory
  }
}

function emit(): void {
  persist();
  for (const listener of listeners) listener();
}

export function subscribeMock(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function resetMock(): void {
  cache = buildSeed();
  emit();
}

function findUserByEmail(email: string): User | undefined {
  return load().users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

/** Password demo: semua akun seed memakai "password". */
export function mockSignIn(email: string, password: string): User {
  const state = load();
  const user = findUserByEmail(email);
  if (!user) throw new Error("Email belum terdaftar.");
  if (!user.isActive) throw new Error("Akun ini dinonaktifkan. Hubungi admin.");
  if (password.length < 6) throw new Error("Password minimal 6 karakter.");
  // Demo: password apa pun ≥6 karakter diterima; API nanti memverifikasi hash.
  state.sessionUserId = user.id;
  emit();
  return user;
}

export function mockSignUp(displayName: string, email: string, password: string): User {
  const state = load();
  const trimmedName = displayName.trim();
  const trimmedEmail = email.trim().toLowerCase();
  if (trimmedName.length < 2) throw new Error("Nama minimal 2 karakter.");
  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) throw new Error("Format email belum benar.");
  if (password.length < 6) throw new Error("Password minimal 6 karakter.");
  if (findUserByEmail(trimmedEmail)) throw new Error("Email sudah dipakai. Coba masuk.");

  const user: User = {
    id: `u-${state.nextIds.user++}`,
    email: trimmedEmail,
    displayName: trimmedName,
    role: "learner",
    isActive: true,
    joinedAt: new Date().toISOString(),
  };
  state.users = [...state.users, user];
  state.sessionUserId = user.id;
  emit();
  return user;
}

export function mockSignOut(): void {
  const state = load();
  state.sessionUserId = null;
  emit();
}

export function mockCurrentUser(): User | null {
  const state = load();
  if (!state.sessionUserId) return null;
  return state.users.find((user) => user.id === state.sessionUserId) ?? null;
}

export function mockListUsers(): User[] {
  return load().users;
}

export function mockUpdateUser(id: string, patch: UpdateUserInput): User {
  const state = load();
  const index = state.users.findIndex((user) => user.id === id);
  if (index < 0) throw new Error("User tidak ditemukan.");
  const next: User = { ...state.users[index], ...patch };
  state.users = state.users.map((user) => (user.id === id ? next : user));
  emit();
  return next;
}

export function mockListSubmissions(userId?: string): Submission[] {
  const state = load();
  const items = userId
    ? state.submissions.filter((submission) => submission.userId === userId)
    : state.submissions;
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function mockGetSubmission(id: string): Submission | undefined {
  return load().submissions.find((submission) => submission.id === id);
}

export function mockCreateSubmission(user: User, input: CreateSubmissionInput): Submission {
  const state = load();
  const chapter = mockChapters[input.trackSlug]?.find((item) => item.slug === input.chapterSlug);
  if (!chapter) throw new Error("Bab tidak ditemukan.");
  if (input.files.length === 0) throw new Error("Upload minimal satu berkas.");
  if (!input.outputText.trim()) throw new Error("Tempel output program terlebih dahulu.");

  const submission: Submission = {
    id: `s-${state.nextIds.submission++}`,
    userId: user.id,
    userDisplayName: user.displayName,
    userEmail: user.email,
    trackSlug: input.trackSlug,
    chapterSlug: input.chapterSlug,
    chapterTitle: chapter.title,
    outputText: input.outputText,
    note: input.note,
    status: "pending",
    createdAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    reviewNote: null,
    files: input.files.map((file) => ({
      id: state.nextIds.file++,
      filename: file.filename,
      sizeBytes: file.sizeBytes,
      mime: file.mime,
      previewText: file.text,
    })),
  };

  state.submissions = [submission, ...state.submissions];
  emit();
  return submission;
}

export function mockReviewSubmission(
  id: string,
  reviewer: User,
  input: ReviewSubmissionInput,
): Submission {
  const state = load();
  const existing = state.submissions.find((submission) => submission.id === id);
  if (!existing) throw new Error("Submission tidak ditemukan.");
  if (existing.status !== "pending") throw new Error("Submission ini sudah direview.");
  if (input.status === "rejected" && !input.reviewNote.trim()) {
    throw new Error("Alasan penolakan wajib diisi supaya user tahu harus memperbaiki apa.");
  }

  const updated: Submission = {
    ...existing,
    status: input.status,
    reviewNote: input.reviewNote.trim() || null,
    reviewedAt: new Date().toISOString(),
    reviewedBy: reviewer.displayName,
  };
  state.submissions = state.submissions.map((submission) =>
    submission.id === id ? updated : submission,
  );
  emit();
  return updated;
}

/** Statistik yang dipakai beberapa halaman; dihitung, bukan disimpan. */
export function mockStats(userId: string) {
  const submissions = mockListSubmissions(userId);
  const approved = submissions.filter((submission) => submission.status === "approved");
  const pending = submissions.filter((submission) => submission.status === "pending");
  const rejected = submissions.filter((submission) => submission.status === "rejected");

  const chaptersPerTrack = new Map<string, { approved: number; total: number; pending: number }>();
  for (const track of mockTracks.filter((item) => item.published)) {
    const total = mockChapters[track.slug]?.filter((chapter) => chapter.published).length ?? 0;
    const approvedSlugs = new Set(
      approved.filter((s) => s.trackSlug === track.slug).map((s) => s.chapterSlug),
    );
    const pendingSlugs = new Set(
      pending.filter((s) => s.trackSlug === track.slug).map((s) => s.chapterSlug),
    );
    chaptersPerTrack.set(track.slug, {
      approved: approvedSlugs.size,
      pending: pendingSlugs.size,
      total,
    });
  }

  return {
    submissions,
    approved,
    pending,
    rejected,
    chaptersPerTrack,
    approvedCount: approved.length,
    pendingCount: pending.length,
    rejectedCount: rejected.length,
  };
}
