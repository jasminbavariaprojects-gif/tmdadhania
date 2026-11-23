import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { setAuthUser } from "@/lib/auth-session";
import { firm } from "@/lib/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: `Sign in | ${firm.name}` },
      { name: "description", content: "Sign in to the firm's private area to view enquiries and consultation requests." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Sign in | ${firm.name}` },
      { property: "og:description", content: "Private area for the firm's team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function finishSignIn() {
    const { data } = await supabase.auth.getSession();
    setAuthUser(data.session?.user ?? null);
    if (data.session) await navigate({ to: "/admin", replace: true });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError(signInError.message === "Invalid login credentials" ? "That email or password is not right." : signInError.message);
        return;
      }
      await finishSignIn();
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Enter your email first, then choose Forgot password.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice("If that email is registered, a password reset link is on its way.");
  }

  return (
    <section className="container-site flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-card">
        <p className="eyebrow">Private area</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-primary">Administrator sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquiries and consultation requests are visible only to the firm's approved administrator.
        </p>

        <form className="mt-5 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field mt-1"
              required
            />
          </label>
          <label className="text-sm font-medium">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field mt-1"
              required
              minLength={6}
            />
          </label>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {notice && <p className="rounded-md border border-gold bg-gold-soft p-3 text-sm text-primary">{notice}</p>}

          <button type="submit" disabled={busy} className="btn-gold justify-center disabled:cursor-not-allowed disabled:opacity-60">
            {busy ? "Please wait…" : "Sign in"}
          </button>

          <button type="button" onClick={handleForgotPassword} disabled={busy} className="text-sm font-medium text-primary underline underline-offset-4">
            Forgot password?
          </button>
        </form>

        <p className="mt-3 text-sm">
          <Link to="/" className="font-medium text-primary underline underline-offset-4">Back to the website</Link>
        </p>
      </div>
    </section>
  );
}
