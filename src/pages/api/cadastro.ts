import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { lerDB, salvarDB } from '@/lib/db'
import { Usuario } from '@/lib/tipos'

const arquivo = 'usuarios.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Método não permitido')

  const { email, usuario, senha } = req.body

  if (!email || !usuario || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' })
  }

  const dados = await lerDB<Usuario>(arquivo)
  const emailExistente = dados.find((u: any) => u.email === email)

  if (emailExistente) {
    return res.status(400).json({ erro: 'E-mail já cadastrado' })
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const novoUsuario:Usuario = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    email,
    usuario,
    senha: senhaCriptografada
  }

  dados.push(novoUsuario)
  await salvarDB(arquivo,dados)
  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' })
}
