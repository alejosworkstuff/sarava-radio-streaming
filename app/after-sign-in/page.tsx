import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

/**
 * Post-auth router:
 * - allowlisted admin emails → /admin
 * - everyone else → public home
 */
export default async function AfterSignInPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (isAllowedAdminEmail(email)) {
    redirect("/admin");
  }

  redirect("/");
}
