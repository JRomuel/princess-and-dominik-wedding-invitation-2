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
import { reveal } from '../shared/reveal'
import './Gallery.css'

const galleryReveal = (delay = 0) => reveal({ scale: 1.08, delay })

export default function Gallery({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="gallery" ref={(el) => onSectionRef('gallery', el)} className="d-section d-section--dark d-gallery-section">
      <div className="d-section-inner d-section-inner--wide">
        <h2 className="d-heading">Gallery</h2>

        <p className="d-gallery-tagline">Together is our favorite place to be</p>

        <div className="d-gallery-frame">
          <motion.img src={galleryImage8} alt="Princes and Dominik" className="d-gallery-photo" {...galleryReveal()} />
        </div>

        <p className="d-gallery-tagline d-gallery-tagline--tight">Forever starts now</p>
        <p className="d-gallery-subtext">and the adventure is all ours.</p>

        <div className="d-gallery-trio">
          <div className="d-gallery-trio-item">
            <motion.img src={galleryImage2} alt="Princes and Dominik" {...galleryReveal(0)} />
          </div>
          <div className="d-gallery-trio-item d-gallery-trio-item--mid">
            <motion.img src={galleryImage9} alt="Princes and Dominik" {...galleryReveal(0.15)} />
          </div>
          <div className="d-gallery-trio-item">
            <motion.img src={galleryImage1} alt="Princes and Dominik" {...galleryReveal(0.3)} />
          </div>
        </div>

        <div className="d-gallery-single">
          <motion.img src={galleryImage3} alt="Princes and Dominik" {...galleryReveal()} />
        </div>

        <div className="d-gallery-quad">
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage6} alt="Princes and Dominik" {...galleryReveal(0)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage7} alt="Princes and Dominik" {...galleryReveal(0.15)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage4} alt="Princes and Dominik" {...galleryReveal(0.3)} />
          </div>
          <div className="d-gallery-quad-item">
            <motion.img src={galleryImage5} alt="Princes and Dominik" {...galleryReveal(0.45)} />
          </div>
        </div>

        <p className="d-gallery-subtext" style={{ marginTop: '48px' }}>
          The best things in life are the people we love, the places we've
          been, and the memories we've made along the way.
        </p>

        <svg
          className="d-gallery-closing-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid meet"
          viewBox="-0.0 -0.5 468.3 235.8"
          style={{ fill: 'rgb(255, 255, 255)' }}
        >
          <g fillRule="evenodd">
            <path d="m537.14 475.22c0.37512 0.50015-7.6392 7.2559-22.677 19.154s-37.099 28.938-64.765 50.011-60.938 46.178-98.338 74.211-78.93 58.992-123.06 91.777l-3e-5 2e-5c-16.502-16.86-33.415-34.163-50.624-51.782l-28.94-29.636 4e-5 -1e-5c54.152-22.166 105.46-43.106 151.97-61.942s88.208-35.568 123.16-49.395 63.152-24.748 82.671-32.042 30.358-10.962 30.601-10.356-10.13 5.423-29.179 13.556-46.773 19.582-81.247 33.526-75.7 30.383-121.77 48.576-96.977 38.142-150.84 59.179l-3e-5 2e-5c8.9661 8.7347 18.035 17.57 27.193 26.496 16.159 15.75 32.026 31.226 47.528 46.371l3e-5 -2e-5c43.203-32.712 83.909-63.429 120.74-91.07s69.786-52.206 97.43-72.616 49.978-36.666 65.507-47.693 24.254-16.826 24.629-16.326z" transform="translate(-69.23 -475.12)" style={{ fill: 'inherit' }} />
            <path d="m535.71 475.22c0.16084 0.61674-10.972 4.1483-31.467 10.031s-50.351 14.117-87.593 24.153-81.87 21.875-131.86 34.983-105.34 27.486-163.98 42.617l-3e-5 1e-5c-12.447-16.835-25.125-34.012-37.983-51.44l-13.601-18.437c128.05-12.179 243.51-22.996 327.46-30.545s136.39-11.831 139.02-11.412l5e-3 0.0509 5e-3 0.0509c-2.5134 0.89431-54.727 6.2729-137.89 14.149s-197.28 18.25-324.2 29.608l13.151 15.85c12.429 14.981 24.674 29.748 36.695 44.273l4e-5 -1e-5c57.873-15.256 112.48-29.553 161.88-42.366s93.602-24.14 130.62-33.472 66.865-16.667 87.504-21.512 32.074-7.1986 32.235-6.5818z" transform="translate(-69.23 -475.12)" style={{ fill: 'inherit' }} />
            <path d="m124.29 580.93c0.66648 0.1786 0.59133 2.9759-0.21125 7.8272s-2.3334 11.756-4.504 20.191-4.9808 18.399-8.2615 29.416-7.031 23.085-11.007 35.768l-4.7166 15.034h5e-6c7.2936-8.7132 14.184-16.865 20.507-24.131s12.079-13.645 17.035-18.852 9.1094-9.2416 12.155-11.859 4.9812-3.8174 5.4333-3.3925-0.62749 2.4334-3.0925 5.6798-6.3162 7.7302-11.341 13.143-11.222 11.753-18.307 18.755-15.057 14.664-23.559 22.759l-5e-6 1e-5c1.1424-5.0927 2.3125-10.328 3.5107-15.668 2.9712-13.243 5.8412-25.879 8.5829-37.337s5.3561-21.736 7.7417-30.303 4.5424-15.424 6.2885-20.084 3.0806-7.1226 3.7471-6.944z" transform="translate(-69.23 -475.12)" style={{ fill: 'inherit' }} />
            <path d="m94.843 690.68c-0.59913-0.93389 17.858-9.5921 41.2-19.326s42.771-16.877 43.37-15.943-17.858 9.5921-41.2 19.326-42.771 16.877-43.37 15.943z" transform="translate(-69.23 -475.12)" style={{ fill: 'inherit' }} />
          </g>
        </svg>

        <p className="d-gallery-subtext d-gallery-closing">
          Your presence means the world to us. We can't wait to celebrate this new chapter with the people we
          love most, surrounded by the beauty of Marinduque. See you there!
        </p>
        <p className="d-gallery-closing-signature">With love, Princes &amp; Dominik</p>
      </div>
    </section>
  )
}
