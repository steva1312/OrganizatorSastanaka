import { useEffect } from 'react'
import Pocetna from '../components/Pocetna'
import Faq from '../components/Faq'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pricing from '../components/Pricing'
import '../styles/Home.css'

function Home() {
  useEffect(() => {
    const burger = document.querySelector('.burger')
    const phoneLinks = document.querySelector('.phone-links')
    const blackFilter = document.querySelector('.black-filter')
    const links = document.querySelectorAll('.phone-links li a')

    const toggleClasses = () => {
      burger.classList.toggle('burger-x')
      phoneLinks.classList.toggle('phone-links-show')
      blackFilter.classList.toggle('black-filter-active')
    }

    burger.addEventListener('click', () => {
      toggleClasses()
    })

    for(let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        toggleClasses()
      })
    }
  }, [])

  return (
    <div className='App relative text-white font-inter'>
      <div className="black-filter"></div>

      <Header />

      <Pocetna />

      <div className="w-full h-1 bg-secondary"></div>

      <Pricing />

      <div className="w-full h-1 bg-secondary"></div>

      <Faq />

      <div className="w-full h-1 bg-secondary"></div>

      <Footer />
    </div>
  )
}

export default Home
