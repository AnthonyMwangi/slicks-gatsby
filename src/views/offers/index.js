import './_styles.scss'
import React from 'react'
import { Link } from 'components'
import pizza_image from 'images/default_pizza.png'

export default function Banners() {

  const data = [
    {
      color: '#FF1E1E',
      title: 'Family Pack',
      action: {
        link: '/#menu',
        title: 'Order Now'
      },
      caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis magni, ullam hic sint pariatur distinctio',
      image: pizza_image
    },
    {
      color: '#FCBA1C',
      action: {
        link: '/#menu',
        title: 'Order Now'
      },
      title: 'Couples Pack',
      caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis magni, ullam hic sint pariatur distinctio',
      image: pizza_image
    },
    {
      color: '#FC7D1C',
      action: {
        link: '/#menu',
        title: 'Contact Us'
      },
      title: 'Custom Orders',
      caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis magni, ullam hic sint pariatur distinctio',
      image: pizza_image
    }
  ];

  return (
    <section id='banners'>
      <div className='wrapper'>
        {
          data.map((item, index) =>
            <div key={`${index}`} className='banner' style={{backgroundColor: item.color}}>
              <h1 className="title">{item.title}</h1>
              <div className="caption">{item.caption}</div>
              <Link className="btn" to={item.action.link} title={item.action.title}/>
              <img src={item.image} alt={item.caption} className="image" />
            </div>
          )
        }
      </div>
    </section>
  )
}
