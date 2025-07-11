import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/router' 
import styles from '../styles/Cadastro.module.css'

const schema = yup.object({
  usuario: yup.string().required('Usuário obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  senha: yup.string().min(4, 'Mínimo 4 caracteres').required('Senha obrigatória'),
  confirmar: yup.string().oneOf([yup.ref('senha')], 'Senhas não coincidem').required('Confirmação obrigatória')
})

type FormData = yup.InferType<typeof schema>

export default function Cadastro() {
  const router = useRouter()
  const [mensagem, setMensagem] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: data.usuario,
        email: data.email,
        senha: data.senha
      })
    })

    const json = await res.json()
    setMensagem(json.mensagem || json.erro)

    if (json.mensagem?.toLowerCase().includes('sucesso')) {
      setTimeout(() => router.push('/'), 1500)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>Cadastro</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
          <input
            placeholder="Usuário"
            {...register('usuario')}
            className={styles.input}
          />
          {errors.usuario && <p className={styles.mensagemErro}>{errors.usuario.message}</p>}

          <input
            placeholder="E-mail"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && <p className={styles.mensagemErro}>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Senha"
            {...register('senha')}
            className={styles.input}
          />
          {errors.senha && <p className={styles.mensagemErro}>{errors.senha.message}</p>}

          <input
            type="password"
            placeholder="Confirmar Senha"
            {...register('confirmar')}
            className={styles.input}
          />
          {errors.confirmar && <p className={styles.mensagemErro}>{errors.confirmar.message}</p>}

          <button type="submit" className={styles.botao}>
            Cadastrar
          </button>
        </form>

        {mensagem && (
          <p className={`${styles.mensagemInfo} ${mensagem.includes('sucesso') ? styles.sucesso : styles.erro}`}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  )
}
