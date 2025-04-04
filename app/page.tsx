import TeoriaConjuntos from "@/components/teoria-conjuntos"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800 md:text-4xl">
          Teoria dos Conjuntos Interativa
        </h1>
        <p className="mb-8 text-center text-slate-600">
          Aprenda e pratique problemas de conjuntos com visualizações interativas e exemplos práticos
        </p>
        <TeoriaConjuntos />
      </div>
    </main>
  )
}

