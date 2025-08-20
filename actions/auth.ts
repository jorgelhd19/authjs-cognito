"use server";

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signInCognito() {
  return signIn("cognito");
}

export async function signOutCognito() {
  const clientId = process.env.AUTH_COGNITO_ID!;
  const logoutCallback = process.env.NEXTAUTH_URL!;
  const authUrl = process.env.AUTH_COGNITO_URL!;
  const cognitoLogoutUrl = `${authUrl}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    logoutCallback
  )}`;

  redirect(cognitoLogoutUrl);
}
