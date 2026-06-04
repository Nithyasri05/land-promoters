import { logo, menu, close } from "../assets"
// import Home from './Home'
import { useState } from "react"
import { Navlinks } from "../constants"
import { Link } from "react-router-dom"
const Navbar = () => {
const [Active,setActive]=useState(false)
const [toggle, setToggle] = useState(false)
  return (
    <nav className='w-full h-16  flex py-6 justify-between items-center navbar  bg-mid_brown font-sans'>
      <img src={logo} alt="Logo" className='mx-3 md:mx-10 w-[75px] h-[75px]'/>  
      <ul className=' w-1/2 list-none sm:flex hidden justify-end item-center flex-1'>
        {Navlinks.map((nav,index)=>(
        <li 
        key={nav.id}
        className={`mr-5 font-poppins font-normal cursor-pointer text-[15px]  text-white ${index === Navlinks.length-1 ? 'mr-0' : 'mr-10'}cursor-pointer`}
        >
          <a ></a>
          <a href={nav.id} className=" text-black no-underline text-lg mx-4 opacity-80 transition-all ease-out hover:opacity-100">
            {nav.title}
          </a>
        </li>
        ))}
      </ul>
      <div className=" sm:hidden flex flex-1 justify-end items-center  ">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className={`w-[28px] h-[28px] mx-3 object-contain`}
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-mid_brown relative h-[470px] w-[500px]`}>
         <ul className="list-none flex justify-end items-start flex-1 flex-col ">
            {Navlinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-[alike] font-medium  cursor-pointer text-[16px] 
                 ${index === Navlinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={nav.id} className=" no-underline text-black ">{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar