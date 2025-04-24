import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function ConfirmForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your new password below
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">New Password</Label>
                    <Input id="password" type="password" placeholder="********" required />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="********" required />
                </div>
                <Button type="submit" className="w-full">
                    Reset
                </Button>
            </div>
            <a
                href="#"
                className="text-sm underline-offset-4 hover:underline text-center"
            >
                Sign in
            </a>
        </form>
    )
}
