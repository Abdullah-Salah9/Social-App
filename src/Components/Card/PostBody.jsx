import React from 'react'

export default function PostBody({body , image}) {
return <>

    {body && <p className='mb-3'>{body}</p>}
    {image && <img src={image} className='w-full h-75 object-cover' alt="" />}

</>
}
