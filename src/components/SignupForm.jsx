// src/pages/Signup.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'

export default function Signup() {
  const { signUp } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirm) {
      setError("Passwords don't match")
      return
    }
    setError(null)
    setLoading(true)
    try {
      await signUp(email, password, username)
      alert('Check your email to confirm your account!')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleOAuth = async provider => {
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-nx-black px-4">
      <div className="w-full max-w-md bg-nx-dark p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-thirdy-blue"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-thirdy-blue"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-thirdy-blue"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-thirdy-blue"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            {loading ? 'Signing Up…' : 'Sign Up'}
          </button>
        </form>

        {/* OAuth buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => handleOAuth('google')}
            className="w-full flex justify-center items-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Sign up with Google
          </button>
          <button
            onClick={() => handleOAuth('facebook')}
            className="w-full flex justify-center items-center py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign up with Facebook
          </button>
          <button
            onClick={() => handleOAuth('twitter')}
            className="w-full flex justify-center items-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
          >
            Sign up with X
          </button>
        </div>
      </div>
    </div>
  )
}
