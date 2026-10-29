/**
 * Aurelo - Jamendo Music API Service v3.0
 * Documentation: https://developer.jamendo.com/v3.0/tracks
 */

export const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID || '91f7048a';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export const COLOR_PALETTES = [
    { c1: "#10b981", c2: "#06b6d4", c3: "#3b82f6" }, // Emerald Lagoon
    { c1: "#6366f1", c2: "#ec4899", c3: "#06b6d4" }, // Cyberpunk Neon
    { c1: "#8b5cf6", c2: "#3b82f6", c3: "#ec4899" }, // Velvet Twilight
    { c1: "#f59e0b", c2: "#ef4444", c3: "#8b5cf6" }, // Sunset Flare
    { c1: "#06b6d4", c2: "#10b981", c3: "#6366f1" }, // Deep Oceanic
    { c1: "#f43f5e", c2: "#fb923c", c3: "#a855f7" }  // Electric Coral
];

// Curated verified Jamendo tracks for offline / fallback buffer
export const MOCK_TRACKS = [
    {
        id: "1214935",
        title: "Wish You Were Here",
        artist: "The.madpix.project",
        genre: "dance",
        duration: 270,
        category: "Chill",
        cover: "https://usercontent.jamendo.com?type=album&id=145774&width=300&trackid=1214935",
        coverLg: "https://usercontent.jamendo.com?type=album&id=145774&width=600&trackid=1214935",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=1214935&format=mp32&from=JxM%2BuKvW5jA3WqOxGHyL9Q%3D%3D%7Cu%2BtP9XdvOCjQAdwFybEHoA%3D%3D",
        plays: 18450,
        colors: COLOR_PALETTES[0]
    },
    {
        id: "1932670",
        title: "RED LIGHT",
        artist: "Egor Budennyy",
        genre: "pop",
        duration: 190,
        category: "Electronic",
        cover: "https://usercontent.jamendo.com?type=album&id=477294&width=300&trackid=1932670",
        coverLg: "https://usercontent.jamendo.com?type=album&id=477294&width=600&trackid=1932670",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=1932670&format=mp32&from=9uljh9FvgbYcG2CWdKVJgw%3D%3D%7CXxSfA02jdTj3yeNYS%2BQY2g%3D%3D",
        plays: 14210,
        colors: COLOR_PALETTES[1]
    },
    {
        id: "1593988",
        title: "Lofi Chillout Hip Hop Beat",
        artist: "Joystock",
        genre: "chillhop",
        duration: 149,
        category: "Chill",
        cover: "https://usercontent.jamendo.com?type=album&id=365590&width=300&trackid=1593988",
        coverLg: "https://usercontent.jamendo.com?type=album&id=365590&width=600&trackid=1593988",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=1593988&format=mp32&from=6aumv8ZjdnW6Z%2FSznPfW9Q%3D%3D%7CNYkYXX%2FadAm4t4qnBjAKXQ%3D%3D",
        plays: 29800,
        colors: COLOR_PALETTES[2]
    },
    {
        id: "2171046",
        title: "Beautiful Chill Ambient",
        artist: "DHDMusic",
        genre: "chillout",
        duration: 183,
        category: "Ambient",
        cover: "https://usercontent.jamendo.com?type=album&id=566743&width=300&trackid=2171046",
        coverLg: "https://usercontent.jamendo.com?type=album&id=566743&width=600&trackid=2171046",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=2171046&format=mp32&from=ckw8%2Fpy432KTdVa6yhBuBg%3D%3D%7CS93un8jO2%2B075ffzMEfgAg%3D%3D",
        plays: 9640,
        colors: COLOR_PALETTES[3]
    },
    {
        id: "26737",
        title: "Breathe",
        artist: "Tryad",
        genre: "chillout",
        duration: 384,
        category: "Acoustic",
        cover: "https://usercontent.jamendo.com?type=album&id=3661&width=300&trackid=26737",
        coverLg: "https://usercontent.jamendo.com?type=album&id=3661&width=600&trackid=26737",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=26737&format=mp32&from=a07jNBh4x8IeegTckBsfSg%3D%3D%7CScVxHElS429%2F4cQ6llOVSg%3D%3D",
        plays: 38900,
        colors: COLOR_PALETTES[4]
    },
    {
        id: "15655",
        title: "Invisible Walls",
        artist: "Revolution Void",
        genre: "nujazz",
        duration: 420,
        category: "Ambient",
        cover: "https://usercontent.jamendo.com?type=album&id=2225&width=300&trackid=15655",
        coverLg: "https://usercontent.jamendo.com?type=album&id=2225&width=600&trackid=15655",
        audioUrl: "https://prod-1.storage.jamendo.com/?trackid=15655&format=mp32&from=ecJ41Il4cwT2t%2Ff%2FgHEL9w%3D%3D%7CC96Xi1I3yFIHEY2shGcX6Q%3D%3D",
        plays: 47200,
        colors: COLOR_PALETTES[5]
    }
];

    export const normalizeJamendoTrack = (item, index = 0) => {
        const rawCover = item.image || item.album_image || '';
        const coverSm = rawCover || MOCK_TRACKS[0].cover;
        const coverLg = rawCover ? rawCover.replace('width=300', 'width=600') : coverSm;

        const genre = item.musicinfo?.tags?.genres?.[0] ||
            item.musicinfo?.tags?.vartags?.[0] ||
            'Indie';

        const colorPreset = COLOR_PALETTES[index % COLOR_PALETTES.length];

        return {
            id: String(item.id || `jamendo-${index}`),
            title: item.name || "Untitled Track",
            artist: item.artist_name || "Jamendo Artist",
            genre: genre.charAt(0).toUpperCase() + genre.slice(1),
            duration: Math.round(item.duration || 180),
            category: genre,
            cover: coverSm,
            coverLg: coverLg,
            audioUrl: item.audio || item.audiodownload,
            plays: Math.floor(Math.random() * 9000 + 1500),
            colors: colorPreset
        };
    };

        /**
         * Fetch tracks from Jamendo API
         * @param {string} category - Optional tag filter (e.g. 'all', 'chill', 'electronic', 'acoustic', 'workout', 'ambient')
         */
        export const fetchTracks = async (category = 'all') => {
            try {
                const params = new URLSearchParams({
                    client_id: JAMENDO_CLIENT_ID,
                    format: 'json',
                    limit: '35',
                    order: 'popularity_total',
                    audioformat: 'mp32',
                    include: 'musicinfo'
                });

                            if (category && category !== 'all' && category !== 'favorites') {
                                const tagMap = {
                                    chill: 'chillout+lofi',
                                    electronic: 'electronic+dance',
                                    acoustic: 'acoustic',
                                    workout: 'energetic+workout',
                                    ambient: 'ambient+relaxation'
                                };
                                params.set('tags', tagMap[category.toLowerCase()] || category);
                            }

                            const url = `${BASE_URL}/tracks/?${params.toString()}`;
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), 6000);

                            const res = await fetch(url, { signal: controller.signal });
                            clearTimeout(timeoutId);

                            if (res.ok) {
                                const json = await res.json();
                                if (json.headers?.status === 'success' && Array.isArray(json.results) && json.results.length > 0) {
                                    return {
                                        tracks: json.results.map((item, idx) => normalizeJamendoTrack(item, idx)),
                                        isLive: true
                                    };
                                }
                            }
                        } catch (err) {
                            console.warn('Jamendo API fetch failed, activating fallback buffer:', err.message);
                        }

                        return {
                            tracks: [...MOCK_TRACKS],
                            isLive: false
                        };
                    };

                    /**
                     * Live search Jamendo API by track or artist name
                     */
                    export const searchTracks = async (query, localTracks = []) => {
                        if (!query?.trim()) return [];

                        try {
                            const params = new URLSearchParams({
                                client_id: JAMENDO_CLIENT_ID,
                                format: 'json',
                                limit: '24',
                                namesearch: query.trim(),
                                order: 'popularity_total',
                                audioformat: 'mp32',
                                include: 'musicinfo'
                            });

                            const url = `${BASE_URL}/tracks/?${params.toString()}`;
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), 5000);

                            const res = await fetch(url, { signal: controller.signal });
                            clearTimeout(timeoutId);

                            if (res.ok) {
                                const json = await res.json();
                                    if (json.headers?.status === 'success' && Array.isArray(json.results) && json.results.length > 0) {
                                        return json.results.map((item, idx) => normalizeJamendoTrack(item, idx));
                                    }
                                }
                            } catch (e) {
                                console.warn('Jamendo search failed, falling back to local search');
                            }

                            // Client-side fallback filter
                            const q = query.toLowerCase();
                            return localTracks.filter(t =>
                                t.title.toLowerCase().includes(q) ||
                                t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q)
                            );
                        };
