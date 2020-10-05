import './_styles.scss'
import React from "react"
import placeholder_image from 'images/gatsby-icon.png'

export default function Image({ className='image', url=placeholder_image, alt='placeholder_image' }) {

  return <img className={`gatsby-image ${className}`} src={url} alt={alt} />

}
