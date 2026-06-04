import { background2, simler1, simler2 } from "../assets/img"
import { HoemContent, Rating_components, SunboxContent } from "../constants"
const Home = () => {
  return (
    <main className=" w-full h-full font-sans">
      {/* home on 100vh */}
      <div className=" bg-gray-600 h-[700px]  hidden md:block w-full absolute">
            <img src={background2} alt="background_image" className=" mix-blend-overlay h-full w-full object-cover overflow-hidden "/>
      </div>
        <section className=" flex h-[700px] mb-28 w-full">
          <div className=" md:grid grid-cols-2 flex flex-col h-full w-full">
            {HoemContent.map((Content,index)=>(
              <div className=" flex flex-col h-screen w-full">
                  <div className=" my-auto mx-10 ">
                    <h1 className="text-black md:text-white font-semibold text-5xl">{Content.title}</h1>
                    <p className="text-black md:text-white font-medium text-xl">{Content.discripction}</p>
                    <button className=" buttondark ">+91 889129991</button>
                  </div>
            </div>
            ))}
            <div className=" col-span-2 mb-10 flex relative h-28  w-full">
              <div className="h-full flex rounded-md bg-white shadow-sm shadow-gray-700 w-[80%] mx-auto">
                <div className=" my-auto mx-10">
                {SunboxContent.map((BoxContent,index)=>(
                  <div>
                    <span className="spanheading">{BoxContent.discripction}</span>
                    <h1 className="heading">{BoxContent.heading}</h1>
                  </div>
                ))}
                </div>
              </div>
            </div>
          
          </div>
        </section>        
      {/* Home on 2nd 100vh   */}
        <section className=" w-full md:h-[600px] min-h-[200px] max-h-full">
          <div className=" w-full h-full flex flex-col md:grid grid-cols-2">
              <div className="w-full h-full flex">
                <div className="relative flex w-[90%] h-[90%] mx-auto my-auto">
                    <img src={simler2} alt="bg-image" className=" hidden md:block w-[60%] border-[1px] border-yellow-100 h-[80%] object-cover absolute"/>
                    <img src={simler1} alt="bg-image" className=" w-[100%] h-[100%] md:w-[65%] md:h-[60%] border-[4px] border-yellow-50 md:bottom-0 md:left-48 object-cover md:absolute"/>
                </div>
              </div>
                <div className=" w-full h-full md:mx-0">
                  <div className=" flex h-full w-full">
                    <div className=" h-1/2 mx-auto my-auto w-full justify-around">
                      <span className="spanheading px-5 md:px-0">About Company</span>
                      <h1 className=" heading px-5 md:px-0">Professional Land Developers</h1>
                      <p className=" text-sm font-normal text-justify mx-5 mr-10">We provide comprehensive land development services including site acquisition, surveying, planning, permitting, and site preparation. Our team delivers high-quality, compliant developments that meet investor and community needs.</p>
                      <span className=" spanheading px-5 md:px-0">Certifed Company</span>
                    </div>
                  </div>
                </div>
          </div>
        </section>
        <section className=" my-10">
        <div className=" w-full mb-10 flex h-28 ">
              <div className="flex bg-white shadow-sm shadow-gray-700 w-[80%] mx-auto">
                <div className=" grid md:grid-cols-4 grid-cols-2 w-full h-full my-auto mx-0 ">
                  {Rating_components.map((component,index)=>(
                    <div className={` ${component.colors} flex md:w-full h-full`}>
                      <div className=" mx-auto my-auto">
                        <h1 className=" uppercase font-bold md:text-3xl text-lg text-center text-white ">{component.title}</h1>
                        <span className=" uppercase font-bold md:text-4xl text-xl text-center text-black my-0">{component.rateing}</span>
                      </div>
                    </div>
                ))}
                  </div>
                
                </div>
            </div>

            </section>
    </main>
  )
}

export default Home