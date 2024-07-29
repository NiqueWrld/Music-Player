import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, onAddToPlaylist }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const count = Number(localStorage.getItem('playlistCount')) || 0;
            const loadedPlaylists = [];
            for (let i = 1; i <= count; i++) {
                const playlistKey = `playlist${i}`;
                const playlist = JSON.parse(localStorage.getItem(playlistKey));
                if (playlist) {
                    loadedPlaylists.push({ key: playlistKey, name: playlist.name });
                }
            }
            setPlaylists(loadedPlaylists);
            console.log('Loaded playlists:', loadedPlaylists); // 변경 사항
        }
    }, [isOpen]);

    const handleAddClick = (playlistKey) => {
        onAddToPlaylist(playlistKey);
        onClose();
        console.log('Playlist added to:', playlistKey); // 변경 사항
    };

    if (!isOpen) return null; // 이 부분을 확인하기 위해 로그 추가

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>플레이리스트 선택</h2>
                <ul>
                    {playlists.map((playlist) => (
                        <li key={playlist.key}>
                            {playlist.name}
                            <button onClick={() => handleAddClick(playlist.key)}>추가</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
