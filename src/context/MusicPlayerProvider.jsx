import React, { createContext, useEffect, useState } from 'react';

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/SONG.json');
                const data = await response.json();
                setMusicData(data);
                console.log(data);
            } catch (error) {
                console.error('데이터를 가져오는데 실패했습니다.', error);
            }
        };
        fetchData();
    }, []);

    const playTrack = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        if (isShuffling) {
            setCurrentTrackIndex(Math.floor(Math.random() * musicData.length));
        } else {
            setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicData.length);
        }
        setIsPlaying(true);
        setPlayed(0);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setIsPlaying(true);
        setPlayed(0);
    };

    const updatePlayed = (played) => {
        setPlayed(played);
    };

    const updateDuration = (duration) => {
        setDuration(duration);
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleRepeat = () => {
        setIsRepeating(!isRepeating);
    };

    const handleTrackEnd = () => {
        if (isRepeating) {
            setPlayed(0);
            setIsPlaying(true);
        } else {
            nextTrack();
        }
    };

    const addTrackToList = (track) => {
        setMusicData((prevMusicData) => [track, ...prevMusicData]);
    };

    const addTrackToEnd = (track) => {
        setMusicData((prevMusicData) => [...prevMusicData, track]);
    };

    // 재생 목록에서 트랙을 제거하는 함수
    const removeTrack = (index) => {
        setMusicData((prevMusicData) => prevMusicData.filter((_, i) => i !== index));
        if (index === currentTrackIndex) {
            playTrack(0); // 현재 트랙이 제거된 경우 첫 번째 트랙을 재생
        } else if (index < currentTrackIndex) {
            setCurrentTrackIndex((prevIndex) => prevIndex - 1); // 현재 트랙 이전의 트랙이 제거된 경우 인덱스 조정
        }
    };

    return (
        <MusicPlayerContext.Provider
            value={{
                musicData,
                setMusicData,  // Ensure setMusicData is included
                currentTrackIndex,
                isPlaying,
                played,
                duration,
                playTrack,
                pauseTrack,
                nextTrack,
                prevTrack,
                updatePlayed,
                updateDuration,
                isShuffling,
                isRepeating,
                toggleShuffle,
                toggleRepeat,
                handleTrackEnd,
                addTrackToList,
                addTrackToEnd,
                removeTrack
            }}>
            {children}
        </MusicPlayerContext.Provider>
    );
}

export default MusicPlayerProvider;
