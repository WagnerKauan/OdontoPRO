import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center pb-4 sm:pb-0">
          <article className="space-y-8 max-w-3xl flex flex-col justify-center flex-[2]">
            <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl tracking-tighter">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>

            <Button className="bg-emerald-500 hover:bg-emerald-600 w-fit px-6 font-semibold cursor-pointer">
              Encontre uma clinica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={"/doctor-hero.png"}
              alt="Imagem de um doutor"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
