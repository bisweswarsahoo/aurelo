import React, { useState, useRef, useCallback } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

const VolumeControl = ({
    volume = 0.8,
    isMuted = false,
    onVolumeChange,
    onToggleMute,
    className = ""
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState(0);
    const [hoverPercent, setHoverPercent] = useState(null);
    const [hoverPos, setHoverPos] = useState(0);
    const containerRef = useRef(null);

    const effectiveVolume = isMuted ? 0 : volume;
    const currentPercent = isDragging ? dragPercent : effectiveVolume * 100;

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
        if (onVolumeChange) {
            onVolumeChange(percent / 100);
        }

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
            if (onVolumeChange) {
                onVolumeChange(percent / 100);
            }
        }
    };

    const handlePointerUp = (e) => {
        if (isDragging) {
            const finalPercent = calculatePercent(e.clientX);
            setIsDragging(false);
            if (onVolumeChange) {
                onVolumeChange(finalPercent / 100);
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

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onVolumeChange(Math.min(1, effectiveVolume + 0.05));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onVolumeChange(Math.max(0, effectiveVolume - 0.05));
        } else if (e.key === 'm' || e.key === 'M') {
            e.preventDefault();
            onToggleMute();
        }
    };

    const displayPercent = Math.round(isDragging ? dragPercent : currentPercent);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Mute Button */}
            <button
                onClick={onToggleMute}
                className="text-neutral-400 hover:text-white transition-colors p-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                title={isMuted ? "Unmute" : "Mute (M)"}
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {effectiveVolume === 0 || isMuted ? (
                    <VolumeX className="w-5 h-5 text-neutral-500 hover:text-white transition-colors" />
                ) : effectiveVolume < 0.5 ? (
                    <Volume1 className="w-5 h-5" />
                ) : (
                    <Volume2 className="w-5 h-5" />
                )}
            </button>

            {/* Volume Track Container */}
            <div
                ref={containerRef}
                role="slider"
                tabIndex={0}
                aria-label="Volume slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={displayPercent}
                aria-valuetext={`${displayPercent}% volume`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onPointerLeave={handlePointerLeave}
                onKeyDown={handleKeyDown}
                className="relative flex items-center h-7 py-2 cursor-pointer group select-none touch-none w-24 sm:w-28 md:w-32 focus:outline-none"
            >
                {/* Volume Tooltip on Hover / Drag */}
                {(hoverPercent !== null || isDragging) && (
                    <div
                        className="absolute -top-7 px-1.5 py-0.5 rounded-md bg-neutral-900/95 border border-white/15 text-[10px] font-mono font-medium text-white shadow-xl pointer-events-none -translate-x-1/2 z-30 transition-all duration-75 ease-out backdrop-blur-md"
                        style={{ left: `${isDragging ? (currentPercent / 100) * (containerRef.current?.getBoundingClientRect().width || 100) : hoverPos}px` }}
                    >
                        {displayPercent}%
                    </div>
                )}

                {/* Track Background */}
                <div className="relative w-full h-1 group-hover:h-1.5 rounded-full bg-white/20 group-hover:bg-white/25 transition-all duration-150 ease-out overflow-visible">
                    {/* Fill Bar */}
                    <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-colors duration-150 ease-out ${isMuted
                                ? 'bg-neutral-500'
                                : 'bg-white group-hover:bg-emerald-400 group-active:bg-emerald-400 shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                            }`}
                        style={{ width: `${currentPercent}%` }}
                    />

                    {/* Volume Thumb */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-all duration-150 ease-out pointer-events-none z-10 ${isDragging
                                ? 'opacity-100 scale-125 ring-2 ring-emerald-400/40 bg-emerald-300'
                                : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                            }`}
                        style={{ left: `${currentPercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VolumeControl;

