import fs from 'fs/promises'
import path from 'path'

function getFilePath(nomeArquivo: string) {
  return path.resolve(process.cwd(), 'data', nomeArquivo)
}

export async function lerDB<T>(nomeArquivo: string): Promise<T[]> {
  const caminho = getFilePath(nomeArquivo)
  try {
    const data = await fs.readFile(caminho, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function salvarDB<T>(nomeArquivo: string, conteudo: T[]) {
  const caminho = getFilePath(nomeArquivo)
  await fs.writeFile(caminho, JSON.stringify(conteudo, null, 2), 'utf-8')
}
