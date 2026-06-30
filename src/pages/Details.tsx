import './Details.css'

export default function Details() {
  return (
    <div className="details-page">
      <header className="details-header">
        <p className="details-eyebrow">You are invited</p>
        <h1 className="details-title">Princess &amp; Dominik</h1>
        <p className="details-date">December 7, 2025</p>
      </header>

      <section className="details-section">
        <h2>Ceremony</h2>
        <p>Sacred Heart Cathedral</p>
        <p>Cagayan de Oro City, Philippines</p>
        <p>4:00 PM</p>
      </section>

      <section className="details-section">
        <h2>Reception</h2>
        <p>Venue name to be announced</p>
        <p>Details coming soon.</p>
      </section>

      <section className="details-section">
        <h2>RSVP</h2>
        <p>Kindly reply by November 1, 2025.</p>
        <p>More details coming soon.</p>
      </section>
    </div>
  )
}
