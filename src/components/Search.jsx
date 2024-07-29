import React, { useState, useContext } from "react";
import axios from "axios";
import { LuSearch } from "react-icons/lu";
import { MdOutlinePlayCircleFilled, MdFormatListBulletedAdd, MdClose, MdHive } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addTrackToList, addTrackToEnd, playTrack, setMusicData } = useContext(MusicPlayerContext);

    const handleSearch = async () => {
        if (!query) return;

        const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 5,
                key: apiKey,
            },
        });

        setResults(response.data.items);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handlePlayNow = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        };
        setMusicData([newTrack]); // 음악 데이터 업데이트
        playTrack(0); // 첫 번째 트랙 재생
    };

    const handleAddToList = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        };
        addTrackToEnd(newTrack);
        toast.success('리스트에 추가했습니다.');
    };

    const handleAddToPlaylistClick = (result) => {
        setSelectedVideo({
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
        });
        setIsModalOpen(true);
    };

    const handleAddToPlaylist = (playlistKey) => {
        console.log('Adding to playlist:', playlistKey);
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        if (playlist && selectedVideo) {
            playlist.items.push(selectedVideo);
            localStorage.setItem(playlistKey, JSON.stringify(playlist));
        }
    };

    return (
        <article className="search">
            <label htmlFor="searchInput">
                <LuSearch />
            </label>
            <input
                type="text"
                placeholder="Search"
                id="searchInput"
                value={query}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            {results.length > 0 && (
                <section className='youtube-result'>
                    <h3>👉 "{query}"에 대한 유튜브 검색 결과입니다.</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <span className='img' style={{ backgroundImage: `url(${result.snippet.thumbnails.default.url})` }}></span>
                                <span className='title'>{result.snippet.title}</span>
                                <span className='playNow' onClick={() => handlePlayNow(result)}>
                                    <MdOutlinePlayCircleFilled /><span className='ir'>노래듣기</span>
                                </span>
                                <span className='listAdd' onClick={() => handleAddToList(result)}>
                                    <MdFormatListBulletedAdd /><span className='ir'>리스트 추가하기</span>
                                </span>
                                <span className='chartAdd' onClick={() => handleAddToPlaylistClick(result)}>
                                    <MdHive /><span className='ir'>나의 리스트에 추가하기</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <span className='close' onClick={() => setResults([])}><MdClose /></span>
                </section>
            )}
            <ToastContainer />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToPlaylist={handleAddToPlaylist}
            />
        </article>
    );
};

export default Search;
