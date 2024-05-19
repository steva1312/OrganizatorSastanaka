import React from "react"

function Pocetna() {
  return (
    <section className="relative mt-[8vh] h-[92vh] max-sm:pb-10 w-full bg-primary z-10 flex flex-col items-center max-sm:place-content-between font-inter">
      <h1 className="title mt-24 max-sm:mt-12">ORGANIZATOR SASTANAKA</h1>

      <div className='mt-[300px] max-sm:mt-0 flex flex-col items-center'>
        

        <button className='pulse-btn mt-16 max-sm:mt-8 bg-teriary text-2xl max-sm:text-xl font px-16 py-3'>
          SPREMAN SAM

          <span className='pulse-0'></span>
          <span className='pulse-1'></span>
        </button>
      </div>

    </section>
  )
}

export default Pocetna
