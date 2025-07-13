# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Song Deck is a web-based music catalog application that displays song information in a card-based interface. It loads song data from CSV files and presents it in an interactive table format where users can click on songs to view detailed information. The application features playlist functionality, theme switching, and a modern responsive design.

## Core Architecture

The application uses a simple file structure:
- **index.html** - Complete application with embedded JavaScript (700+ lines)
- **styles.css** - External stylesheet with CSS custom properties for theming
- **songDB.csv** - Song database with comprehensive metadata
- **souvenirs/** - Supporting documents (PDFs, images, markdown files)

### Key Features

- **CSV Data Loading**: Uses PapaParse library (CDN) to parse song data
- **Card System**: Playing card representation with suit symbols based on index ranges
- **Playlist System**: "My Deck" and "8-Track" playlists with different behaviors
- **Document Viewer**: Inline viewing of PDFs, images, and markdown files
- **Responsive Design**: Mobile-first table layout with adaptive columns
- **Dark/Light Theme**: Persistent theme switching with localStorage
- **Advanced Filtering**: Multi-criteria filtering (Key, Artist, Year, Em&A) plus search
- **Modern UI**: Header with account dropdown, playlist selector, filter panel

## Development Commands

This is a static HTML/CSS/JavaScript application with no build process:

1. **Local Development**: Serve files using HTTP server (required for CSV loading due to CORS)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # VS Code Live Server extension recommended
   ```

2. **Testing**: Open `http://localhost:8000` and verify:
   - CSV data loads and populates song table
   - Playlist switching between "My Deck" and "8-Track"
   - Filtering, search, and sorting functionality
   - Theme toggle persistence
   - Document viewer for Notes links
   - Mobile responsive behavior

## Technical Debt & Refactoring Recommendations

### Critical Issues Requiring Cleanup

1. **JavaScript Architecture** (High Priority)
   - **Issue**: 700+ lines of JavaScript embedded in HTML
   - **Recommendation**: Extract to separate modules:
     ```
     js/
     ├── app.js           # Main application, data loading
     ├── ui.js            # UI interactions, event handlers  
     ├── playlist.js      # Playlist management
     ├── theme.js         # Theme switching
     ├── filters.js       # Filtering, search, sorting
     └── document-viewer.js # Document loading/display
     ```

2. **Hardcoded 8-Track Playlist** (High Priority)
   - **Issue**: Song order hardcoded in `apply8TrackOrdering()` function (lines 664-689)
   - **Recommendation**: Move to data-driven approach using CSV playlist order field or separate config file

3. **Global Variable Pollution** (Medium Priority)
   - **Issue**: All variables in global scope
   - **Recommendation**: Use ES6 modules or IIFE pattern for encapsulation

### Web Development Standards Violations

1. **Separation of Concerns**: JavaScript mixed with HTML
2. **Accessibility**: Missing ARIA labels, keyboard navigation support
3. **Performance**: No input debouncing, inefficient table re-rendering
4. **Error Handling**: Limited error boundaries for network/parsing failures
5. **Code Organization**: Mixed UI logic with data processing

### Multi-User Support Roadmap

1. **Configuration Management**:
   - Extract hardcoded user data ("Russia M") to config
   - Make playlist definitions data-driven
   - Add environment-specific settings

2. **Backend Integration Points**:
   - Design API endpoints for songs, playlists, users
   - Implement authentication/authorization
   - Add real-time sync capabilities

3. **Local Storage Enhancement**:
   - Store user preferences and custom playlists
   - Implement offline-first approach
   - Add data synchronization utilities

## Data Structure

Songs in songDB.csv contain:
- **Index**: Unique identifier for card ordering and suit assignment
- **Card**: Playing card value (A, 2-10, J, Q, K)
- **Title/Artist**: Song identification
- **Key**: Musical key notation
- **BPM**: Beats per minute
- **Date**: Release year
- **Puzzle Piece**: Musical concept or chord progression
- **Em&a**: Additional musical notation/category
- **Notes**: URLs to supporting documents (comma-separated)
- **Time Signature**: Musical time signature
- **Playlists**: Comma-separated list of playlists containing this song

## Suit Assignment Logic

Cards are assigned suits based on index ranges:
- **♣️ Clubs**: Index 1-13
- **♦️ Diamonds**: Index 14-27  
- **♠️ Spades**: Index 28-40
- **♥️ Hearts**: Index 41-53
- **🃏 Joker**: Index ≤ 0

## File Organization

```
song-deck/
├── index.html          # Main application
├── styles.css          # Application styling
├── songDB.csv          # Primary song database
├── CLAUDE.md          # This documentation
├── README.md          # Project overview
└── souvenirs/         # Referenced documents
    ├── *.pdf          # Sheet music and charts
    ├── *.png          # Image resources
    └── *.md           # Markdown documentation

# Unused/Legacy Files (safe to remove)
├── script.js          # Not referenced in index.html
├── csvLoader.js       # Not referenced in index.html
├── tempDB.csv         # Legacy data file
└── indexOLD.html      # Backup version
```

## Code Style Guidelines

- **Modern JavaScript**: Use ES6+ features, const/let over var
- **CSS Custom Properties**: Use CSS variables for consistent theming
- **Mobile-First**: Design for mobile, enhance for desktop
- **Semantic HTML**: Use appropriate HTML5 elements
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Error Handling**: Graceful degradation for network/parsing failures

## Development Best Practices

- **NEVER commit user-specific data** to version control
- **Test playlist functionality** when modifying data structure
- **Maintain CSV backward compatibility** when adding features
- **Validate data integrity** when loading CSV files
- **Test theme consistency** across all UI components
- **Performance test** with large datasets (100+ songs)

## Immediate Action Items

1. Extract JavaScript to separate modules for maintainability
2. Remove hardcoded 8-track song order, make data-driven
3. Implement proper error boundaries and user feedback
4. Add accessibility features (ARIA labels, keyboard navigation)
5. Remove unused files (script.js, csvLoader.js, tempDB.csv, indexOLD.html)
6. Add input debouncing for search performance