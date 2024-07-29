import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcRating, FcPlus, FcApproval, FcEmptyTrash, FcEditImage } from "react-icons/fc";
import { IoMusicalNotes } from "react-icons/io5";

const Header = () => {
    const [showInput, setShowInput] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [playlistCount, setPlaylistCount] = useState(0);
    const [editingPlaylist, setEditingPlaylist] = useState(null);

    useEffect(() => {
        const count = localStorage.getItem('playlistCount') || 0;
        setPlaylistCount(Number(count));
    }, []);

    const handleAddClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value);
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const newCount = playlistCount + 1;
            const playlistKey = `playlist${newCount}`;
            const newPlaylist = {
                id: playlistKey,
                name: newItem,
                items: []
            };

            localStorage.setItem(playlistKey, JSON.stringify(newPlaylist));
            localStorage.setItem('playlistCount', newCount.toString());
            setPlaylistCount(newCount);
            setNewItem('');
            setShowInput(false);
        }
    };

    const handleCancel = () => {
        setNewItem('');
        setShowInput(false);
    };

    const handleRemoveItem = (playlistKey) => {
        localStorage.removeItem(playlistKey);
        const newCount = playlistCount - 1;
        localStorage.setItem('playlistCount', newCount.toString());
        setPlaylistCount(newCount);
    };

    const handleEditClick = (playlistKey) => {
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        if (playlist) {
            setEditingPlaylist({ key: playlistKey, name: playlist.name });
        }
    };

    const handleEditChange = (e) => {
        setEditingPlaylist({ ...editingPlaylist, name: e.target.value });
    };

    const handleSaveEdit = () => {
        if (editingPlaylist.name.trim() !== '') {
            const updatedPlaylist = {
                ...JSON.parse(localStorage.getItem(editingPlaylist.key)),
                name: editingPlaylist.name
            };
            localStorage.setItem(editingPlaylist.key, JSON.stringify(updatedPlaylist));
            setEditingPlaylist(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingPlaylist(null);
    };

    const playlistLinks = [];
    for (let i = 1; i <= playlistCount; i++) {
        const playlistKey = `playlist${i}`;
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        if (playlist) {
            const isEditing = editingPlaylist && editingPlaylist.key === playlistKey;
            playlistLinks.push(
                <li key={i}>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editingPlaylist.name}
                                onChange={handleEditChange}
                            />
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <Link to={`/playlist/${playlistKey}`}><span className='icon2'><FcApproval /></span>{playlist.name}</Link>
                            <button onClick={() => handleEditClick(playlistKey)}><FcEditImage /></button>
                            <button onClick={() => handleRemoveItem(playlistKey)}><FcEmptyTrash /></button>
                        </>
                    )}
                </li>
            );
        }
    }

    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><IoMusicalNotes />나의 뮤직 차트</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                <li><Link to='chart/melon'><span className='icon'></span>멜론 차트</Link></li>
                <li><Link to='chart/bugs'><span className='icon'></span>벅스 차트</Link></li>
                <li><Link to='chart/apple'><span className='icon'></span>애플 차트</Link></li>
                <li><Link to='chart/genie'><span className='icon'></span>지니 차트</Link></li>
                <li><Link to='chart/billboard'><span className='icon'></span>빌보드 차트</Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                <li><Link to='/mymusic'><span className='icon2'><FcRating /></span>Mymusic</Link></li>
                {playlistLinks}
                <li>
                    {showInput ? (
                        <div className='input-container'>
                            <input
                                type='text'
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <div className='button-group'>
                                <button onClick={handleAddItem}>Add</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>Create</Link>
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Header;
