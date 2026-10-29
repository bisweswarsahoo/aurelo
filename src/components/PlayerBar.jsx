import React from 'react';
import { useAudio } from '../context/AudioContext';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Repeat1,
    Volume2,
    Volume1,
    VolumeX,
    ListMusic,
    Maximize2,
    Heart
} from 'lucide-react';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const PlayerBar = () => {
    const {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        repeatMode,
        likedTrackIds,
        togglePlayPause,
        nextTrack,
        prevTrack,
        seekTo,
        changeVolume,
        toggleMute,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        setIsModalOpen,
        setIsQueueOpen
    } = useAudio();

    const isLiked = currentTrack && likedTrackIds.has(currentTrack.id);
    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <footer className="h-24 bg-neutral-950/90 backdrop-blur-3xl border-t border-white/10 px-4 sm:px-6 md:px-8 flex items-center justify-between z-40 select-none">

            {/* Left: Current Track Thumbnail & Meta Info */}
            <div className="flex items-center gap-3 sm:gap-4 w-1/4 min-w-[160px] sm:min-w-[200px]">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="relative group cursor-pointer flex-shrink-0"
                    title="Expand View"
                >
                    <img
                        src={currentTrack?.cover || "/logo.png"}
                        alt="Cover"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-white/10 shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                </div>

                <div className="min-w-0 pr-2">
                    <p
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm font-bold text-white truncate hover:underline cursor-pointer"
                    >
                        {currentTrack?.title || "Aurelo Ready"}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                        {currentTrack?.artist || "Select a track to play"}
                    </p>
                </div>

                {currentTrack && (
                    <button
                        onClick={() => toggleLike(currentTrack.id)}
                        className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors flex-shrink-0"
                        title={isLiked ? "Remove from Liked" : "Save to Liked"}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
                    </button>
                )}
            </div>

            {/* Center: Playback Controls & Interactive Seek Slider */}
            <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl px-2">

                {/* Control Buttons */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <button
                        onClick={toggleShuffle}
                        className={`transition-colors ${isShuffle ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                        title="Shuffle"
                    >
                        <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                        onClick={prevTrack}
                        className="text-neutral-300 hover:text-white transition-colors"
                        title="Previous Track"
                    >
                        <SkipBack className="w-5 h-5 fill-current" />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                    </button>

                    <button
                        onClick={() => nextTrack(false)}
                        className="text-neutral-300 hover:text-white transition-colors"
                        title="Next Track"
                    >
                        <SkipForward className="w-5 h-5 fill-current" />
                    </button>

                    <button
                        onClick={toggleRepeat}
                        className={`transition-colors relative ${repeatMode > 0 ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                        title="Repeat Mode"
                    >
                        {repeatMode === 2 ? (
                            <Repeat1 className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                            <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </button>
                </div>

                {/* Scrubber & Timestamps */}
                <div className="w-full flex items-center gap-2.5 sm:gap-3 text-[11px] font-mono text-neutral-400">
                    <span className="w-9 text-right">{formatTime(currentTime)}</span>
                    <div className="relative flex-1 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={progressPercent || 0}
                            onChange={(e) => seekTo(parseFloat(e.target.value))}
                            className="seek-slider"
                            style={{ '--seek-percent': `${progressPercent}%` }}
                        />
                    </div>
                    <span className="w-9 text-left">{formatTime(duration)}</span>
                </div>

            </div>

            {/* Right: Live Equalizer, Queue Drawer, Volume & Fullscreen Modal */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 w-1/4">

                {/* Live Equalizer Visualizer Bars */}
                <div className={`hidden sm:flex items-center gap-1 h-5 px-2 ${!isPlaying ? 'paused' : ''}`}>
                    <span className="equalizer-bar" />
                    <span className="equalizer-bar" />
                    <span className="equalizer-bar" />
                    <span className="equalizer-bar" />
                </div>

                {/* Queue Drawer Button */}
                <button
                    onClick={() => setIsQueueOpen(prev => !prev)}
                    className="text-neutral-400 hover:text-white transition-colors p-1"
                    title="Play Queue"
                >
                    <ListMusic className="w-5 h-5" />
                </button>

                {/* Volume Slider with Mute Toggle */}
                <div className="hidden md:flex items-center gap-2 group w-28">
                    <button
                        onClick={toggleMute}
                        className="text-neutral-400 hover:text-white transition-colors p-1"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                        ) : volume < 0.5 ? (
                            <Volume1 className="w-5 h-5" />
                        ) : (
                            <Volume2 className="w-5 h-5" />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => changeVolume(parseFloat(e.target.value))}
                        className="volume-slider"
                        style={{ '--vol-percent': `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                </div>

                {/* Expand Fullscreen Modal Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-neutral-400 hover:text-white transition-colors p-1"
                    title="Fullscreen Player"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>

            </div>

        </footer>
    );
};

export default PlayerBar;

