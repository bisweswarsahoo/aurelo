/**
 * Aurelo - API Service & Verified Mock Fallbacks
 * Interacting with https://api.freetouse.com/v3
 */

export const COLOR_PALETTES = [
    { c1: "#10b981", c2: "#06b6d4", c3: "#3b82f6" }, // Emerald Lagoon
    { c1: "#6366f1", c2: "#ec4899", c3: "#06b6d4" }, // Cyberpunk Neon
    { c1: "#8b5cf6", c2: "#3b82f6", c3: "#ec4899" }, // Velvet Twilight
    { c1: "#f59e0b", c2: "#ef4444", c3: "#8b5cf6" }, // Sunset Flare
    { c1: "#06b6d4", c2: "#10b981", c3: "#6366f1" }, // Deep Oceanic
    { c1: "#f43f5e", c2: "#fb923c", c3: "#a855f7" }  // Electric Coral
];

export const MOCK_TRACKS = [
    {
        id: "fc95e0bb-e942-4c4b-874b-a194fd200cf3",
        title: "Akaneiro",
        artist: "Johny Grimes",
        genre: "Chill",
        duration: 126,
        category: "Chill",
        cover: "https://eu.data.freetouse.com/music/tracks/fc95e0bb-e942-4c4b-874b-a194fd200cf3/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/fc95e0bb-e942-4c4b-874b-a194fd200cf3/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/fc95e0bb-e942-4c4b-874b-a194fd200cf3/file/mp3/file.mp3",
        plays: 3410,
        colors: COLOR_PALETTES[0]
    },
    {
        id: "fb14b652-8833-49ff-94f7-f126990c4460",
        title: "Run",
        artist: "Unheard",
        genre: "Electronic",
        duration: 181,
        category: "Workout",
        cover: "https://eu.data.freetouse.com/music/tracks/fb14b652-8833-49ff-94f7-f126990c4460/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/fb14b652-8833-49ff-94f7-f126990c4460/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/fb14b652-8833-49ff-94f7-f126990c4460/file/mp3/file.mp3",
        plays: 8940,
        colors: COLOR_PALETTES[1]
    },
    {
        id: "253bde6c-990f-47d3-94a4-5c2595cc4b32",
        title: "Lighthearted",
        artist: "Zambolino",
        genre: "Acoustic",
        duration: 154,
        category: "Acoustic",
        cover: "https://eu.data.freetouse.com/music/tracks/253bde6c-990f-47d3-94a4-5c2595cc4b32/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/253bde6c-990f-47d3-94a4-5c2595cc4b32/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/253bde6c-990f-47d3-94a4-5c2595cc4b32/file/mp3/file.mp3",
        plays: 5210,
        colors: COLOR_PALETTES[2]
    },
    {
        id: "25cb8e0d-e929-4877-9529-7294041d9519",
        title: "Drowning In The Fog Of Yours",
        artist: "Johny Grimes",
        genre: "Orchestral",
        duration: 130,
        category: "Cinematic",
        cover: "https://eu.data.freetouse.com/music/tracks/25cb8e0d-e929-4877-9529-7294041d9519/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/25cb8e0d-e929-4877-9529-7294041d9519/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/25cb8e0d-e929-4877-9529-7294041d9519/file/mp3/file.mp3",
        plays: 4120,
        colors: COLOR_PALETTES[3]
    },
    {
        id: "d28fb596-cc04-421e-b749-04aef6adcbef",
        title: "Peace",
        artist: "Unheard",
        genre: "Electronic",
        duration: 133,
        category: "Chill",
        cover: "https://eu.data.freetouse.com/music/tracks/d28fb596-cc04-421e-b749-04aef6adcbef/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/d28fb596-cc04-421e-b749-04aef6adcbef/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/d28fb596-cc04-421e-b749-04aef6adcbef/file/mp3/file.mp3",
        plays: 6890,
        colors: COLOR_PALETTES[4]
    },
    {
        id: "cdb374ee-fd0d-464d-8b69-49faef2b2f1a",
        title: "Soft Static",
        artist: "Zolvi",
        genre: "Soundtrack",
        duration: 135,
        category: "Ambient",
        cover: "https://eu.data.freetouse.com/music/tracks/cdb374ee-fd0d-464d-8b69-49faef2b2f1a/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/cdb374ee-fd0d-464d-8b69-49faef2b2f1a/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/cdb374ee-fd0d-464d-8b69-49faef2b2f1a/file/mp3/file.mp3",
        plays: 2980,
        colors: COLOR_PALETTES[5]
    },
    {
        id: "ede4ae2d-3acd-4548-867e-dc98e794ce9c",
        title: "Careful Advance",
        artist: "Zolvi",
        genre: "Soundtrack",
        duration: 138,
        category: "Mysterious",
        cover: "https://eu.data.freetouse.com/music/tracks/ede4ae2d-3acd-4548-867e-dc98e794ce9c/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/ede4ae2d-3acd-4548-867e-dc98e794ce9c/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/ede4ae2d-3acd-4548-867e-dc98e794ce9c/file/mp3/file.mp3",
        plays: 3870,
        colors: COLOR_PALETTES[0]
    },
    {
        id: "b88aa78d-6909-45ba-98ce-9a16d929fe10",
        title: "Bare Signal",
        artist: "Zolvi",
        genre: "Electronic",
        duration: 149,
        category: "Electronic",
        cover: "https://eu.data.freetouse.com/music/tracks/b88aa78d-6909-45ba-98ce-9a16d929fe10/cover/webp/md/cover-md.webp",
        coverLg: "https://eu.data.freetouse.com/music/tracks/b88aa78d-6909-45ba-98ce-9a16d929fe10/cover/webp/lg/cover-lg.webp",
        audioUrl: "https://eu.data.freetouse.com/music/tracks/b88aa78d-6909-45ba-98ce-9a16d929fe10/file/mp3/file.mp3",
        plays: 4720,
        colors: COLOR_PALETTES[1]
    }
];

export const normalizeTrack = (item, index = 0) => {
    const artistName = (item.artists && item.artists[0] && item.artists[0][1]?.name)
        ? item.artists[0][1].name
        : (item.record_label || "Aurelo Artists");

    const categoryName = (item.categories && item.categories[0] && item.categories[0][1]?.name)
        ? item.categories[0][1].name
        : (item.genre || "Electronic");

    const colorPreset = COLOR_PALETTES[index % COLOR_PALETTES.length];

    return {
        id: item.id || `track-${index}`,
        title: item.title || "Untitled Track",
        artist: artistName,
        genre: item.genre || categoryName,
        duration: Math.round(item.duration || 180),
        category: categoryName,
        cover: item.thumbnails?.md || item.thumbnails?.sm || MOCK_TRACKS[0].cover,
        coverLg: item.thumbnails?.lg || item.thumbnails?.xl || MOCK_TRACKS[0].coverLg,
        audioUrl: item.files?.mp3 || MOCK_TRACKS[index % MOCK_TRACKS.length].audioUrl,
        plays: item.plays || Math.floor(Math.random() * 5000 + 1200),
        colors: colorPreset
    };
};

export const fetchTracks = async () => {
    const endpoints = [
        'https://api.freetouse.com/v3/music/tracks/all?limit=30',
        'https://api.freetouse.com/v3/tracks'
    ];

    for (const url of endpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4500);
            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const json = await res.json();
                if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
                    return {
                        tracks: json.data.map((item, idx) => normalizeTrack(item, idx)),
                        isLive: true
                    };
                }
            }
        } catch (err) {
            console.warn(`Aurelo API fetch attempt failed for ${url}:`, err.message);
        }
    }

    // Fallback to verified local tracks
    return {
        tracks: [...MOCK_TRACKS],
        isLive: false
    };
};

export const searchTracks = async (query, localTracks = []) => {
    if (!query) return [];

    try {
        const res = await fetch(`https://api.freetouse.com/v3/music/tracks/search?query=${encodeURIComponent(query)}&limit=18`);
        if (res.ok) {
            const json = await res.json();
            if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
                return json.data.map((item, idx) => normalizeTrack(item, idx));
            }
        }
    } catch (e) {
        console.warn('Live search failed, falling back to local query');
    }

    const q = query.toLowerCase();
    return localTracks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
};

