import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ProfileContent } from "./_components/profile-content";
import { Suspense } from "react";
import { ProfileSkeleton } from "./_components/skeleton-profile";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/dashboard");
  }



  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent userId={session.user?.id!} />
    </Suspense>
  )
}
