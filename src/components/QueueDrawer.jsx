import React from 'react';
import { useAudio } from '../context/AudioContext';
import { ListMusic, X } from 'lucide-react';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const QueueDrawer = () => {
    const { queue, currentTrack, playTrack, isQueueOpen, setIsQueueOpen } = useAudio();

    return (
        <div 
            className={`fixed inset-y-0 right-0 z-50 w-80 bg-neutral-950/95 backdrop-blur-3xl border-l border-white/10 transform transition-transform duration-300 flex flex-col shadow-2xl ${
                isQueueOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ListMusic className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white text-base">Play Queue</h3>
                </div>
                <button 
                    onClick={() => setIsQueueOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {queue.map((t) => {
                    const isCurrent = currentTrack?.id === t.id;
                    return (
                        <div
                            key={t.id}
                            onClick={() => playTrack(t)}
                            className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors ${
                                isCurrent ? 'bg-white/10 border-l-2 border-emerald-400' : ''
                            }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <img 
                                    src={t.cover} 
                                    alt={t.title} 
                                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                    <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                                        {t.title}
                                    </p>
                                    <p className="text-[11px] text-neutral-400 truncate">{t.artist}</p>
                                </div>
                            </div>
                            <span className="text-[11px] font-mono text-neutral-500 flex-shrink-0 ml-2">
                                {formatTime(t.duration)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QueueDrawer;

