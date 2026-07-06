import { useState } from 'react'
import './ImageSlider.css'

interface ImageSliderProps {
  images: { src: string; alt: string }[]
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState(0)

  function go(next: number) {
    setIndex((next + images.length) % images.length)
  }

  return (
    <div className="d-slider">
      <div className="d-slider-viewport">
        <div className="d-slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((image, i) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="d-slider-img"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <button
          type="button"
          className="d-slider-arrow d-slider-arrow--prev"
          onClick={() => go(index - 1)}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className="d-slider-arrow d-slider-arrow--next"
          onClick={() => go(index + 1)}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="d-slider-dots">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={`d-slider-dot${i === index ? ' d-slider-dot--active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
