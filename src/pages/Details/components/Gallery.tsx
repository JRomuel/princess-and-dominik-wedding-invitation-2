import { motion } from 'framer-motion'
import galleryImage1 from '../../../assets/gallery-image-1.png'
import galleryImage2 from '../../../assets/gallery-image-2.jpg'
import galleryImage3 from '../../../assets/gallery-image-3.jpeg'
import galleryImage4 from '../../../assets/gallery-image-4.jpeg'
import galleryImage5 from '../../../assets/gallery-image-5.jpeg'
import galleryImage6 from '../../../assets/gallery-image-6.jpeg'
import galleryImage7 from '../../../assets/gallery-image-7.jpeg'
import galleryImage8 from '../../../assets/gallery-image-8.jpg'
import galleryImage9 from '../../../assets/gallery-image-9.jpg'
import type { SectionId } from '../sectionConfig'
import './Gallery.css'

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, scale: 1.08 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

export default function Gallery({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="gallery" ref={(el) => onSectionRef('gallery', el)} className="d-section d-gallery-section">
      <div className="d-section-inner d-section-inner--wide">
        <h2 className="d-heading">Gallery</h2>

        <p className="d-gallery-tagline">Together is our favorite place to be</p>

        <div className="d-gallery-frame">
          <motion.img src={galleryImage8} alt="Princess and Dominik" className="d-gallery-photo" {...reveal()} />
        </div>

        <p className="d-gallery-tagline d-gallery-tagline--tight">Forever starts now</p>
        <p className="d-gallery-subtext">and the adventure is all ours.</p>

        <div className="d-gallery-trio">
          <div className="d-gallery-trio-item">
            <motion.img src={galleryImage2} alt="Princess and Dominik" {...reveal(0)} />
          </div>
          <div className="d-gallery-trio-item d-gallery-trio-item--mid">
            <motion.img src={galleryImage9} alt="Princess and Dominik" {...reveal(0.15)} />
          </div>
          <div className="d-gallery-trio-item">
            <motion.img src={galleryImage1} alt="Princess and Dominik" {...reveal(0.3)} />
          </div>
        </div>

        <div className="d-gallery-single">
          <motion.img src={galleryImage3} alt="Princess and Dominik" {...reveal()} />
        </div>

        <div className="d-gallery-quad">
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage6} alt="Princess and Dominik" {...reveal(0)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage7} alt="Princess and Dominik" {...reveal(0.15)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage4} alt="Princess and Dominik" {...reveal(0.3)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage5} alt="Princess and Dominik" {...reveal(0.45)} />
          </div>
        </div>
      </div>
    </section>
  )
}
