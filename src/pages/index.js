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

  const masters = data.masters.edges.map(({ node }) => ({
    ...node,
    image: node?.image?.asset?.fixed?.src ?? '',
    signature: node?.signature?.asset?.fixed?.src ?? '',
  }))

  return (
    <Layout>
      <SEO title="Home" />
      <Banner data={menu}/>
      <Menu data={menu}/>
      <Offers />
      <Masters data={masters} />
      <Orders data={menu} />
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
}

`
