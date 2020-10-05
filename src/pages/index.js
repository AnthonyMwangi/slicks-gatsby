import React from 'react'
import Banner from 'views/banner'
import Menu from 'views/menu'
import Offers from 'views/offers'
import Masters from 'views/masters'
import Instagram from 'views/instagram'
import Orders from 'views/order'
import Footer from 'views/footer'
import { SEO, Layout } from "components"
import { graphql } from "gatsby"

export default function App({ data }) {

  const menu = data.menu.edges.map(({ node }) => ({
    ...node,
    image: node?.image?.asset?.fixed?.src ?? '',
    ingredients: node.ingredients.map(a => a.name),
  }))

  const featured = data.featured.edges.map(({ node }) => ({
    ...node?.data,
    image: node?.data?.image?.asset?.fixed?.src ?? '',
    ingredients: node?.data?.ingredients?.map(a => a.name) ?? [],
  }))

  const masters = data.masters.edges.map(({ node }) => ({
    ...node,
    image: node?.image?.asset?.fixed?.src ?? '',
    signature: node?.signature?.asset?.fixed?.src ?? '',
  }))

  const offers = data.offers.edges.map(({ node }) => ({
    ...node,
    images: node?.options?.map(a => a?.ref?.image?.asset?.fixed?.src ?? '') ?? [],
    variants: [
      {
        size: 'COMBO',
        price: node?.options?.reduce((a,b) => a+b.price,0)
      }
    ],
    options: []
  }));

  const order_menu = [...menu,...offers.map(a=>({...a,image:a.images[0]}))]

  return (
    <Layout>
      <SEO title="Home" />
      <Banner data={featured}/>
      <Menu data={menu}/>
      <Offers data={offers}/>
      <Masters data={masters} />
      <Orders data={order_menu} />
      <Instagram />
      <Footer />
    </Layout>
  )
}


export const query = graphql`
{
  menu: allSanityPizza {
      edges {
      node {
        id
        name
        ingredients {
          name
        }
        image {
          asset {
            fixed {
              src
            }
          }
        }
        variants {
          size
          price
        }
      }
    }
  }
  masters: allSanityMaster(sort: {
    fields : _createdAt
    order: ASC
  }){
    edges {
      node {
        id,
        name,
        description,
        image {
          asset {
            fixed {
              src
            }
          }
        }
        signature {
          asset {
            fixed {
              src
            }
          }
        }
      }
    }
  }
  featured: allSanityFeatured {
    edges {
      node {
        name,
        data: ref{
          id,
          name,
          ingredients {
            name
          }
          image {
            asset {
              fixed {
                src
              }
            }
          }
          variants {
            size,
            price
          }
        }
      }
    }
  }
  offers: allSanityOffers {
    edges {
      node {
        id,
        name,
        color,
        description,
        options {
          size,
          price
          ref {
            image {
              asset {
                fixed {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
}

`
