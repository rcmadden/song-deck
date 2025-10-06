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

### Target Structure (Modern)
```
src/
├── js/
│   ├── app.js              # Application entry point
│   ├── song-card.js        # Card rendering logic
│   └── playlist-manager.js # Playlist-specific logic
├── css/
│   ├── components.css      # Card and UI components
│   └── themes.css         # Dark/light theme variables
└── data/
    └── songDB.csv
```

## Data Schema

```javascript
// Song record structure from CSV
{
  index: number,           // Unique ID (determines suit)
  card: string,           // A, 2-10, J, Q, K
  title: string,
  artist: string,
  key: string,            // Musical key notation
  bpm: number,
  year: number,
  puzzlePiece: string,    // Musical concept/chord progression
  emAndA: string,         // Musical notation category
  notes: string[],        // Document URLs (comma-separated)
  timeSignature: string,
  playlists: string[]     // Comma-separated playlist names
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

### Playlist System
- **"My Deck"**: User-customizable playlist with local storage
- **"8-Track"**: Predefined ordering (currently hardcoded in `apply8TrackOrdering()`)

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

2. **High**: Make 8-Track playlist data-driven
   - Remove hardcoded song order from `apply8TrackOrdering()`
   - Use CSV playlist field or separate config

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