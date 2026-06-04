import { Navbar, Home,Footer,About,Service, Contact , Project }from './components';
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path.startsWith('/admin')) {
    if (path === '/admin' || path === '/admin/login') return <AdminLogin />
    return <AdminDashboard />
  }

  return (
    <main className=" bg-gradient-to-tr from-slate-50 to-yellow-100 font-sans">
       <Navbar/>
      <Home />
        <hr className=" border-[1px] border-primary rounded-full my-8  mx-24" />
      <About/> 
      <Service/>
       <hr className=" border-[1px] border-primary rounded-full mb-8  mx-24" />
       <Project/>
       <hr className=" border-[1px] border-primary rounded-full my-8  mx-24" />
      <Contact/>
     <Footer />
    </main>

  )
}

export default App