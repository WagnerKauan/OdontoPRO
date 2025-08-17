import { redirect } from "next/navigation";
import { getUserData } from "../_data-access/get-info-user";
import { ProfileList } from "./profile-list";

export async function ProfileContent({ userId }: { userId: string }) {
  const user = await getUserData({ userId });

  if (!user) {
    redirect("/");
  }

  return <ProfileList user={user} />;
}
