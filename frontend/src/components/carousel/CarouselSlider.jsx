import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const CarouselSlider = ({ children }) => {
  return (
    <Carousel
      autoPlay={true}
      axis="horizontal"
      infiniteLoop={true}
      showThumbs={false}
      swipeable={true}
    >
      {children}
    </Carousel>
  )
}

export default CarouselSlider
