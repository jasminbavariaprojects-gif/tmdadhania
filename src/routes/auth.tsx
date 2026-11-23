import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { lovable } from "@/integrations/lovable/index";
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

const providerButtonStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #747775",
  color: "#1F1F1F",
  paddingLeft: 12,
  paddingRight: 12,
  gap: 10,
} as const;

function GoogleMark() {
  return (
    <svg aria-hidden="true" width={18} height={18} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
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
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setError(signInError.message === "Invalid login credentials" ? "That email or password is not right." : signInError.message);
          return;
        }
        await finishSignIn();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          await finishSignIn();
        } else {
          setNotice("Account created. Open the confirmation link in your email, then sign in.");
          setMode("signin");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleProvider(provider: "google" | "lovable") {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
      if (result.error) {
        setError("That sign-in did not complete. Please try again.");
        return;
      }
      if (result.redirected) return;
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
        <h1 className="mt-1 font-display text-3xl font-bold text-primary">
          {mode === "signin" ? "Sign in" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquiries and consultation requests are visible only to accounts the firm has marked as administrators.
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
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
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
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <button type="button" onClick={handleForgotPassword} disabled={busy} className="text-sm font-medium text-primary underline underline-offset-4">
            Forgot password?
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-3">
          <button type="button" onClick={() => handleProvider("google")} disabled={busy} className="flex h-11 w-full items-center justify-center rounded-md text-sm font-medium disabled:opacity-60" style={providerButtonStyle}>
            <GoogleMark />
            Continue with Google
          </button>
          <button type="button" onClick={() => handleProvider("lovable")} disabled={busy} className="flex h-11 w-full items-center justify-center rounded-md text-sm font-medium disabled:opacity-60" style={providerButtonStyle}>
            <LovableMark />
            Continue with Lovable
          </button>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          {mode === "signin" ? "No account yet?" : "Already registered?"}{" "}
          <button
            type="button"
            className="font-semibold text-primary underline underline-offset-4"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
        <p className="mt-3 text-sm">
          <Link to="/" className="font-medium text-primary underline underline-offset-4">Back to the website</Link>
        </p>
      </div>
    </section>
  );
}
