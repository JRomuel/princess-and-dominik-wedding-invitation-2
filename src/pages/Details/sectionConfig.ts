export type SectionId =
  | 'home'
  | 'our-story'
  | 'venue'
  | 'timeline'
  | 'entourage'
  | 'attire'
  | 'gifts'
  | 'travel'
  | 'faq'
  | 'gallery'
  | 'rsvp'

export const NAV: { label: string; id: SectionId }[] = [
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
