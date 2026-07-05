import mapImage from '../../../../assets/map-image-2.png'
import compass from '../../../../assets/pd-compass.png'
import { MapPin } from '../../shared/icons'
import './IntroMap.css'

export default function IntroMap() {
  return (
    <div className="d-intro-box">
      <p className="d-intro-text">You Are Invited</p>
      <div className="d-intro-map">
        <div className="d-intro-map-frame">
          <img
            src={mapImage}
            alt="Map showing Germany and the Philippines"
            className="d-intro-map-img"
            fetchPriority="high"
          />
          <MapPin style={{ left: '49.5%', top: '29%' }} />
          <MapPin style={{ left: '81%', top: '56%' }} />
          <img src={compass} alt="" className="d-intro-map-compass" />
        </div>
      </div>
      <p className="d-intro-footer">Princes &amp; Dominik - The Wedding</p>
    </div>
  )
}
