import React, { useState } from 'react';
import './styles.css';

function RESTful() {
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState({
        title: '',
        artist: '',
        year: '',
        coverImage: ''
    });
    const [showJSON, setShowJSON] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchSongs = () => {
        fetch('http://localhost:3001/api/songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => {
                setSongs(data);
                setIsLoaded(true);
            })
            .catch(error => console.error('Error fetching songs:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSong({ ...newSong, [name]: value });
    };

    const handleAddSong = () => {
        fetch('http://localhost:3001/api/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add song');
                }
                return response.json();
            })
            .then(data => {
                setSongs([...songs, data]);
                setNewSong({
                    title: '',
                    artist: '',
                    year: '',
                    coverImage: ''
                });
            })
            .catch(error => console.error('Error adding song:', error));
    };

    const toggleJSON = () => {
        setShowJSON(!showJSON);
    };

    return (
        <div className="container">
            <h1>Canciones</h1>
            <button onClick={fetchSongs} className="styled-button">Cargar Canciones</button>
            
            {isLoaded && (
                <>
                    <h2>Agregar una Canción</h2>
                    <div>
                        <input type="text" name="title" placeholder="Título" value={newSong.title} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="artist" placeholder="Artista" value={newSong.artist} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="year" placeholder="Año" value={newSong.year} onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="coverImage" placeholder="URL de la imagen de la canción" value={newSong.coverImage} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button onClick={handleAddSong}>Agregar Canción</button>
                    </div>
                    
                    <h2>Canciones en la lista</h2>
                    {songs.length > 0 ? (
                        <ul>
                            {songs.map(song => (
                                <li key={song.id}>
                                    <div>
                                        <h3>{song.title}</h3>
                                        <p><strong>Artista:</strong> {song.artist}</p>
                                        <p><strong>Año:</strong> {song.year}</p>
                                        <img src={song.coverImage} alt={song.title} style={{ maxWidth: '200px' }} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay canciones disponibles.</p>
                    )}
                    
                    <button onClick={toggleJSON} className="styled-button">{showJSON ? "Ocultar JSON" : "Mostrar JSON"}</button>
                    {showJSON && <pre>{JSON.stringify(songs, null, 2)}</pre>}
                </>
            )}
        </div>
    );
}

export default RESTful;
