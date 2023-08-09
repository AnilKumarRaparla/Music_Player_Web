const express = require('express');
const app = express();
const path = require('path');

// Set 'views' directory for any views
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample playlists and songs (replace with your actual data or use a database)
const playlists = [
  { id: 1, name: 'My Favorites', songs: ['song1.mp3', 'song3.mp3'] },
  { id: 2, name: 'Relaxing Tunes', songs: ['song2.mp3', 'song4.mp3'] },
];

// Route to display playlists and songs
app.get('/playlist/:id', (req, res) => {
  const playlistId = parseInt(req.params.id);
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return res.status(404).send('Playlist not found');
  }

  const audioFiles = playlist.songs.map((song) => ({
    name: song.split('.')[0], // Remove file extension for display
    path: `/audio/${song}`,
  }));

  res.render('index', { audioFiles });
});

// Route for the home page and handling search functionality
app.get('/', (req, res) => {
  const searchTerm = req.query.q;

  // Sample data (replace with your actual data or use a database)
  const allAudioFiles = [
    { name: 'Song 1', path: '/audio/song1.mp3' },
    { name: 'Song 2', path: '/audio/song2.mp3' },
    { name: 'Song 3', path: '/audio/song3.mp3' },
    { name: 'Song 4', path: '/audio/song4.mp3' },
    // Add more songs as needed
  ];

  // Filter the audio files based on the search term
  const filteredAudioFiles = searchTerm
    ? allAudioFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allAudioFiles;

  res.render('index', { audioFiles: filteredAudioFiles });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
