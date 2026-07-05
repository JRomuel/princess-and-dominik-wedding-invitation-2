import { useEffect, useState } from 'react'
import passportPhoto1 from '../../../assets/passport-image-1.jpeg'
import passportPhoto2 from '../../../assets/passport-image-2.jpeg'
import passportPhoto3 from '../../../assets/passport-image-3.jpeg'
import './PassportPhoto.css'

const PASSPORT_PHOTOS = [passportPhoto1, passportPhoto2, passportPhoto3]

export default function PassportPhoto() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(i => (i + 1) % PASSPORT_PHOTOS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="d-passport-photo">
      {PASSPORT_PHOTOS.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`d-passport-photo-img${i === active ? ' d-passport-photo-img--active' : ''}`}
          fetchPriority={i === 0 ? 'high' : undefined}
        />
      ))}
    </div>
  )
}
