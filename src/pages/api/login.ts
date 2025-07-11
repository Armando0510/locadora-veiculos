import { NextApiRequest, NextApiResponse } from 'next'
import { lerDB } from '@/lib/db'
import { Usuario } from '@/lib/tipos'
import { gerarToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

const arquivo = 'usuarios.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Método não permitido')

  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha obrigatórios' })
  }

  const dados = await lerDB<Usuario>(arquivo)

  const usuario = dados.find((u: any) => u.email === email)

  if (!usuario) {
    return res.status(400).json({ erro: 'Usuário não encontrado' })
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Senha incorreta' })
  }

  const token = gerarToken(usuario)

  return res.status(200).json({ token, usuario: usuario.usuario })
}
