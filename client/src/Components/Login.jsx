import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const formhandler = (e) =>{
    e.preventDefault();
    console.log(name,email,password);
    console.log("Submitted");

    //Clerar input fields
    setname('');
    setemail('');
    setpassword('');
  }
  return (
    <div className='w-full min-h-screen bg-zinc-900'>
      <div className='w-[32rem] bg-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg'>
        <form className='w-full flex flex-col gap-2' onSubmit={formhandler}>
          <h1 className='text-2xl text-center text-blue-600 font-bold'>Login</h1>
          <div>
            <label className='block mb-1 text-white'>Full Name</label>
            <input value={name} onChange={(e)=> setname(e.target.value)} required className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div>
            <label className='block mb-1 text-white'>Email</label>
            <input value={email} onChange={(e)=> setemail(e.target.value)} required type='email' className='w-full p-2 rounded-lg outline-none' />
          </div>
          <div>
            <label className='block mb-1 text-white'>Password</label>
            <input value={password} onChange={(e)=> setpassword(e.target.value)} required className='w-full p-2 rounded-lg outline-none' />
          </div>
         
          <div className='mt-2'>
            <Link to="/" className='text-blue-500 hover:underline'>Don't have account? Register now</Link>
          </div>
          <input type='submit' value={"Login"} className='bg-blue-600 text-white text-lg mt-2 p-1.5 rounded-lg hover:bg-blue-700 cursor-pointer' />
        </form>
      </div>
    </div>
  );
}

export default Login;
