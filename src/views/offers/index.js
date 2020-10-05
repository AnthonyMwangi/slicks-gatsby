import './_styles.scss'
import React from 'react'
import { Link } from 'components'
import pizza_image from 'images/default_pizza.png'

export default function Offers({ data = [] }) {

  const offers = data.map(a => ({
    ...a, action: {
      link: '/#order',
      title: 'Order Now'
    },
  })).concat([
    {
      color: '#FC7D1C',
      action: {
        link: '/#footer',
        title: 'Contact Us'
      },
      name: 'Custom Orders',
      description: 'For any queries, compliments, complaints or custom orders, you can reach out to us directly.',
      images: [pizza_image]
    }
  ]);

  return (
    <section id='banners'>
      <div className='wrapper'>
        {
          offers.map((offer) =>
            <div key={`${offer.id}`} className='banner' style={{ backgroundColor: offer.color }}>
              <h1 className="title">{offer.name}</h1>
              <div className="caption">{offer.description}</div>
              <Link className="btn" to={offer.action.link} title={offer.action.title} />
              <img src={offer.images[0]} alt={offer.name} className="image" />
            </div>
          )
        }
      </div>
    </section>
  )
}
