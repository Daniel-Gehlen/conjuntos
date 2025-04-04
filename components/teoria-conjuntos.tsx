"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"
import DiagramaVenn from "@/components/diagrama-venn"
import ExplicacaoTeoria from "@/components/explicacao-teoria"
import { useToast } from "@/hooks/use-toast"
// Adicionar importação do componente EnunciadoDinamico no topo do arquivo
import EnunciadoDinamico from "@/components/enunciado-dinamico"

export default function TeoriaConjuntos() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("teoria")
  const [conjuntoA, setConjuntoA] = useState(75)
  const [conjuntoB, setConjuntoB] = useState(60)
  const [conjuntoC, setConjuntoC] = useState(50)
  const [intersecaoAB, setIntersecaoAB] = useState(25)
  const [intersecaoAC, setIntersecaoAC] = useState(20)
  const [intersecaoBC, setIntersecaoBC] = useState(15)
  const [intersecaoABC, setIntersecaoABC] = useState(10)
  const [total, setTotal] = useState(200)
  const [respostas, setRespostas] = useState({
    soA: "",
    soB: "",
    soC: "",
    aEbNaoC: "",
    aEcNaoB: "",
    bEcNaoA: "",
    aBc: "",
    nenhum: "",
  })
  const [resultados, setResultados] = useState({
    soA: null,
    soB: null,
    soC: null,
    aEbNaoC: null,
    aEcNaoB: null,
    bEcNaoA: null,
    aBc: null,
    nenhum: null,
  })
  const [mostrarRespostas, setMostrarRespostas] = useState(false)
  // Adicionar novos estados para o tema e nomes dos conjuntos
  const [temaSelecionado, setTemaSelecionado] = useState("esportes")
  const [nomesConjuntos, setNomesConjuntos] = useState({
    A: { nome: "Futebol", valor: 75, intersecaoB: 25, intersecaoC: 20, intersecaoBC: 10 },
    B: { nome: "Vôlei", valor: 60, intersecaoC: 15 },
    C: { nome: "Basquete", valor: 50 },
  })

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

  const verificarRespostas = () => {
    const novoResultados = {
      soA: Number.parseInt(respostas.soA) === calcularSoA(),
      soB: Number.parseInt(respostas.soB) === calcularSoB(),
      soC: Number.parseInt(respostas.soC) === calcularSoC(),
      aEbNaoC: Number.parseInt(respostas.aEbNaoC) === calcularAeBnaoC(),
      aEcNaoB: Number.parseInt(respostas.aEcNaoB) === calcularAeCnaoB(),
      bEcNaoA: Number.parseInt(respostas.bEcNaoA) === calcularBeCnaoA(),
      aBc: Number.parseInt(respostas.aBc) === intersecaoABC,
      nenhum: Number.parseInt(respostas.nenhum) === calcularNenhum(),
    }

    setResultados(novoResultados)

    const acertos = Object.values(novoResultados).filter((v) => v === true).length

    toast({
      title: `Resultado: ${acertos}/8 acertos`,
      description: acertos === 8 ? "Parabéns! Você acertou todas as respostas!" : "Continue praticando para melhorar!",
      variant: acertos === 8 ? "default" : "destructive",
    })
  }

  // Modificar a função gerarNovoProblema para incluir a seleção de temas e nomes
  const gerarNovoProblema = () => {
    // Gera valores aleatórios mas consistentes
    const novoTotal = Math.floor(Math.random() * 300) + 100
    const novoA = Math.floor(Math.random() * (novoTotal * 0.6)) + 20
    const novoB = Math.floor(Math.random() * (novoTotal * 0.6)) + 20
    const novoC = Math.floor(Math.random() * (novoTotal * 0.6)) + 20

    // Garante que as interseções sejam menores que os conjuntos
    const maxAB = Math.min(novoA, novoB) - 5
    const maxAC = Math.min(novoA, novoC) - 5
    const maxBC = Math.min(novoB, novoC) - 5

    const novoAB = Math.floor(Math.random() * maxAB) + 5
    const novoAC = Math.floor(Math.random() * maxAC) + 5
    const novoBC = Math.floor(Math.random() * maxBC) + 5

    // Garante que a interseção ABC seja menor que as interseções 2 a 2
    const maxABC = Math.min(novoAB, novoAC, novoBC) - 2
    const novoABC = Math.max(Math.floor(Math.random() * maxABC) + 2, 1)

    setConjuntoA(novoA)
    setConjuntoB(novoB)
    setConjuntoC(novoC)
    setIntersecaoAB(novoAB)
    setIntersecaoAC(novoAC)
    setIntersecaoBC(novoBC)
    setIntersecaoABC(novoABC)
    setTotal(novoTotal)

    // Seleciona um tema aleatório
    const temas = ["esportes", "alimentos", "disciplinas", "tecnologias", "idiomas", "redes"]
    const novoTema = temas[Math.floor(Math.random() * temas.length)]
    setTemaSelecionado(novoTema)

    // Define os nomes dos conjuntos de acordo com o tema
    const nomesDosTemas = {
      esportes: {
        A: { nome: "Futebol", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "Vôlei", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Basquete", valor: novoC },
      },
      alimentos: {
        A: { nome: "Pizza", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "Hambúrguer", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Sushi", valor: novoC },
      },
      disciplinas: {
        A: { nome: "Matemática", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "Português", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Ciências", valor: novoC },
      },
      tecnologias: {
        A: { nome: "JavaScript", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "Python", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Java", valor: novoC },
      },
      idiomas: {
        A: { nome: "Inglês", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "Espanhol", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Francês", valor: novoC },
      },
      redes: {
        A: { nome: "Instagram", valor: novoA, intersecaoB: novoAB, intersecaoC: novoAC, intersecaoBC: novoABC },
        B: { nome: "TikTok", valor: novoB, intersecaoC: novoBC },
        C: { nome: "Twitter", valor: novoC },
      },
    }

    setNomesConjuntos(nomesDosTemas[novoTema])

    // Limpa respostas e resultados
    setRespostas({
      soA: "",
      soB: "",
      soC: "",
      aEbNaoC: "",
      aEcNaoB: "",
      bEcNaoA: "",
      aBc: "",
      nenhum: "",
    })

    setResultados({
      soA: null,
      soB: null,
      soC: null,
      aEbNaoC: null,
      aEcNaoB: null,
      bEcNaoA: null,
      aBc: null,
      nenhum: null,
    })

    setMostrarRespostas(false)
  }

  const handleInputChange = (campo, valor) => {
    setRespostas((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="teoria">Teoria</TabsTrigger>
        <TabsTrigger value="pratica">Prática</TabsTrigger>
        <TabsTrigger value="visualizacao">Visualização</TabsTrigger>
      </TabsList>

      <TabsContent value="teoria">
        <Card>
          <CardContent className="pt-6">
            <ExplicacaoTeoria />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pratica">
        <Card>
          <CardContent className="pt-6">
            {/* Modificar a seção de prática para incluir o enunciado dinâmico
            Substitua o bloco de informações do problema por: */}
            <div className="mb-6 grid gap-4 rounded-lg bg-slate-50 p-4">
              <h2 className="text-xl font-bold text-slate-800">Problema Atual</h2>

              <EnunciadoDinamico
                tema={temaSelecionado}
                conjuntoA={nomesConjuntos.A}
                conjuntoB={nomesConjuntos.B}
                conjuntoC={nomesConjuntos.C}
                total={total}
              />

              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <p>
                    <strong>Total (T):</strong> {total}
                  </p>
                  <p>
                    <strong>Conjunto A ({nomesConjuntos.A.nome}):</strong> {conjuntoA}
                  </p>
                  <p>
                    <strong>Conjunto B ({nomesConjuntos.B.nome}):</strong> {conjuntoB}
                  </p>
                  <p>
                    <strong>Conjunto C ({nomesConjuntos.C.nome}):</strong> {conjuntoC}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Interseção A∩B:</strong> {intersecaoAB}
                  </p>
                  <p>
                    <strong>Interseção A∩C:</strong> {intersecaoAC}
                  </p>
                  <p>
                    <strong>Interseção B∩C:</strong> {intersecaoBC}
                  </p>
                  <p>
                    <strong>Interseção A∩B∩C:</strong> {intersecaoABC}
                  </p>
                </div>
              </div>
              <Button onClick={gerarNovoProblema} variant="outline" className="mt-2">
                Gerar Novo Problema
              </Button>
            </div>

            <div className="mb-6 grid gap-4">
              <h2 className="text-xl font-bold text-slate-800">Calcule os Valores</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="soA" className="flex items-center gap-2">
                    "Os Solitários de A" (Só A)
                    {resultados.soA !== null &&
                      (resultados.soA ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="soA"
                    type="number"
                    value={respostas.soA}
                    onChange={(e) => handleInputChange("soA", e.target.value)}
                    className={resultados.soA === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.soA === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularSoA()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="soB" className="flex items-center gap-2">
                    "Os Exclusivos de B" (Só B)
                    {resultados.soB !== null &&
                      (resultados.soB ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="soB"
                    type="number"
                    value={respostas.soB}
                    onChange={(e) => handleInputChange("soB", e.target.value)}
                    className={resultados.soB === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.soB === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularSoB()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="soC" className="flex items-center gap-2">
                    "Os C-zares Puros" (Só C)
                    {resultados.soC !== null &&
                      (resultados.soC ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="soC"
                    type="number"
                    value={respostas.soC}
                    onChange={(e) => handleInputChange("soC", e.target.value)}
                    className={resultados.soC === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.soC === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularSoC()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="aEbNaoC" className="flex items-center gap-2">
                    "Os Casalzão A&B" (A∩B, mas não C)
                    {resultados.aEbNaoC !== null &&
                      (resultados.aEbNaoC ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="aEbNaoC"
                    type="number"
                    value={respostas.aEbNaoC}
                    onChange={(e) => handleInputChange("aEbNaoC", e.target.value)}
                    className={resultados.aEbNaoC === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.aEbNaoC === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularAeBnaoC()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="aEcNaoB" className="flex items-center gap-2">
                    "Os Traidores de B" (A∩C, mas não B)
                    {resultados.aEcNaoB !== null &&
                      (resultados.aEcNaoB ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="aEcNaoB"
                    type="number"
                    value={respostas.aEcNaoB}
                    onChange={(e) => handleInputChange("aEcNaoB", e.target.value)}
                    className={resultados.aEcNaoB === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.aEcNaoB === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularAeCnaoB()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bEcNaoA" className="flex items-center gap-2">
                    "Os Rebeldes Sem A" (B∩C, mas não A)
                    {resultados.bEcNaoA !== null &&
                      (resultados.bEcNaoA ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="bEcNaoA"
                    type="number"
                    value={respostas.bEcNaoA}
                    onChange={(e) => handleInputChange("bEcNaoA", e.target.value)}
                    className={resultados.bEcNaoA === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.bEcNaoA === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularBeCnaoA()}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="aBc" className="flex items-center gap-2">
                    "Os Três Mosqueteiros" (A∩B∩C)
                    {resultados.aBc !== null &&
                      (resultados.aBc ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="aBc"
                    type="number"
                    value={respostas.aBc}
                    onChange={(e) => handleInputChange("aBc", e.target.value)}
                    className={resultados.aBc === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.aBc === false && (
                    <p className="text-sm text-red-500">Resposta correta: {intersecaoABC}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="nenhum" className="flex items-center gap-2">
                    "Os Zero a Esquerda" (Nenhum)
                    {resultados.nenhum !== null &&
                      (resultados.nenhum ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ))}
                  </Label>
                  <Input
                    id="nenhum"
                    type="number"
                    value={respostas.nenhum}
                    onChange={(e) => handleInputChange("nenhum", e.target.value)}
                    className={resultados.nenhum === false ? "border-red-500" : ""}
                  />
                  {mostrarRespostas && resultados.nenhum === false && (
                    <p className="text-sm text-red-500">Resposta correta: {calcularNenhum()}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <Button onClick={verificarRespostas}>Verificar Respostas</Button>
                <Button variant="outline" onClick={() => setMostrarRespostas(!mostrarRespostas)}>
                  {mostrarRespostas ? "Ocultar Respostas" : "Mostrar Respostas"}
                </Button>
              </div>
            </div>

            <Alert className="bg-blue-50">
              <AlertDescription>
                <p className="text-sm text-blue-700">
                  <strong>Dica:</strong> Lembre-se da fórmula mestra de inclusão-exclusão:
                </p>
                <p className="mt-1 text-sm text-blue-700">A∪B∪C = A + B + C - (A∩B + A∩C + B∩C) + A∩B∩C</p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="visualizacao">
        <Card>
          <CardContent className="pt-6">
            <DiagramaVenn
              conjuntoA={conjuntoA}
              conjuntoB={conjuntoB}
              conjuntoC={conjuntoC}
              intersecaoAB={intersecaoAB}
              intersecaoAC={intersecaoAC}
              intersecaoBC={intersecaoBC}
              intersecaoABC={intersecaoABC}
              total={total}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

