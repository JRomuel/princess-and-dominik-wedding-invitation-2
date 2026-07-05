import type { SectionId } from '../sectionConfig'
import './Travel.css'

export default function Travel({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="travel" ref={(el) => onSectionRef('travel', el)} className="d-section d-section--alt">
      <div className="d-section-inner">
        <p className="d-eyebrow">Getting here</p>
        <h2 className="d-heading">Travel</h2>
        <p className="d-body d-body--center">
          Marinduque is a heart-shaped island province in the MIMAROPA region of the Philippines,
          accessible by air and sea. Plan your trip early — island accommodations fill up fast!
        </p>

        <div className="d-travel-grid">
          <div className="d-travel-item">
            <p className="d-card-label">By Air</p>
            <p className="d-body">Fly to Marinduque Airport (MRQ) via Manila (MNL). Alternatively,
            fly into Naia or Clark and take a bus or ferry via Lucena Port to Marinduque.
            Flight time from Manila is approximately 45 minutes.</p>
          </div>

          <div className="d-travel-item">
            <p className="d-card-label">By Sea</p>
            <p className="d-body">Regular ferry services operate from Lucena Port (Quezon) to
            Balanacan Port in Marinduque. Travel time is approximately 3 hours. Bangka
            (outrigger boat) services are also available from nearby provinces.</p>
          </div>

          <div className="d-travel-item">
            <p className="d-card-label">Transportation on the Island</p>
            <p className="d-body">
              Tricycles and habal-habal (motorbikes) are the main modes of transport in Boac.
              Multicabs are available for group trips. <strong>Jeep service will be provided
              between Boac Cathedral and Luxor Resort</strong> on the wedding day.
            </p>
          </div>

          <div className="d-travel-item">
            <p className="d-card-label">Recommended Hotels</p>
            <p className="d-body">
              Balar Hotel and Spa · <em>0917 882 2527</em><br />
              Hotel Zenturia · <em>0917 305 2689</em><br />
              The Boac Hotel · <em>Bed &amp; Breakfast</em><br />
              Marina Marinduque Hotel &amp; Resort · <em>0960 586 1545</em><br />
              Rezidencia Faeldo Resort &amp; Cafe · <em>0917 180 0286</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
