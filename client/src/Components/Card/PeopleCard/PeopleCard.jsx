import React from 'react'
import './PeopleCard.css'

export const PeopleCard = ({title,poster}) => {
  return (
    <div className='people-card'>
        <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            className="people-img"
          />
        <p className='name'>{title}</p>
    </div>
  )
}
