import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import Lenis from 'lenis'
import detailsHeroBg from '../../assets/details-hero-background-22.jpeg'
import mapImage from '../../assets/map-image-2.png'
import tocPhoto from '../../assets/card-image.jpg'
import { NAV, type SectionId } from './sectionConfig'
import Nav from './components/Nav'
import TableOfContents from './components/TableOfContents'
import Hero from './components/Hero'
import Intro from './components/Intro/Intro'
import OurStory from './components/OurStory'
import Venue from './components/Venue'
import Timeline from './components/Timeline'
import Entourage from './components/Entourage'
import Attire from './components/Attire'
import Gifts from './components/Gifts'
import Travel from './components/Travel'
import Faq from './components/Faq'
import Gallery from './components/Gallery'
import Rsvp from './components/Rsvp'
import './Details.css'

export default function Details() {
  preload(detailsHeroBg, { as: 'image', fetchPriority: 'high' })
  preload(mapImage, { as: 'image', fetchPriority: 'high' })
  preload(tocPhoto, { as: 'image', fetchPriority: 'high' })

  const lenisRef = useRef<Lenis | null>(null)
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement | null>>>({})
  const [navOpen, setNavOpen] = useState(false)
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

    const checkActiveSection = () => {
      const probeY = window.scrollY + 100
      let current: SectionId = NAV[0].id
      for (const { id } of NAV) {
        const el = sectionRefs.current[id]
        if (el && el.offsetTop <= probeY) current = id
      }
      setActiveSection(current)
    }

    checkActiveSection()
    lenis.on('scroll', checkActiveSection)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', checkActiveSection)
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

  function registerSection(id: SectionId, el: HTMLElement | null) {
    sectionRefs.current[id] = el
  }

  return (
    <div className="details-page">
      <Nav
        navOpen={navOpen}
        activeSection={activeSection}
        onToggle={() => setNavOpen(open => !open)}
        onNavigate={scrollTo}
      />

      <TableOfContents onNavigate={scrollTo} />
      <Hero onSectionRef={registerSection} />
      <Intro />
      <OurStory onSectionRef={registerSection} />
      <Venue onSectionRef={registerSection} />
      <Timeline onSectionRef={registerSection} />
      <Entourage onSectionRef={registerSection} />
      <Attire onSectionRef={registerSection} />
      <Gifts onSectionRef={registerSection} />
      <Travel onSectionRef={registerSection} />
      <Faq onSectionRef={registerSection} />
      <Gallery onSectionRef={registerSection} />
      <Rsvp onSectionRef={registerSection} />
    </div>
  )
}
