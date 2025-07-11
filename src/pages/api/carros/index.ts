import { NextApiRequest, NextApiResponse } from 'next'
import { validarToken } from '@/lib/auth'
import { lerDB, salvarDB } from '@/lib/db'
import { Carro } from '@/lib/tipos'

const arquivo = 'carros.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const usuario = validarToken(req)
  if (!usuario) return res.status(401).json({ erro: 'Não autorizado' })

  const carros = await lerDB<Carro>(arquivo)
  if (req.method === 'GET') {
    return res.status(200).json(carros)
  }

  if (req.method === 'POST') {
    const { modelo, marca, ano, imagem } = req.body
    if (!modelo || !marca || !ano)
      return res.status(400).json({ erro: 'Campos obrigatórios: modelo, marca, ano' })

    const novo:Carro = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      modelo,
      marca,
      ano,
      imagem: imagem || ''          // garante que exista a chave
    }

    carros.push(novo)
    await salvarDB(arquivo, carros)
    return res.status(201).json(novo)
  }

  res.status(405).json({ erro: 'Método não permitido' })
}
