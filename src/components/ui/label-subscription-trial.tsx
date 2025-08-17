import Link from "next/link";

export function LabelSubscriptionTrial({ daysRemaining }: { daysRemaining?: number }) {
  return (
    <div
      className="bg-blue-500/90 border border-blue-600 text-white text-sm md:text-base px-4 py-3 my-4 
        rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md"
    >
      <div className="space-y-1">
        <h3 className="font-semibold text-white">
          Você está usando a versão gratuita de avaliação. {daysRemaining && `${daysRemaining} dias restantes.`}
        </h3>

        <p className="text-xs md:text-sm text-blue-100">
          Aproveite todos os recursos por tempo limitado. Para continuar
          utilizando sem restrições, escolha um plano ativo.
        </p>
      </div>

      <Link
        href="/dashboard/plans"
        className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition-all w-fit"
      >
        Ver planos disponíveis
      </Link>
    </div>
  );
}
