import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const[fullname,setname] = useState('');
  const[email,setemail] = useState('')
  const[password,setpassword] = useState('')
  const[number,setnumber] = useState('')
  const formhandler = (e) => {
    e.preventDefault()
    console.log(fullname,email,password,number);
    console.log("form submitted");

    // Clear input fields
    setname('')
    setemail('')
    setpassword('')
    setnumber('')
  }
  return (
    <div className='w-full min-h-screen bg-zinc-900'>
      <div className='w-[32rem] bg-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg'>
        <form className='w-full flex flex-col gap-2' onSubmit={formhandler}>
          <h1 className='text-2xl text-center text-blue-600 font-bold'>Register</h1>
          <div>
            <label className='block mb-1 text-white'>Full Name</label>
            <input value={fullname} onChange={(e)=> setname(e.target.value)} name='username' required className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div>
            <label className='block mb-1 text-white'>Email</label>
            <input value={email} onChange={(e) => setemail(e.target.value)} name='email' required type='email' className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div>
            <label className='block mb-1 text-white'>Password</label>
            <input value={password} onChange={(e)=> setpassword(e.target.value)} name='password' required className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div>
            <label className='block mb-1 text-white'>Number</label>
            <input value={number} onChange={(e) => setnumber(e.target.value)} name='number' required type='tel' className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div className='mt-2'>
            <Link to="/login" className='text-blue-500 hover:underline'>Already have an account? Log in now</Link>
          </div>
          <input type='submit' className='bg-blue-600 text-white mt-2 p-1.5 rounded-lg hover:bg-blue-700 cursor-pointer' />
        </form>
      </div>
    </div>
  );
}

export default Register;
