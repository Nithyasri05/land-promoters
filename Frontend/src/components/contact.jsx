import { useState } from "react"
import { roofbg, simler1 } from "../assets/img"
import  axios  from "axios"

const contact = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [formData,setFormdata]=useState({
    name:"",
    email:"",
    subject:"",
    feedback:""
  })


const handleChange =(e)=>{
  const { name, value } = e.target;
  setFormdata({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    const response =await axios.post('/api/landpromoters/contact-us',formData)
    setResponseMessage(response.data.message);
    console.log(response)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }catch(err){
    console.log(err)
  }
} 

  return (
    <section className=" w-full md:min-h-[645px] md:max-h-full h-full md:relative overflow-hidden" id="contact">
     <div className=" w-full h-52 relative flex bg-neutral-500">
          <img src={roofbg} alt="background" className=" w-full h-full mix-blend-overlay object-cover absolute "/>
          <h1 className=" relative mx-auto text-6xl font-bold opacity-100 text-white my-auto ">Contact</h1>
        </div>
        <div className=" md:flex md:h-full w-full relative">
          <div className="h-full md:w-1/2 flex flex-col justify-evenly ">
            <div className=" my-10">
              <img src={simler1} alt="bg_ground" className=" bg-black mx-auto my-auto h-[300px] w-[250px] md:h-[500px] rounded-sm md:w-[400px] object-cover" />
            </div>
              <div  className=" flex flex-col mx-10 ">
                <h1 className=" text-4xl font-alike font-bold text-center">Lorem</h1>
              </div>
          </div>
          <div className=" w-full  md:w-1/2 h-full relative">
            <div className=" flex h-full md:h-full w-full relative">
              <div className=" w-full  md:w-1/2 md:h-full mx-auto ">
                <form action="#" className=" mt-2 mx-10 md:mx-0 flex flex-col h-full" onSubmit={handleSubmit}>
                  <h1 className=" font-bold text-2xl">Any questions ?
                    <br />
                    Write Down And Send Us .
                  </h1>
                  <div className=" mt-4">
                    <label htmlFor="">Name</label>
                    <input type="text" className=" inputbox" name="name" onChange={handleChange} value={formData.name} placeholder="Name" autoComplete="off" required/>
                  </div>
                  <div className="mt2">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" className="inputbox" onChange={handleChange} value={formData.email} placeholder="Email@gmail.com" autoComplete="off" required/>
                  </div>
                  <div className=" mt-4">
                    <label htmlFor="">subject</label>
                    <input type="text" className=" inputbox" name="subject" onChange={handleChange} value={formData.subject} placeholder="Subject" autoComplete="off" required/>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="">Message</label>
                    <textarea name="feedback" id="" cols="25" rows="10"  onChange={handleChange} autoComplete="off" value={formData.feedback} className="inputbox" placeholder=" Message"></textarea>
                  </div>
                  <button className="buttondark " type="submit">Submit</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}

              </div>
            </div>

          </div>
        </div>
    </section>
  )
}
export default contact