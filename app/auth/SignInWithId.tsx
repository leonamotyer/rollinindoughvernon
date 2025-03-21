"use client";
import { signInWithEmail, signUpWithEmail } from "@/firebase/auth";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignInWithGoogle from "./SignInWithGoogle";

export default function SignInWithId() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<"login" | "signup">("login");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (currentForm === "login") {
      if (!email || !password) {
        setError("Please fill in all required fields.");
        return;
      }
    } else if (currentForm === "signup") {
      if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        setError("Please fill in all required fields.");
        return;
      }
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters long and include both letters and numbers."
        );
        setPassword("");
        setPasswordConfirm("");
        return;
      }
      if (password !== passwordConfirm) {
        setError("Passwords do not match.");
        setPassword("");
        setPasswordConfirm("");
        return;
      }
    }
    try {
      if (currentForm === "login") {
        const user = await signInWithEmail(email, password);
        console.log("User signed in:", user);
      } else if (currentForm === "signup") {
        const user = await signUpWithEmail(
          firstName,
          lastName,
          email,
          password
        );
        console.log("User signed up:", user);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Sign in error:", err);
    }
  };

  return (
    <div>
      {currentForm === "login" ? (
        <Card className="">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign In with Email</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              onClick={handleEmailSignIn}
              className="w-full"
            >
              Sign In
            </Button>

            <div className="w-full flex items-center">
              <div className="flex-1">
                <Separator className="border-t border-gray-300" />
              </div>
              <span className="mx-2 text-sm text-muted-foreground">or</span>
              <div className="flex-1">
                <Separator className="border-t border-gray-300" />
              </div>
            </div>
            <div className="w-full">
              <SignInWithGoogle />
            </div>
            <div>
              Don{"'"}t have an account?{" "}
              <button
                onClick={() => {
                  setCurrentForm("signup");
                  setError(null);
                  setEmail("");
                  setPassword("");
                }}
                className="text-blue-400 hover:text-blue-600"
              >
                Sign up
              </button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Sign In with Email</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </CardContent>

          <CardFooter className="flex-col gap-2 ">
            <Button
              type="submit"
              onClick={handleEmailSignIn}
              className="w-full"
            >
              Sign Up
            </Button>
            <div className="w-full flex items-center">
              <div className="flex-1">
                <Separator className="border-t border-gray-300" />
              </div>
              <span className="mx-2 text-sm text-muted-foreground">or</span>
              <div className="flex-1">
                <Separator className="border-t border-gray-300" />
              </div>
            </div>
            <div className="w-full">
              <SignInWithGoogle />
            </div>
            <div>
              Have an account?{" "}
              <button
                onClick={() => {
                  setCurrentForm("login");
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPassword("");
                  setPasswordConfirm("");
                }}
                className="text-blue-400 hover:text-blue-600"
              >
                Sign in
              </button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
