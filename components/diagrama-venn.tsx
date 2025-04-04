"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DiagramaVenn({
  conjuntoA,
  conjuntoB,
  conjuntoC,
  intersecaoAB,
  intersecaoAC,
  intersecaoBC,
  intersecaoABC,
  total,
}) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("todos")

  // Cálculos dos conjuntos
  const calcularABC = () =>
    conjuntoA + conjuntoB + conjuntoC - intersecaoAB - intersecaoAC - intersecaoBC + intersecaoABC

  const calcularSoA = () => conjuntoA - (intersecaoAB + intersecaoAC - intersecaoABC)
  const calcularSoB = () => conjuntoB - (intersecaoAB + intersecaoBC - intersecaoABC)
  const calcularSoC = () => conjuntoC - (intersecaoAC + intersecaoBC - intersecaoABC)

  const calcularAeBnaoC = () => intersecaoAB - intersecaoABC
  const calcularAeCnaoB = () => intersecaoAC - intersecaoABC
  const calcularBeCnaoA = () => intersecaoBC - intersecaoABC

  const calcularNenhum = () => total - calcularABC()

  // Cores para as regiões
  const cores = {
    soA: "#f87171", // Vermelho claro
    soB: "#60a5fa", // Azul claro
    soC: "#4ade80", // Verde claro
    aEbNaoC: "#c084fc", // Roxo claro
    aEcNaoB: "#fb923c", // Laranja claro
    bEcNaoA: "#22d3ee", // Ciano claro
    aBc: "#f472b6", // Rosa claro
    nenhum: "#e5e7eb", // Cinza claro
    todos: "transparent", // Transparente para mostrar todas as regiões
  }

  // Informações sobre as regiões
  const regioes = [
    { id: "soA", nome: "Os Solitários de A", formula: "A - (A∩B + A∩C - A∩B∩C)", valor: calcularSoA() },
    { id: "soB", nome: "Os Exclusivos de B", formula: "B - (A∩B + B∩C - A∩B∩C)", valor: calcularSoB() },
    { id: "soC", nome: "Os C-zares Puros", formula: "C - (A∩C + B∩C - A∩B∩C)", valor: calcularSoC() },
    { id: "aEbNaoC", nome: "Os Casalzão A&B", formula: "A∩B - A∩B∩C", valor: calcularAeBnaoC() },
    { id: "aEcNaoB", nome: "Os Traidores de B", formula: "A∩C - A∩B∩C", valor: calcularAeCnaoB() },
    { id: "bEcNaoA", nome: "Os Rebeldes Sem A", formula: "B∩C - A∩B∩C", valor: calcularBeCnaoA() },
    { id: "aBc", nome: "Os Três Mosqueteiros", formula: "A∩B∩C", valor: intersecaoABC },
    { id: "nenhum", nome: "Os Zero a Esquerda", formula: "T - (A∪B∪C)", valor: calcularNenhum() },
    { id: "todos", nome: "Mostrar Todos", formula: "", valor: total },
  ]

  // Função para determinar a cor de preenchimento de cada região
  const getCorRegiao = (regiao) => {
    if (regiaoSelecionada === "todos") {
      return cores[regiao]
    }
    return regiaoSelecionada === regiao ? cores[regiao] : "#f8fafc" // Cor clara para regiões não selecionadas
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">Diagrama de Venn Interativo</h2>
        <div className="relative mx-auto h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            {/* Região "Nenhum" (fundo) */}
            <rect
              x="0"
              y="0"
              width="400"
              height="400"
              fill={getCorRegiao("nenhum")}
              stroke="none"
              className={regiaoSelecionada === "nenhum" ? "stroke-slate-800 stroke-2" : ""}
            />

            {/* Círculo A */}
            <circle
              cx="170"
              cy="150"
              r="100"
              fill="transparent"
              stroke="#f87171"
              strokeWidth="2"
              strokeDasharray={
                regiaoSelecionada === "soA" ||
                regiaoSelecionada === "aEbNaoC" ||
                regiaoSelecionada === "aEcNaoB" ||
                regiaoSelecionada === "aBc"
                  ? "none"
                  : "5,5"
              }
            />

            {/* Círculo B */}
            <circle
              cx="230"
              cy="150"
              r="100"
              fill="transparent"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray={
                regiaoSelecionada === "soB" ||
                regiaoSelecionada === "aEbNaoC" ||
                regiaoSelecionada === "bEcNaoA" ||
                regiaoSelecionada === "aBc"
                  ? "none"
                  : "5,5"
              }
            />

            {/* Círculo C */}
            <circle
              cx="200"
              cy="220"
              r="100"
              fill="transparent"
              stroke="#4ade80"
              strokeWidth="2"
              strokeDasharray={
                regiaoSelecionada === "soC" ||
                regiaoSelecionada === "aEcNaoB" ||
                regiaoSelecionada === "bEcNaoA" ||
                regiaoSelecionada === "aBc"
                  ? "none"
                  : "5,5"
              }
            />

            {/* Região "Só A" */}
            <path
              d="M170,50 a100,100 0 0,1 0,200 a100,100 0 0,1 0,-200"
              fill={getCorRegiao("soA")}
              stroke={regiaoSelecionada === "soA" ? "#ef4444" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "Só B" */}
            <path
              d="M230,50 a100,100 0 0,1 0,200 a100,100 0 0,1 0,-200"
              fill={getCorRegiao("soB")}
              stroke={regiaoSelecionada === "soB" ? "#3b82f6" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "Só C" */}
            <path
              d="M200,120 a100,100 0 0,1 0,200 a100,100 0 0,1 0,-200"
              fill={getCorRegiao("soC")}
              stroke={regiaoSelecionada === "soC" ? "#22c55e" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "A∩B, mas não C" */}
            <path
              d="M170,150 a100,100 0 0,0 60,0 a100,100 0 0,0 -60,0"
              fill={getCorRegiao("aEbNaoC")}
              stroke={regiaoSelecionada === "aEbNaoC" ? "#a855f7" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "A∩C, mas não B" */}
            <path
              d="M170,150 a100,100 0 0,1 30,70 a100,100 0 0,1 -30,-70"
              fill={getCorRegiao("aEcNaoB")}
              stroke={regiaoSelecionada === "aEcNaoB" ? "#f97316" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "B∩C, mas não A" */}
            <path
              d="M230,150 a100,100 0 0,1 -30,70 a100,100 0 0,1 30,-70"
              fill={getCorRegiao("bEcNaoA")}
              stroke={regiaoSelecionada === "bEcNaoA" ? "#06b6d4" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Região "A∩B∩C" (centro) */}
            <circle
              cx="200"
              cy="170"
              r="30"
              fill={getCorRegiao("aBc")}
              stroke={regiaoSelecionada === "aBc" ? "#ec4899" : "none"}
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Rótulos dos conjuntos */}
            <text x="120" y="150" fontWeight="bold" fill="#f87171">
              A
            </text>
            <text x="280" y="150" fontWeight="bold" fill="#60a5fa">
              B
            </text>
            <text x="200" y="280" fontWeight="bold" fill="#4ade80">
              C
            </text>

            {/* Rótulo do universo */}
            <text x="20" y="30" fontWeight="bold" fill="#64748b">
              Universo (T = {total})
            </text>
          </svg>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">Regiões do Diagrama</h2>
        <Card>
          <CardContent className="p-4">
            <RadioGroup value={regiaoSelecionada} onValueChange={setRegiaoSelecionada} className="space-y-3">
              {regioes.map((regiao) => (
                <div key={regiao.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={regiao.id} id={regiao.id} />
                  <Label htmlFor={regiao.id} className="flex flex-col">
                    <span className="font-medium">{regiao.nome}</span>
                    {regiao.formula && <span className="text-xs text-slate-500">Fórmula: {regiao.formula}</span>}
                    {regiao.id !== "todos" && <span className="text-sm text-slate-700">Valor: {regiao.valor}</span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-800">Fórmula Mestra (Inclusão-Exclusão)</h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-slate-700">A∪B∪C = A + B + C - (A∩B + A∩C + B∩C) + A∩B∩C</p>
              <p className="mt-2 text-sm text-slate-700">Valor calculado: {calcularABC()}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
