import React, { useEffect, useState } from 'react'
import axios from 'axios'

function authHeaders() {
  const t = localStorage.getItem('admin_token')
  return { Authorization: `Bearer ${t}` }
}

export default function AdminDashboard(){
  const [msgs, setMsgs] = useState([])
  const [selected, setSelected] = useState(null)
  const [replyBody, setReplyBody] = useState('')
  const [message, setMessage] = useState('')

  const load = async ()=>{
    try{
      const res = await axios.get('/api/landpromoters/admin/messages', { headers: authHeaders() })
      setMsgs(res.data.msgs || [])
    }catch(err){
      if (err.response && err.response.status===401) window.location.href='/admin'
      setMessage('Failed to load')
    }
  }

  useEffect(()=>{ load() }, [])

  const view = async (id)=>{
    try{
      const res = await axios.get(`/api/landpromoters/admin/messages/${id}`, { headers: authHeaders() })
      setSelected(res.data.msg)
    }catch(err){ setMessage('Failed to load message') }
  }

  const mark = async (id, val)=>{
    await axios.patch(`/api/landpromoters/admin/messages/${id}`, { read: val }, { headers: authHeaders() })
    load()
  }

  const del = async (id)=>{
    if (!confirm('Delete message?')) return
    await axios.delete(`/api/landpromoters/admin/messages/${id}`, { headers: authHeaders() })
    setSelected(null)
    load()
  }

  const sendReply = async (id)=>{
    if (!replyBody) return alert('Reply text required')
    try{
      await axios.post(`/api/landpromoters/admin/messages/${id}/reply`, { replyBody }, { headers: authHeaders() })
      alert('Reply sent')
      setReplyBody('')
    }catch(err){ alert('Failed to send reply') }
  }

  const logout = ()=>{ localStorage.removeItem('admin_token'); window.location.href='/' }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-yellow-100 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="heading">Admin Dashboard</h1>
          <div>
            <button onClick={logout} className="buttondark">Logout</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <h2 className="spanheading">Messages</h2>
            <div className="mt-3 space-y-2">
              {msgs.map(m=> (
                <div key={m._id} className={`p-3 border rounded ${m.read ? 'bg-slate-50' : 'bg-white'}`}>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{m.name} <span className="text-sm text-gray-500">{m.email}</span></div>
                      <div className="text-sm text-gray-700">{m.subject}</div>
                    </div>
                    <div className="text-right">
                      <button onClick={()=>view(m._id)} className="text-blue-600">View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-white p-4 rounded shadow">
            {!selected && <div className="text-gray-600">Select a message to view</div>}
            {selected && (
              <div>
                <h3 className="text-xl font-semibold">{selected.subject}</h3>
                <div className="text-sm text-gray-600">From: {selected.name} &lt;{selected.email}&gt;</div>
                <p className="mt-3 whitespace-pre-wrap">{selected.feedback}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>mark(selected._id, true)} className="buttondark">Mark Read</button>
                  <button onClick={()=>mark(selected._id, false)} className="buttonligth">Mark Unread</button>
                  <button onClick={()=>del(selected._id)} className="delet">Delete</button>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium">Reply</h4>
                  <textarea value={replyBody} onChange={(e)=>setReplyBody(e.target.value)} className="input_box mt-2" rows={6}></textarea>
                  <div className="mt-2"><button onClick={()=>sendReply(selected._id)} className="buttondark">Send Reply</button></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
