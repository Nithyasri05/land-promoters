import { Link } from 'react-router-dom'
import { roofbg } from '../assets/img'
import { Services_component,ServiceConstants } from '../constants'
const Service = () => {
  return (
    <main id='service'>
       {/* First section of services */}
      <section className=" w-full h-full bg-primary  ">  
        <div className=" w-full h-52 relative flex bg-neutral-500">
          <img src={roofbg} alt="background" className=" w-full h-full mix-blend-overlay object-cover absolute "/>
          <h1 className=" relative mx-auto text-6xl font-bold opacity-100 text-white my-auto ">Services</h1>
        </div>
          <div className=" md:h-24 h-full w-full flex flex-col justify-around  ">
            <span className=" mt-10 my-auto mx-auto text-lightbrown text-xl font-bold ">Our services</span>
            <h1 className=' my-auto mx-auto md:my-0 text-white text-2xl font-bold capitalize'>we are provide superior Building construction for are clients</h1>
          </div>
          <div className='  h-full md:h-[280px] mt-14 w-full'>
            <div className=' flex flex-col md:grid grid-cols-3 w-[85%] md:w-[80%] gap-7  mx-auto h-full'>
              {Services_component.map((Service,index)=>(
                <div className=' bg-black flex flex-col '>
              <div className='mx-auto my-auto px-10  text-lightbrown'>
                  <h1 className=' text-lightbrown text-2xl font-semibold'>{Service.title}</h1>
                  <p className=' font-light'>{Service.discripction}</p>
                  <button className=" buttondark hover:opacity-100 opacity-90  ">+91 889129991</button>
                </div>
              </div>
              ))}
            </div>
          </div>
          <div>
            <div className='mx-10 min-h-[100px] max-h-full mt-10 '>
              <span className='text-lightbrown text-2xl font-bold'>Aditional services</span>
              <h1 className=' text-black font-semibold text-xl'>We also offer's</h1>
              <ul className=' text-white mx-10'>
                <li className=' list-disc'>Stucco</li>
                <li className=' list-disc'>Window Replacement </li>
                <li className=' list-disc'>Skylights & Sun Tunnels</li>
                <li className=' list-disc'>Chimney Spark arrestor</li>
                <li className=' list-disc'>Interior Sheetrock Repairs</li>
              </ul>
              <button className=' bg-lightbrown  text-white rounded-sm mx-2 font-semibold text-lg my-5 px-4 py-2'>For Contact</button>
            </div>
          </div>
    </section>
       {/* second section of services */}
    <section className=' min-h-[650px] max-h-full w-full'>
      <div className=' h-24 w-full flex flex-col'>
        <div className=' my-auto mx-14'>
          <span className=' spanheading'>Our Service</span>
          <h1 className='text-black font-bold text-2xl' >Trust the Experience</h1>
        </div>
      </div>
      <div className=" w-full min-h-full max-h-fit">
            <div className=" md:grid md:grid-cols-3 flex flex-col  md:mb-10 gap-16 py-3 mx-10">
          {ServiceConstants.map((Service,index)=>(
              <div className=" mx-auto md:h-[390px] md:w-[400px] h-full w-full bg-white shadow-sm shadow-gray-600">
                <img src={Service.image} alt="" className=" w-full h-4/6 object-cover"/>
                <div className=" md:mx-[3px] flex flex-col ">
                  <div className=" h-12 ml-5">
                    <h1 className=" text-2xl ">{Service.title}</h1>
                    <p>{Service.discripction}</p>
                  </div>
                    <div className=' flex justify-between h-full'>
                      <span className=' my-auto ml-6'>Price:<del>{Service.price*Service.discount-Service.discount*100}%</del>{Service.price}</span>
                      <button className="buttondark mx-3 md:w-[120px] w-[140px]"><Link to={'/contact'} className=" text-sm text-white  no-underline">Contact</Link></button>
                    </div>
                </div>
              </div>  
          ))}
            </div>
          </div>
    </section>
  </main>
  )
}

export default Service