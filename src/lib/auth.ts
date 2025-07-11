import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import { Usuario } from './tipos'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-inseguro'

export function gerarToken(usuario: Usuario): string {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      usuario: usuario.usuario
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}

export function validarToken(req: NextApiRequest): { usuario: string } | null {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any
    return { usuario: payload.usuario }
  } catch {
    return null
  }
}
