import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Sparkles, 
  Menu, 
  X,
  Sparkle
} from 'lucide-react';
import { CategoryId } from '../types';

export const Header: React.FC = () => {
  const { 
    activeView, 
    navigateTo, 
    setCategoryFilter, 
    cartCount, 
    openCart, 
    wishlist, 
    user, 
    openAuth,
    searchQuery,
    setSearchQuery,
    selectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks: { label: string; view: 'home' | 'catalog' | 'account'; category?: CategoryId; isSpecial?: boolean }[] = [
    { label: 'Trang chủ', view: 'home' },
    { label: 'Thời trang', view: 'catalog', category: 'clothing' },
    { label: 'Mỹ phẩm', view: 'catalog', category: 'beauty' },
    { label: 'Cá nhân hóa ✨', view: 'catalog', category: 'personalized', isSpecial: true },
    { label: 'Quà tặng', view: 'catalog', category: 'gifts' },
    { label: 'Lookbook', view: 'catalog', category: 'all' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.category) {
      setCategoryFilter(link.category);
    } else {
      navigateTo(link.view);
    }
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F6]/95 backdrop-blur-md border-b border-[#EFE5E8] transition-all duration-300">
      {/* Gen Z Pastel Pink Announcement Bar */}
      <div className="bg-[#F7EDF0] text-[#735A63] text-[11px] py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2 border-b border-[#EFE5E8]">
        <Sparkles className="w-3.5 h-3.5 text-[#D48598] animate-pulse" />
        <span>🎀 <strong>RiEn Studio</strong> • Make It Yours: Khắc tên mỹ phẩm & thêu chữ chuẩn aesthetic</span>
        <span className="hidden md:inline bg-white/90 text-[#A85B70] border border-[#EADBE0] font-bold px-2 py-0.5 rounded-full text-[10px] shadow-2xs">
          CODE: RIENLOVER
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#735A63] hover:text-[#A85B70] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>

          {/* Brand Logo - RiEn with Refined Pastel Aesthetics */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-1.5">
                <span className="block text-2xl sm:text-3xl font-serif tracking-[0.2em] text-[#2E2427] font-light uppercase transition-colors group-hover:text-[#A85B70]">
                  RiEn
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D48598] animate-pulse inline-block" />
              </div>
              <span className="block text-[9px] tracking-[0.25em] uppercase text-[#8C747C] font-medium mt-0.5">
                Beauty, Made Personal
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navLinks.map((item, idx) => {
              const isSelected = activeView === item.view && (!item.category || selectedCategory === item.category);
              return (
                <button
                  key={idx}
                  id={`nav-link-${idx}`}
                  onClick={() => handleNavClick(item)}
                  className={`relative text-[13px] tracking-wide font-medium transition-all duration-200 py-1.5 px-3 rounded-full cursor-pointer flex items-center gap-1.5 ${
                    item.isSpecial
                      ? 'bg-[#F2DEE5] text-[#7A3E50] hover:bg-[#EAD2DA] font-semibold shadow-2xs'
                      : isSelected
                      ? 'bg-[#F7EDF0] text-[#A85B70] font-bold shadow-2xs'
                      : 'text-[#4A3C40] hover:text-[#A85B70] hover:bg-[#F7EDF0]/60'
                  }`}
                >
                  {item.isSpecial && <Sparkle className="w-3 h-3 text-[#D48598] fill-[#D48598]" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities: Search, Wishlist, Account, Cart */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search toggler / input */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative flex items-center animate-fade-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm son, đầm, nến thơm..."
                    className="w-44 sm:w-60 pl-8 pr-7 py-1.5 text-xs bg-white border border-[#EFE5E8] rounded-full focus:outline-none focus:border-[#D48598] text-[#2E2427] shadow-xs"
                    autoFocus
                  />
                  <Search className="w-3.5 h-3.5 text-[#A85B70] absolute left-2.5 stroke-[1.5]" />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-2 text-[#735A63]/60 hover:text-[#735A63]"
                  >
                    <X className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </form>
              ) : (
                <button
                  id="search-toggle-btn"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-[#735A63] hover:text-[#A85B70] hover:bg-[#F7EDF0] rounded-full transition-colors cursor-pointer"
                  aria-label="Search"
                  title="Tìm kiếm"
                >
                  <Search className="w-4 h-4 stroke-[1.5]" />
                </button>
              )}
            </div>

            {/* Wishlist button */}
            <button
              id="wishlist-btn"
              onClick={() => navigateTo('account')}
              className="relative p-2 text-[#735A63] hover:text-[#A85B70] hover:bg-[#F7EDF0] rounded-full transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Danh sách yêu thích"
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D48598] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            <button
              id="account-btn"
              onClick={() => {
                if (user) {
                  navigateTo('account');
                } else {
                  openAuth();
                }
              }}
              className="p-2 text-[#735A63] hover:text-[#A85B70] hover:bg-[#F7EDF0] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              title={user ? `Tài khoản: ${user.name}` : 'Đăng nhập'}
            >
              {user ? (
                <div className="flex items-center gap-1.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-[#EFE5E8]"
                  />
                  <span className="hidden xl:inline text-xs font-semibold text-[#2E2427] truncate max-w-[80px]">
                    {user.name.split(' ').slice(-1)[0]}
                  </span>
                </div>
              ) : (
                <User className="w-4 h-4 stroke-[1.5]" />
              )}
            </button>

            {/* Cart button - Soft refined pastel CTA */}
            <button
              id="cart-drawer-trigger"
              onClick={openCart}
              className="relative bg-[#D48598] hover:bg-[#C27386] text-white px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold transition-all active:scale-95 shadow-sm shadow-[#F0D5DD] cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
              <span className="hidden sm:inline tracking-wide">Túi xách</span>
              <span className="bg-white text-[#B56176] px-1.5 py-0.2 rounded-full text-[10px] font-bold shadow-2xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F6] border-b border-[#EFE5E8] px-6 py-5 space-y-3 shadow-lg animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                id={`mobile-nav-${idx}`}
                onClick={() => handleNavClick(item)}
                className="w-full text-left py-2.5 text-sm font-medium text-[#2E2427] hover:text-[#A85B70] border-b border-[#EFE5E8] flex items-center justify-between transition-colors"
              >
                <span>{item.label}</span>
                {item.isSpecial ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F7EDF0] text-[#7A3E50]">
                    Make It Yours
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EFE5E8] flex items-center justify-between text-xs text-[#735A63]">
            <span>Hotline: 1900 8899</span>
            <span>RiEn Boutique • TP.HCM & Hà Nội</span>
          </div>
        </div>
      )}
    </header>
  );
};
