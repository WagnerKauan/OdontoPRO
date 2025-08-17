import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { SubscriptionButton } from "./subscription-button";

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`flex flex-col w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300
        ${
          index === 1 ? "border-2 border-emerald-500" : "border border-gray-200"
        }
      `}
        >
          <CardHeader>
            <CardTitle
              className={`text-xl md:text-2xl font-bold ${
                index === 1 ? "text-emerald-500" : ""
              }`}
            >
              {plan.name}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-600">
              {plan.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6">
            <ul className="space-y-2 mt-4">
              {plan.features.map((feature, i) => (
                <li
                  className="text-sm md:text-base text-gray-700 flex items-center gap-2"
                  key={i}
                >
                  <span className="text-emerald-500"></span> {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {plan.oldPrice && (
                <p className="text-gray-400 line-through text-sm">
                  {plan.oldPrice}
                </p>
              )}
              <p className="text-black text-3xl font-extrabold">{plan.price}</p>
            </div>
          </CardContent>

          <CardFooter className="mt-auto px-6 pb-6">
            <SubscriptionButton type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
