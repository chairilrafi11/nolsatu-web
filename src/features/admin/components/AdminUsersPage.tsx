import { IconUserCheck, IconUserOff, IconUsers } from "@tabler/icons-react";
import * as React from "react";

import { actions, useUsers } from "@/lib/api/queries";
import type { Role, User } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Input } from "@/shared/ui/Input";
import { useToast } from "@/shared/ui/Toast";

export function AdminUsersPage() {
  const users = useUsers();
  const toast = useToast();
  const [query, setQuery] = React.useState("");

  const visible = users.filter((user) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return (
      user.displayName.toLowerCase().includes(needle) || user.email.toLowerCase().includes(needle)
    );
  });

  function setRole(user: User, role: Role) {
    try {
      actions.updateUser(user.id, { role });
      toast.success(`Role ${user.displayName} → ${role}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengubah role.");
    }
  }

  function toggleActive(user: User) {
    try {
      actions.updateUser(user.id, { isActive: !user.isActive });
      toast.success(`${user.displayName} ${user.isActive ? "dinonaktifkan" : "diaktifkan"}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengubah status.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Users</h1>
          <p className="mt-1 max-w-lg text-xs leading-relaxed text-on-surface-variant">
            Daftar akun yang mendaftar. Menonaktifkan akun akan menolak login, tetapi riwayat
            submission tetap utuh.
          </p>
        </div>
        <div className="w-full max-w-56">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama atau email"
            aria-label="Cari user"
          />
        </div>
      </header>

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            icon={<IconUsers size={18} />}
            title="Tidak ada user"
            description="Coba kata kunci lain."
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="hidden items-center gap-3 border-b border-surface-line bg-surface-sunken/50 px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint sm:flex">
            <span className="flex-1">User</span>
            <span className="w-20 text-center">Role</span>
            <span className="w-24 text-center">Status</span>
            <span className="w-28 text-right">Bergabung</span>
            <span className="w-28 text-right">Aksi</span>
          </div>
          <div className="divide-y divide-surface-line">
            {visible.map((user) => (
              <div key={user.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <Avatar name={user.displayName} size={30} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold">{user.displayName}</p>
                    <p className="truncate font-mono text-[10px] text-on-surface-faint">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex w-20 justify-center">
                  <select
                    value={user.role}
                    onChange={(event) => setRole(user, event.target.value as Role)}
                    aria-label={`Role ${user.displayName}`}
                    className={cn(
                      "cursor-pointer rounded border bg-surface-raised px-1.5 py-1 text-[10px] font-bold uppercase",
                      user.role === "admin"
                        ? "border-primary/30 text-primary"
                        : "border-surface-line text-on-surface-variant",
                    )}
                  >
                    <option value="learner">learner</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <div className="flex w-24 justify-center">
                  <Badge status={user.isActive ? "active" : "inactive"} />
                </div>

                <div className="hidden w-28 text-right font-mono text-[10px] text-on-surface-faint sm:block">
                  {formatDate(user.joinedAt)}
                </div>

                <div className="flex w-full justify-end sm:w-28">
                  <Button
                    size="sm"
                    variant={user.isActive ? "outline" : "secondary"}
                    onClick={() => toggleActive(user)}
                  >
                    {user.isActive ? (
                      <>
                        <IconUserOff size={12} /> Nonaktifkan
                      </>
                    ) : (
                      <>
                        <IconUserCheck size={12} /> Aktifkan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
