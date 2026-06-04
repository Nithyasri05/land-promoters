import React, { useState } from 'react'
import axios from 'axios'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('/api/landpromoters/admin/login', { email, password })
      if (res.data && res.data.token) {
        localStorage.setItem('admin_token', res.data.token)
        window.location.href = '/admin/dashboard'
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-yellow-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg p-6">
        <div className="bg-white shadow rounded-md p-6">
          <h2 className="heading">Admin Login</h2>
          <p className="text-sm text-gray-600 mb-4">Sign in to manage messages and site contacts.</p>
          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
          <form onSubmit={submit}>
            <label className="spanheading">Email</label>
            <input className="inputbox" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label className="spanheading mt-3">Password</label>
            <input type="password" className="inputbox" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div className="mt-4 flex items-center justify-between">
              <button className="buttondark">Login</button>
              <a href="/" className="buttonligth">Back to site</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
