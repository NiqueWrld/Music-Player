import React, { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import { IoShuffleOutline } from 'react-icons/io5';


const Home = () => {
  const { playTrack, setMusicData } = useContext(MusicPlayerContext);

  const handlePlayRandomSong = async () => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error('YouTube API key is not defined.');
      return;
    }

    const query = 'music';
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.search = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 50,
      key: apiKey
    });

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const randomTrack = {
          title: data.items[randomIndex].snippet.title,
          videoID: data.items[randomIndex].id.videoId,
          imageURL: data.items[randomIndex].snippet.thumbnails.default.url,
          artist: data.items[randomIndex].snippet.channelTitle,
        };
        setMusicData([randomTrack]); // 음악 데이터 업데이트
        playTrack(0); // 첫 번째 트랙 재생
      } else {
        console.error('No items found in the response.');
      }
    } catch (error) {
      console.error('랜덤 노래 재생에 실패했습니다.', error);
    }
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>나의 뮤직 차트에 오신 것을 환영합니다!</h1>
        <p>최신 음악을 검색하고, 자신만의 플레이리스트를 만들어 보세요.</p>
      </header>

      <section className="home-content">
        <div className="home-section">
          <h2>주요 기능</h2>
          <ul>
            <li>최신 차트 음악 확인</li>
            <li>자신만의 플레이리스트 생성</li>
            <li>음악 검색 및 스트리밍</li>
          </ul>
        </div>

        <div className="random-song-section">
          <button className="random-song-button" onClick={handlePlayRandomSong}>
            <IoShuffleOutline size={50} />
          </button>
          <p>랜덤 노래 재생</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
