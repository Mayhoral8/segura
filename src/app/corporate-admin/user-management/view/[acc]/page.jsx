import React from 'react'
import TransactionsHistory from "@/app/corporate/dashboard/TransactionsHistory"

export default async function Page({ params }) {
  const acc = (await params).acc
  
  return <main className='px-10'>
    <TransactionsHistory/>
  </main>
}
