import './_styles.scss'
import React from "react"
import ribbon from 'images/ribbon.svg'
import { AppLogo, Link } from "components"

export default function Banner({ data = [] }) {

  const [current_index, update_index] = React.useState(0);

  React.useEffect(() => { update_index(0) }, [data]);

  const navigate_menu = (next) => {

    let new_index = !next ? current_index - 1 : current_index + 1;

    if (new_index > data.length - 1) new_index = data.length - 1;

    if (new_index < 0) new_index = 0;

    update_index(new_index);

  }

  const { name, ingredients = [], image, variants = [] } = data[current_index] || {};

  const average_price = Math.round(variants.reduce((a, b) => a + b.price, 0) / variants.length);

  return (
    <section id='home'>

      <div className="dashboard">

        <div className="content-wrapper">

          <div className="navigation">

            <div className='flex'>

              <AppLogo />

              <div className="flex nav-links">
                <Link className='link' to='/#home' title='Hot Now' />
                <Link className='link' to='/#menu' title='Menu' />
                <Link className='link' to='/#slicemasters' title='SliceMasters' />
                <Link className='link' to='/#order' title='Order Ahead' />
              </div>

            </div>

            <div className="flex nav-contacts">
              <a href='tel: +254 719 236 860' className="contact-us">+254 719 236 860</a>
              <Link to='/#order' className="btn order-now" title='Order Online' />
            </div>

          </div>

          <div className="dashboard-wrapper">

            <div className="carousel">

              <div className="text-content">

                <div className="banner bg-image" style={{ backgroundImage: `url(${ribbon})` }}>
                  <span className="text">Best Deals</span>
                </div>

                <h1
                  className="feature-name"
                  dangerouslySetInnerHTML={{ __html: `${name}`.split(' ').join('<br/>') }}
                />

                <div className="feature-caption">{ingredients.join(', ')}</div>

                <Link to='/#menu' className="btn call-to-action" title=''>
                  <span className='btn-text'>More Deals</span>
                </Link>

              </div>

              <div className="image-content">

                <div className="image-wrapper">

                  <div className="price">
                    <div className="label">Only</div>
                    <div className="value">${average_price}</div>
                  </div>

                  <div className='hero-image' style={{ backgroundImage: `url(${image})` }} />

                  <div className="nav-buttons">

                    <button className="btn prev" onClick={() => navigate_menu(false)}>
                      <div className="icon">{'<'}</div>
                    </button>

                    <button className="btn next" onClick={() => navigate_menu(true)}>
                      <div className="icon">{'>'}</div>
                    </button>

                  </div>

                </div>

              </div>

              <div className="featured-category">
                <h1 className="index">
                  {
                    ("0" + (current_index+1)).slice(-2)
                  }
                </h1>
                <div className="label">
                  {
                    ingredients.map(a =>
                      <div key={a} className='ingredient'>{`${a}`}</div>
                    )
                  }
                </div>
              </div>

            </div>

          </div>

          <div className="pizza">
            <h1 className="text">Pizza</h1>
          </div>

        </div>

      </div>

    </section>
  )
}
