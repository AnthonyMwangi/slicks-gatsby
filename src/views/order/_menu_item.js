import React from 'react'
import close from 'images/delete.svg'

export default function MenuItem({ order, data = {}, onClick = () => { }, onDelete = () => { } }) {

  const { id, name, image, variants } = data;

  const options = !!order ? [variants] : variants;

  const item_tag = !order ? 'menu' : 'order';

  return (
    <div className={`${item_tag}-item`} id={`${item_tag}-${id}`}>

      <div style={{ backgroundImage: `url(${image})` }} className="image" />

      <div className="content">
        <h1 className="name">{name}</h1>
        <div className="variants">
          {
            options.map((a, i) =>
              <Button
                key={i}
                data={a}
                id={`${data.id}-${a.size}`}
                onClick={() => onClick(data, a)}
              />
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

function Button({ id, data, onClick }) {

  const { size, price } = data;

  const on_select_option = () => {

    const btn = document.getElementById(id);

    btn.classList.add('animate');

    if (typeof (onClick) === 'function') onClick();

    return setTimeout(() => btn.classList.remove('animate'), 1000);

  }

  return (
    <button id={id} className='variant magic noselect' onClick={on_select_option}>
      <div className='text'>
        {`${size} $${price}`}
      </div>
    </button>
  )
}
