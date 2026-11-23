import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { firm } from "@/lib/site";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: `Choose a new password | ${firm.name}` },
      { name: "description", content: "Choose a new password for your account." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: `Choose a new password | ${firm.name}` },
      { property: "og:description", content: "Choose a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // The reset link carries a recovery session; without it the page cannot change anything.
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError("We could not save the new password. Open the reset link from your email again.");
      return;
    }
    setDone(true);
  }

  return (
    <section className="container-site flex min-h-[70vh] items-center justify-center py-14">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-card">
        <p className="eyebrow">Account security</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-primary">Choose a new password</h1>

        {done ? (
          <p className="mt-4 rounded-md border border-gold bg-gold-soft p-3 text-sm text-primary">
            Your password has been updated.{" "}
            <Link to="/auth" className="font-semibold underline underline-offset-4">Sign in</Link>
          </p>
        ) : !ready ? (
          <p className="mt-4 text-sm text-muted-foreground">
            This page only works when opened from the reset link in your email. Request a new link from the{" "}
            <Link to="/auth" className="font-medium text-primary underline underline-offset-4">sign-in page</Link>.
          </p>
        ) : (
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className="text-sm font-medium">
              New password
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field mt-1"
                required
              />
            </label>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={busy} className="btn-gold justify-center disabled:cursor-not-allowed disabled:opacity-60">
              {busy ? "Saving…" : "Save new password"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
