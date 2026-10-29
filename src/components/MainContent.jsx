import React from 'react';
import { useAudio } from '../context/AudioContext';
import {
    Search,
    X,
    Play,
    Pause,
    Heart,
    Menu,
    Sparkles,
    Clock,
    Headphones
} from 'lucide-react';

const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MainContent = () => {
    const {
        tracks,
        currentTrack,
        isPlaying,
        playTrack,
        togglePlayPause,
        toggleLike,
        likedTrackIds,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        isLoading,
        setIsSidebarOpen
    } = useAudio();

    // Filter tracks based on active category
    const filteredTracks = React.useMemo(() => {
        if (activeCategory === 'favorites') {
            return tracks.filter(t => likedTrackIds.has(t.id));
        }
        if (activeCategory === 'all') {
            return tracks;
        }
        const cat = activeCategory.toLowerCase();
        return tracks.filter(t =>
            t.genre.toLowerCase().includes(cat) ||
            t.category.toLowerCase().includes(cat)
        );
    }, [tracks, activeCategory, likedTrackIds]);

    const heroTrack = filteredTracks[0] || tracks[0];

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'chill', label: 'Chill' },
        { id: 'electronic', label: 'Electronic' },
        { id: 'acoustic', label: 'Acoustic' },
        { id: 'workout', label: 'Workout' },
        { id: 'ambient', label: 'Ambient' },
    ];

    return (
        <main className="flex-1 flex flex-col overflow-hidden relative">

            {/* Sticky Glassmorphic Header */}
            <header className="sticky top-0 z-30 px-4 sm:px-8 py-3.5 glass-panel border-b border-white/5 flex items-center justify-between gap-4">

                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search Bar */}
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-emerald-400 transition-colors">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tracks, artists, genres... (Press /)"
                            className="w-full pl-10 pr-10 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.09] focus:bg-neutral-900 border border-white/10 focus:border-emerald-500/50 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Pills & Avatar */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-1.5">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${activeCategory === cat.id
                                        ? 'bg-white text-neutral-950 font-bold shadow-sm'
                                        : 'bg-white/5 hover:bg-white/10 text-neutral-300 font-medium'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

            </header>

            {/* Scrollable Stage Content */}
            <div id="main-content-scroll" className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-10">

                {/* SEARCH RESULTS VIEW */}
                {searchQuery.trim() && (
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight font-display text-white">
                                Search Results
                            </h2>
                            <span className="text-xs text-neutral-400 font-mono">
                                {isSearching ? 'Searching...' : `${searchResults.length} ${searchResults.length === 1 ? 'track' : 'tracks'}`}
                            </span>
                        </div>

                        {searchResults.length === 0 && !isSearching ? (
                            <div className="py-12 text-center text-neutral-400 glass-card rounded-2xl p-8">
                                <Search className="w-12 h-12 mx-auto mb-3 text-neutral-500" />
                                <p className="text-base font-semibold text-white">No tracks found</p>
                                <p className="text-xs text-neutral-500 mt-1">Try another keyword like "Chill", "Electronic", "Acoustic", or "Beat"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {searchResults.map(track => (
                                    <TrackCard key={track.id} track={track} />
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* HERO SPOTLIGHT SECTION */}
                {!searchQuery && heroTrack && (
                    <section>
                        <div
                            className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 glass-panel shadow-2xl transition-all duration-700"
                            style={{
                                background: `linear-gradient(135deg, ${heroTrack.colors.c1}26 0%, ${heroTrack.colors.c2}15 50%, rgba(10,12,18,0.85) 100%)`
                            }}
                        >
                            {/* Inner Ambient Glow Orbs */}
                            <div
                                className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
                                style={{ background: heroTrack.colors.c1 }}
                            />
                            <div
                                className="absolute right-40 -bottom-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
                                style={{ background: heroTrack.colors.c2 }}
                            />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                <div
                                    onClick={() => playTrack(heroTrack)}
                                    className="relative group cursor-pointer flex-shrink-0"
                                >
                                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/15 transition-transform duration-500 group-hover:scale-[1.03]">
                                        <img src={heroTrack.coverLg || heroTrack.cover} alt={heroTrack.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                            {currentTrack?.id === heroTrack.id && isPlaying ? (
                                                <Pause className="w-8 h-8 fill-current" />
                                            ) : (
                                                <Play className="w-8 h-8 fill-current ml-1" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium tracking-wider uppercase text-neutral-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        Spotlight Selection
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none font-display">
                                        {heroTrack.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-neutral-300 font-medium">
                                        {heroTrack.artist} <span className="text-neutral-500 mx-2">•</span> <span className="text-neutral-400 font-normal">{heroTrack.genre}</span>
                                    </p>
                                    <p className="text-sm text-neutral-400 max-w-xl line-clamp-2 leading-relaxed">
                                        Immerse in pristine acoustic depth and atmospheric harmony. Stream instantly in ultra-high fidelity with Apple Music glassmorphism and Spotify ergonomics.
                                    </p>

                                    <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <button
                                            onClick={() => playTrack(heroTrack)}
                                            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                                        >
                                            {currentTrack?.id === heroTrack.id && isPlaying ? (
                                                <>
                                                    <Pause className="w-5 h-5 fill-current" />
                                                    <span>Pause Stream</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                                    <span>Play Track</span>
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => toggleLike(heroTrack.id)}
                                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 backdrop-blur-md transition-all duration-200"
                                        >
                                            <Heart className={`w-5 h-5 ${likedTrackIds.has(heroTrack.id) ? 'text-rose-500 fill-current' : 'text-neutral-300'}`} />
                                            <span>{likedTrackIds.has(heroTrack.id) ? 'Saved' : 'Add to Favs'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* TRENDING TRACKS GRID */}
                <section id="trending-section" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-white">
                                {activeCategory === 'favorites' ? 'Your Liked Collection' : 'Trending Vibes'}
                            </h2>
                            <p className="text-xs sm:text-sm text-neutral-400">
                                {activeCategory === 'favorites'
                                    ? 'All tracks marked with your heart'
                                    : 'Stream the hottest royalty-free gems in lossless audio'}
                            </p>
                        </div>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
                        >
                            View All
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="glass-card p-3.5 rounded-2xl space-y-3">
                                    <div className="w-full aspect-square rounded-xl skeleton" />
                                    <div className="h-4 w-3/4 rounded skeleton" />
                                    <div className="h-3 w-1/2 rounded skeleton" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                            {filteredTracks.slice(0, 12).map((track) => (
                                <TrackCard key={track.id} track={track} />
                            ))}
                        </div>
                    )}
                </section>

                {/* TOP TRACKS LIST TABLE */}
                <section id="top-tracks-section" className="space-y-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-white">
                            Most Streamed Studio Tracks
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-400">
                            Ranked by global community play metrics
                        </p>
                    </div>

                    <div className="glass-panel rounded-2xl p-2 sm:p-4 border border-white/5">
                        <div className="divide-y divide-white/[0.04] space-y-1">
                            {filteredTracks.slice(0, 8).map((track, idx) => {
                                const isCurrent = currentTrack?.id === track.id;
                                const isThisPlaying = isCurrent && isPlaying;
                                const isLiked = likedTrackIds.has(track.id);

                                return (
                                    <div
                                        key={track.id}
                                        onClick={() => playTrack(track)}
                                        className={`group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-white/[0.06] transition-all cursor-pointer ${isCurrent ? 'bg-white/[0.08] ring-1 ring-emerald-500/30' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                            <div className="w-6 text-center text-sm font-semibold text-neutral-500 group-hover:text-white flex-shrink-0">
                                                {isThisPlaying ? (
                                                    <div className="flex items-center justify-center gap-0.5 h-4">
                                                        <span className="equalizer-bar" style={{ height: 12 }} />
                                                        <span className="equalizer-bar" style={{ height: 18 }} />
                                                        <span className="equalizer-bar" style={{ height: 8 }} />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="group-hover:hidden">{idx + 1}</span>
                                                        <Play className="w-4 h-4 hidden group-hover:block mx-auto fill-current text-white ml-0.5" />
                                                    </>
                                                )}
                                            </div>

                                            <img
                                                src={track.cover}
                                                alt={track.title}
                                                className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-white/10 shadow-sm"
                                            />

                                            <div className="min-w-0">
                                                <p className={`text-sm font-semibold truncate ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                                                    {track.title}
                                                </p>
                                                <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 text-xs text-neutral-400">
                                            <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[11px] text-neutral-400">
                                                {track.genre}
                                            </span>
                                            <span className="hidden sm:inline-block font-mono">
                                                {(track.plays || 1200).toLocaleString()} plays
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLike(track.id);
                                                }}
                                                className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
                                            >
                                                <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
                                            </button>
                                            <span className="font-mono w-10 text-right">
                                                {formatTime(track.duration)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* MOODS & ACTIVITIES GRID */}
                <section className="space-y-4 pb-12">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-white">
                        Curated Moods
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div
                            onClick={() => setActiveCategory('chill')}
                            className="group relative rounded-2xl p-5 overflow-hidden cursor-pointer h-32 border border-white/10 glass-card bg-gradient-to-br from-cyan-600/30 to-blue-900/40"
                        >
                            <span className="relative z-10 text-lg font-bold text-white block">Chill & Study</span>
                            <span className="relative z-10 text-xs text-neutral-400 block mt-1">Calm rhythmic beats</span>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-cyan-500/30 blur-xl group-hover:scale-150 transition-transform duration-500" />
                        </div>

                        <div
                            onClick={() => setActiveCategory('electronic')}
                            className="group relative rounded-2xl p-5 overflow-hidden cursor-pointer h-32 border border-white/10 glass-card bg-gradient-to-br from-purple-600/30 to-pink-900/40"
                        >
                            <span className="relative z-10 text-lg font-bold text-white block">Synthwave</span>
                            <span className="relative z-10 text-xs text-neutral-400 block mt-1">Neon retro-future</span>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-purple-500/30 blur-xl group-hover:scale-150 transition-transform duration-500" />
                        </div>

                        <div
                            onClick={() => setActiveCategory('workout')}
                            className="group relative rounded-2xl p-5 overflow-hidden cursor-pointer h-32 border border-white/10 glass-card bg-gradient-to-br from-emerald-600/30 to-teal-900/40"
                        >
                            <span className="relative z-10 text-lg font-bold text-white block">Workout Surge</span>
                            <span className="relative z-10 text-xs text-neutral-400 block mt-1">High-BPM adrenaline</span>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-emerald-500/30 blur-xl group-hover:scale-150 transition-transform duration-500" />
                        </div>

                        <div
                            onClick={() => setActiveCategory('acoustic')}
                            className="group relative rounded-2xl p-5 overflow-hidden cursor-pointer h-32 border border-white/10 glass-card bg-gradient-to-br from-amber-600/30 to-rose-900/40"
                        >
                            <span className="relative z-10 text-lg font-bold text-white block">Warm Acoustic</span>
                            <span className="relative z-10 text-xs text-neutral-400 block mt-1">Organic strings & keys</span>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-amber-500/30 blur-xl group-hover:scale-150 transition-transform duration-500" />
                        </div>
                    </div>
                </section>

            </div>

        </main>
    );
};

// Sub-component for clean reusable track cards
const TrackCard = ({ track }) => {
    const { currentTrack, isPlaying, playTrack, toggleLike, likedTrackIds } = useAudio();
    const isCurrent = currentTrack?.id === track.id;
    const isThisPlaying = isCurrent && isPlaying;
    const isLiked = likedTrackIds.has(track.id);

    return (
        <div
            onClick={() => playTrack(track)}
            className={`glass-card group relative p-3.5 rounded-2xl cursor-pointer select-none transition-all duration-300 ${isCurrent ? 'ring-1 ring-emerald-500/50 bg-white/[0.08]' : ''
                }`}
        >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3.5 bg-neutral-900 border border-white/5 shadow-md">
                <img
                    src={track.cover}
                    alt={track.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Spotify-style play button */}
                <div className={`absolute bottom-2.5 right-2.5 transform transition-all duration-300 ${isThisPlaying
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 scale-95 group-hover:scale-100'
                    }`}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            playTrack(track);
                        }}
                        className="w-11 h-11 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                    >
                        {isThisPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                    </button>
                </div>

                {isThisPlaying && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        STREAMING
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm font-bold truncate tracking-tight ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
                        {track.title}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                        }}
                        className="text-neutral-400 hover:text-white p-1 rounded-full transition-colors flex-shrink-0"
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-current' : ''}`} />
                    </button>
                </div>
                <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] uppercase font-medium tracking-wider">
                        {track.genre}
                    </span>
                    <span>{formatTime(track.duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default MainContent;

