import { useState, type SubmitEvent } from 'react'
import type { SectionId } from '../sectionConfig'
import BoardingPass from '../shared/BoardingPass'
import './Rsvp.css'

// Web App URL from the deployed Google Apps Script — set in .env (see setup notes).
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT

const CATEGORIES = [
  "Groom's Relatives",
  "Bride's Relatives",
  "Groom's Friends",
  "Bride's Friends",
  'Principal Sponsors',
  "Groom's Immediate Family",
  "Bride's Immediate Family",
] as const

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Rsvp({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmation, setConfirmation] = useState<'Attending' | 'Not Attending'>('Attending')
  const [ageGroup, setAgeGroup] = useState<'Adult' | 'Kid'>('Adult')
  const [guestOf, setGuestOf] = useState<"Groom's Guest" | "Bride's Guest">("Groom's Guest")
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [status, setStatus] = useState<Status>('idle')
  const [submittedAttending, setSubmittedAttending] = useState(true)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    const isAttending = confirmation === 'Attending'

    try {
      await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ firstName, lastName, email, confirmation, ageGroup, guestOf, category }),
      })
      setStatus('success')
      setSubmittedAttending(isAttending)
      setFirstName('')
      setLastName('')
      setEmail('')
      setConfirmation('Attending')
      setAgeGroup('Adult')
      setGuestOf("Groom's Guest")
      setCategory(CATEGORIES[0])
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" ref={(el) => onSectionRef('rsvp', el)} className="d-section d-section--rsvp">
      <div className="d-section-inner">
        <h2 className="d-heading">HOPE YOU CAN MAKE IT</h2>

        <form className="d-rsvp-form" onSubmit={handleSubmit}>
          <div className="d-field-row">
            <div className="d-field">
              <label className="d-label" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                className="d-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="d-field">
              <label className="d-label" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                className="d-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-field">
            <label className="d-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              className="d-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="d-field">
            <span className="d-label">Confirmation</span>
            <div className="d-radio-group">
              <label className="d-radio">
                <input
                  type="radio"
                  name="confirmation"
                  checked={confirmation === 'Attending'}
                  onChange={() => setConfirmation('Attending')}
                />
                Attending
              </label>
              <label className="d-radio">
                <input
                  type="radio"
                  name="confirmation"
                  checked={confirmation === 'Not Attending'}
                  onChange={() => setConfirmation('Not Attending')}
                />
                Not Attending
              </label>
            </div>
          </div>

          <div className="d-field">
            <span className="d-label">Adult / Kid</span>
            <div className="d-radio-group">
              <label className="d-radio">
                <input
                  type="radio"
                  name="ageGroup"
                  checked={ageGroup === 'Adult'}
                  onChange={() => setAgeGroup('Adult')}
                />
                Adult
              </label>
              <label className="d-radio">
                <input
                  type="radio"
                  name="ageGroup"
                  checked={ageGroup === 'Kid'}
                  onChange={() => setAgeGroup('Kid')}
                />
                Kid
              </label>
            </div>
          </div>

          <div className="d-field">
            <span className="d-label">Groom or Bride's Guest</span>
            <div className="d-radio-group">
              <label className="d-radio">
                <input
                  type="radio"
                  name="guestOf"
                  checked={guestOf === "Groom's Guest"}
                  onChange={() => setGuestOf("Groom's Guest")}
                />
                Groom's Guest
              </label>
              <label className="d-radio">
                <input
                  type="radio"
                  name="guestOf"
                  checked={guestOf === "Bride's Guest"}
                  onChange={() => setGuestOf("Bride's Guest")}
                />
                Bride's Guest
              </label>
            </div>
          </div>

          <div className="d-field">
            <label className="d-label" htmlFor="category">Category</label>
            <select
              id="category"
              className="d-input d-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button className="d-submit" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </button>

          {status === 'success' && (
            <p className="d-rsvp-message d-rsvp-message--success">
              {submittedAttending
                ? "Thank you! Your RSVP has been received — check your inbox for your boarding pass."
                : 'Thank you! Your RSVP has been received.'}
            </p>
          )}
          {status === 'error' && (
            <p className="d-rsvp-message d-rsvp-message--error">Something went wrong. Please try again.</p>
          )}
        </form>

        <BoardingPass />
      </div>
    </section>
  )
}
