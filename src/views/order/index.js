import './_styles.scss'
import React from 'react'
import close from 'images/delete.svg'

export default function Order({ data = [] }) {

  const [menu, update_menu] = React.useState([]);

  const [orders, update_orders] = React.useState([]);

  React.useEffect(() => { update_menu(data) }, [data]);

  const add_to_cart = (item, variants) => {

    const { id, image, name } = item;

    const order_id = `${id}-${orders.length + 1}`;

    const new_order = { id: order_id, name, image, variants };

    return update_orders([...orders, new_order]);

  }

  const remove_from_cart = (id) => {

    const new_order = orders.filter(a => a.id !== id);

    return update_orders(new_order);

  }

  const sub_total = () => orders.reduce((a, b) => a + b.variants.price, 0);

  return (
    <section id='order'>
      <div className="wrapper">

        <div className="section-heading">
          <h4 className='section-caption'>Order Now</h4>
          <h1 className="section-title">Place Your Order</h1>
        </div>

        <div className="order-box">
          <div className="bg">

            <div className="heading">Menu</div>
            <div className="heading">Your Order</div>

            <div className="column menu">
              {
                menu.map(a =>
                  <MenuItem
                    data={a}
                    key={a.id}
                    onClick={add_to_cart}
                  />
                )
              }

            </div>

            <div className="column order">
              {
                orders.map(a =>
                  <MenuItem
                    order
                    data={a}
                    key={a.id}
                    onDelete={remove_from_cart}
                  />
                )
              }
            </div>

            <div className="heading">Checkout</div>

            <div className="column checkout">

              <input type="text" placeholder='Enter Your Name' />
              <input type="text" placeholder='Enter Email Address' />

              <div className="sub-total">
                {`Total: $${sub_total()}`}
              </div>

              <button className="btn">
                Order Ahead
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

function MenuItem({ order, data = {}, onClick = () => { }, onDelete = () => { } }) {

  const { id, name, image, variants } = data;

  const options = !!order ? [variants] : variants;

  return (
    <div className='menu-item'>

      <div style={{ backgroundImage: `url(${image})` }} className="image" />

      <div className="content">
        <h1 className="name">{name}</h1>
        <div className="variants">
          {
            options.map((a, i) =>
              <button key={`${a.size}-${i}`} className='variant' onClick={() => onClick(data, a)}>
                {`${a.size} $${a.price}`}
              </button>
            )
          }
        </div>
      </div>

      { !!order &&
        <button onClick={() => onDelete(id)} className='delete'>
          <img src={close} className='icon' alt="close button" />
        </button>
      }

    </div>
  )
}
