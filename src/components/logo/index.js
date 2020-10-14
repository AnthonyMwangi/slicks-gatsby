import './_styles.scss'
import React from "react"

export default function Applogo({ menuState = '' }) {
  return (
    <a href="/" className={`app-logo menu-${menuState}`} >
      <div className="wrapper">
        <div className="est">EST 1994</div>
        <div className="slicks">slick's</div>
        <div className="slices">slices</div>
      </div>
    </a>
  )
}
