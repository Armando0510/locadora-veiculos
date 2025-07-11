import { NextApiRequest, NextApiResponse } from 'next'
import { validarToken } from '@/lib/auth'
import { lerDB, salvarDB } from '@/lib/db'
import { Carro } from '@/lib/tipos'

const arquivo = 'carros.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const usuario = validarToken(req)
  if (!usuario) return res.status(401).json({ erro: 'Não autorizado' })

  const id = Number(req.query.id)
  const carros = await lerDB<Carro>(arquivo)
  const index = carros.findIndex((c: any) => c.id === id)
  if (index === -1) return res.status(404).json({ erro: 'Carro não encontrado' })

  if (req.method === 'PUT') {
    const { modelo, marca, ano, imagem } = req.body
    if (!modelo || !marca || !ano)
      return res.status(400).json({ erro: 'Campos obrigatórios: modelo, marca, ano' })

    carros[index] = { id, modelo, marca, ano, imagem: imagem || '' }
    await salvarDB(arquivo, carros)
    return res.status(200).json(carros[index])
  }

  if (req.method === 'DELETE') {
    carros.splice(index, 1)
    await salvarDB(arquivo, carros)
    return res.status(200).json({ mensagem: 'Carro removido' })
  }

  res.status(405).json({ erro: 'Método não permitido' })
}