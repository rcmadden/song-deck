# Song Deck

A web-based music catalog application that displays song information in a card-based interface. Load song data from CSV files and present it in an interactive table format with playlist functionality, filtering, and theme switching.

## Development

### Local Development

This is a static HTML/CSS/JavaScript application with no build process. Serve files using an HTTP server (required for CSV loading due to CORS):

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server extension recommended
```

Then open `http://localhost:8000`

### Testing

To run the filter function tests:

1. Open `tests.html` in your browser or navigate to `http://localhost:8000/tests.html`
2. Tests run automatically and display results
3. Check browser console (F12) for detailed output

The test suite covers:
- Filter functions (by key, artist, year, search terms)
- Playlist filtering
- Edge cases and data validation
