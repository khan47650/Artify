import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import artifyLogo from "@/assets/artify_logo.png";
import { useCart } from "@/contexts/CartContext";
import { useLikedArtworks } from "@/contexts/LikedContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalLiked } = useLikedArtworks();
  const location = useLocation();

  const isExplorePage = location.pathname === "/explore";

  const navigate = useNavigate();
  const accountRole = user?.role || "buyer";
  const isSeller = accountRole === "seller";
  const profileName =
    user?.role === "admin"
      ? "Admin"
      : user?.lastName || user?.firstName || "User";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/explore?search=${encodeURIComponent(query)}` : "/explore");
    setSearchOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        <div
          className={`relative transition-all duration-500 rounded-full ${scrolled ? "bg-foreground/40 backdrop-blur-2xl shadow-lg" : "bg-black shadow-lg"
            }`}
        >
          <div className="flex items-center justify-between py-2.5 px-5 md:px-6 lg:px-7">
            <Link to="/" className="inline-flex items-center" aria-label="Artify Home">
              <img src={artifyLogo} alt="Artify" className="h-8 w-auto md:h-9" />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-background/70">
              <Link to="/" className="hover:text-background transition-colors duration-200">Home</Link>
              <Link to="/explore" className="hover:text-background transition-colors duration-200">Explore</Link>
              {/* <Link to="/services" className="hover:text-background transition-colors duration-200">Services</Link> */}
              <Link to="/ai-curator" className="hover:text-background transition-colors duration-200">AI Curator</Link>
              <Link to="/art-quiz" className="hover:text-background transition-colors duration-200">Art Quiz</Link>
              <Link to="/artists" className="hover:text-background transition-colors duration-200">Artists</Link>
              <Link to="/contact" className="hover:text-background transition-colors duration-200">Contact</Link>
            </nav>

            <div className="flex items-center gap-2">
              {isExplorePage && (
                <button
                  type="button"
                  className="p-2 hover:bg-background/10 rounded-full transition-colors duration-200 text-background"
                  aria-label="Open search"
                  onClick={() => setSearchOpen((prev) => !prev)}
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
              <Link to="/liked" className="relative p-2 hover:bg-background/10 rounded-full transition-colors duration-200 text-background" aria-label="Liked">
                <Heart className="w-4 h-4" />
                {totalLiked > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalLiked}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 hover:bg-background/10 rounded-full transition-colors duration-200 text-background" aria-label="Cart">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`hidden md:flex items-center gap-2 rounded-full px-2 py-1 transition-colors duration-200 ${user?.role === "admin"
                        ? "bg-background text-foreground px-4 py-1.5 text-sm font-medium hover:bg-background/90"
                        : "bg-transparent"
                      }`}>
                      {user.role === "admin" ? (
                        <>
                          <User className="w-3.5 h-3.5" />
                          Admin
                        </>
                      ) : user.artistPhoto ? (
                        <img
                          src={user.artistPhoto}
                          alt={profileName}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[12px] font-semibold uppercase text-white">
                          {(user.firstName || user.lastName || "U").charAt(0)}
                        </span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">

                    <DropdownMenuItem
                      onClick={() => {
                        navigate(user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
                      }}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-2 bg-background text-foreground px-4 py-1.5 rounded-full text-sm font-medium hover:bg-background/90 transition-colors duration-200">
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              )}

              <button
                type="button"
                className="md:hidden p-2 text-background"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="absolute right-4 top-[calc(100%+10px)] z-50 w-[280px] md:right-8 md:w-[340px]">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-full border border-background/20 bg-black/90 p-1.5 shadow-2xl backdrop-blur-xl"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search artworks..."
                  className="h-9 w-full bg-transparent px-3 text-sm text-background placeholder:text-background/50 focus:outline-none"
                  autoFocus
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-background/70 transition hover:bg-white/10 hover:text-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-background/90"
                  aria-label="Submit search"
                >
                  <Search className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-background transition hover:bg-white/10"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {mobileOpen && (
            <nav className="md:hidden absolute right-3 top-[calc(100%+8px)] z-50 w-44 rounded-lg bg-black/95 backdrop-blur-xl shadow-xl ring-1 ring-background/10 py-1.5 flex flex-col text-[13px] font-medium animate-fade-in">
              <Link to="/" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/explore" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Explore</Link>
              {/* <Link to="/services" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Services</Link> */}
              <Link to="/ai-curator" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>AI Curator</Link>
              <Link to="/art-quiz" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Art Quiz</Link>
              <Link to="/artists" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Artists</Link>
              <Link to="/contact" className="px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors" onClick={() => setMobileOpen(false)}>Contact</Link>
              <div className="my-1 mx-2 h-px bg-background/15" />
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate(
                        user?.role === "admin"
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      );
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors text-left"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-1.5 text-background/85 hover:bg-background/10 hover:text-background transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
