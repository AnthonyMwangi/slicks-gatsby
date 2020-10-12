import React from 'react'

export default function CheckoutSummary({ data, onClose = () => { } }) {

  if (!data) return null;

  const { name, email, order_id, menu_items = [] } = data;

  return (
    <div className='checkout-summary'>

      <pre className='receipt'>
        <div className='title'>ORDER RECEIVED</div>
        <div><b>ID:</b> {order_id}</div>
        <div><b>NAME:</b> {name}</div>
        <div><b>EMAIL:</b> {email}</div>
        <div className='title sub'>ORDER SUMMARY</div>
        <ul className="items">
          {
            menu_items.map(a =>
              <div key={a.id} className='flex'>
                <b className='b'>1 x {a.name}-{a.size}</b>
                <i className='i'>${a.price.toFixed(1)}</i>
              </div>
            )
          }
        </ul>
        <div className='title sub flex'>
          <b>ORDER TOTAL</b>
          <i className='i'>${menu_items.reduce((a, b) => a + b.price, 0).toFixed(1)}</i>
        </div>
      </pre>

      <button className='btn' onClick={() => onClose(null)}>
        BACK TO MENU
      </button>

    </div>
  )
}
