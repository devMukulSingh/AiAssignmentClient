import React from 'react'
import BotForm from './components/BotForm'

const page = () => {
  return (
    <div className='flex flex-col items-center w-full h-full py-10'>
        <div className='flex flex-col border rounded-md w-[35rem] px-5 pb-5 pt-10 gap-5 shadow-md'>
            <h1 className='text-2xl font-semibold'>Manage Bot</h1>
            <BotForm/>
        </div>
    </div>
  )
}

export default page