import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import Lenis from 'lenis'
import detailsHeroBg from '../assets/details-hero-background-2.jpeg'
import mapImage from '../assets/map-image-2.png'
import compass from '../assets/pd-compass.png'
import passportPhoto1 from '../assets/passport-image-1.jpeg'
import passportPhoto2 from '../assets/passport-image-2.jpeg'
import passportPhoto3 from '../assets/passport-image-3.jpeg'
import weddingSong from '../assets/Adele+-+Make+You+Feel+My+Love+(Lyrics).mp3'
import glitterBg from '../assets/glitter.gif'
import './Details.css'

const PASSPORT_PHOTOS = [passportPhoto1, passportPhoto2, passportPhoto3]
const WEDDING_DATE = new Date('2027-01-28T14:00:00+08:00')

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE))

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="d-countdown-timer">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map(({ label, value }, i) => (
        <div className="d-countdown-unit" key={label}>
          {i > 0 && <span className="d-countdown-colon">:</span>}
          <div className="d-countdown-unit-inner">
            <span className="d-countdown-value">{pad(value)}</span>
            <span className="d-countdown-unit-label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const arrows = (n: number) => '<'.repeat(n)
const MRZ_LINE_1 = `${arrows(38)}LUXOR${arrows(14)}RESORT${arrows(41)}`
const MRZ_LINE_2 = `${arrows(36)}SEE${arrows(13)}YOU${arrows(9)}IN${arrows(7)}MARINDUQUE${arrows(29)}`

function MrzLine({ text }: { text: string }) {
  return (
    <p className="d-passport-mrz-line">
      {[...text].map((char, i) => <span key={i}>{char}</span>)}
    </p>
  )
}

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

function MapPin({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      className="d-map-pin"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="204.2 131.7 1049.9 1707.9"
      fillRule="evenodd"
    >
      <path
        d="m730.94 1839.6c-38.766-190.3-107.12-348.67-189.9-495.44-61.407-108.87-132.54-209.36-198.36-314.94-21.972-35.243-40.934-72.476-62.047-109.05-42.216-73.137-76.444-157.94-74.269-267.93 2.125-107.47 33.208-193.68 78.03-264.17 73.719-115.94 197.2-210.99 362.88-235.97 135.47-20.424 262.48 14.082 352.54 66.748 73.596 43.038 130.6 100.53 173.92 168.28 45.22 70.716 76.36 154.26 78.97 263.23 1.3401 55.83-7.7999 107.53-20.68 150.42-13.03 43.409-33.99 79.695-52.64 118.45-36.41 75.659-82.05 144.98-127.86 214.34-136.44 206.61-264.5 417.31-320.58 706.03z"
        fill="#A34720"
      />
      <circle cx="729.55" cy="651.05" r="183.33" fill="rgb(255, 255, 255)" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg
      className="d-passport-heart"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="var(--primary)"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function PassportOrnament() {
  return (
    <svg
      className="d-passport-ornament"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="330.2 194.2 931.8 1465.0"
      fill="var(--primary)"
    >
      <path d="M343.05,196.12c-12.84,75.88,4,153.43,40.46,220.59c37.07,68.28,93.47,126.37,160.34,165.86 C618.9,626.91,704.96,649.72,791.4,657c44.7,3.76,89.7,3.46,134.41-0.03c39.65-3.09,80.36-7.19,118.73-18.11 c31.27-8.89,63.79-23.35,83.85-50.04c20.66-27.47,21.84-63.16,5.14-92.86c-17.07-30.36-48.75-51.47-83.49-54.54 c-39.05-3.45-77.46,13.16-106.7,38.23c-60.08,51.52-78.38,134.76-70.66,210.64c8.66,85.05,47.65,160.86,93.91,231.34 c50.82,77.42,108.37,150.2,148.61,234.11c40.79,85.06,66.48,177.41,75.52,271.32c2.18,22.69,3.37,45.45,3.62,68.24 c0.02,1.93,3.02,1.93,3,0c-1.01-89-16.79-177.67-46.53-261.57c-14.75-41.62-32.89-82.04-54.26-120.68 c-21.27-38.45-45.94-74.86-71.01-110.89c-49.2-70.7-102.2-141.88-130.33-224.21c-24.66-72.17-32.16-155.78-0.35-227.03 c16.12-36.1,42.26-67.85,76.77-87.65c34.14-19.59,77.61-27.08,113.95-8.84c32.02,16.07,57.72,49.85,56.86,86.74 c-0.83,35.53-26.48,62.55-56.33,78.3c-31.9,16.83-67.9,23.49-103.28,28.35c-43.21,5.93-86.82,9.12-130.45,8.87 c-85.88-0.49-172.55-14.43-251.71-48.64c-72.98-31.54-137.06-80.71-184.18-144.98c-44.69-60.96-73.85-134.64-74.86-210.79 c-0.25-18.55,1.22-37.07,4.31-55.36C346.26,195.03,343.37,194.22,343.05,196.12L343.05,196.12z" />
      <path d="M1132.67,1572.57l0.12,10.67l21.96,14.2l0.07,5.96c0.02,2.01,1.67,3.62,3.68,3.6c2.01-0.02,3.62-1.67,3.6-3.68l-0.01-1.14 l7.12,4.6l0.06,5.29c0.02,2.01,1.67,3.62,3.68,3.6c2.01-0.02,3.62-1.67,3.6-3.68l-0.01-0.46l11.22,7.26l-0.68,19.79 c-0.21,6.26,4.95,20.61,11.22,20.54l0,0c6.27-0.07,11.1-14.54,10.74-20.79l-1.15-20.01l11.06-7.52l0.01,0.71 c0.02,2.01,1.67,3.62,3.68,3.6c2.01-0.02,3.62-1.67,3.6-3.68l-0.06-5.54l7.01-4.77l0.02,1.39c0.02,2.01,1.67,3.62,3.68,3.6l0,0 c2.01-0.02,3.62-1.67,3.6-3.68l-0.07-6.21l21.62-14.71l-0.12-10.67l-55.77,16.97l-2.85-49.54l19.49-13.26 c0.75-0.51,1.2-1.37,1.19-2.28c-0.02-1.81-1.78-3.1-3.51-2.57l-22.67,6.9c-0.43,0.13-0.83,0.3-1.21,0.51 c-0.38-0.2-0.79-0.36-1.22-0.48l-22.82-6.37c-1.75-0.49-3.47,0.84-3.45,2.65c0.01,0.91,0.48,1.76,1.24,2.25l19.9,12.87 c0.09,0.06,0.18,0.11,0.27,0.16l-1.69,49.6L1132.67,1572.57z" />
    </svg>
  )
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(p => !p)
  }

  return (
    <div className="d-music-player">
      <audio ref={audioRef} src={weddingSong} loop />
      <button
        type="button"
        className={`d-music-disc${playing ? ' d-music-disc--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <svg className="d-music-label-arc" viewBox="0 0 100 100">
          <path id="d-music-arc-path" d="M22,54 A28,28 0 1 1 78,54" fill="none" />
          <text className="d-music-label-text">
            <textPath
              href="#d-music-arc-path"
              startOffset="50%"
              textAnchor="middle"
              textLength="80"
              lengthAdjust="spacingAndGlyphs"
            >
              Click to play music
            </textPath>
          </text>
        </svg>
        <span className="d-music-icon-wrap">
          {playing ? (
            <svg className="d-music-icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg className="d-music-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}

function PassportPhoto() {
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

export default function Details() {
  preload(detailsHeroBg, { as: 'image', fetchPriority: 'high' })
  preload(mapImage, { as: 'image', fetchPriority: 'high' })

  const lenisRef = useRef<Lenis | null>(null)
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({})
  const [navOpen, setNavOpen] = useState(false)
  const [navOverDark, setNavOverDark] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('home')

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

    const checkActiveSection = () => {
      const probeY = window.scrollY + 100
      let current: SectionId = NAV[0].id
      for (const { id } of NAV) {
        const el = sectionRefs.current[id]
        if (el && el.offsetTop <= probeY) current = id
      }
      setActiveSection(current)
    }

    const handleScroll = () => {
      checkBackground()
      checkActiveSection()
    }

    handleScroll()
    lenis.on('scroll', handleScroll)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', handleScroll)
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
            <button
              key={id}
              className={`details-nav-btn${activeSection === id ? ' details-nav-btn--active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Intro ── */}
      <section
        className="d-section-intro"
      >
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

        <div className="d-intro-box d-passport-box">
          <MusicPlayer />

          <div className="d-passport-header">
            <div className="d-passport-title-row">
              <h2 className="d-passport-title">Save the Date</h2>
              <HeartIcon />
              <p className="d-passport-date">01.28.2027</p>
            </div>
          </div>

          <div className="d-passport-body">
            <PassportPhoto />
            <div className="d-passport-info">
              <div className="d-passport-info-left">
                <div className="d-passport-field">
                  <p className="d-passport-group-label">Passport Type</p>
                  <p className="d-passport-group-value">Wedding</p>
                </div>
                <div className="d-passport-field">
                  <p className="d-passport-group-label">Code</p>
                  <p className="d-passport-group-value">MDQ</p>
                </div>
                <div className="d-passport-field">
                  <p className="d-passport-group-label">Passport No.</p>
                  <p className="d-passport-group-value">28JAN2027</p>
                </div>
              </div>
              <div className="d-passport-info-right">
                <div className="d-passport-group">
                  <p className="d-passport-group-label">The Bride</p>
                  <p className="d-passport-group-value">Princes Dianne Moser</p>
                </div>
                <div className="d-passport-group">
                  <p className="d-passport-group-label">The Groom</p>
                  <p className="d-passport-group-value">Dominik Moser</p>
                </div>
                <div className="d-passport-group">
                  <p className="d-passport-group-label">Date</p>
                  <p className="d-passport-group-value">January 28, 2027</p>
                </div>
                <div className="d-passport-group">
                  <p className="d-passport-group-label">Ceremony</p>
                  <p className="d-passport-group-value">Boac Cathedral</p>
                </div>
          
                <div className="d-passport-group">
                  <p className="d-passport-group-label">Reception</p>
                  <p className="d-passport-group-value">Luxor Resort Marinduque ✈</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-passport-mrz">
            <MrzLine text={MRZ_LINE_1} />
            <MrzLine text={MRZ_LINE_2} />
          </div>
        </div>

        <div className="d-passport-ornament-wrap">
          <PassportOrnament />
        </div>

        <div className="d-welcome-box">
          <h2 className="d-heading">Welcome Aboard</h2>
          <p className="d-body d-body--center">
            Something borrowed, something blue, our Loved as old as Time as our vows we say. The earth and skies as witnesses, on our wedding day.
          </p>
        </div>

        <div className="d-save-date-box" style={{ backgroundImage: `url(${glitterBg})` }}>
          <p className="d-save-date-title">Save the Date</p>
          <p className="d-passport-date">Thu 28th January</p>
          <p className="d-passport-date">01.28.2027 | 2 PM</p>
        </div>

        <div className="d-welcome-box">
          <p className="d-body d-body--center">
            Kindly join Princess and Dominik as they continue their life journey together.
            <br />
            Black tie event.
            <br />
            <br />
            Ceremony at Boac Cathedral
            <br />
            Reception to follow.
            <br />
            <br />
            Please respond before 10th September. <br /> We can't wait to celebrate with you!
          </p>
          <button type="button" className="d-rsvp-cta" onClick={() => scrollTo('rsvp')}>
            RSVP
          </button>
        </div>

        <div className="d-countdown-box">
          <p className="d-countdown-label">Counting down the days until <br /> our greatest adventure</p>
          <Countdown />
        </div>
      </section>

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
