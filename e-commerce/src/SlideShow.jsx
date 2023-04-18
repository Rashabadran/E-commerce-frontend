import React, { useState, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./SlideShow.css";

const Slideshow = ({ images, imageHeight, imageWidth ,transitionTime, placeholderImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = useRef(currentIndex);

  const previousSlide = () => {
    prevIndex.current = currentIndex;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    prevIndex.current = currentIndex;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const slides = images.map((image, index) => (
    <CSSTransition key={index} timeout={transitionTime * 1000} classNames="slide">
      <img src={image} alt={`Slide ${index + 1}`} height={imageHeight} width={imageWidth} />
    </CSSTransition>
  ));

  const handleTransitionEnd = () => {
    if (prevIndex.current !== currentIndex) {
      const slides = document.querySelectorAll(".slide");
      slides[prevIndex.current].classList.remove("slide-exit-active");
      slides[currentIndex].classList.add("slide-enter-active");
    }
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow-arrow slideshow-arrow-left" onClick={previousSlide}>
        &lt;
      </div>
      <div className="slideshow-arrow slideshow-arrow-right" onClick={nextSlide}>
        &gt;
      </div>
      <TransitionGroup onTransitionEnd={handleTransitionEnd}>
        {slides[currentIndex]}
      </TransitionGroup>
    </div>
  );
};

export default Slideshow;