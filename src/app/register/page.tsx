import { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Register Account | WatchVault",
  description: "Create your free WatchVault account.",
};

export default function RegisterPage() {
  return <AuthCard initialMode="register" />;
}
