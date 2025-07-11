import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '@/styles/index.module.css'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [erro, setErro] = useState('')
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const json = await res.json()
    if (res.ok) {
      localStorage.setItem('token', json.token)
      router.push('/dashboard')
    } else {
      setErro(json.erro)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            placeholder="E-mail"
            {...register('email')}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Senha"
            {...register('senha')}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.footer}>
          <p className={styles.footerText}>Ainda não tem conta?</p>
          <button
            onClick={() => router.push('/cadastro')}
            className={styles.linkButton}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  )
}
