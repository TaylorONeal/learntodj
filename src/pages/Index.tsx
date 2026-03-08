import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Headphones, Play, BarChart3, ChevronRight, Waves, Shuffle, Disc3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ModeToggle } from '@/components/ModeToggle';
import { GenreListItem } from '@/components/GenreListItem';
import { InstallPWA } from '@/components/InstallPWA';
import { Scanlines } from '@/components/Scanlines';
import { genres } from '@/data/genres';
import { useFavorites } from '@/hooks/useFavorites';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';
import { ScrollArea } from '@/components/ui/scroll-area';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { isAdvanced, toggleMode } = useAdvancedMode();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredGenres = useMemo(() => {
    let result = genres;

    if (showFavoritesOnly) {
      result = result.filter(genre => isFavorite(genre.id));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(genre =>
        genre.name.toLowerCase().includes(query) ||
        genre.id.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => {
      const aFav = isFavorite(a.id);
      const bFav = isFavorite(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [searchQuery, showFavoritesOnly, favorites, isFavorite]);

  const exploreItems = [
    { to: '/intro/flows', icon: BarChart3, label: 'Track Flows', sub: 'Intro → Drop patterns', color: '#ffd60a', borderColor: 'rgba(255,214,10,0.25)' },
    { to: '/intro/effects', icon: Waves, label: 'Effects & Loops', sub: 'Echo, filter basics', color: '#7effdb', borderColor: 'rgba(127,255,212,0.25)' },
    { to: '/intro/remixes', icon: Shuffle, label: 'Remixes', sub: 'Edits & mashups', color: '#7effdb', borderColor: 'rgba(127,255,212,0.25)' },
    { to: '/intro/devices', icon: Disc3, label: 'Gear Guide', sub: 'FLX4 to CDJ-3000', color: '#99ffe0', borderColor: 'rgba(153,255,224,0.20)' },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0a0c' }}>
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* Core Principle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative rounded-lg overflow-hidden border"
          style={{
            borderColor: 'rgba(255, 214, 10, 0.30)',
            background: 'rgba(0,0,0,0.40)',
          }}
        >
          <Scanlines />
          <div className="px-4 py-3 text-center relative">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1.5" style={{ color: '#ffd60a' }}>
              Core Principle
            </p>
            <p className="text-sm font-mono" style={{ color: '#d8efe9' }}>
              "Prep removes risk. Playing is just timing and restraint."
            </p>
          </div>
        </motion.div>

        {/* DJ 101 — Core Two Phases */}
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg font-bold font-mono uppercase tracking-wide"
            style={{ color: '#ffd60a' }}
          >
            DJ Mixing 101
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Prep Card */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <Link
                to="/intro/prep"
                className="group relative rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01] block"
                style={{
                  borderColor: 'rgba(127, 255, 212, 0.30)',
                  background: 'radial-gradient(circle at top left, rgba(0,255,184,0.10), transparent 60%), #061116',
                }}
              >
                <Scanlines />
                <div className="relative p-5 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 border"
                    style={{ background: 'rgba(127,255,212,0.08)', borderColor: 'rgba(127,255,212,0.30)' }}
                  >
                    <Headphones className="w-6 h-6" style={{ color: '#7effdb' }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-mono uppercase tracking-wide" style={{ color: '#7effdb' }}>
                      1. Prep
                    </h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                      Before the crowd hears it
                    </p>
                    <p className="text-[10px] font-mono mt-1.5 uppercase tracking-[0.15em]" style={{ color: '#7effdb', opacity: 0.7 }}>
                      8 steps // key matching // beatgrid
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: '#7effdb' }} />
                </div>
              </Link>
            </motion.div>

            {/* Playing Card */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <Link
                to="/intro/playing"
                className="group relative rounded-lg overflow-hidden border transition-all duration-300 hover:scale-[1.01] block"
                style={{
                  borderColor: 'rgba(255, 214, 10, 0.25)',
                  background: 'radial-gradient(circle at top left, rgba(255,214,10,0.08), transparent 60%), #061116',
                }}
              >
                <Scanlines />
                <div className="relative p-5 flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 border"
                    style={{ background: 'rgba(255,214,10,0.08)', borderColor: 'rgba(255,214,10,0.25)' }}
                  >
                    <Play className="w-6 h-6" style={{ color: '#ffd60a' }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
                      2. Playing
                    </h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color: '#99ffe0' }}>
                      The live transition
                    </p>
                    <p className="text-[10px] font-mono mt-1.5 uppercase tracking-[0.15em]" style={{ color: '#ffd60a', opacity: 0.7 }}>
                      7 steps // bass swap // visual guide
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: '#ffd60a' }} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-mono uppercase tracking-[0.35em]"
            style={{ color: '#99ffe0' }}
          >
            Explore
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {exploreItems.map(({ to, icon: Icon, label, sub, color, borderColor }, i) => (
              <motion.div
                key={to}
                custom={i + 2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Link
                  to={to}
                  className="group relative rounded-lg overflow-hidden border p-4 transition-all duration-300 hover:scale-[1.02] block h-full"
                  style={{ borderColor, background: '#061116' }}
                >
                  <Scanlines />
                  <div className="relative">
                    <motion.div
                      whileHover={{ y: -2, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-5 h-5 mb-2" style={{ color }} />
                    </motion.div>
                    <h3 className="font-bold font-mono text-sm uppercase tracking-[0.08em]" style={{ color: '#d8efe9' }}>
                      {label}
                    </h3>
                    <p className="text-[10px] font-mono mt-1 uppercase tracking-[0.1em]" style={{ color: '#99ffe0' }}>
                      {sub}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Genre Checklists */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-mono uppercase tracking-wide" style={{ color: '#ffd60a' }}>
              Genre Practice Guides
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] border rounded transition-colors duration-200"
                style={{
                  borderColor: showFavoritesOnly ? 'rgba(255,214,10,0.50)' : 'rgba(255,255,255,0.12)',
                  color: showFavoritesOnly ? '#ffd60a' : '#99ffe0',
                  background: showFavoritesOnly ? 'rgba(255,214,10,0.08)' : 'rgba(0,0,0,0.40)',
                }}
              >
                <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favorites</span>
              </motion.button>
              <ModeToggle isAdvanced={isAdvanced} onToggle={toggleMode} />
            </div>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search genres..."
          />

          {/* Genre List */}
          <div
            className="relative rounded-lg overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.20)' }}
          >
            <ScrollArea className="h-[340px] p-3">
              <div className="space-y-1.5">
                {filteredGenres.map((genre, i) => (
                  <GenreListItem
                    key={genre.id}
                    genre={genre}
                    isFavorite={isFavorite(genre.id)}
                    onToggleFavorite={() => toggleFavorite(genre.id)}
                    index={i}
                  />
                ))}

                {filteredGenres.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: '#99ffe0' }}>
                      {showFavoritesOnly
                        ? "No favorites yet — star some genres"
                        : "No genres match your search"}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: isAdvanced ? '#ffd60a' : '#99ffe0' }}>
              {isAdvanced
                ? '// Advanced mode active — extra techniques visible'
                : '// Toggle Advanced mode for pro tips'}
            </p>
          </div>
        </motion.div>
      </main>

      <InstallPWA />
    </div>
  );
};

export default Index;
