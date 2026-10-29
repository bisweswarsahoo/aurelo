import React from 'react';
import { useAudio } from '../context/AudioContext';
import {
    Compass,
    TrendingUp,
    Library,
    Heart,
    Plus,
    X,
    Radio,
    Zap,
    Sparkles,
    Flame,
    Coffee
} from 'lucide-react';

const Sidebar = () => {
    const {
        likedTrackIds,
        activeCategory,
        setActiveCategory,
        isLiveApi,
        isSidebarOpen,
        setIsSidebarOpen
    } = useAudio();

    const playlists = [
        { id: 'chill', name: 'Late Night Lo-Fi', icon: Coffee, color: 'text-cyan-400' },
        { id: 'electronic', name: 'Electronic Euphoria', icon: Zap, color: 'text-purple-400' },
        { id: 'acoustic', name: 'Acoustic Sunset', icon: Sparkles, color: 'text-amber-400' },
        { id: 'workout', name: 'High Octane Workout', icon: Flame, color: 'text-rose-400' },
        { id: 'ambient', name: 'Deep Focus & Flow', icon: Radio, color: 'text-emerald-400' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close mobile sidebar backdrop"
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-64 md:relative md:flex flex-col bg-neutral-950/95 md:bg-neutral-950/70 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>

                {/* Brand Header */}
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <div
                        onClick={() => setActiveCategory('all')}
                        className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform border border-white/10 bg-black flex items-center justify-center">
                            <img src="/logo.png" alt="Aurelo Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="font-bold tracking-wider text-white font-display">AURELO</span>
                            <span className="block text-[10px] tracking-widest uppercase text-neutral-400 font-semibold">
                                Lossless Audio
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-neutral-400 hover:text-white p-1 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Primary Navigation */}
                <div className="px-4 py-4 space-y-1">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCategory === 'all'
                            ? 'text-white bg-white/10 shadow-sm'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Compass className={`w-5 h-5 ${activeCategory === 'all' ? 'text-emerald-400' : ''}`} />
                        <span>Explore</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveCategory('all');
                            document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all"
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span>Trending Charts</span>
                    </button>

                    <button
                        onClick={() => {
                            setActiveCategory('all');
                            document.getElementById('top-tracks-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all"
                    >
                        <Library className="w-5 h-5" />
                        <span>All Tracks</span>
                    </button>

                    <button
                        onClick={() => setActiveCategory('favorites')}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === 'favorites'
                            ? 'text-white bg-white/10'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Heart className="w-5 h-5 text-rose-500 fill-current" />
                            <span>Liked Songs</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-neutral-300">
                            {likedTrackIds.size}
                        </span>
                    </button>
                </div>

                <div className="mx-6 my-2 border-t border-white/5" />

                {/* Curated Playlists */}
                <div className="px-6 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Curated Playlists
                    </span>
                    <button className="text-neutral-400 hover:text-white transition-colors p-1" title="New Playlist">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-1 space-y-1">
                    {playlists.map((pl) => {
                        const Icon = pl.icon;
                        const isActive = activeCategory === pl.id;
                        return (
                            <button
                                key={pl.id}
                                onClick={() => setActiveCategory(pl.id)}
                                className={`w-full text-left px-3.5 py-2 rounded-lg text-sm transition-all truncate flex items-center gap-2.5 ${isActive
                                    ? 'text-white bg-white/10 font-semibold'
                                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${pl.color}`} />
                                <span className="truncate">{pl.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Footer API Live Status */}
                <div className="p-4 border-t border-white/5">
                    <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                        <span className="text-xs font-medium text-neutral-300">
                            {isLiveApi ? 'Jamendo API Live' : 'Curated Studio Master'}
                        </span>
                    </div>
                </div>

            </aside >
        </>
    );
};

export default Sidebar;

