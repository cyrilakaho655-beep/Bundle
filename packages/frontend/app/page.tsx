"use client"

import React, { useEffect, useState } from 'react'

export default function HomePage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    fetch(`${api}/api/plans`)
      .then((r) => r.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error(err))
  }, [])

  async function buy(planId) {
    setLoading(true)
    setMessage('')
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const res = await fetch(`${api}/api/plans/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: null, planId, paymentMethod: 'paystack' })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(`Order created. Payment URL: ${data.payment.redirect_url}`)
      } else {
        setMessage(data.error || 'Payment initiation failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Whally — Data Plans (MVP)</h1>
      <p>Demo frontend connected to the backend (MVP).</p>
      <div style={{ margin: '12px 0' }}>{message}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {plans.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>
              <strong>{p.price} {p.currency}</strong>
            </p>
            <p>Valid for {p.validityDays} days</p>
            <button onClick={() => buy(p.id)} disabled={loading} style={{ padding: '8px 12px', borderRadius: 6 }}>Buy</button>
          </div>
        ))}
      </div>
    </main>
  )
}
