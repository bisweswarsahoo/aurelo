import React, { useState, useRef, useEffect, useCallback } from 'react';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioSeekbar = ({ currentTime = 0, duration = 0, onSeek, className = "" }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState(0);
    const [hoverPercent, setHoverPercent] = useState(null);
    const [hoverPos, setHoverPos] = useState(0);
    const containerRef = useRef(null);

    // Audio progress percentage (0 - 100)
    const activePercent = isDragging
        ? dragPercent
        : duration > 0
            ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
            : 0;

    const calculatePercent = useCallback((clientX) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width <= 0) return 0;
        const relativeX = clientX - rect.left;
        const clampedX = Math.max(0, Math.min(rect.width, relativeX));
        return (clampedX / rect.width) * 100;
    }, []);

    const handlePointerDown = (e) => {
        e.preventDefault();
        const percent = calculatePercent(e.clientX);
        setIsDragging(true);
        setDragPercent(percent);

        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) { }
    };

    const handlePointerMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        setHoverPos(relativeX);
        const percent = (relativeX / rect.width) * 100;
        setHoverPercent(percent);

        if (isDragging) {
            setDragPercent(percent);
        }
    };

    const handlePointerUp = (e) => {
        if (isDragging) {
            const finalPercent = calculatePercent(e.clientX);
            setIsDragging(false);
            if (onSeek) {
                onSeek(finalPercent);
            }
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch (_) { }
        }
    };

    const handlePointerCancel = (e) => {
        if (isDragging) {
            setIsDragging(false);
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch (_) { }
        }
    };

    const handlePointerLeave = () => {
        if (!isDragging) {
            setHoverPercent(null);
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (duration <= 0) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            const step = (5 / duration) * 100;
            onSeek(Math.min(100, activePercent + step));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            const step = (5 / duration) * 100;
            onSeek(Math.max(0, activePercent - step));
        }
    };

    const hoverSeconds = hoverPercent !== null && duration > 0 ? (hoverPercent / 100) * duration : 0;

    return (
        <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Audio playback seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(isDragging ? (dragPercent / 100) * duration : currentTime)}
            aria-valuetext={formatTime(isDragging ? (dragPercent / 100) * duration : currentTime)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerLeave}
            onKeyDown={handleKeyDown}
            className={`relative flex items-center h-7 py-2 cursor-pointer group select-none touch-none focus:outline-none ${className}`}
        >
            {/* Tooltip Timestamp on Hover */}
            {hoverPercent !== null && duration > 0 && (
                <div
                    className="absolute -top-7 px-2 py-0.5 rounded-md bg-neutral-900/95 border border-white/15 text-[10px] font-mono font-medium text-white shadow-xl pointer-events-none -translate-x-1/2 z-30 transition-all duration-75 ease-out backdrop-blur-md"
                    style={{ left: `${hoverPos}px` }}
                >
                    {formatTime(hoverSeconds)}
                </div>
            )}

            {/* Track Background */}
            <div className="relative w-full h-1 group-hover:h-1.5 rounded-full bg-white/20 group-hover:bg-white/25 transition-all duration-150 ease-out overflow-visible">
                {/* Buffered / Fill Bar */}
                <div
                    className="absolute left-0 top-0 h-full rounded-full bg-white group-hover:bg-emerald-400 group-active:bg-emerald-400 transition-colors duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                    style={{ width: `${activePercent}%` }}
                />

                {/* Scrubber Knob / Thumb */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-all duration-150 ease-out pointer-events-none z-10 ${isDragging
                            ? 'opacity-100 scale-125 ring-2 ring-emerald-400/40 bg-emerald-300'
                            : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                        }`}
                    style={{ left: `${activePercent}%` }}
                />
            </div>
        </div>
    );
};

export default AudioSeekbar;

