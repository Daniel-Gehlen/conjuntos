export default function ExplicacaoTeoria() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-bold text-slate-800">Esquema Genérico para Problemas de Conjuntos</h2>
        <p className="text-slate-600">Este esquema é aplicável a problemas envolvendo 3 conjuntos: A, B e C.</p>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">1. Dados que SEMPRE aparecem</h3>
        <ul className="list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong>Total de elementos (T):</strong> Número total de pessoas/objetos no universo.
          </li>
          <li>
            <strong>Tamanho dos conjuntos (A, B, C):</strong> Quantos estão em A, B ou C (mas podem ter interseções).
          </li>
          <li>
            <strong>Interseções 2 a 2 (A∩B, A∩C, B∩C):</strong> Quantos estão nos dois ao mesmo tempo (incluindo quem
            está nos três).
          </li>
          <li>
            <strong>Interseção dos 3 (A∩B∩C):</strong> Quantos estão em A, B e C simultaneamente.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">2. Nomes "Memoráveis" para Cada Grupo</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Grupo</th>
                <th className="p-2 text-left">Fórmula</th>
                <th className="p-2 text-left">Nome "Impactante"</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Só A</td>
                <td className="p-2">A - (A∩B + A∩C - A∩B∩C)</td>
                <td className="p-2">"Os Solitários de A"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Só B</td>
                <td className="p-2">B - (A∩B + B∩C - A∩B∩C)</td>
                <td className="p-2">"Os Exclusivos de B"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Só C</td>
                <td className="p-2">C - (A∩C + B∩C - A∩B∩C)</td>
                <td className="p-2">"Os C-zares Puros"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">A∩B, mas não C</td>
                <td className="p-2">A∩B - A∩B∩C</td>
                <td className="p-2">"Os Casalzão A&B"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">A∩C, mas não B</td>
                <td className="p-2">A∩C - A∩B∩C</td>
                <td className="p-2">"Os Traidores de B"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">B∩C, mas não A</td>
                <td className="p-2">B∩C - A∩B∩C</td>
                <td className="p-2">"Os Rebeldes Sem A"</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">A∩B∩C (todos)</td>
                <td className="p-2">A∩B∩C</td>
                <td className="p-2">"Os Três Mosqueteiros"</td>
              </tr>
              <tr>
                <td className="p-2">Nenhum dos 3</td>
                <td className="p-2">T - (A∪B∪C)</td>
                <td className="p-2">"Os Zero a Esquerda"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">3. Fórmula Mestra (Inclusão-Exclusão)</h3>
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-slate-700">A∪B∪C = A + B + C - (A∩B + A∩C + B∩C) + A∩B∩C</p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Tradução:</strong> Some todos, subtraia as interseções 2 a 2 e adicione de volta a interseção dos 3
            (porque foi subtraída demais).
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">4. Passo a Passo para Resolver QUALQUER Problema</h3>
        <ol className="list-decimal space-y-2 pl-6 text-slate-600">
          <li>Anote os dados brutos (A, B, C, interseções, total).</li>
          <li>Calcule A∪B∪C (usando a fórmula mestra).</li>
          <li>Encontre "Os Zero a Esquerda" (Nenhum) = T - A∪B∪C.</li>
          <li>Use as fórmulas dos grupos para achar cada subconjunto (ex: "Só A", "B e C mas não A").</li>
          <li>Confira as alternativas com os valores calculados.</li>
        </ol>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">5. Exemplo Aplicado (Problema dos Esportes)</h3>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="mb-4">
            <h4 className="font-semibold text-slate-800">Enunciado:</h4>
            <p className="text-slate-700">
              Uma pesquisa foi realizada com 200 pessoas para saber quais esportes elas praticam. Os resultados
              mostraram que 75 pessoas praticam Futebol, 60 pessoas praticam Vôlei e 50 pessoas praticam Basquete. Além
              disso, descobriu-se que 25 pessoas praticam Futebol e Vôlei, 20 pessoas praticam Futebol e Basquete, 15
              pessoas praticam Vôlei e Basquete, e 10 pessoas praticam os três esportes.
            </p>
            <p className="mt-2 text-slate-700">Com base nessas informações, determine:</p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Quantas pessoas praticam apenas um dos esportes?</li>
              <li>Quantas pessoas não praticam nenhum dos três esportes?</li>
              <li>Quantas pessoas praticam exatamente dois esportes?</li>
            </ul>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <p>
                <strong>Total (T):</strong> 200
              </p>
              <p>
                <strong>A (Futebol):</strong> 75
              </p>
              <p>
                <strong>B (Vôlei):</strong> 60
              </p>
              <p>
                <strong>C (Basquete):</strong> 50
              </p>
            </div>
            <div>
              <p>
                <strong>A∩B (F e V):</strong> 25
              </p>
              <p>
                <strong>A∩C (F e B):</strong> 20
              </p>
              <p>
                <strong>B∩C (V e B):</strong> 15
              </p>
              <p>
                <strong>A∩B∩C (F, V e B):</strong> 10
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Cálculo de A∪B∪C:</strong>
            </p>
            <p>75 + 60 + 50 - 25 - 20 - 15 + 10 = 135</p>

            <p className="mt-2">
              <strong>"Os Zero a Esquerda":</strong> 200 - 135 = 65 (não praticam nenhum esporte).
            </p>

            <p className="mt-2">
              <strong>Grupos:</strong>
            </p>
            <p>"Os Solitários de A" (Só Futebol): 75 - (25 + 20 - 10) = 40</p>
            <p>"Os Exclusivos de B" (Só Vôlei): 60 - (25 + 15 - 10) = 30</p>
            <p>"Os C-zares Puros" (Só Basquete): 50 - (20 + 15 - 10) = 25</p>

            <p className="mt-2">
              <strong>Respostas:</strong>
            </p>
            <p>Pessoas que praticam apenas um dos esportes: 40 + 30 + 25 = 95</p>
            <p>Pessoas que não praticam nenhum dos três esportes: 65</p>
            <p>Pessoas que praticam exatamente dois esportes: (25 - 10) + (20 - 10) + (15 - 10) = 30</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-slate-800">6. Dicas para Nunca Errar</h3>
        <ul className="list-disc space-y-2 pl-6 text-slate-600">
          <li>Sempre desenhe um diagrama de Venn mentalmente (mesmo que não o coloque no papel).</li>
          <li>Nomes absurdos ajudam a memorizar! (Ex: "Traidores de B" = estão em A e C, mas abandonaram B).</li>
          <li>Verifique se a soma de todos os grupos + "Zero a Esquerda" dá o total (T).</li>
          <li>Pratique com diferentes exemplos para fixar o método.</li>
        </ul>
      </div>
    </div>
  )
}

