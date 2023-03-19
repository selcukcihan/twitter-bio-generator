import { useRouter }  from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'
import Head from '../components/head'
import React from 'react'
import Footer from '../components/footer'
import Link from 'next/link'

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (user) {
      router.push('/bio')
    }
  }, [router, user])

  return (
    <>
      <Head />
      <main className="bg-stone-100 h-screen flex">
        <div className='container py-20 mx-auto flex-auto text-center'>
          <div className='group text-xl'>
            <Link href='/api/auth/login'>
              <button className='opacity-80 hover:opacity-100 hover:text-slate-200 font-light text-slate-100 rounded bg-sky-600 p-4'>Login with Twitter to generate your alternative bio!</button>
            </Link>
          </div>
          <Footer textSize='text-lg'/>
        </div>
      </main>
    </>
  )
}
