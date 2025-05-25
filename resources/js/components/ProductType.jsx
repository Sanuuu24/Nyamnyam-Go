import React from 'react'

const ProductType = () => {
  return (
    <div className='p-5'>
        <div className='flex gap-5'> 
            <div
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
            <img
                // src={}
                // alt={}
                className='w-[22rem] h-48 object-cover'
            />
            </div>
            <div className='bg-white p-4 text-center'>
                <h2 className='text-lg font-semibold'></h2>
            </div>
        </div>
    </div>
  )
}

export default ProductType