import { roofbg } from '../assets/img'
import {project_constants,project_constants2,SunboxContent2} from '../constants'
const Projects = () => {
  return (
    <main className='h-full w-[100%]'>
    <section className=" h-full max-h-fit w-[100%]" id="project">
    <div className=" w-full h-52 relative flex bg-neutral-500">
          <img src={roofbg} alt="background" className=" w-full h-full mix-blend-overlay object-cover absolute "/>
          <h1 className=" relative mx-auto text-6xl font-bold opacity-100 text-white my-auto ">Project</h1>
        </div>

      {/* desktop vies */}
      <div className=' hidden md:block'>
      <div className=" h-[600px] w-[100%] mb-36 flex">
        <div className=" grid grid-cols-4 gap-10 py-5  px-8 w-[93%] my-10 mx-auto  h-full">
          {project_constants.map((Project,index)=>(
            <div className=" w-full h-full ">   
                <div className=" absolute w-[266px] flex float-end flex-col h-[100%] mt-[300px] overflow-hidden">
                  <h1 className=" text-center font-alike text-2xl ">{Project.title}</h1>
                  <p className=" text-center justify-center font-alike text-md">{Project.discripction}</p>
                </div>
            <div className=" h-full w-full flex ">
              <img src={Project.image} alt=""  className="h-full w-full object-cover shadow-none  transform transition-transform duration-500 origin-top hover:scale-y-50  ease-in-out relative " />
            </div>
          </div>          
          ))}
        </div>
      </div>
      </div>
    </section>

<div className=' mt-10 md:mt-0'>
    <div className=" col-span-2 mb-10 flex relative h-44  w-full ">
      <div className=" h-full flex rounded-md bg-white shadow-sm shadow-gray-700 w-[90%] mx-auto">
      <div className=" my-auto mx-10">
        {SunboxContent2.map((BoxContent,index)=>(
          <div className=' w-full flex flex-col'>
            <span className=" text-lightbrown w-full text-center mx-auto">{BoxContent.discripction}</span>
              <h1 className=" mx-auto font-bold text-lg md:text-3xl">{BoxContent.heading}</h1>
              <p className=' mx-auto my-5'>{BoxContent.content}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  </div>

    <div className=" w-full min-h-full max-h-fit">
            <div className=" flex flex-col md:grid  md:grid-cols-2 mb-10 gap-16 py-3 mx-10">
          {project_constants2.map((Service,index)=>(
              <div className=" mx-auto md:h-[390px] md:w-[400px] h-[370px] w-[300px] bg-white shadow-sm shadow-gray-600">
                <img src={Service.image} alt="" className=" w-full h-4/6 object-cover"/>
                <div className=" mx-[3px] flex flex-col ">
                  <div className=" h-12 ml-5">
                    <h1 className=" text-2xl ">{Service.title}</h1>
                    <p className=' text-sm md:text-lg'>{Service.discripction}</p>
                  </div>
                  
                </div>
              </div>  
          ))}
            </div>
          </div>   
  </main>

)
}

export default Projects