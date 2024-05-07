"use client";
import Link from "next/link";
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
import { SignInSchema } from "@/types/zodType";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const [error, setError] = useState("");
  const clientAction = async (data: FormData) => {
    // construct new signin
    const newSignIn = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log(newSignIn);

    // clientside validate
    const result = SignInSchema.safeParse(newSignIn);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.message;
      });
      setError(errorMessage);
      return;
    } else {
      // reset error
      setError("");
    }

    const signIndData = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    if (signIndData?.error) {
      setError("email atau password tidak sesuai");
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
            <p className="text-red-600">{error}</p>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
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
