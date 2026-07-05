import PassportPhoto from '../../shared/PassportPhoto'
import { HeartIcon, PassportOrnament } from '../../shared/icons'
import './Passport.css'

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

export default function Passport() {
  return (
    <>
      <div className="d-intro-box d-passport-box">
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
    </>
  )
}
