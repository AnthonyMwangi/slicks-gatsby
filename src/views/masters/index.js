import './_styles.scss'
import React from 'react'
import bg_image from 'images/banner.jpg'

export default function SliceMasters({ data = [] }) {

  const [current_master, update_masters] = React.useState({});

  React.useEffect(() => { update_masters(data[0] || {}) },[data]);

  const { name, description, image, signature } = current_master;

  return (
    <section id='slicemasters'>

      <div className="bg-image">
        <div className="img" style={{ backgroundImage: `url(${bg_image})` }} />
      </div>

      <div className="wrapper">

        <div className="image">
          <div className="img" style={{ backgroundImage: `url(${image})` }} />
        </div>

        <div className="content">

          <h4 className='section-caption'>Slice Masters</h4>

          <h1 className="section-title">{name}</h1>

          <div className="section-description">
            {description}
          </div>

          <img src={signature} alt="signature" className="signature" />

          <div className="pagination">
            {
              data.map((a, index) =>
                <Button
                  key={index}
                  index={index}
                  active={a.id===current_master.id}
                  onClick={() => update_masters(a)}
                />
              )
            }
          </div>

        </div>

      </div>

    </section>
  )
}

function Button({ active, index = 0, onClick = () => { } }) {

  const className = !!active ? 'dot active' : 'dot';

  return (
    <button className={className} onClick={onClick}>
      {`${index + 1}`}
    </button>
  )
}
