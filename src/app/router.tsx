import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import * as React from "react";

import { AdminContentPage } from "@/features/admin/components/AdminContentPage";
import { AdminReviewPage } from "@/features/admin/components/AdminReviewPage";
import { AdminUsersPage } from "@/features/admin/components/AdminUsersPage";
import { RegisterPage, SignInPage } from "@/features/auth/components/AuthPages";
import { ChapterPage } from "@/features/chapter/components/ChapterPage";
import { DashboardPage, NotFoundPage } from "@/features/home/components/DashboardPage";
import { LandingPage } from "@/features/home/components/LandingPage";
import { SubmissionDetailPage } from "@/features/submissions/components/SubmissionDetailPage";
import { SubmissionsPage } from "@/features/submissions/components/SubmissionsPage";
import { TrackDetailPage } from "@/features/tracks/components/TrackDetailPage";
import { TracksPage } from "@/features/tracks/components/TracksPage";
import { AppLayout } from "@/layout/AppLayout";

export interface RouterContext {
  authLoading: boolean;
  isAuthenticated: boolean;
  role: string | null;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const publicRoot = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <Outlet />,
});

const landingRoute = createRoute({
  getParentRoute: () => publicRoot,
  path: "/",
  beforeLoad: ({ context }) => {
    if (context.authLoading) return;
    if (context.isAuthenticated) throw redirect({ to: "/dashboard" });
    return undefined;
  },
  component: LandingPage,
});

const signInRoute = createRoute({
  getParentRoute: () => publicRoot,
  path: "/signin",
  beforeLoad: ({ context }) => {
    if (context.authLoading) return;
    if (context.isAuthenticated) throw redirect({ to: "/dashboard" });
    return undefined;
  },
  component: SignInPage,
});

const registerRoute = createRoute({
  getParentRoute: () => publicRoot,
  path: "/register",
  beforeLoad: ({ context }) => {
    if (context.authLoading) return;
    if (context.isAuthenticated) throw redirect({ to: "/dashboard" });
    return undefined;
  },
  component: RegisterPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: ({ context }) => {
    if (context.authLoading) return;
    if (!context.isAuthenticated) throw redirect({ to: "/signin" });
    return undefined;
  },
  component: AppLayout,
});

function adminGuard({ context }: { context: RouterContext }) {
  if (context.authLoading) return;
  if (context.role !== "admin") throw redirect({ to: "/dashboard" });
  return undefined;
}

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const tracksRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/tracks",
  component: TracksPage,
});

const trackDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/tracks/$trackSlug",
  component: TrackDetailPage,
});

const chapterRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/tracks/$trackSlug/$chapterSlug",
  component: ChapterPage,
});

const submissionsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/submissions",
  component: SubmissionsPage,
});

const submissionDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/submissions/$submissionId",
  component: SubmissionDetailPage,
});

const adminReviewRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/admin/review",
  beforeLoad: adminGuard,
  component: AdminReviewPage,
});

const adminContentRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/admin/content",
  beforeLoad: adminGuard,
  component: AdminContentPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/admin/users",
  beforeLoad: adminGuard,
  component: AdminUsersPage,
});

const routeTree = rootRoute.addChildren([
  publicRoot.addChildren([landingRoute, signInRoute, registerRoute]),
  appRoute.addChildren([
    dashboardRoute,
    tracksRoute,
    trackDetailRoute,
    chapterRoute,
    submissionsRoute,
    submissionDetailRoute,
    adminReviewRoute,
    adminContentRoute,
    adminUsersRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  context: { authLoading: true, isAuthenticated: false, role: null },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { React };
