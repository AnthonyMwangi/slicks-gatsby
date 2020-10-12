import './_styles.scss'
import React from 'react'
import { scrollToSection } from 'components'
import pizza_image from 'images/default_pizza.png'

export default function Offers({ data = [], onSelectOffer = () => { } }) {

  const offers = data.map(a => ({
    ...a, action: {
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

  const on_select_offer = (offer) => {

    const { id, action } = offer;

    if (!action.link) return onSelectOffer(id);

    return scrollToSection(action.link,null);

  }

  return (
    <section id='banners'>
      <div className='wrapper'>
        {
          offers.map((offer) =>
            <div key={`${offer.id}`} className='banner' style={{ backgroundColor: offer.color }}>

              <h1 className="title">{offer.name}</h1>

              <div className="caption">{offer.description}</div>

              <button className="btn" onClick={() => on_select_offer(offer)}>
                {offer.action.title}
              </button>

              <img src={offer.images[0]} alt={offer.name} className="image" />

            </div>
          )
        }
      </div>
    </section>
  )
}
