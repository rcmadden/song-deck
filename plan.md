# Development Plan & Release Notes

This document outlines the architectural plan for the Song Deck application and serves as a changelog for completed work.

---

## Release Notes (Current Version)

- ✅ **Architectural Foundation:** Began the migration from a monolithic script to a more scalable architecture by implementing the `Model` and `SongDeckManager` classes.
- ✅ **Data Source Standardization:** The application now uses a unified data model. 
    - Playlist rules are defined in `data/playlists.json`.
    - All song data, including playlist membership and sort order (`DeckOrder`), is drawn from `songDB.csv`.
- ✅ **Robust Table Sorting:** Implemented comprehensive, context-aware sorting for all relevant columns.
    - **Natural Song Title Sort:** The 'Song' column now ignores all special characters for a more intuitive alphabetical sort.
    - **Playlist-Aware Sorting:** The first column intelligently sorts by card `DeckOrder` for 'My Deck' and by numeric track position for '8-Track'.
- ✅ **Test-Driven Development:** Established a comprehensive test suite (`refactor-safety-net.html`) to validate all core functionality, enabling rapid, regression-free development.

---

## 1. Core Goal: MVC Refactor

The primary goal is to refactor the monolithic script in `index.html` into a Model-View-Controller (MVC) pattern. This will separate data management, DOM manipulation, and application logic.

## 2. Data Structure Overhaul

- ✅ **`songDB.csv`:** This file is the master catalog for all songs. It contains a stable `songId`, `Playlists` membership, and `DeckOrder`/`PlaylistOrders` for sorting.
- ✅ **`data/playlists.json`:** This file acts as a rulebook, defining the existence and behavior of each playlist (`id`, `name`, `type`).

## 3. `index.html` Refactoring Plan

The script in `index.html` will be reorganized into the following components:

- ✅ **Model (`Model` class):** **[COMPLETED]**
    - Responsible for fetching and parsing `songDB.csv` and `data/playlists.json`.
    - Provides methods like `getSongsForPlaylist()` which handles data retrieval and default sorting.

- 🚧 **View (`SongDeckManager` and render functions):** **[IN PROGRESS]**
    - `SongDeckManager` correctly handles presentation logic for positions and suits.
    - Global rendering functions (`renderSongTable`, `showSongDetails`) need to be encapsulated into a dedicated View module/class to separate them from the global scope.

- 🚧 **Controller (event listeners):** **[IN PROGRESS]**
    - Event listeners are currently set up in the global scope.
    - These need to be consolidated into a dedicated Controller module that handles all user input and application flow.

## 4. Future Features

- 📋 **New Feature: Deep-Linking (Routing):** Implement hash-based routing to link directly to a specific song or note (e.g., `.../index.html#/playlist/my-deck/song/12`).
- 📋 **Drag-and-Drop Sorting:** Not a priority without user accounts.
- 📋 **`localStorage` Persistence:** Custom sort orders will not be saved locally for now.
