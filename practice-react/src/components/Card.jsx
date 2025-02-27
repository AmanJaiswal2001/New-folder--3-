import React from 'react'

const Card = ({title, image, key ,year ,desc}) => {
  return (
    <div id={key} className='w-96 border  h-full border-gray-300 m-5'>
       <img
        className='w-96 h-56'
        src={image}/>
       <p>{title}</p> 
       <p>{year}</p> 
       <p>{desc}</p> 
    </div>
  )
}

export default Card