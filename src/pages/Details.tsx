import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import detailsHeroBg from '../assets/details-hero-background.jpeg'
import './Details.css'

type SectionId =
  | 'home'
  | 'our-story'
  | 'venue'
  | 'entourage'
  | 'attire'
  | 'gifts'
  | 'travel'
  | 'faq'
  | 'gallery'
  | 'rsvp'

const NAV: { label: string; id: SectionId }[] = [
  { label: 'Home',      id: 'home'      },
  { label: 'Our Story', id: 'our-story' },
  { label: 'Venue',     id: 'venue'     },
  { label: 'Entourage', id: 'entourage' },
  { label: 'Attire',    id: 'attire'    },
  { label: 'Gifts',     id: 'gifts'     },
  { label: 'Travel',    id: 'travel'    },
  { label: 'FAQ',       id: 'faq'       },
  { label: 'Gallery',   id: 'gallery'   },
  { label: 'RSVP',      id: 'rsvp'      },
]

export default function Details() {
  const lenisRef = useRef<Lenis | null>(null)
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({})
  const [navOpen, setNavOpen] = useState(false)
  const [navOverDark, setNavOverDark] = useState(true)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis
    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const checkBackground = () => {
      const probeY = window.scrollY + 32
      const isWithin = (el: HTMLElement | null | undefined) =>
        !!el && probeY >= el.offsetTop && probeY < el.offsetTop + el.offsetHeight
      setNavOverDark(isWithin(sectionRefs.current.home) || isWithin(sectionRefs.current.rsvp))
    }
    checkBackground()
    lenis.on('scroll', checkBackground)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', checkBackground)
      lenis.destroy()
    }
  }, [])

  function scrollTo(id: SectionId) {
    const el = sectionRefs.current[id]
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -64 })
    }
    setNavOpen(false)
  }

  function ref(id: SectionId) {
    return (el: HTMLElement | null) => { sectionRefs.current[id] = el }
  }

  return (
    <div className="details-page">

      {/* ── Sticky Nav ── */}
      <nav className="details-nav">
        <button
          className={`details-nav-toggle${navOpen ? ' details-nav-toggle--active' : navOverDark ? ' details-nav-toggle--on-dark' : ''}`}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen}
          onClick={() => setNavOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`details-nav-inner${navOpen ? ' details-nav-inner--open' : ''}`}>
          {NAV.map(({ label, id }) => (
            <button key={id} className="details-nav-btn" onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Home ── */}
      <section
        id="home"
        ref={ref('home')}
        className="d-section d-section--hero"
        style={{ backgroundImage: `linear-gradient(rgba(163, 71, 32, 0.28), rgba(163, 71, 32, 0.28)), url(${detailsHeroBg})` }}
      >
        <div className="d-hero-content">
          <h1 className="d-display">
            <span className="d-display-line d-display-line--left">Princes</span>
            <span className="d-display-line d-display-line--center d-display-line--and">and</span>
            <span className="d-display-line d-display-line--right">Dominik</span>
          </h1>
        </div>
        <div className="d-hero-footer">
          <p className="d-sub">
            <span className="d-sub-line d-sub-line--upper">Boac Cathedral</span><br />
            <span className="d-sub-line d-sub-line--italic">Marinduque, Philippines</span>
          </p>
          <p className="d-date">01.28.2027</p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section id="our-story" ref={ref('our-story')} className="d-section">
        <div className="d-section-inner">
          <p className="d-eyebrow">How it began</p>
          <h2 className="d-heading">Our Story</h2>
          <div className="d-divider" />
          <p className="d-body">
            From a chance meeting to a love that feels like home — that's the simplest way to
            describe the journey of Princes and Dominik. What started as an unexpected encounter
            quickly grew into something neither of them could have planned, a connection built on
            laughter, shared adventures, and an unspoken understanding that they were meant to
            find each other.
          </p>
          <p className="d-body">
            Through every season and every mile between them, their love only deepened. Dominik's
            quiet steadiness and Princes' warmth created a partnership that felt effortless and
            extraordinary all at once. Together they discovered that home isn't a place — it's a
            person.
          </p>
          <p className="d-body">
            And now, surrounded by the people they love most, in the heart of Marinduque where
            the sea meets the shore, they are ready to say "forever." We can't wait to see you
            there.
          </p>
          <p className="d-hashtag">#PRINCESandDOMINIK</p>
        </div>
      </section>

      {/* ── Venue ── */}
      <section id="venue" ref={ref('venue')} className="d-section d-section--alt">
        <div className="d-section-inner">
          <p className="d-eyebrow">Wedding Day · January 28, 2027</p>
          <h2 className="d-heading">Venue</h2>
          <div className="d-divider" />

          <div className="d-timeline">
            <div className="d-timeline-item">
              <div className="d-timeline-time">2:00 PM</div>
              <div className="d-timeline-dot" />
              <div className="d-timeline-content">
                <p className="d-card-label">Ceremony</p>
                <p className="d-card-title">Boac Cathedral</p>
                <p className="d-body">Boac, Marinduque, Philippines</p>
              </div>
            </div>

            <div className="d-timeline-item">
              <div className="d-timeline-time">4:30 PM</div>
              <div className="d-timeline-dot" />
              <div className="d-timeline-content">
                <p className="d-card-label">Cocktails</p>
                <p className="d-card-title">Luxor Resort</p>
                <p className="d-body">Marinduque, Philippines</p>
              </div>
            </div>

            <div className="d-timeline-item">
              <div className="d-timeline-time">6:00 PM</div>
              <div className="d-timeline-dot" />
              <div className="d-timeline-content">
                <p className="d-card-label">Reception</p>
                <p className="d-card-title">Luxor Resort</p>
                <p className="d-body">Marinduque, Philippines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Entourage ── */}
      <section id="entourage" ref={ref('entourage')} className="d-section">
        <div className="d-section-inner d-section-inner--wide">
          <p className="d-eyebrow">The wedding party</p>
          <h2 className="d-heading">Entourage</h2>
          <div className="d-divider" />

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

      {/* ── Attire ── */}
      <section id="attire" ref={ref('attire')} className="d-section d-section--alt">
        <div className="d-section-inner">
          <p className="d-eyebrow">Dress code</p>
          <h2 className="d-heading">Attire</h2>
          <div className="d-divider" />
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

      {/* ── Gifts ── */}
      <section id="gifts" ref={ref('gifts')} className="d-section">
        <div className="d-section-inner">
          <p className="d-eyebrow">Celebrate with us</p>
          <h2 className="d-heading">Gifts</h2>
          <div className="d-divider" />
          <p className="d-body d-body--center">
            Your presence at our wedding is the greatest gift of all. However, if you wish to
            give a gift, we would be grateful for a monetary contribution to help us build our
            new life together.
          </p>

          <div className="d-cards">
            <div className="d-card">
              <p className="d-card-label">Bank Transfer</p>
              <p className="d-card-title">BDO Savings Account</p>
              <p className="d-body">Account Name: Princes D. Largo<br />Account No.: TBA</p>
            </div>
            <div className="d-card">
              <p className="d-card-label">E-Wallet</p>
              <p className="d-card-title">GCash / Maya</p>
              <p className="d-body">Details to be shared with guests<br />closer to the wedding date.</p>
            </div>
          </div>

          <p className="d-body d-body--small d-body--center">
            A wishing well will be available at the reception. No boxed gifts, please —
            we are building a new home together!
          </p>
        </div>
      </section>

      {/* ── Travel ── */}
      <section id="travel" ref={ref('travel')} className="d-section d-section--alt">
        <div className="d-section-inner">
          <p className="d-eyebrow">Getting here</p>
          <h2 className="d-heading">Travel</h2>
          <div className="d-divider" />
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

      {/* ── FAQ ── */}
      <section id="faq" ref={ref('faq')} className="d-section">
        <div className="d-section-inner">
          <p className="d-eyebrow">Questions &amp; answers</p>
          <h2 className="d-heading">FAQ</h2>
          <div className="d-divider" />

          <div className="d-faq-list">
            {[
              {
                q: 'When is the RSVP deadline?',
                a: 'Kindly reply by December 1, 2026 so we can finalize our arrangements with the caterer and venue. Please RSVP as early as possible.',
              },
              {
                q: 'What time should I arrive for the ceremony?',
                a: 'The ceremony begins at 2:00 PM at Boac Cathedral. We ask that guests be seated by 1:45 PM. Please allow extra time for travel from your accommodation.',
              },
              {
                q: 'Is there transportation between the ceremony and reception?',
                a: 'Yes! Jeep service will be provided between Boac Cathedral and Luxor Resort. Details will be shared closer to the date.',
              },
              {
                q: 'Can I take photos during the ceremony?',
                a: 'We will have a professional team capturing every moment. We kindly request an unplugged ceremony — please silence your phones and be fully present. You\'re very welcome to take photos during the reception and cocktail hour.',
              },
              {
                q: 'Are children welcome?',
                a: 'We love your little ones! However, as our venue has limited space, we are keeping our guest list intimate. If your invitation says "and family," children are welcome. We appreciate your understanding.',
              },
              {
                q: 'What should I know about traveling to Marinduque?',
                a: 'Book your flights and accommodations early — Marinduque is a small island and availability is limited. We recommend arriving January 27 to have a stress-free day before the wedding.',
              },
              {
                q: 'What if I have dietary restrictions?',
                a: 'Please indicate any dietary restrictions when you submit your RSVP. We will do our best to accommodate your needs at the reception.',
              },
              {
                q: 'Where can I find more details?',
                a: 'Visit our wedding website at www.princesanddominik.com for the latest updates, RSVP, and any additional information.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="d-faq-item">
                <p className="d-faq-q">{q}</p>
                <p className="d-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" ref={ref('gallery')} className="d-section d-section--alt">
        <div className="d-section-inner d-section-inner--wide">
          <p className="d-eyebrow">Our moments</p>
          <h2 className="d-heading">Gallery</h2>
          <div className="d-divider" />
          <p className="d-body d-body--center">
            Photos from our journey together. More memories to be added as we count down to
            January 28, 2027.
          </p>

          <div className="d-gallery-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="d-gallery-item">
                <div className="d-gallery-placeholder">
                  <span>Photo {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp" ref={ref('rsvp')} className="d-section d-section--rsvp">
        <div className="d-section-inner">
          <p className="d-eyebrow d-eyebrow--light">Kindly reply by December 1, 2026</p>
          <h2 className="d-heading d-heading--light">RSVP</h2>
          <div className="d-divider d-divider--light" />
          <p className="d-body d-body--light d-body--center">
            We would be honored by your presence at our wedding in Marinduque.
            Please let us know if you will be joining us so we can finalize our arrangements.
          </p>

          <form className="d-rsvp-form" onSubmit={e => e.preventDefault()}>
            <div className="d-field">
              <label className="d-label" htmlFor="rsvp-name">Full Name</label>
              <input id="rsvp-name" className="d-input" type="text" placeholder="Your full name" />
            </div>
            <div className="d-field">
              <label className="d-label" htmlFor="rsvp-email">Email Address</label>
              <input id="rsvp-email" className="d-input" type="email" placeholder="your@email.com" />
            </div>
            <div className="d-field">
              <label className="d-label" htmlFor="rsvp-guests">Number of Guests</label>
              <input id="rsvp-guests" className="d-input" type="number" min="1" max="5" placeholder="1" />
            </div>
            <div className="d-field">
              <label className="d-label" htmlFor="rsvp-dietary">Dietary Restrictions</label>
              <input id="rsvp-dietary" className="d-input" type="text" placeholder="e.g. vegetarian, halal, none" />
            </div>
            <div className="d-field">
              <label className="d-label">Will you be attending?</label>
              <div className="d-radio-group">
                <label className="d-radio">
                  <input type="radio" name="attending" defaultValue="yes" defaultChecked />
                  Joyfully accepts
                </label>
                <label className="d-radio">
                  <input type="radio" name="attending" defaultValue="no" />
                  Regretfully declines
                </label>
              </div>
            </div>
            <button type="submit" className="d-submit">Send RSVP</button>
          </form>

          <p className="d-body d-body--small d-body--light d-body--center" style={{ marginTop: '32px' }}>
            For more details visit <strong>www.princesanddominik.com</strong>
          </p>
        </div>
      </section>

    </div>
  )
}
