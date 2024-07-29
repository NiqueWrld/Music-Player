import React, { forwardRef, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { FcCalendar } from 'react-icons/fc';
import { MdFormatListBulletedAdd, MdOutlinePlayCircleFilled, MdClose, MdHive } from 'react-icons/md';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
        <FcCalendar size={24} />
        <span>{value}</span>
    </button>
));

const Chart = ({ title, showCalendar, selectedDate, onDateChange, minDate, maxDate, data }) => {
    const { addTrackToList, addTrackToEnd, playTrack } = useContext(MusicPlayerContext);
    const [youtubeResults, setYoutubeResults] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const searchYoutube = async (query) => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults: 5,
                    key: process.env.REACT_APP_YOUTUBE_API_KEY,
                },
            });
            setYoutubeResults(response.data.items);
        } catch (error) {
            console.error('YouTube 검색에 실패했습니다.', error);
        }
    };

    const handleItemClick = (title) => {
        setSelectedTitle(title);
        searchYoutube(title);
    };

    const handlePlayNow = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
            rank: 1,
        };
        addTrackToList(newTrack);
        playTrack(0);
    };

    const handleAddToList = (result) => {
        const newTrack = {
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
            rank: 1,
        };
        addTrackToEnd(newTrack);
        toast.success('리스트에 추가했습니다.');
    };

    const handleAddToPlaylistClick = (result) => {
        console.log('Add to playlist clicked', result);
        setSelectedTrack({
            title: result.snippet.title,
            videoID: result.id.videoId,
            imageURL: result.snippet.thumbnails.default.url,
            artist: result.snippet.channelTitle,
            rank: 1,
        });
        setIsModalOpen(true);
        setTimeout(() => console.log('isModalOpen state:', isModalOpen), 0); // 상태 변경 직후 확인
    };
    
    const handleAddToPlaylist = (playlistKey) => {
        console.log('Add to playlist:', playlistKey);
        const playlist = JSON.parse(localStorage.getItem(playlistKey));
        if (playlist && selectedTrack) {
            playlist.items.push(selectedTrack);
            localStorage.setItem(playlistKey, JSON.stringify(playlist));
            console.log('Track added to playlist:', selectedTrack);
        } else {
            console.log('Failed to add track to playlist');
        }
    };

    return (
        <>
            <section className="music-chart">
                <div className="title">
                    <h2>{title}</h2>
                    {showCalendar && (
                        <div className="date">
                            <DatePicker
                                selected={selectedDate}
                                onChange={onDateChange}
                                dateFormat="yyyy-MM-dd"
                                minDate={minDate}
                                maxDate={maxDate}
                                customInput={<CustomInput />}
                            />
                        </div>
                    )}
                </div>
                <div className="list">
                    <ul>
                        {data.map((item, index) => (
                            <li key={index} onClick={() => handleItemClick(item.title)}>
                                <span className="rank">#{item.rank}</span>
                                <span className="img" style={{ backgroundImage: `url(${item.imageURL})` }}></span>
                                <span className="title">{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {youtubeResults.length > 0 && (
                <section className="youtube-result">
                    <h3>👉 "{selectedTitle}"에 대한 유튜브 검색 결과입니다.</h3>
                    <ul>
                        {youtubeResults.map((result, index) => (
                            <li key={index}>
                                <span className="img" style={{ backgroundImage: `url(${result.snippet.thumbnails.default.url})` }}></span>
                                <span className="title">{result.snippet.title}</span>
                                <span className="playNow" onClick={() => handlePlayNow(result)}>
                                    <MdOutlinePlayCircleFilled />
                                    <span className="ir">노래듣기</span>
                                </span>
                                <span className="listAdd" onClick={() => handleAddToList(result)}>
                                    <MdFormatListBulletedAdd />
                                    <span className="ir">리스트 추가하기</span>
                                </span>
                                {/* <span className="chartAdd" onClick={() => handleAddToPlaylistClick(result)}>
                                    <MdHive />
                                    <span className="ir">나의 리스트에 추가하기</span>
                                </span> */}
                            </li>
                        ))}
                    </ul>
                    <span className="close" onClick={() => setYoutubeResults([])}>
                        <MdClose />
                    </span>
                </section>
            )}
            <ToastContainer />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToPlaylist={handleAddToPlaylist}
            />
        </>
    );
};

export default Chart;
