import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { fetchTracks, searchTracks, MOCK_TRACKS } from '../services/api';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(new Audio());

    // Core state
    const [tracks, setTracks] = useState([]);
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(0.8);

    // Playback modes
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

    // User data
    const [likedTrackIds, setLikedTrackIds] = useState(() => {
        try {
            return new Set(JSON.parse(localStorage.getItem('aurelo_likes') || '[]'));
        } catch {
            return new Set();
        }
    });

    // Navigation, Filters & Search
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLiveApi, setIsLiveApi] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Modals & Drawers
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch tracks from Jamendo (re-fetches if genre category changes)
    useEffect(() => {
        let isMounted = true;
            const loadTracksByCategory = async () => {
                if (activeCategory === 'favorites') return;
                setIsLoading(true);
                const { tracks: loaded, isLive } = await fetchTracks(activeCategory);
                if (isMounted) {
                    setTracks(loaded);
                    setQueue(loaded);
                    setIsLiveApi(isLive);
                        if (!currentTrack && loaded.length > 0) {
                            setCurrentTrack(loaded[0]);
                            audioRef.current.src = loaded[0].audioUrl;
                        }
                        setIsLoading(false);
                    }
                };
                loadTracksByCategory();
                return () => { isMounted = false; };
}, [activeCategory]);

// Dynamic Ambient Glow
useEffect(() => {
    if (!currentTrack || !currentTrack.colors) return;
    const root = document.documentElement;
    root.style.setProperty('--ambient-1', currentTrack.colors.c1);
    root.style.setProperty('--ambient-2', currentTrack.colors.c2);
    root.style.setProperty('--ambient-3', currentTrack.colors.c3);
    root.style.setProperty('--ambient-glow', `${currentTrack.colors.c1}40`);

    document.title = `${currentTrack.title} • ${currentTrack.artist} | Aurelo`;
}, [currentTrack]);

// Audio Engine Listeners
useEffect(() => {
    const audio = audioRef.current;
    audio.preload = 'metadata';

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            document.documentElement.style.setProperty('--seek-percent', `${percent}%`);
        }
    };
    const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0);
    };
    const handleEnded = () => {
        if (repeatMode === 2) {
            audio.currentTime = 0;
            audio.play();
        } else {
            nextTrack(true);
        }
    };
    const handleError = () => {
        console.warn('Audio stream error, using fallback');
        if (currentTrack && !currentTrack._retried) {
            currentTrack._retried = true;
            const fallback = MOCK_TRACKS[0];
            audio.src = fallback.audioUrl;
            audio.play().catch(() => { });
        }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
    };
}, [repeatMode, currentTrack, queue, isShuffle]);

// Save Likes
useEffect(() => {
    localStorage.setItem('aurelo_likes', JSON.stringify([...likedTrackIds]));
}, [likedTrackIds]);

// Search with Debounce
useEffect(() => {
    if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
        const results = await searchTracks(searchQuery, tracks);
        setSearchResults(results);
        setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
}, [searchQuery, tracks]);

// Volume update on DOM slider
useEffect(() => {
    document.documentElement.style.setProperty('--vol-percent', `${volume * 100}%`);
}, [volume]);

// Core Player Functions
const playTrack = (track, newQueue = null) => {
    if (!track) return;
    const audio = audioRef.current;

    if (newQueue) {
        setQueue(newQueue);
    }

    if (currentTrack?.id === track.id) {
        togglePlayPause();
        return;
    }

    setCurrentTrack(track);
    audio.src = track.audioUrl;
    audio.currentTime = 0;
    audio.play().catch(e => console.warn('AutoPlay interaction required:', e));
};

const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!currentTrack && tracks.length > 0) {
        playTrack(tracks[0]);
        return;
    }
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch(e => console.warn(e));
    }
};

const nextTrack = (fromAutoEnd = false) => {
    if (queue.length === 0) return;
    const currentIdx = queue.findIndex(t => t.id === currentTrack?.id);

    let nextIdx = currentIdx + 1;
    if (isShuffle) {
        nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
        if (repeatMode === 1 || fromAutoEnd) {
            nextIdx = 0;
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            return;
        }
    }

    playTrack(queue[nextIdx]);
};

const prevTrack = () => {
    const audio = audioRef.current;
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    const currentIdx = queue.findIndex(t => t.id === currentTrack?.id);
    let prevIdx = currentIdx - 1;
    if (prevIdx < 0) {
        prevIdx = queue.length - 1;
    }
    playTrack(queue[prevIdx]);
};

const seekTo = (percent) => {
    const audio = audioRef.current;
    if (audio.duration) {
        const targetTime = (percent / 100) * audio.duration;
        audio.currentTime = targetTime;
        setCurrentTime(targetTime);
        document.documentElement.style.setProperty('--seek-percent', `${percent}%`);
    }
};

const changeVolume = (val) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, val));
    audio.volume = clamped;
    setVolume(clamped);
    setIsMuted(clamped === 0);
};

const toggleMute = () => {
    if (isMuted) {
        changeVolume(prevVolume || 0.8);
    } else {
        setPrevVolume(volume);
        changeVolume(0);
    }
};

const toggleShuffle = () => setIsShuffle(prev => !prev);

const toggleRepeat = () => setRepeatMode(prev => (prev + 1) % 3);

const toggleLike = (trackId) => {
    setLikedTrackIds(prev => {
        const next = new Set(prev);
        if (next.has(trackId)) {
            next.delete(trackId);
        } else {
            next.add(trackId);
        }
        return next;
    });
};

// Keyboard Shortcuts
useEffect(() => {
    const handleKeyDown = (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
            if (e.key === 'Escape') {
                document.activeElement.blur();
                setSearchQuery('');
            }
            return;
        }

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (audioRef.current.duration) {
                    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (audioRef.current.duration) {
                    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                changeVolume(Math.min(1, volume + 0.05));
                break;
            case 'ArrowDown':
                e.preventDefault();
                changeVolume(Math.max(0, volume - 0.05));
                break;
            case 'KeyM':
                toggleMute();
                break;
            case 'KeyL':
                if (currentTrack) toggleLike(currentTrack.id);
                break;
            case 'Escape':
                setIsModalOpen(false);
                setIsQueueOpen(false);
                setIsSidebarOpen(false);
                setSearchQuery('');
                break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentTrack, volume, isPlaying]);

return (
    <AudioContext.Provider value={{
        tracks,
        queue,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        likedTrackIds,
        activeCategory,
        searchQuery,
        searchResults,
        isSearching,
        isLiveApi,
        isLoading,
        isModalOpen,
        isQueueOpen,
        isSidebarOpen,
        playTrack,
        togglePlayPause,
        nextTrack,
        prevTrack,
        seekTo,
        changeVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        setActiveCategory,
        setSearchQuery,
        setIsModalOpen,
        setIsQueueOpen,
        setIsSidebarOpen
    }}>
        {children}
    </AudioContext.Provider>
);
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

