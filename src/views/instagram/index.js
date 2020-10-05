import './_styles.scss'
import React from 'react'
import Unsplash, { toJson } from 'unsplash-js'

const unsplash = new Unsplash({

  //Unsplash Api ID: Get yours for free: https://api.unsplash.com/
  accessKey: "bO4-vuA5NfzTxCkzJoxRu8QVInRgik9tqvthcyE7rAo",

});

export default class InstaStories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {

    const { getRandomPhoto } = unsplash.photos;

    const options = { query: 'pizza restaurant', count: 5 };

    const data = await getRandomPhoto(options).then(toJson).catch(() => ([]));

    return this.setState({
      data: data.map(a => ({
        id: a.id,
        alt: a.alt_description,
        color: a.color,
        url: a.urls.regular,
        thumb: a.urls.thumb
      }))
    });

  }

  render() {
    return (
      <section id='instagram'>
        <div className="wrapper">
          {
            this.state.data.map(post =>
              <Image
                key={post.id}
                data={post}
              />
            )
          }
        </div>
      </section>
    )
  }

}

function Image({ data = {} }) {

  const { alt, url, color, thumb } = data;

  const [main_image, set_image] = React.useState(thumb);

  return (
    <div
      title={alt}
      className='insta-post'
      style={{
        backgroundColor: color,
        backgroundImage: `url(${main_image})`
      }}
    >
      <img src={url} alt={alt} className="hidden" onLoad={() => set_image(url)} />
    </div>
  )
}
