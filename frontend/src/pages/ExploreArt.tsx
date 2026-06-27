import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, SlidersHorizontal, X } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const ExploreArt = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const [artworks, setArtworks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const toggleFilter = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const fetchArtworks = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/artworks?page=${page}&limit=${limit}`);

      const items = data.artworks || [];

      setArtworks(items);
      setTotalPages(data.totalPages || 1);

      const approvedItems = items.filter((item: any) => item.approvedStatus === "approved");

      const uniqueCategories = [
        ...new Set(approvedItems.map((item: any) => item.category).filter(Boolean)),
      ];

      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiked = async () => {
    if (!user?.id) return;

    try {
      const { data } = await api.get(`/liked-artworks/${user.id}`);

      setLikedIds(data.liked.map((item: any) => item.artworkId?._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    fetchLiked();
  }, [user]);

  const resetExplorePage = () => {
    setSelectedCategories([]);
    setSortBy("newest");
    setPage(1);
    setSearchParams({});
  };
  const filtered = useMemo(() => {
    let result = artworks.filter(
      (art: any) =>
        art.approvedStatus === "approved" &&
        (!searchQuery ||
          `${art.name} ${art.category} ${art.userId?.firstName || ""} ${art.userId?.lastName || ""}`
            .toLowerCase()
            .includes(searchQuery)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(art.category))
    );

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [artworks, searchQuery, selectedCategories, sortBy]);

  const activeFilterCount = selectedCategories.length;

  const clearFilters = () => {
    setSelectedCategories([]);

    if (searchQuery) {
      setSearchParams({});
    }
  };

  const handleToggleLike = async (artworkId: string) => {
    if (!user?.id) return;

    try {
      const { data } = await api.post("/liked-artworks/toggle", {
        userId: user.id,
        artworkId,
      });

      if (data.liked) {
        setLikedIds((prev) => [...prev, artworkId]);
      } else {
        setLikedIds((prev) => prev.filter((id) => id !== artworkId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FilterPanel = () => (
    <div className={`${bodyFont} space-y-7 text-[#1d1d1d]`}>
      <div>
        <h3 className={`${headingFont} mb-4 text-[22px] leading-none text-[#1d1d1d]`}>
          Categories
        </h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-[14px] text-[#4a4a4a]"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() =>
                  toggleFilter(category, selectedCategories, setSelectedCategories)
                }
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full rounded-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#fbfaf7]">
      <Navbar />

      <main className="w-full max-w-[100vw] overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-[1180px] overflow-hidden px-4 md:px-8">
          <div className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`${bodyFont} mb-3 text-[13px] text-[#777]`}>
                Home / Artwork / Explore
              </p>

              <h1 className={`${headingFont} text-[42px] leading-[0.95] text-[#1b1b1b] md:text-[56px]`}>
                Explore Artworks
              </h1>
            </div>

            <div className="hidden md:block">
              <Label className={`${bodyFont} mr-3 text-[13px] text-[#777]`}>
                Sort by
              </Label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${bodyFont} min-w-0 max-w-[160px] rounded-full border border-[#d8d2c8] bg-white px-3 py-2 text-[12px] text-[#222] outline-none sm:max-w-none sm:px-4 sm:text-[13px]`}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#e6dfd4] bg-white px-5 py-4">
              <p className={`${bodyFont} text-[14px] text-[#6b6b6b]`}>
                Search results for:{" "}
                <span className="font-semibold text-[#1d1d1d]">
                  {searchParams.get("search")}
                </span>
              </p>

              <button
                type="button"
                onClick={resetExplorePage}
                className={`${bodyFont} rounded-full bg-black px-5 py-2 text-[12px] font-semibold text-white transition hover:bg-black/85`}
              >
                View All Artworks
              </button>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className={`${bodyFont} gap-2 rounded-full`}>
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80 overflow-y-auto bg-[#fbfaf7]">
                <h2 className={`${headingFont} mb-8 text-[34px] leading-none`}>
                  Filters
                </h2>
                <FilterPanel />
              </SheetContent>
            </Sheet>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white py-2 pl-4 pr-8 text-[13px] text-[#222] outline-none`}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
            </select>
          </div>

          {activeFilterCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`${bodyFont} cursor-pointer gap-1 rounded-full`}
                  onClick={() =>
                    toggleFilter(category, selectedCategories, setSelectedCategories)
                  }
                >
                  {category} <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <div className="flex w-full min-w-0 gap-10">
            <aside className="hidden w-[190px] shrink-0 md:block">
              <FilterPanel />
            </aside>

            <section className="min-w-0 flex-1">
              {loading ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="animate-pulse">
                      <div className="mb-4 aspect-[0.78] rounded-[26px] bg-[#ece6dc]" />
                      <div className="h-6 w-[70%] rounded bg-[#ece6dc]" />
                      <div className="mt-2 h-4 w-[45%] rounded bg-[#ece6dc]" />
                      <div className="mt-2 h-4 w-[35%] rounded bg-[#ece6dc]" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className={`${bodyFont} rounded-[28px] border border-[#e6dfd4] bg-white py-20 text-center`}>
                  <p className="text-[18px] text-[#777]">
                    No artworks match your filters.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4 rounded-full"
                    onClick={resetExplorePage}
                  >
                    View All Artworks
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((art) => (
                    <article key={art._id} className="group">
                      <Link to={`/art/${art._id}`} className="block">
                        <div className="relative mb-4 aspect-[0.78] overflow-hidden rounded-[26px] bg-[#ede8df] shadow-sm">
                          <img
                            src={art.image}
                            alt={art.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />

                          {user && user.role !== "admin" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleToggleLike(art._id);
                              }}
                              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-transform duration-300 hover:scale-110"
                              aria-label="Add to favorites"
                            >
                              <Heart
                                className={`h-4 w-4 transition-colors ${likedIds.includes(art._id)
                                  ? "fill-destructive text-destructive"
                                  : "text-[#1d1d1d]"
                                  }`}
                              />
                            </button>
                          )}

                          <span className={`${bodyFont} absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-wide text-[#1d1d1d]`}>
                            {art.category}
                          </span>

                          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </div>
                      </Link>

                      <div className="flex items-start justify-between gap-4">
                        <Link to={`/art/${art._id}`} className="min-w-0 flex-1">
                          <h3 className={`${headingFont} truncate text-[22px] leading-none text-[#1d1d1d]`}>
                            {art.name}
                          </h3>

                          <p className={`${bodyFont} mt-1 truncate text-[13px] text-[#7b756d]`}>
                            {art.userId?.firstName || "Artist"} {art.userId?.lastName || ""}
                          </p>

                          <p className={`${bodyFont} mt-1 text-[12px] text-[#9a9186]`}>
                            {art.category}
                          </p>
                        </Link>

                        <p className={`${bodyFont} shrink-0 text-[15px] font-semibold text-[#1d1d1d]`}>
                          ${Number(art.price).toLocaleString()}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>

          {totalPages > 1 && (
            <div className={`${bodyFont} mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#d8d2c8] pt-6 md:flex-row`}>
              <div className="flex items-center gap-2 text-[13px] text-[#1d1d1d]">
                <span>Page</span>

                <select
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="rounded-md border border-[#9f9a92] bg-white px-3 py-2 pr-8 text-[13px] outline-none"
                >
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <span>of {totalPages}</span>
              </div>

              <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  «
                </button>

                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] ${page === pageNumber
                        ? "bg-black text-white"
                        : "border border-[#e6dfd4] bg-white text-[#777]"
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ›
                </button>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e6dfd4] bg-white text-[13px] text-[#777] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExploreArt;