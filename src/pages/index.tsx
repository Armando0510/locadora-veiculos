import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [router])

  // Renderiza algo enquanto aguarda o redirect
  return <p style={{ color: '#fff', textAlign: 'center', marginTop: '40vh' }}>
    Redirecionando…
  </p>
}
