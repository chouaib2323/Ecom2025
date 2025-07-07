import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-200  text-[#1C1C1C] text-sm py-20">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* INFO Section */}
      <div className="space-y-4 text-center md:text-left">
        <p className="uppercase tracking-wide text-xs text-gray-500">Info</p>
        <ul className="space-y-1">
          <li><a href="#" className="hover:underline">Pricing</a></li>
          <li><a href="#" className="hover:underline">About</a></li>
          <li><a href="#" className="hover:underline">Contacts</a></li>
        </ul>
      </div>

      {/* Center Logo Section */}
      <div className="text-center space-y-1">
        <p className="uppercase tracking-wide text-xs text-gray-500">Technologies</p>
        <div className="text-4xl font-bold">
          <p>XIV</p>
          <p>QR</p>
        </div>
        <p className="text-xs text-gray-500">Near-field communication</p>
      </div>

      {/* LANGUAGES Section */}
      <div className="space-y-4 text-center md:text-right">
        <p className="uppercase tracking-wide text-xs text-gray-500">Languages</p>
        <ul className="space-y-1">
          <li><a href="#" className="hover:underline">ENG</a></li>
          <li><a href="#" className="hover:underline">ESP</a></li>
          <li><a href="#" className="hover:underline">SVE</a></li>
        </ul>
      </div>
    </div>

    {/* Privacy Text at Bottom Right */}
    <div className=" pt-3 border-[#D7D7D7] px-6 text-xs text-gray-400 text-right">
      privacy
    </div>
  </footer>
  )
}

export default Footer