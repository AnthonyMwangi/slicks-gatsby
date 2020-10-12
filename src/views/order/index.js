import './_styles.scss'
import React from 'react'
import crypto from 'crypto'
import MenuItem from './_menu_item'
import CheckoutSummary from './_summary'
import { scrollToSection } from 'components'

export default function Order({ data = [], filter = '' }) {

  const [errors, update_error] = React.useState(null);

  const [form_submitted, update_form_state] = React.useState(null);

  const [menu_filter, update_filter] = React.useState(null);

  const [orders, update_orders] = React.useState([]);

  const [menu, update_menu] = React.useState([]);

  React.useEffect(() => {

    update_menu(data);

    update_menu_filter(filter);

  }, [data, filter]);

  const add_to_cart = (item, variants) => {

    if (!!errors) update_error(null);

    const { id, image, name } = item;

    const order_id = `${id}-${orders.length + 1}`;

    const new_order = { id: order_id, name, image, variants };

    return update_orders([...orders, new_order]);

  }

  const remove_from_cart = (id) => {

    if (!!errors) update_error(null);

    const new_order = orders.filter(a => a.id !== id);

    return update_orders(new_order);

  }

  const update_menu_filter = (id) => {

    if (!!errors) update_error(null);

    document.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.remove('active');
    });

    if (!id || id === '' || id === menu_filter) return null;

    const menu_item = document.getElementById(`menu-${id}`);

    menu_item.classList.add('active');

    menu_item.scrollIntoView();

    return update_filter(id);

  }

  const on_submit_order = (e) => {

    e.preventDefault();

    if (!!errors) update_error(null);

    const menu_items = orders.map(({ id, name, variants }) => ({
      id, name,
      size: variants.size,
      price: variants.price
    }));

    if (menu_items.length===0) return update_error(`You can't order Nothing!`);

    const name = document.getElementById('checkout-name')?.value ?? null;

    if (!name || name==='') return update_error('Enter Your Name');

    const email = document.getElementById('checkout-email')?.value ?? null;

    if (!email || email==='') return update_error('Enter Your Email');

    const order_id = crypto.randomBytes(16).toString('base64').slice(0, 16);

    scrollToSection('/#order',null);

    return update_form_state({ order_id, name, email, menu_items });

  }

  const clear_current_order = () => {

    update_orders([]);

    update_menu_filter(null);

    return update_form_state(null);

  }

  return (
    <section id='order'>
      <div className="wrapper">

        <div className="section-heading">
          <h4 className='section-caption'>Order Now</h4>
          <h1 className="section-title">Place Your Order</h1>
        </div>

        <div className={`order-box ${!!form_submitted ? 'sm' : 'wd' }`}>

          {
            !form_submitted && <div className="bg">

              <div className="heading">Menu</div>

              <div className="column menu" id='menu-column'>
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

              <div className="heading">Your Order</div>

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

              <div className="heading wd">
                <span>Checkout</span>
                { !!errors && <span className='errors'>: {errors}</span> }
              </div>

              <form className="column checkout" onSubmit={on_submit_order} autoComplete='off'>

                <input id='checkout-name' type="text" placeholder='Enter Your Name' />

                <input id='checkout-email' type="email" placeholder='Enter Email Address'/>

                <div className="sub-total">
                  {`Total: $${orders.reduce((a, b) => a + b.variants.price, 0)}`}
                </div>

                <button className="btn">
                  Order Ahead
                </button>

              </form>

            </div>
          }

          <CheckoutSummary
            data={form_submitted}
            onClose={clear_current_order}
          />

        </div>

      </div>
    </section>
  )
}
