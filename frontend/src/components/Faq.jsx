import React, { useEffect } from "react"
import { FaChevronDown } from "react-icons/fa";

function Faq() {
  useEffect(() => {
    const div = document.querySelectorAll('.dropdown-div')
    const btn = document.querySelectorAll('.dropdown-btn')
    const box = document.querySelectorAll('.dropdown')

    for(let i = 0; i < btn.length; i++) {
      box[i].style.maxHeight = box[i].clientHeight + 'px'
      let pxps = 200
      if (window.innerWidth < 750) pxps = 200
      const time = box[i].clientHeight / pxps
      box[i].style.transition = `all linear ${time}s`
      box[i].classList.add('dropdown-hidden')
      
      div[i].addEventListener('click', () => {
        if(box[i].classList.contains('dropdown-hidden')) {
          btn[i].classList.add('rotated-dropdown-btn')
          box[i].classList.remove('dropdown-hidden')
        } else {
          btn[i].classList.remove('rotated-dropdown-btn')
          box[i].classList.add('dropdown-hidden')
        }
      })
    }
  }, [])

  return (
    <section id="faq" className="bg-primary pt-16 pb-10">
      <h1 className='title'>NAJČEŠĆA PITANJA</h1>

      <div className="mt-16 max-md:mt-8 px-32 max-lg:px-16 max-sm:px-6">
        <ul className=" [&>li]:text-secondary text-xl max-md:text-base max-sm:text-base [&>li]:font-bold [&>li]:mt-10 max-sm:[&>li]:mt-6 [&>p]:mt-3 [&>p]:font-extralight">
          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer'>
              <li className='text-secondary italic font-bold'>How does your online program work, and what can I expect from the sessions?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>Our online program involves structured video call sessions with real women, where you'll practice conversational skills and simulate real-life dating scenarios. Expect personalized coaching, feedback, and practical tips to enhance your confidence and communication abilities.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>How frequently are the video call sessions scheduled, and how long do they last?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>Video call sessions are scheduled based on your availability and preferences. Typically, sessions last 45 minutes, and the frequency can be tailored to accommodate your learning pace and schedule.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>Will my sessions be confidential?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>Yes, your privacy and confidentiality are of utmost importance to us. All interactions and discussions during the sessions are kept strictly confidential.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>How long does it take to see results from the program?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>The timeline for seeing results can vary depending on individual circumstances. However, many clients report noticeable improvements in their confidence and dating success within a few weeks of starting the program.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>Is the program customized to address my specific needs and goals?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>Absolutely. Our program is highly personalized to address your unique challenges, strengths, and goals. We assess your needs during an initial consultation and tailor the program to ensure maximum effectiveness and relevance to your dating journey.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>What ongoing support  do you provide after completing the program?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>After completing the program, you'll receive access to additional resources, ongoing support, and community forums to continue your growth and development. We're committed to your long-term success and provide assistance whenever you need it.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>Are there any age restrictions to enroll in the program?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>While our program is tailored for young men aged 18-27, we welcome individuals of all ages who are looking to improve their dating skills and confidence.</p>
          </div>

          <div className='flex flex-col mt-10'>
            <div className='dropdown-div flex space-x-5 items-center cursor-pointer max-md:place-content-between'>
              <li className='text-secondary italic font-bold'>Can I speak with a previous client to hear about their experience firsthand?</li>
              <div><FaChevronDown className='dropdown-btn text-white size-6 max-sm:size-5' /></div>
            </div>
            <p className='dropdown mt-3'>Absolutely! We can arrange for you to connect with a previous client to gain insights and perspective on their transformational journey with us. Just let us know, and we'll be happy to facilitate that connection.</p>
          </div>
        </ul>
      </div>
    </section>
  )
}

export default Faq
