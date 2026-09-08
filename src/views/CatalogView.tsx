import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { CategoryId } from '../types';

export const CatalogView: React.FC = () => {
  const { selectedCategory, setCategoryFilter, searchQuery, setSearchQuery } = useShop();

  // Filters State
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [onlyPersonalized, setOnlyPersonalized] = useState<boolean>(selectedCategory === 'personalized');
  const [maxPrice, setMaxPrice] = useState<number>(2500000);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const categories: { id: CategoryId; label: string; count: number }[] = [
    { id: 'all', label: 'Tất Cả Sản Phẩm', count: PRODUCTS.length },
    { id: 'clothing', label: 'Thời Trang Nữ', count: PRODUCTS.filter(p => p.category === 'clothing').length },
    { id: 'beauty', label: 'Mỹ Phẩm & Nước Hoa', count: PRODUCTS.filter(p => p.category === 'beauty').length },
    { id: 'gifts', label: 'Quà Tặng Tinh Tế', count: PRODUCTS.filter(p => p.category === 'gifts').length },
    { id: 'personalized', label: '✦ Make It Yours', count: PRODUCTS.filter(p => p.isPersonalized).length },
  ];

  const collections = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map(p => p.collection)));
  }, []);

  const colorOptions = [
    { label: 'Tất cả', value: 'all', hex: '#FFF' },
    { label: 'Hồng Pastel', value: 'Hồng', hex: '#EED9E0' },
    { label: 'Trắng/Kem', value: 'Trắng', hex: '#FAF7F6' },
    { label: 'Mocha/Nâu', value: 'Nâu', hex: '#634E54' },
    { label: 'Đen Tinh Tế', value: 'Đen', hex: '#2E2427' },
    { label: 'Xanh Khói/Rêu', value: 'Xanh', hex: '#6E7765' },
  ];

  const handleCategoryChange = (cat: CategoryId) => {
    setCategoryFilter(cat);
    if (cat === 'personalized') {
      setOnlyPersonalized(true);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'personalized') {
        if (product.category !== selectedCategory) return false;
      }
      if (selectedCategory === 'personalized' || onlyPersonalized) {
        if (!product.isPersonalized) return false;
      }

      // Collection filter
      if (selectedCollection !== 'all' && product.collection !== selectedCollection) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = product.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCol = product.collection.toLowerCase().includes(q);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesCol) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, onlyPersonalized, selectedCollection, selectedSize, selectedColor, maxPrice, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedSize('all');
    setSelectedColor('all');
    setSelectedCollection('all');
    setOnlyPersonalized(false);
    setMaxPrice(2500000);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSize !== 'all' || selectedColor !== 'all' || selectedCollection !== 'all' || onlyPersonalized || maxPrice < 2500000 || searchQuery.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. EDITORIAL HEADING */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#A85B70] font-bold">
          RiEn Boutique • Balletcore & Aesthetic
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#2E2427] tracking-tight">
          Bộ Sưu Tập RiEn
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6870] font-normal">
          Thời trang nữ, mỹ phẩm và quà tặng thủ công sẵn sàng thêu tên & khắc laser theo yêu cầu của bạn.
        </p>
      </div>

      {/* 2. CATEGORY TABS (Gen Z Soft Pastel Pink Pills) */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#D48598] text-white font-bold shadow-md shadow-rose-200/50'
                  : 'bg-[#FAF5F6] text-[#2E2427] hover:text-[#A85B70] hover:bg-[#F7EDF0] border border-[#EFE5E8]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-white text-[#A85B70]' : 'bg-[#F7EDF0] text-[#A85B70]'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. TOOLBAR: FILTER BUTTON & SORT DROPDOWN */}
      <div className="flex items-center justify-between pt-4 pb-2 border-b border-[#EFE5E8]">
        <div className="flex items-center gap-3">
          {/* Filter Drawer Trigger Button */}
          <button
            id="open-filter-drawer-btn"
            onClick={() => setFilterDrawerOpen(true)}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer active:scale-95 ${
              hasActiveFilters 
                ? 'bg-[#F7EDF0] border-[#D48598] text-[#A85B70]' 
                : 'bg-[#FAF5F6] border-[#EFE5E8] text-[#2E2427] hover:border-[#D48598]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Bộ Lọc</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#D48598]" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          )}

          {searchQuery && (
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-[#F7EDF0] text-[#2E2427] px-3 py-1 rounded-full border border-[#EFE5E8]">
              <span>Tìm: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-[#A85B70]">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Results Count & Sort Dropdown */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-[#7A6870] font-medium">
            Hiển thị {filteredProducts.length} sản phẩm
          </span>

          <div className="relative flex items-center">
            <label htmlFor="catalog-sort" className="text-xs text-[#2E2427] font-medium mr-2 hidden sm:inline">
              Sắp xếp:
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FAF5F6] border border-[#EFE5E8] text-[#2E2427] font-medium py-1.5 pl-3 pr-7 rounded-full focus:outline-none focus:border-[#D48598] cursor-pointer appearance-none shadow-xs"
            >
              <option value="popular">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#A85B70] absolute right-2.5 pointer-events-none stroke-[1.8]" />
          </div>
        </div>
      </div>

      {/* 4. PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF5F6] border border-[#EFE5E8] rounded-3xl p-8 space-y-4">
          <span className="text-3xl">🌸</span>
          <p className="text-sm text-[#2E2427] font-medium">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-[#D48598] text-white rounded-full text-xs font-bold hover:bg-[#C27386] transition-all cursor-pointer shadow-sm shadow-rose-200/50"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 5. FILTER DRAWER (SLIDE-OVER PANEL) */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#2E2427]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setFilterDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F6] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-l border-[#EFE5E8]">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#EFE5E8]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#A85B70]" />
                    <h3 className="font-serif text-lg text-[#2E2427]">
                      Bộ Lọc Sản Phẩm
                    </h3>
                  </div>
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="p-1.5 rounded-full text-[#7A6870] hover:text-[#A85B70] hover:bg-[#F7EDF0] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 stroke-[1.8]" />
                  </button>
                </div>

                {/* Filter 1: Có thể cá nhân hóa */}
                <div className="bg-[#F7EDF0] border border-[#EFE5E8] p-4 rounded-2xl">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-bold text-[#2E2427] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D48598]" />
                      Chỉ hiện sản phẩm Cá nhân hóa
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyPersonalized}
                      onChange={(e) => setOnlyPersonalized(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D48598] focus:ring-[#D48598] accent-[#D48598] cursor-pointer"
                    />
                  </label>
                  <p className="text-[11px] text-[#7A6870] mt-1">
                    Lọc sản phẩm hỗ trợ thêu tên chỉ tơ hoặc khắc laser mạ nhũ vàng.
                  </p>
                </div>

                {/* Filter 2: Mức giá */}
                <div className="space-y-2 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                      Mức giá tối đa
                    </label>
                    <span className="text-xs font-serif font-bold text-[#A85B70]">
                      {maxPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <input
                    type="range"
                    min={300000}
                    max={2500000}
                    step={50000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#EFE5E8] rounded-lg appearance-none cursor-pointer accent-[#D48598]"
                  />
                  <div className="flex justify-between text-[10px] text-[#7A6870]">
                    <span>300.000₫</span>
                    <span>2.500.000₫</span>
                  </div>
                </div>

                {/* Filter 3: Bộ sưu tập (Collection) */}
                <div className="space-y-2 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
                  <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block">
                    Bộ sưu tập
                  </label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCollection('all')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCollection === 'all'
                          ? 'bg-[#F7EDF0] text-[#A85B70] font-bold'
                          : 'text-[#2E2427] hover:bg-white'
                      }`}
                    >
                      <span>Tất cả bộ sưu tập</span>
                      {selectedCollection === 'all' && <Check className="w-3.5 h-3.5 text-[#A85B70]" />}
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedCollection(col)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCollection === col
                            ? 'bg-[#F7EDF0] text-[#A85B70] font-bold'
                            : 'text-[#2E2427] hover:bg-white'
                        }`}
                      >
                        <span>{col}</span>
                        {selectedCollection === col && <Check className="w-3.5 h-3.5 text-[#A85B70]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 4: Size */}
                <div className="space-y-2 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
                  <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block">
                    Kích thước (Size)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'S', 'M', 'L', 'XL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#D48598] text-white border-[#D48598] shadow-xs'
                            : 'bg-white border-[#EFE5E8] text-[#2E2427] hover:bg-[#F7EDF0]'
                        }`}
                      >
                        {sz === 'all' ? 'Tất cả' : sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 5: Màu sắc */}
                <div className="space-y-2 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
                  <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block">
                    Gam màu
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSelectedColor(c.value)}
                        className={`px-3 py-2 rounded-xl text-xs text-left border flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === c.value
                            ? 'border-[#D48598] bg-[#F7EDF0] text-[#A85B70] font-bold'
                            : 'border-[#EFE5E8] bg-white text-[#2E2427] hover:bg-[#FAF5F6]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-[#EFE5E8] flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 text-xs text-[#2E2427] hover:text-[#A85B70] border border-[#EFE5E8] rounded-full transition-colors font-bold cursor-pointer bg-white"
                >
                  Đặt lại
                </button>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="flex-1 py-2.5 text-xs bg-[#D48598] hover:bg-[#C27386] text-white rounded-full transition-colors font-bold shadow-md shadow-rose-200/50 cursor-pointer"
                >
                  Áp dụng ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
