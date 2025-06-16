// src/components/LoginForm.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-thirdy-blue text-white rounded"
      >
        Log In
      </button>
    </form>
  )
}
