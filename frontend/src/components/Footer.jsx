import React from "react"

function Footer() {
  return (
    <footer className="bg-primary flex max-md:flex-col place-content-between p-10 max-sm:p-5">
      <div className="flex max-md:place-content-between items-center">
        <img className="mr-5 max-sm:w-2/5 max-sm:max-w-[150px]" src="/img/logo.png" />

        <div className="flex space-x-5">
          <img className="h-7" src="/img/instagram.png" />
          <img className="h-7" src="/img/facebook.png" />
          <img className="h-7" src="/img/tiktok.png" />
        </div>
        
      </div>

      <p className="max-md:mt-4 max-sm:text-xs">© 2024 Flirtly USA, Inc. All rights reserved.</p>
    </footer>
  )
}

export default Footer
