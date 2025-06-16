import { useAuth } from '../context/AuthContext.jsx'
import LoginForm    from '../components/LoginForm.jsx'

export default function Profile() {
  const { user, profile, signOut } = useAuth()

  // if they’re not logged in, show the login form instead
  if (!user) return <LoginForm />

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded">
      <h2 className="text-xl mb-4">Welcome, {profile.full_name}</h2>
      <p>Email: {user.email}</p>
      <button
        onClick={signOut}
        className="mt-4 px-4 py-2 bg-red-600 rounded"
      >
        Log Out
      </button>
    </div>
  )
}
