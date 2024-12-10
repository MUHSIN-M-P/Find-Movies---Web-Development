import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css'

function Carousel({components,typeOfCard}) {
        const [showArrows, setShowArrows] = React.useState({ left: false, right: true });
  var show = 4;
        if(typeOfCard==='people'){
          show =8;
        }else if(typeOfCard==='Recommended'){
          show =3;
        }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: show,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    afterChange: (index) => {
       
        setShowArrows({ left: index > 0, right: index < components.length - 3 });
      },
      nextArrow: showArrows.right ? <CustomNextArrow /> : null,
      prevArrow: showArrows.left ? <CustomPrevArrow /> : null,
    
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {components}
      </Slider>
    </div>
  );
}

// Custom Next Arrow (using `>` icon)
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-arrow right-arrow" onClick={onClick}>
      &gt; {/* HTML entity for right arrow */}
    </button>
  );
};

// Custom Prev Arrow (using `<` icon)
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-arrow left-arrow" onClick={onClick}>
      &lt; {/* HTML entity for left arrow */}
    </button>
  );
};
      

export default Carousel;
