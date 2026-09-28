import { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Login | WatchVault",
  description: "Login securely to your WatchVault account.",
};

export default function LoginPage() {
  return <AuthCard initialMode="login" />;
}
