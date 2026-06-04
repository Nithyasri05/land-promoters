import { logo, people } from "../assets"
import { background, blackroof, roofbg } from "../assets/img"

const About = () => {
  return (
    <main className=" h-full">
    <section className=" w-[100%] h-full max-h-full" id="about">
      <div className=" w-full md:h-52 h-32 relative flex bg-neutral-500">
        <img src={roofbg} alt="background" className=" w-full h-full mix-blend-overlay object-cover absolute "/>
        <h1 className=" relative mx-auto text-6xl font-bold opacity-100 text-white my-auto ">About</h1>
      </div>
      {/* <h1 className=" font-alike text-2xl mx-10 my-5">About Us & Why You Should Choose Us</h1> */}
      <div className="flex flex-col md:grid md:grid-cols-2 w-full h-fit my-auto">
        <div className=" col-span-2 mx-5 my-10  ">
          <div className=" w-full md:h-[600px] h-[400px] relative">
            <img src={background} alt="" className="  absolute w-full h-full object-cover " />
          </div>
        </div>
        <div className=" h-full w-full ">
          <div className=" py-5 md:py-0 flex my-2 flex-col mx-8  h-full  ">
            <span className=" text-lightbrown font-bold">Trusted Land Promoters</span>
            <h1 className=" text-2xl font-bold  ">Experienced land development and sales specialists</h1>
            <p className="">We acquire, develop, and market land for residential and commercial use. Our team manages due diligence, site preparation, legal compliance, and buyer relations to deliver high-value land projects on schedule.</p>
            <button className="buttondark w-[150px]">Contact-us</button>
          </div>
        </div>
        <div className="h-fit w-full md:my-0 my-3">
          <div className=" h-full mx-5">
            <div className=" md:mt-5 mt-2">
              <p>Our mission is to create sustainable, profitable land developments while protecting investor interests and local communities.</p>
              <p>We coordinate planning, permits, infrastructure, and sales to turn raw land into successful developments with transparent communication at every step.</p>
            </div>
            <div className="  h-36 w-full">
              <div className=" h-full md:w-1/2 w-full flex justify-between">
                <div className=" w-16 h-16 flex my-auto mx-5 ">
                    <img src={people} alt="" className="  my-auto object-cover h-full w-full" />
                </div>
                <div className=" mx-auto my-auto">
                      <h1 className=" text-2xl font-semibold font-alike">Nithya</h1>
                      <p>Founder & CEO</p>
                      <span className=" spanheading">Need assistance with a land project?</span>
                    <h1 className=" font-semibold text-lg">contact@landpromoters.com</h1>
                </div>
              </div>
            </div> 
          </div>
        </div>   
      </div>
    </section>
    <section className=" min-h-[400px] max-h-full w-full ">
      <div className=" h-16 flex flex-col ">
        <div className=" my-auto mx-10">
          <span className=" font-semibold text-lg text-primary">Why Choose us</span>
          <h1 className=" text-2xl text-black font-bold">Reason For Choosing us</h1>
        </div>
      </div>
      <div className=" my-10 h-fit">
        <div className=" w-[90%] mx-auto gap-10 my-auto grid-rows-3 grid md:grid-cols-3">
          <div className=" bg-mid_brown flex lex-col shadow-sm shadow-neutral-700">
            <div className=" mx-auto my-auto p-10 ">
              <div className=" mx-auto w-[20px] h-[20px]">
                <img src={logo} alt="icone" className=" w-[20px] h-[20px] text-center object-cover" />
              </div>
              <h1 className=" w-full text-center font-bold text-2xl text-primary ">Accredited Company</h1>
              <p className=" text-center font-normal ">Licensed and accredited land development firm with a proven track record.</p>
            </div>
          </div>
          <div className=" bg-mid_brown flex  flex-col  shadow-sm shadow-neutral-700">
            <div className=" mx-auto my-auto p-10 ">
              <div className=" mx-auto w-[20px] h-[20px]">
                <img src={logo} alt="icone" className=" w-[20px] h-[20px] text-center object-cover" />
              </div>
              <h1 className=" w-full text-center font-bold text-2xl text-primary">100% Guarantee</h1>
              <p className=" text-center font-normal ">Transparent contracts, clear timelines, and a client-first approach.</p>
            </div>
          </div>
          <div className=" bg-mid_brown flex  flex-col  shadow-sm shadow-neutral-700">
            <div className=" mx-auto my-auto p-10 ">
              <div className=" mx-auto w-[20px] h-[20px]">
                <img src={logo} alt="icone" className=" w-[20px] h-[20px] text-center object-cover" />
              </div>
              <h1 className=" w-full text-center font-bold text-2xl text-primary">Quality Partners</h1>
              <p className=" text-center font-normal ">A strong network of trusted contractors and partners ensuring reliable delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  )
}

export default About