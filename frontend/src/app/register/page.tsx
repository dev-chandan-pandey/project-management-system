"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import api from "@/services/api";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();

  const {
    token,
    initialized,
    initialize,
    setToken,
    setUser,
  } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",

    // Public registration
    role: "Team Member",
  });

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/register",
        form
      );

      if (res.data.data?.token) {
        setToken(res.data.data.token);
        setUser(res.data.data.user);

        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ??
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Join TaskFlow to manage projects and tasks.
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={submit}
          className="mt-6 space-y-5"
        >
          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="john@example.com"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Minimum 6 characters"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Account Type
            </label>

            <input
              value="Team Member"
              disabled
              className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-600">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}