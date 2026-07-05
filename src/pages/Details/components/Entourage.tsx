import type { SectionId } from '../sectionConfig'
import './Entourage.css'

export default function Entourage({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="entourage" ref={(el) => onSectionRef('entourage', el)} className="d-section">
      <div className="d-section-inner d-section-inner--wide">
        <p className="d-eyebrow">The wedding party</p>
        <h2 className="d-heading">Entourage</h2>

        <div className="d-entourage-grid">

          <div className="d-entourage-group">
            <p className="d-group-label">Parents of the Groom</p>
            <p className="d-name">Gerald Moser</p>
            <p className="d-name">Barbara Moser</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Parents of the Bride</p>
            <p className="d-name">Randolfo Largo</p>
            <p className="d-name">Agnes Largo</p>
          </div>

          <div className="d-entourage-group d-entourage-group--wide">
            <p className="d-group-label">Principal Sponsors</p>
            <p className="d-name">Maria Isabel Santillan &amp; Alian Largo</p>
            <p className="d-name">Mirabel Largo &amp; Leo Calvo</p>
            <p className="d-name">Sabine Martin &amp; Gunther Martin</p>
            <p className="d-name">Lalaine Largo &amp; Ulysis Largo</p>
          </div>

          <div className="d-entourage-group d-entourage-group--wide">
            <p className="d-group-label">Secondary Sponsors</p>
            <p className="d-name"><em>Candle</em> · Ma. Lourdes Mantala &amp; Carlo Ray Nebing</p>
            <p className="d-name"><em>Veil</em> · Cynille Largo &amp; Marc Angelo Malabayabas</p>
            <p className="d-name"><em>Cord</em> · Justyna Süß &amp; Justin Süß</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Best Man</p>
            <p className="d-name">Rico Frohlich</p>
            <p className="d-name">Matthias Moser</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Maid of Honor</p>
            <p className="d-name">Jean Rose Santos</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Groomsmen</p>
            <p className="d-name">Daryl Pilande</p>
            <p className="d-name">Justin Süß</p>
            <p className="d-name">Manuel Schafler</p>
            <p className="d-name">Nick Schittenhelm</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Bridesmaids</p>
            <p className="d-name">Sarah Jeane Largo</p>
            <p className="d-name">Justyna Süß</p>
            <p className="d-name">Ella Williams</p>
            <p className="d-name">Sheena Jessica Vidad</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Ring Bearer</p>
            <p className="d-name">Carlo Schafler</p>
            <p className="d-group-label" style={{ marginTop: '20px' }}>Bible Bearer</p>
            <p className="d-name">Yullross Achilles Largo</p>
          </div>

          <div className="d-entourage-group">
            <p className="d-group-label">Coin Bearer</p>
            <p className="d-name">Andrei Daniel Largo</p>
            <p className="d-group-label" style={{ marginTop: '20px' }}>Arrhae Bearer</p>
            <p className="d-name">Mark Joseph Largo</p>
          </div>

          <div className="d-entourage-group d-entourage-group--wide">
            <p className="d-group-label">Flower Girls</p>
            <p className="d-name">Lina Schafler</p>
            <p className="d-name">Bela Louise Mantala</p>
            <p className="d-name">Sophia Andres Largo</p>
          </div>

        </div>
      </div>
    </section>
  )
}
