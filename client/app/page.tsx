'use client'
import Link from 'next/link'
import fetcher from './utils/fetcher'
import useSWR from 'swr'

// IUser from res.local.user
interface IUser {
  data: {
    _id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    __v: number
    exp: number
    iat: number
    session: string
  }
}

export default function Home() {
  const { data, error } = useSWR<IUser>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/me`, fetcher,
  )


  if (data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Welcome {data.data.name}</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className='text-black hover:text-blue-300 hover:underline'>Please<Link href='/auth/login'> login </Link>to continue </p>
    </main>
  )
}
