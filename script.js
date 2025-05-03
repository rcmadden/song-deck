fetch('songDB.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n').map(row => row.split(','));
    const headers = rows.shift();

    const tableBody = document.querySelector('#song-table tbody');
    const card = document.getElementById('song-card');
    const cardTitle = document.getElementById('card-title');
    const cardMeta = document.getElementById('card-meta');
    const cardDetails = document.getElementById('card-details');

    rows.forEach(row => {
      const rowData = Object.fromEntries(headers.map((h, i) => [h, row[i]]));
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${rowData.Suit}</td>
        <td><strong>${rowData.Title}</strong><br><small>${rowData.Artist}</small></td>
        <td>${rowData.Progression || ''}</td>
        <td>${rowData.Key || ''}</td>
      `;

      tr.addEventListener('click', () => {
        card.classList.remove('hidden');
        cardTitle.textContent = `${rowData.Title} – ${rowData.Artist}`;
        cardMeta.textContent = `Key: ${rowData.Key || '–'} | Em&A: ${rowData['Em&A'] || '–'} | Time Signature: ${rowData['Time Signature'] || '–'}`;
        cardDetails.innerHTML = `<em>${rowData.Notes || ''}</em>`;
      });

      tableBody.appendChild(tr);
    });
  });
