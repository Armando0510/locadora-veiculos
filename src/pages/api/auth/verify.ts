// API route
import type { NextApiRequest, NextApiResponse } from 'next'
import { validarToken } from '@/lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const usuario = validarToken(req)
  if (!usuario) return res.status(401).json({ erro: 'Token não fornecido' })
    
  return res.status(200).json({ autorizado: true, usuario: usuario })
}