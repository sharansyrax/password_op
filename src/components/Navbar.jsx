import React from 'react'

const Navbar = () => {
  return (
  
      <nav className='bg-purple-400   text-grey '>
       <div className="mycontainer flex justify-between items-center  px-9 py-6 h-14">

                <div className='logo font-bold text-grey-400 text-2xl'>
                        <span className="text-purple-900">&lt;</span>
                          Pass 
                          <span className="text-purple-900">OP /&gt;</span>
                  </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href='#'>Home</a>
                        <a className='hover:font-bold' href='#'>About</a>
                        <a className='hover:font-bold' href='#'>Contact</a>
                    </li>
                </ul> */}
                <button className="flex items-center gap-2 px-4 py-1 ring-white ring-1 bg-purple-500 text-white rounded-full hover:bg-purple-600 hover:font-bold transition-all duration-200">
                  <img className="invert w-10 h-10" src="/icons/github.png" alt="github" />
                  GitHub
                </button>


       </div>
       
      </nav>
   
  )
}

export default Navbar
