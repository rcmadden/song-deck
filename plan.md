# Refactoring and Development Plan

This document outlines the plan to refactor the Song Deck application to a more robust, scalable architecture and to add new features in a test-driven manner.

## 1. Core Goal: MVC Refactor

The primary goal is to refactor the monolithic script in `index.html` into a Model-View-Controller (MVC) like pattern. This will separate data management (Model), DOM manipulation (View), and application logic (Controller), making the codebase cleaner, easier to maintain, and ready for future expansion (like a FastAPI backend).

## 2. Test-Driven Approach

All refactoring will be guided by a test suite to prevent regressions.

- **Safety Net:** A test file `tests/refactor-safety-net.html` has been created. It validates the current core functionality:
    1.  Correct initial load of the "My Deck" playlist.
    2.  Correctly switching to the "8-Track" playlist.
    3.  Displaying the detail card when a song is clicked.
- **Workflow:** The refactored application must pass all tests in the safety net, ensuring no existing functionality is broken. New tests will be added for new features.

## 3. Data Structure Overhaul

We will separate song data from playlist presentation logic.

- **`songDB.csv`:** This file will be the single source of truth for all song data.
    - The `Card` and `8TrackOrder` columns will be removed. Its only job is to list songs and their attributes.
- **`data/playlists.json` (New File):** This file will define all available playlists and their behavior.
    - It will specify the `name`, `type` (`deck` or `ordered-list`), and for `ordered-list` types, the explicit `order` of song `Index` values.
    - This centralizes playlist management, making it easy to add or re-order playlists without touching the application code.

## 4. `index.html` Refactoring Steps

The script in `index.html` will be reorganized into the following components:

- **Model:**
    - Responsible for fetching and parsing `songDB.csv` and `data/playlists.json`.
    - Provides methods like `getSongsForPlaylist(playlistName)` which handles the specific sorting logic based on the playlist's `type`.
    - Manages the application's state in memory.
- **View:**
    - Responsible for all DOM rendering (`renderSongTable`, `showSongDetails`).
    - Will dynamically generate the card/position display (e.g., `♣️ K` or `3.`) based on a song's position in the array it receives for rendering.
    - Binds user events (like clicks) and delegates them to the controller.
- **Controller:**
    - Initializes the application by coordinating the Model and View.
    - Handles application flow, such as switching playlists.
    - Implements the new routing/deep-linking feature.

## 5. New Feature: Deep-Linking (Routing)

The refactor will enable linking to a specific song and note.

- **URL Structure:** Uses a hash-based URL, e.g., `.../index.html#/playlist/my-deck/song/12/note/If_I_Aint_Got_You.pdf`.
- **Implementation:** The Controller will parse the URL hash on load and instruct the View to display the correct playlist, song, and document.

## 6. Deferred Features

To keep the scope focused, the following features are intentionally deferred:

- **Drag-and-Drop Sorting:** Not a priority without user accounts.
- **`localStorage` Persistence:** Custom sort orders will not be saved locally for now. The default order will be loaded from `data/playlists.json` on each visit.