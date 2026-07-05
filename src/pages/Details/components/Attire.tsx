import type { SectionId } from '../sectionConfig'
import './Attire.css'

export default function Attire({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="attire" ref={(el) => onSectionRef('attire', el)} className="d-section d-section--alt">
      <div className="d-section-inner">
        <p className="d-eyebrow">Dress code</p>
        <h2 className="d-heading">Attire</h2>
        <p className="d-body d-body--center">
          The dress code for the wedding is <strong>Semi-Formal</strong>. We kindly ask that
          you avoid wearing white, ivory, or cream as these are reserved for the bride.
        </p>

        <div className="d-color-palette">
          <div className="d-swatch" style={{ background: '#A34720' }} title="Terracotta" />
          <div className="d-swatch" style={{ background: '#C4A882' }} title="Warm Tan" />
          <div className="d-swatch" style={{ background: '#D9CFC4' }} title="Blush" />
          <div className="d-swatch" style={{ background: '#EDE8E2', border: '1px solid rgba(163,71,32,0.2)' }} title="Cream" />
        </div>
        <p className="d-body d-body--small d-body--center">Suggested palette — feel free to mix earth tones and warm neutrals.</p>

        <div className="d-attire-grid">
          <div className="d-attire-card">
            <p className="d-card-label">Gentlemen</p>
            <p className="d-body">Barong Tagalog, suit, or dressy slacks with a collared shirt.
            Earth tones, warm neutrals, and navy are encouraged.</p>
          </div>
          <div className="d-attire-card">
            <p className="d-card-label">Ladies</p>
            <p className="d-body">Cocktail dress, midi dress, or a smart Filipiniana.
            Please avoid wearing all-white or all-black outfits.</p>
          </div>
        </div>

        <p className="d-body d-body--small d-body--center">
          The ceremony is held inside Boac Cathedral. The cocktails and reception at Luxor Resort
          are semi-outdoor — light layers are recommended for the evening breeze.
        </p>
      </div>
    </section>
  )
}
