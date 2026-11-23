import { useState } from "react";
import { z } from "zod";

const schema = z.string().trim().email().max(255);

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <>
    <form
      className="mt-4 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const r = schema.safeParse(email);
        // TODO(phase 2): save subscriber to the database
        setMsg(r.success ? "Thank you for subscribing." : "Please enter a valid email.");
        if (r.success) setEmail("");
      }}
    >
      <input aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="field text-foreground" />
      <button className="btn-gold shrink-0">Join</button>
    </form>
    {msg && <p role="status" className="mt-2 text-xs text-gold">{msg}</p>}
    </>
  );
}
