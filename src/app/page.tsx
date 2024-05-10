"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema } from "../../types/zodType";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/dashboard");
  }
  
  const clientAction = async (data: FormData) => {
    // construct new signin
    const newSignIn = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // clientside validate
    const result = SignInSchema.safeParse(newSignIn);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast({ title: "Ada kesalahan", description: issue.message });
      });
      return;
    }

    const signIndData = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    if (signIndData?.error) {
      toast({
        title: "Ada kesalahan",
        description: "Email atau password tidak sesuai",
      });
    } else {
      redirect("/dashboard");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masukan email dan password untuk login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={clientAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            &copy; Kejaksaan Tinggi Aceh
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
