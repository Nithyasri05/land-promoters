import {logo} from '../assets/'
import { Link } from 'react-router-dom'
import { apple, facebook } from '../assets/img'
const Footer = () => {
  return (
    <section className=" min-h-[300px] max-h-full w-full bg-lightbrown text-white font-sans">
      <div className=' bg-black w-full h-full flex'>
      <div className=" w-2/3 flex flex-col h-full">
        <div className=' w-full  my-auto flex flex-col justify-between'>
          <img src={logo} alt="" className='mx-auto w-[200px] h-[200px]' />
          <p className='px-10 w-full'>LandPromoters is a full-service land development firm offering site acquisition, planning, permitting, infrastructure delivery, and sales support for developers and investors.</p>
        <div className=' flex justify-around h-14 w-1/3 mx-10'>
            <img src={facebook} alt="" />
            <img src={facebook} alt="" />
            <img src={facebook} alt="" />
        </div>
        </div>
      </div>
        <div className="flex flex-col md:grid md:grid-cols-3 h-[300px] md:w-full w-[200px]">
          <div className=' my-auto mx-auto'>
            <span className=' text-secondary font-bold text-lg'>Quick Links</span>
            <ul>
              <li><Link to={'/Privacy Policy'} className=' text-white  no-underline font-semibold'>Privacy Policy</Link></li>
              <li><a href={'/termsandconditons'} className=' text-white no-underline font-semibold'>Terms of Service</a></li>
              <li><Link to={'/Faq'} className=' text-white no-underline font-semibold'>FAQ</Link></li>
            </ul>
          </div>
          <div className=' flex'>
          <div className=' my-auto mx-auto'>
            <span className=' text-secondary font-bold text-lg'>Our Services</span>
            <ul>
              <li><a href='services' className=' text-white  no-underline font-semibold'>Services</a></li>
              <li><a href='project' className=' text-white no-underline font-semibold'>Building projects</a></li>
              <li><a href='services' className=' text-white no-underline font-semibold'>Installation &
              <br className='block md:hidden' /> Repair works</a></li>
            </ul>
          </div>
          </div>
          <div className= "flex ">
          <div className=' my-auto mx-auto'>
            <span className=' text-secondary font-bold text-lg'>Contact Details</span>
            <ul>
              <li>+91 8846469935</li>
              <li><a href='contact' className=' text-white no-underline font-semibold'>Email</a></li>
              <li className='text-white no-underline font-light' >1/2 Balaji Nagar <br /> north street
              <br />
              coimbatore-641107
              </li>
            </ul>
          </div>
          </div>
      </div>
      </div>
      <div className=' bg-black w-full h-16'>
        <div className=' text-white font-sans flex text-sm justify-between w-full h-full '>
          <div className=' my-auto mx-10'>
            <h1 className=''>© 2024 LandPromoters. All rights reserved.</h1>
          </div>
          <div className=' my-auto mx-10'>
          <span>Designed & developed by <a href='#netnexis.tech' className=' text-blue-500'>NetNexis.tech</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer