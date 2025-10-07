# CLAUDE.md - Song Deck Project

> **Note**: Universal development principles for Python projects are in `~/.config/claude/CLAUDE_GLOBAL.md`

## Project Overview

Music catalog application with card-based interface. Displays songs as playing cards with suits based on index ranges, supports playlists and theme switching.

## Project-Specific Architecture

### Current Structure (Legacy)
```
song-deck/
├── index.html          # 700+ lines embedded JavaScript (REFACTOR NEEDED)
├── styles.css          # CSS custom properties for theming
├── songDB.csv          # Song database
└── souvenirs/          # Referenced documents (PDFs, images, markdown)
```

### Target Structure (Post-Refactor)
```
song-deck/
├── data/
│   ├── playlists.json      # Defines playlist types and orders
│   └── songDB.csv          # Master song list
├── index.html              # App shell with embedded MVC JavaScript logic
├── styles.css
├── plan.md                 # Current development plan
└── tests/
    └── refactor-safety-net.html # Test suite for the refactor
```

## Data Schema

```javascript
// Song record structure from CSV
{
  index: number,           // Unique ID (determines suit)
  // card: string,        // NOTE: This will be removed and computed by the View.
  title: string,
  artist: string,
  key: string,            // Musical key notation
  bpm: number,
  year: number,
  puzzlePiece: string,    // Musical concept/chord progression
  emAndA: string,         // Musical notation category
  notes: string,          // Comma-separated document URLs
  timeSignature: string,
  playlists: string       // Comma-separated playlist names
}
```

## Business Logic

### Card Suit Assignment (Core Feature)
```javascript
// Index ranges determine suit symbols
const getSuit = (index) => {
  if (index <= 0) return '🃏';      // Joker
  if (index <= 13) return '♣️';     // Clubs
  if (index <= 27) return '♦️';     // Diamonds
  if (index <= 40) return '♠️';     // Spades
  return '♥️';                      // Hearts (41-53)
};
```

### Playlist System (New)
- **Data-Driven:** Playlists are now defined in `data/playlists.json`.
- **`type: "deck"`**: Sorted automatically by `Index` (e.g., My Deck).
- **`type: "ordered-list"`**: Sorted by a custom `order` array of song indices (e.g., 8-Track).
- See `plan.md` for full details.

## Development Commands

```bash
# Development (static files, CORS required for CSV)
python -m http.server 8000
# or
npx http-server

# Target build process (after refactoring)
npm run dev
npm run build
```

## Technical Debt (Priority Order)

1. **Critical**: Extract embedded JavaScript from HTML
   - Move 700+ lines to separate modules
   - Implement proper module system

2. **IN PROGRESS**: Make playlists data-driven via `data/playlists.json`.
   - This is the core of the current refactoring effort.
   - See [plan.md](./plan.md) for details.

3. **Medium**: Add error boundaries and loading states
   - Handle CSV parsing failures gracefully
   - Add user feedback for data loading

## Testing Checklist

### Functional Tests
- [ ] CSV loads and populates song table
- [ ] Playlist switching ("My Deck" ↔ "8-Track")
- [ ] Card suit assignment matches index ranges
- [ ] Filtering by Key, Artist, Year, Em&A
- [ ] Search functionality across all fields
- [ ] Theme toggle persistence (localStorage)
- [ ] Document viewer for Notes links

### Performance Tests
- [ ] Table renders efficiently with 100+ songs
- [ ] Search input has proper debouncing
- [ ] Theme switching is immediate

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG 2.1 AA

## Integration Notes

This project will contribute these utilities to the shared utility repo:
- **SongCardRenderer**: Playing card UI component
- **PlaylistManager**: Multi-playlist system with persistence
- **MusicalKeyFilter**: Music-specific filtering logic