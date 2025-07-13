// Pure filtering functions
export function applyFilters(songs, { key, artist, year, emA, search }) {
    search = (search || '').toLowerCase();

    return songs.filter(song => {
      const keyMatch = !key || (song.Key || '') === key;
      const artistMatch = !artist || (song.Artist || '') === artist;
      const yearMatch = !year || String(song.Date || '') === year;
      const emAMatch = !emA || (song['Em&a'] || '') === emA;  // Note: keeping original field name
      const searchMatch = !search ||
          (song.Title || '').toLowerCase().includes(search) ||
          (song.Artist || '').toLowerCase().includes(search);

      return keyMatch && artistMatch && yearMatch && emAMatch && searchMatch;
    });
  }

export function getPlaylistSongs(songs, playlist) {
    return songs.filter(song => {
      const playlists = song.Playlists || '';
      return playlists.includes(playlist === '8-track' ? '8-Track' : 'My Deck');
    });
  }

export function createFilterCriteria() {
    return {
      key: document.getElementById('filterKey')?.value || '',
      artist: document.getElementById('filterArtist')?.value || '',
      year: document.getElementById('filterYear')?.value || '',
      emA: document.getElementById('filterEmA')?.value || '',
      search: document.getElementById('searchSong')?.value || ''
    };
  }

