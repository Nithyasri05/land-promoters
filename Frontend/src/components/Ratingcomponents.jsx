import React from 'react'
import { Rating_components } from '../constants'
const ratingcomponents = () => {
  return (
    <section className=''>
      <h2 className=' text-center font-sans font-medium my-2 text-2xl capitalize'>Your dream house  starting from </h2>
    <div className=' w-full flex'>
        <div className='grid grid-cols-4 h-32 w-[800px] mx-auto justify-center'>
          {Rating_components.map((Rating,index)=>(
            <div className={` md:w-[200px] w-full flex flex-col ${Rating.colors}`}>
            <div className=' mx-auto my-auto'>
              <h1 className=' text-center font-sans font-extrabold text-2xl md:text-4xl uppercase'>{Rating.title}</h1>
              <span className={`text-red-600 text-center font-sans font-extrabold text-xl md:text-3xl uppercase`}>{Rating.rateing}</span>
            </div>
          </div>
          ))}
          
      </div>
    </div>
    </section>
  )
}

export default ratingcomponents