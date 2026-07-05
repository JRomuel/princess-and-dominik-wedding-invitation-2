import { NAV, type SectionId } from '../sectionConfig'
import './Nav.css'

export default function Nav({
  navOpen,
  navOverDark,
  activeSection,
  onToggle,
  onNavigate,
}: {
  navOpen: boolean
  navOverDark: boolean
  activeSection: SectionId
  onToggle: () => void
  onNavigate: (id: SectionId) => void
}) {
  return (
    <nav className="details-nav">
      <button
        className={`details-nav-toggle${navOpen ? ' details-nav-toggle--active' : navOverDark ? ' details-nav-toggle--on-dark' : ''}`}
        aria-label={navOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={navOpen}
        onClick={onToggle}
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
            onClick={() => onNavigate(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
