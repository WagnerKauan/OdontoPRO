import { redirect } from "next/navigation";
import { getScheduleData } from "./_data-access/get-info-schedule";
import { ScheduleContent } from "./_components/schedule-content";
import type { NextPage } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

const SchedulePage: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params;

  const user = await getScheduleData({ userId: id });

  if (!user) {
    redirect("/");
  }

  return <ScheduleContent clinic={user} />;
};

export default SchedulePage as any;
