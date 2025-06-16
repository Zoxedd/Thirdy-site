// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  // On mount, load initial session and subscribe to changes
  useEffect(() => {
    // fetch current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // load profile when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (!error) setProfile(data)
      })
  }, [user])

  // signup + insert profile
  const signUp = async (email, password, full_name) => {
    const { data, error } = await supabase.auth.signUp({
      email, password
    })
    if (error) throw error

    await supabase
      .from('profiles')
      .insert([{ id: data.user.id, full_name }])

    return data.user
  }

  // login
  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  // logout
  const signOut = () => supabase.auth.signOut()

  const value = { user, profile, signUp, signIn, signOut }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
