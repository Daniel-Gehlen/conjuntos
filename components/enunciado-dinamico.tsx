"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function EnunciadoDinamico({ tema, conjuntoA, conjuntoB, conjuntoC, total }) {
  // Mapeamento de temas para seus respectivos enunciados
  const enunciados = {
    esportes: {
      titulo: "Pesquisa sobre Esportes",
      descricao: `Uma pesquisa foi realizada com ${total} pessoas para saber quais esportes elas praticam. Os resultados mostraram que ${conjuntoA.valor} pessoas praticam ${conjuntoA.nome}, ${conjuntoB.valor} pessoas praticam ${conjuntoB.nome} e ${conjuntoC.valor} pessoas praticam ${conjuntoC.nome}. Além disso, descobriu-se que ${conjuntoA.intersecaoB} pessoas praticam ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} pessoas praticam ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} pessoas praticam ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} pessoas praticam os três esportes.`,
    },
    alimentos: {
      titulo: "Preferências Alimentares",
      descricao: `Uma pesquisa sobre preferências alimentares foi realizada com ${total} pessoas. Os resultados mostraram que ${conjuntoA.valor} pessoas gostam de ${conjuntoA.nome}, ${conjuntoB.valor} pessoas gostam de ${conjuntoB.nome} e ${conjuntoC.valor} pessoas gostam de ${conjuntoC.nome}. Além disso, ${conjuntoA.intersecaoB} pessoas gostam de ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} pessoas gostam de ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} pessoas gostam de ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} pessoas gostam dos três alimentos.`,
    },
    disciplinas: {
      titulo: "Desempenho Acadêmico",
      descricao: `Em uma escola com ${total} estudantes, foi feito um levantamento sobre o desempenho em diferentes disciplinas. Descobriu-se que ${conjuntoA.valor} estudantes foram aprovados em ${conjuntoA.nome}, ${conjuntoB.valor} em ${conjuntoB.nome} e ${conjuntoC.valor} em ${conjuntoC.nome}. Além disso, ${conjuntoA.intersecaoB} estudantes foram aprovados em ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} em ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} em ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} estudantes foram aprovados nas três disciplinas.`,
    },
    tecnologias: {
      titulo: "Uso de Tecnologias",
      descricao: `Uma pesquisa com ${total} profissionais de TI revelou que ${conjuntoA.valor} utilizam ${conjuntoA.nome}, ${conjuntoB.valor} utilizam ${conjuntoB.nome} e ${conjuntoC.valor} utilizam ${conjuntoC.nome} em seus projetos. A pesquisa também mostrou que ${conjuntoA.intersecaoB} profissionais utilizam ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} utilizam ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} utilizam ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} profissionais utilizam as três tecnologias.`,
    },
    idiomas: {
      titulo: "Conhecimento de Idiomas",
      descricao: `Em um grupo de ${total} pessoas, ${conjuntoA.valor} falam ${conjuntoA.nome}, ${conjuntoB.valor} falam ${conjuntoB.nome} e ${conjuntoC.valor} falam ${conjuntoC.nome}. Dentre essas pessoas, ${conjuntoA.intersecaoB} falam ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} falam ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} falam ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} pessoas falam os três idiomas.`,
    },
    redes: {
      titulo: "Uso de Redes Sociais",
      descricao: `Uma pesquisa com ${total} jovens mostrou que ${conjuntoA.valor} usam ${conjuntoA.nome}, ${conjuntoB.valor} usam ${conjuntoB.nome} e ${conjuntoC.valor} usam ${conjuntoC.nome}. A pesquisa também revelou que ${conjuntoA.intersecaoB} jovens usam ${conjuntoA.nome} e ${conjuntoB.nome}, ${conjuntoA.intersecaoC} usam ${conjuntoA.nome} e ${conjuntoC.nome}, ${conjuntoB.intersecaoC} usam ${conjuntoB.nome} e ${conjuntoC.nome}, e ${conjuntoA.intersecaoBC} jovens usam as três redes sociais.`,
    },
  }

  const enunciadoAtual = enunciados[tema] || enunciados.esportes

  return (
    <Card className="mb-6 bg-slate-50">
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-bold text-slate-800">{enunciadoAtual.titulo}</h3>
        <p className="text-slate-700">{enunciadoAtual.descricao}</p>
        <div className="mt-4 text-sm text-slate-600">
          <p>Com base nessas informações, determine:</p>
          <ul className="list-disc pl-6">
            <li>Quantas pessoas pertencem a cada um dos subconjuntos específicos</li>
            <li>Quantas pessoas não pertencem a nenhum dos conjuntos</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

