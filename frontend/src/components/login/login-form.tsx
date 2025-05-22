import { useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login, logout, isLoggingOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    login.mutate(
      { email, password },
      {
        onError(err: any) {
          setError(err.response?.data?.message || "Login failed");
        },
      }
    );
  }

  const loading = login.status === "pending";

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={loading || isLoggingOut}
        >
          {loading ? "Logging in…" : "Login"}
        </Button>
      </div>

      <a
        href="#"
        className="text-sm underline-offset-4 hover:underline text-center"
      >
        Forgot your password?
      </a>
    </form>
  );
}
