import React from "react"
import PropTypes from "prop-types"

import "../assets/styles/index.scss"

const Layout = ({ children }) => {
  return (
    <>
      <main className='app'>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
