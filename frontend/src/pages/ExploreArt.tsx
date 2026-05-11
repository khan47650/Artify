import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLikedArtworks } from "@/contexts/LikedContext";
import explore1 from "@/assets/explore_1.png";
import explore2 from "@/assets/explore_2.png";
import explore3 from "@/assets/explore_3.png";

interface ExploreArtwork {
  id: string;
  image: string;
  title: string;
  artist: string;
  price: number;
  genre: string;
  medium: string;
  dimensions: string;
  status: "available" | "sold-out";
}

const artworks: ExploreArtwork[] = [
  {
    id: "explore-1",
    image: explore1,
    title: "Ethereal Motion",
    artist: "Ayesha Khan",
    price: 45000,
    genre: "Abstract",
    medium: "Acrylic on Canvas",
    dimensions: "24 × 36 in",
    status: "available",
  },
  {
    id: "explore-2",
    image: explore2,
    title: "Silent Ember",
    artist: "Omar Rashid",
    price: 52000,
    genre: "Expressionism",
    medium: "Mixed Media",
    dimensions: "30 × 40 in",
    status: "available",
  },
  {
    id: "explore-3",
    image: explore3,
    title: "Fragments of Light",
    artist: "Nida Rehman",
    price: 42000,
    genre: "Abstract",
    medium: "Oil on Canvas",
    dimensions: "20 × 30 in",
    status: "available",
  },
  {
    id: "explore-4",
    image: explore3,
    title: "Sun over Silence",
    artist: "Arif Saeed",
    price: 48000,
    genre: "Minimalism",
    medium: "Acrylic on Canvas",
    dimensions: "24 × 24 in",
    status: "available",
  },
  {
    id: "explore-5",
    image: explore2,
    title: "Echoes of Blue",
    artist: "Zara Malik",
    price: 67000,
    genre: "Contemporary",
    medium: "Oil on Canvas",
    dimensions: "36 × 48 in",
    status: "available",
  },
  {
    id: "explore-6",
    image: explore1,
    title: "Veiled Gaze",
    artist: "Hamza Ali",
    price: 39000,
    genre: "Portrait",
    medium: "Charcoal on Paper",
    dimensions: "18 × 24 in",
    status: "sold-out",
  },
];

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const ExploreArt = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();
  const { isLiked, toggleLike } = useLikedArtworks();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");

  const allGenres = useMemo(() => [...new Set(artworks.map((a) => a.genre))], []);
  const allMediums = useMemo(() => [...new Set(artworks.map((a) => a.medium))], []);

  const toggleFilter = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    const result = artworks.filter(
      (a) =>
        (!searchQuery || `${a.title} ${a.artist} ${a.genre} ${a.medium}`.toLowerCase().includes(searchQuery)) &&
        (selectedGenres.length === 0 || selectedGenres.includes(a.genre)) &&
        (selectedMediums.length === 0 || selectedMediums.includes(a.medium))
    );

    if (sortBy === "price-low") return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [searchQuery, selectedGenres, selectedMediums, sortBy]);

  const activeFilterCount = selectedGenres.length + selectedMediums.length;

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedMediums([]);
  };

  const FilterPanel = () => (
    <div className={`${bodyFont} space-y-7 text-[#1d1d1d]`}>

      <div>
        <h3 className={`${headingFont} mb-4 text-[22px] leading-none text-[#1d1d1d]`}>Style</h3>
        <div className="space-y-3">
          {allGenres.map((g) => (
            <label key={g} className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4a4a4a]">
              <Checkbox checked={selectedGenres.includes(g)} onCheckedChange={() => toggleFilter(g, selectedGenres, setSelectedGenres)} />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className={`${headingFont} mb-4 text-[22px] leading-none text-[#1d1d1d]`}>Medium</h3>
        <div className="space-y-3">
          {allMediums.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4a4a4a]">
              <Checkbox checked={selectedMediums.includes(m)} onCheckedChange={() => toggleFilter(m, selectedMediums, setSelectedMediums)} />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full rounded-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1180px] px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className={`${bodyFont} mb-3 text-[13px] text-[#777]`}>Home / Artwork / Abstract & Experimental</p>
              <h1 className={`${headingFont} text-[42px] leading-[0.95] text-[#1b1b1b] md:text-[56px]`}>
                Abstract & Experimental
              </h1>
            </div>

            <div className="hidden md:block">
              <Label className={`${bodyFont} mr-3 text-[13px] text-[#777]`}>Sort by</Label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white py-2 pl-4 pr-10 text-[13px] text-[#222] outline-none transition focus:border-[#1d1d1d]`}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <p className={`${bodyFont} mb-5 text-[14px] text-[#6b6b6b]`}>
              Search results for: <span className="text-[#1d1d1d]">{searchParams.get("search")}</span>
            </p>
          )}

          <div className="mb-6 flex items-center justify-between md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className={`${bodyFont} gap-2 rounded-full`}>
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                  {activeFilterCount > 0 && <Badge className="ml-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">{activeFilterCount}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto bg-[#fbfaf7]">
                <h2 className={`${headingFont} mb-8 text-[34px] leading-none`}>Filters</h2>
                <FilterPanel />
              </SheetContent>
            </Sheet>
          </div>

          {activeFilterCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedGenres.map((g) => (
                <Badge key={g} variant="secondary" className={`${bodyFont} cursor-pointer gap-1 rounded-full`} onClick={() => toggleFilter(g, selectedGenres, setSelectedGenres)}>
                  {g} <X className="h-3 w-3" />
                </Badge>
              ))}
              {selectedMediums.map((m) => (
                <Badge key={m} variant="secondary" className={`${bodyFont} cursor-pointer gap-1 rounded-full`} onClick={() => toggleFilter(m, selectedMediums, setSelectedMediums)}>
                  {m} <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-10">
            <aside className="hidden w-[190px] shrink-0 md:block">
              <FilterPanel />
            </aside>

            <section className="flex-1">
              {filtered.length === 0 ? (
                <div className={`${bodyFont} rounded-[28px] border border-[#e6dfd4] bg-white py-20 text-center`}>
                  <p className="text-[18px] text-[#777]">No artworks match your filters.</p>
                  <Button variant="outline" className="mt-4 rounded-full" onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((art) => (
                    <article key={art.id} className="group">
                      <Link to={`/art/${art.id}`} className="block">
                        <div className="relative mb-4 aspect-[0.78] overflow-hidden rounded-[26px] bg-[#ede8df] shadow-sm">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleLike({
                                id: art.id,
                                title: art.title,
                                artist: art.artist,
                                image: art.image,
                                price: `$${art.price.toLocaleString()}`,
                                href: `/art/${art.id}`,
                                source: "Explore",
                              });
                            }}
                            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-transform duration-300 hover:scale-110"
                            aria-label="Add to favorites"
                          >
                            <Heart className={`h-4 w-4 transition-colors ${isLiked(art.id) ? "fill-destructive text-destructive" : "text-[#1d1d1d]"}`} />
                          </button>
                          {art.status === "sold-out" && (
                            <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-wide text-[#1d1d1d]`}>
                              Sold Out
                            </span>
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>
                      </Link>

                      <div className="flex items-start justify-between gap-4">
                        <Link to={`/art/${art.id}`} className="min-w-0 flex-1">
                          <h3 className={`${headingFont} truncate text-[22px] leading-none text-[#1d1d1d]`}>{art.title}</h3>
                          <p className={`${bodyFont} mt-1 truncate text-[13px] text-[#7b756d]`}>{art.artist}</p>
                          <p className={`${bodyFont} mt-1 text-[12px] text-[#9a9186]`}>{art.medium} · {art.dimensions}</p>
                        </Link>
                        <p className={`${bodyFont} shrink-0 text-[15px] font-semibold text-[#1d1d1d]`}>${art.price.toLocaleString()}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
          <div className={`${bodyFont} mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#d8d2c8] pt-6 md:flex-row`}>
            <div className="flex items-center gap-2 text-[13px] text-[#1d1d1d]">
              <span>Page</span>
              <select className="rounded-md border border-[#9f9a92] bg-white px-3 py-2 pr-8 text-[13px] outline-none">
                <option>1</option>
              </select>
              <span>of 10</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                «
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                ‹
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[13px] text-white">
                1
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                2
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                3
              </button>
              <span className="px-1 text-[13px] text-[#777]">...</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                10
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                ›
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777]">
                »
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreArt;
