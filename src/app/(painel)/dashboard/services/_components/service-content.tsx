import { LabelSubscription } from "@/components/ui/label-subscription";
import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";
import { canPermission } from "@/utils/permissions/canPermission";
import { LabelSubscriptionTrial } from "@/components/ui/label-subscription-trial";


interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {

  const services = await getAllServices({ userId })

  const permissions = await canPermission({ type: "service" })
  console.log(permissions);

  return (
    <>
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}

      {permissions.planId === "TRIAL" && (
        <LabelSubscriptionTrial />
      )}

      <ServiceList services={services.data || []} permission={permissions} />
    </>
  )
}
