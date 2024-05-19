import React, { useRef, useState } from "react"
import { FaDownload } from "react-icons/fa"
import { Document, Page } from 'react-pdf'

function Ebook() {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const onPdfLoad = ({ numPages }) => setPageCount(numPages)

  const pdfDivRef = useRef()

  useState(() => {
    setTimeout(() => {
      console.log(pdfDivRef.current.clientWidth)

    }, 1000)
  }, [])

  return (
    <>
      <h1 className='profile-title text-center px-2'>Mastering Dating Game</h1>

      <div className='mt-8 flex flex-col items-center'>
        <p className='text-xl max-sm:text-lg text-center px-2'>You can download the book, or read it right here.</p>
        <a 
          href='/mastering-dating-game.pdf' 
          download='Mastering Dating Game' 
          className='mt-4 flex items-center bg-gray-300 p-3 text-xl max-sm:text-lg rounded-md'
        >
          <FaDownload className='text-black mr-2' />
          Download
        </a>
      </div>

      <div className='mt-14 bg-gray-300 p-10 max-sm:p-3'>
        <div ref={pdfDivRef} className='w-[700px] max-md:w-[80vw] max-sm:w-[70vw]'>
          <Document file='/mastering-dating-game.pdf' onLoadSuccess={onPdfLoad}>
            {
              Array.apply(null, Array(pageCount))
                .map((x, i) => i + 1)
                .map(page => <Page className='mb-10 max-sm:mb-3' pageNumber={page} width={pdfDivRef.current.clientWidth} key={page} renderAnnotationLayer={false} renderTextLayer={false} /> )
            }
          </Document>
        </div>
      </div>
      
    </>
  )
}

export default Ebook
