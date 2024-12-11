import React from 'react'
import { useRef } from 'react'
import { X } from 'lucide-react';

function ModelSuccess({onClose,responsemsg}) {
  const ModelRef=useRef();

  const colseModel=(e)=>{
    if(ModelRef.current===e.target){
        onClose();
    }
  }

  return (
    <div ref={ModelRef} onClick={colseModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-white'>
            <button onClick={onClose} className='place-self-end'><X size={30}/></button>
            <div className='bg-green rounded-xl px-20 py-10 flex flex-col gap-5 items-center'>
               <h1>{responsemsg}</h1>
            </div>
        </div>
    </div>
  )
}

export default ModelSuccess