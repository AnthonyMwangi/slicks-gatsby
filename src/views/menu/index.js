import './_styles.scss'
import React from 'react'

export default function Menu( { data = [] }) {

  const [active_ingredient, set_active] = React.useState('All');

  const [filtered_data, update_filter] = React.useState([]);

  const ingredients = ['All',...new Set(data.map(a => a.ingredients).flat())];

  const category_count = (value) => {

    if (!value) return 0;

    if (value === 'All') return data.length;

    return data.filter(a => a.ingredients.includes(value)).length;

  }

  const filter_menu_items = (ingredient = 'All') => {

    set_active(ingredient);

    const new_filter = data.filter(a => a.ingredients.includes(ingredient));

    return update_filter(ingredient==='All' ? data : new_filter);

  }

  const average_price = (menu_item) => {

    const { variants = [] } = menu_item;

    return Math.round(variants.reduce((a,b) => a+b.price,0)/variants.length);

  }

  React.useEffect(() => {

    update_filter(data);

  },[data]);

  return (
    <section id='menu'>
      <div className="menu-wrapper">

        <div className="section-heading">
          <h4 className='section-caption'>Natural Ingredients</h4>
          <h1 className="section-title">Pizza Menu</h1>
        </div>

        <div className="menu-grid">

          <div className="ingredients">
            {
              ingredients.map(item =>
                <Ingredient
                  key={item}
                  name={item}
                  active={item===active_ingredient}
                  count={category_count(item)}
                  onClick={filter_menu_items}
                />
              )
            }
          </div>

          <div className="pizza-grid">

            {
              filtered_data.map(a =>
                <div key={a.id} className='pizza'>
                  <img src={a.image} alt={a.name} className="image" />
                  <h1 className="name">{a.name}</h1>
                  <div className="caption">{a.ingredients.join(', ')}</div>
                  <div className="footer">
                    <div className="price" title='Average Price'>${average_price(a)}</div>
                    <div className="btn order">
                      <div className="btn-text">Order Now</div>
                    </div>
                  </div>
                </div>
              )
            }

          </div>

        </div>

      </div>

    </section>
  )
}

function Ingredient({ active, name = 'Broken Ingredient', count = 0, onClick = () => { } }) {
  return (
    <button className={`ingredient ${!!active ? 'active' : ''}`} onClick={() => onClick(name)}>
      <span className="name">{name}</span>
      <span className="count">{count}</span>
    </button>
  )
}
