import compass from '../../../assets/pd-compass.png'
import storyPhoto1 from '../../../assets/newly-wed.jpeg'
import storyPhoto2 from '../../../assets/IMG_0564.png'
import RevealParagraphs from '../shared/RevealParagraphs'
import type { SectionId } from '../sectionConfig'
import './OurStory.css'

export default function OurStory({ onSectionRef }: { onSectionRef: (id: SectionId, el: HTMLElement | null) => void }) {
  return (
    <section id="our-story" ref={(el) => onSectionRef('our-story', el)} className="d-section">
      <div className="d-section-inner">
        <img src={compass} alt="" className="d-story-compass" />

        <div className="d-story-photos">
          <img src={storyPhoto1} alt="" className="d-story-photo d-story-photo--one" />
          <img src={storyPhoto2} alt="" className="d-story-photo d-story-photo--two" />
        </div>

        <h2 className="d-heading d-heading--story">
          <span className="d-heading--story-names">Princes &amp; Dominik</span>
          <br /><br />
          <em>Our Story</em>
        </h2>
        <RevealParagraphs
          className="d-body"
          paragraphs={[
            `From a chance meeting to a love that feels like home — that's the simplest way to
            describe the journey of Princes and Dominik. What started as an unexpected encounter
            quickly grew into something neither of them could have planned, a connection built on
            laughter, shared adventures, and an unspoken understanding that they were meant to
            find each other.`,
            `Through every season and every mile between them, their love only deepened. Dominik's
            quiet steadiness and Princes' warmth created a partnership that felt effortless and
            extraordinary all at once. Together they discovered that home isn't a place — it's a
            person.`,
            `And now, surrounded by the people they love most, in the heart of Marinduque where
            the sea meets the shore, they are ready to say "forever." We can't wait to see you
            there.`,
          ]}
        />
        <p className="d-hashtag">#PRINCESandDOMINIK</p>
      </div>
    </section>
  )
}
