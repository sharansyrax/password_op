import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref = useRef();
  const passwordRef=useRef();
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  // Load saved passwords (simplified)
  useEffect(() => {
    const stored = localStorage.getItem('passwords');
    if (stored) {
      const parsed = JSON.parse(stored);
     
        setPasswordArray(parsed);
    
    }
  }, []);

  const showPassword = () => {
    console.log(id)
  passwordRef.current.type='password'
    const img = ref.current;
    if (img.src.includes('icons/show.png')) {
      img.src = 'icons/hide.png';
      passwordRef.current.type='password'
     
    } else {
      img.src = 'icons/show.png';
      passwordRef.current.type='text'
    }
  };

  const savePassword = () => {
    if(form.site.length>3 &&form.username.length>3 && form.password.length>7 )
    {
      const updated = [...passwordArray, {...form,id:uuidv4()}];
    setPasswordArray(updated);
    localStorage.setItem('passwords', JSON.stringify(updated));
    setForm({ site: '', username: '', password: '' });
    toast('Password Saved', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    }
    else{
      toast('Enter the correct data', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    
  };
  const editPassword=(id)=>{
    console.log(id)
    const editpass = passwordArray.filter((i)=>i.id===id)[0];
    setForm(editpass)
    const editbeforepass=passwordArray.filter((i)=>i.id!==id);
    setPasswordArray(editbeforepass);
  }
  
  const deletePassword = id => {
    let c=confirm("Are you sure about deleting the password?")
    if(c)
    {
      console.log(id)
      const updated = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updated);
      localStorage.setItem('passwords', JSON.stringify(updated));
      toast('Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

  };
  

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const copyText=(text)=>{
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    // alert("copied to clipboard")
      
    navigator.clipboard.writeText(text)
  }

  return (
    <>
              <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                    transition={Bounce}
/>
           
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      
      <div className='p-2 md:px-4 md:mycontainer py-2'>
        <h1 className='text-4xl font-bold text-center'>
          <span className="text-purple-900">&lt;</span>
          Pass
          <span className="text-purple-900">OP /&gt;</span>
        </h1>
        <p className='text-black-900 text-center'>Your own password manager</p>
        <div className="text-black flex flex-col items-center p-4 gap-8">
          <input
            value={form.site}
            onChange={handleOnChange}
            placeholder='Enter website URL '
            className='rounded-full border border-purple-500 w-full text-black p-4 py-1'
            type="text"
            name='site'
          />
          <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
            <input
              value={form.username}
              onChange={handleOnChange}
              placeholder='Enter username'
              className='rounded-full border border-purple-500 w-full text-black p-4 py-1'
              type="text"
              name='username'
            />
            <div className="relative">
              <input
              ref={passwordRef}
                value={form.password}
                onChange={handleOnChange}
                placeholder='Enter password '
                className='rounded-full border border-purple-500 w-full text-black p-4 py-1'
                type="password"
                name='password'
              />
              <span className="absolute right-0 top-0.5 cursor-pointer">
                <img
                  ref={ref}
                  className='p-1 px-1.5 py-1.5'
                  onClick={showPassword}
                  width={30}
                  src="./icons/hide.png"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className='flex justify-center items-center rounded-full px-8 gap-2 py-2 bg-purple-400 w-fit hover:bg-purple-200 border border-purple-500'
          >
            <lord-icon src="https://cdn.lordicon.com/hqymfzvj.json" trigger="hover" />
            Save Password
          </button>
        </div>
        <div className="passwords overflow-x-auto">
          <h2 className='font-bold text-xl py-4'>Your passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords yet</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto   w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-purple-500 text-white'>
                <tr>
                  <th className='py-2'>URL</th>
                  <th className='py-2'>UserName</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-purple-100'>
                {/* {Array.isArray(passwordArray) && */
                  passwordArray.map((item, index) => (
                    <tr key={index}>
                   <td className="py-2 text-center text-1xl w-32 cursor-pointer break-words"  >
              <a href={item.site} target="_blank">{item.site}</a>
             
              <lord-icon   onClick={() => copyText(item.site)}
                          className="h-5 py-1 "
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                            >
                        </lord-icon>
       
              
              </td>

                      <td className="py-2 text-center w-32 text-1xl ">{item.username}
                        <lord-icon
                        onClick={() => copyText(item.username)}
                          className="h-5 py-1 "
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                            >
                        </lord-icon>
       </td>  
                      <td className="py-2 text-center w-32 text-1xl ">{item.password}
                        <lord-icon
                        onClick={() => copyText(item.password)}
                          className="h-5 py-1 "
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                            style={{ cursor: 'pointer', width: '20px', height: '20px' }}

                            >
                        </lord-icon>
       </td>
       <td className="py-2 text-center w-32 cursor-pointer"  >
          <span className='cursor pointer mx-1 ' onClick={()=>{editPassword(item.id)}}>
          <lord-icon

             src="https://cdn.lordicon.com/fikcyfpp.json"
              trigger="hover"
              style={{"width":"30px","height":"30px"}}>
          </lord-icon>
          </span>
          <span className='cursor pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
          <lord-icon
               src="https://cdn.lordicon.com/xyfswyxf.json"
              trigger="hover"
              style={{"width":"30px","height":"30px"}}>
          </lord-icon>
          </span>
              </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;