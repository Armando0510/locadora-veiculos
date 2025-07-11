import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/dashboard.module.css'
import { Carro } from '@/lib/tipos'

export default function Dashboard() {
  const [usuario, setUsuario] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [carros, setCarros] = useState<Carro[]>([])
  const [form, setForm] = useState({ modelo: '', marca: '', ano: '', imagem: '', id: 0 })
  const [marcasFipe, setMarcasFipe] = useState<any[]>([])
  const [modelosFipe, setModelosFipe] = useState<any[]>([])
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  const carregarCarros = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/carros', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCarros(await res.json())
  }

  const carregarMarcasFipe = async () => {
    const res = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    setMarcasFipe(await res.json())
  }

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) return router.push('/')

      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        localStorage.removeItem('token')
        router.push('/')
      } else {
        const json = await res.json()
        setUsuario(json.usuario.usuario)
        await carregarCarros()
        await carregarMarcasFipe()
        setCarregando(false)
      }
    }

    verificarToken()
  }, [router])

  useEffect(() => {
    const buscarModelos = async () => {
      if (!form.marca) {
        setModelosFipe([])
        return
      }
      const marca = marcasFipe.find(m => m.nome === form.marca)
      if (!marca) return
      const res = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos`
      )
      const json = await res.json()
      setModelosFipe(json.modelos || [])
    }

    buscarModelos()
  }, [form.marca, marcasFipe])

  const salvarOuAtualizar = async () => {
    const token = localStorage.getItem('token')
    const metodo = form.id ? 'PUT' : 'POST'
    const url = form.id ? `/api/carros/${form.id}` : '/api/carros'

    const res = await fetch(url, {
      method: metodo,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelo: form.modelo,
        marca: form.marca,
        ano: form.ano,
        imagem: form.imagem
      })
    })

    if (res.ok) {
      setForm({ modelo: '', marca: '', ano: '', imagem: '', id: 0 })
      await carregarCarros()
    }
  }

  const deletarCarro = async (id: number) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/carros/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) await carregarCarros()
  }

  if (carregando)
    return (
      <p style={{ color: '#fff', textAlign: 'center', marginTop: '20vh' }}>
        Carregando...
      </p>
    )

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bem-vindo, {usuario}</h1>
        <button onClick={logout} className={styles.logoutBtn}>Sair</button>
      </header>

      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>{form.id ? 'Editar carro' : 'Cadastrar novo carro'}</h2>

        <select
          value={form.marca}
          onChange={e => setForm({ ...form, marca: e.target.value, modelo: '' })}
          className={styles.select}
        >
          <option value="">Selecione a marca</option>
          {marcasFipe.map(m => (
            <option key={m.codigo} value={m.nome}>
              {m.nome}
            </option>
          ))}
        </select>

        <select
          value={form.modelo}
          onChange={e => setForm({ ...form, modelo: e.target.value })}
          disabled={!form.marca}
          className={styles.select}
        >
          <option value="">Selecione o modelo</option>
          {modelosFipe.map(m => (
            <option key={m.codigo} value={m.nome}>
              {m.nome}
            </option>
          ))}
        </select>

        <input
          placeholder="Ano"
          value={form.ano}
          onChange={e => setForm({ ...form, ano: e.target.value })}
          className={styles.input}
        />

        <input
          placeholder="Link da imagem do carro"
          value={form.imagem}
          onChange={e => setForm({ ...form, imagem: e.target.value })}
          className={styles.input}
        />

        <button onClick={salvarOuAtualizar} className={styles.submitBtn}>
          {form.id ? 'Atualizar' : 'Salvar'}
        </button>
      </div>

      <div className={styles.listaWrapper}>
        <h2 className={styles.listaTitle}>Carros cadastrados</h2>
        <div className={styles.grid}>
          {carros.map(c => (
            <div key={c.id} className={styles.card}>
              <img
                src={c.imagem || '/sem-foto.png'}
                alt={c.modelo}
                onError={e => (e.currentTarget.src = '/sem-foto.png')}
                className={styles.cardImg}
              />

              <div className={styles.cardInfo}>
                <div className={styles.cardModelo}>{c.modelo}</div>
                <div className={styles.cardDetalhes}>{c.marca} • {c.ano}</div>
              </div>

              <div className={styles.cardBotoes}>
                <button
                  onClick={() =>
                    setForm({
                      modelo: c.modelo,
                      marca: c.marca,
                      ano: c.ano.toString(),
                      imagem: c.imagem,
                      id: c.id
                    })
                  }
                  className={styles.btnGrey}
                >
                  Editar
                </button>
                <button onClick={() => deletarCarro(c.id)} className={styles.btnRed}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Armando0510/locadora-veiculos"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          <img src="/github-logo.svg" alt="GitHub" className={styles.githubLogo} />
        </a>
        <span className={styles.footerText}>
          Armando • Bruno • Cleber<br />
          Todos os direitos reservados ©
        </span>
      </footer>
    </div>
  )
}
