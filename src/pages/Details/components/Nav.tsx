import { createPortal } from 'react-dom'
import { NAV, type SectionId } from '../sectionConfig'
import './Nav.css'

export default function Nav({
  navOpen,
  activeSection,
  onToggle,
  onNavigate,
}: {
  navOpen: boolean
  activeSection: SectionId
  onToggle: () => void
  onNavigate: (id: SectionId) => void
}) {
  return (
    <nav className="details-nav">
      {createPortal(
        <button
          className={`details-nav-toggle${navOpen ? ' details-nav-toggle--active' : ''}`}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={navOpen}
          onClick={onToggle}
        >
          <span />
          <span />
          <span />
        </button>,
        document.body,
      )}
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
