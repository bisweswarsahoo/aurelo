import React from 'react';
import { useAudio } from '../context/AudioContext';
import {
    X,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Heart
} from 'lucide-react';
import AudioSeekbar from './AudioSeekbar';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const ExpandedModal = () => {
    const {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        togglePlayPause,
        nextTrack,
        prevTrack,
        seekTo,
        toggleLike,
        likedTrackIds,
        isModalOpen,
        setIsModalOpen
    } = useAudio();

    if (!isModalOpen || !currentTrack) return null;

    const isLiked = likedTrackIds.has(currentTrack.id);

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl flex flex-col p-6 sm:p-12 overflow-y-auto transition-all duration-300">

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                        Now Streaming • Aurelo Lossless
                    </span>
                </div>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Close"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Immersive Body */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8 max-w-5xl mx-auto w-full">

                {/* Immense Album Artwork with 3D Drop Glow */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/15 relative flex-shrink-0">
                    <img
                        src={currentTrack.coverLg || currentTrack.cover}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Track Info & Huge Controls */}
                <div className="w-full max-w-md space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-emerald-400 border border-white/10 inline-block">
                            {currentTrack.genre}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                            {currentTrack.title}
                        </h2>
                        <p className="text-lg text-neutral-300 font-medium">
                            {currentTrack.artist}
                        </p>
                    </div>

                    {/* Scrub Slider */}
                    <div className="space-y-1.5">
                            <AudioSeekbar
                                currentTime={currentTime}
                                duration={duration}
                                onSeek={seekTo}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs font-mono text-neutral-400">
                                <span className="tabular-nums">{formatTime(currentTime)}</span>
                                <span className="tabular-nums">{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Action Controls */}
                        <div className="flex items-center justify-center md:justify-start gap-8 pt-2">
                            <button
                                onClick={() => toggleLike(currentTrack.id)}
                                className="p-2 text-neutral-400 hover:text-white transition-colors"
                            >
                                <Heart className={`w-6 h-6 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
                            </button>

                            <button
                                onClick={prevTrack}
                                className="text-neutral-300 hover:text-white transition-colors"
                            >
                                <SkipBack className="w-8 h-8 fill-current" />
                            </button>

                            <button
                                onClick={togglePlayPause}
                                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                            >
                                {isPlaying ? (
                                    <Pause className="w-8 h-8 fill-current" />
                                ) : (
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                )}
                            </button>

                            <button
                                onClick={() => nextTrack(false)}
                                className="text-neutral-300 hover:text-white transition-colors"
                            >
                                <SkipForward className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            );
};

            export default ExpandedModal;
