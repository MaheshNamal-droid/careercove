import React from 'react'
import { useRef } from 'react'
import { X } from 'lucide-react';
import { PartyPopper } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';

function ModelSuccess({onClose,responsemsg,responsestatus}) {
  const ModelRef=useRef();

  const colseModel=(e)=>{
    if(ModelRef.current===e.target){
        onClose();
    }
  }

  return (
    <div ref={ModelRef} onClick={colseModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-black'>
            <button onClick={onClose} className='place-self-end'><X size={30}/></button>
            <div className='bg-lime-200 rounded-xl px-20 py-10 flex flex-col gap-5 items-center'>
            { responsestatus ?
               <><PartyPopper size={100} /><h1 className='text-2xl'>{responsemsg}</h1><h2 className='text-1xl'>You will recivied an email with further details</h2><h2 className='text-1xl'>Thank you!</h2><a href='/login' className='text-blue-600'><h1 className='text-1xl'>Check appplication status</h1></a><a href='/dashboard' className='text-blue-600'><h1 className='text-1xl'>Home</h1></a></>
            :
                <> <ShieldAlert size={100} /><h1 className='text-2xl text-red-600'>{responsemsg}</h1><a href='/dashboard' className='text-blue-600'><h1 className='text-1xl'>Home</h1></a></>
            }
            </div>
        </div>
    </div>
  )
}

export default ModelSuccess