"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Project Manager" | "Team Member";
}

interface Props {
  open: boolean;
  user: User | null;
  loading?: boolean;

  onClose: () => void;

  onSave: (
    data: {
      name: string;
      email: string;
      role: User["role"];
    }
  ) => Promise<void>;
}

export default function EditUserModal({
  open,
  user,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Team Member" as User["role"],
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  if (!open) return null;

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async () => {
    if (!form.name.trim()) return;

    if (!form.email.trim()) return;

    await onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 block font-medium">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={change}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={change}
              className="w-full rounded-lg border p-3"
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Project Manager">
                Project Manager
              </option>

              <option value="Team Member">
                Team Member
              </option>

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}