import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, SOCIAL_POSTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  Sparkle,
  Instagram, 
  Heart,
  Flame,
  Send
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCategoryFilter, openStudio } = useShop();

  // Interactive Live Teaser inside "Make It Yours" section
  const [teaserName, setTeaserName] = useState('Khánh Linh');
  const [teaserType, setTeaserType] = useState<'apparel' | 'beauty'>('apparel');
  const [teaserFont, setTeaserFont] = useState<'cursive' | 'garamond' | 'sans'>('cursive');
  const [teaserColor, setTeaserColor] = useState('#D48598');

  // Filter products for each section
  const newArrivals = PRODUCTS.filter(p => p.badge === 'Mới' || p.badge === 'Độc Quyền' || p.id === 'prod-dress-01').slice(0, 4);
  const fashionProducts = PRODUCTS.filter(p => p.category === 'clothing').slice(0, 4);
  const beautyProducts = PRODUCTS.filter(p => p.category === 'beauty').slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.badge === 'Best Seller' || p.rating >= 4.9).slice(0, 4);
  const giftProducts = PRODUCTS.filter(p => p.category === 'gifts').slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 text-[#2E2427]">
      {/* 1. HERO SECTION - Gentle Soft Pastel Canvas */}
      <section className="relative min-h-[560px] lg:min-h-[660px] flex items-center bg-gradient-to-br from-[#F7EDF0] via-[#FAF5F6] to-[#FAF7F6] overflow-hidden border-b border-[#EFE5E8]">
        {/* Background Overlay with soft glow */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85"
            alt="RiEn Boutique Hero"
            className="w-full h-full object-cover object-top opacity-20 mix-blend-multiply scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F6]/95 via-[#FAF7F6]/85 to-transparent sm:w-2/3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
          <div className="max-w-xl space-y-5">
            {/* Gen Z Highlight Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EFE5E8] text-[#A85B70] text-xs font-semibold shadow-xs">
              <span>🎀</span>
              <span>Gen Z Aesthetic • 100% Custom Cá Nhân Hóa</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#2E2427] tracking-tight leading-[1.12]">
              Beauty, Made Personal.
            </h1>

            <p className="text-[#7A6870] text-base sm:text-lg font-normal leading-relaxed max-w-md">
              Bộ sưu tập váy lụa, son môi và quà tặng được thêu tên chữ ký & khắc laser độc quyền theo cá tính của riêng bạn.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-explore-btn"
                onClick={() => setCategoryFilter('all')}
                className="bg-[#D48598] hover:bg-[#C27386] text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold shadow-md shadow-rose-200/50 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-personalize-btn"
                onClick={() => {
                  const item = PRODUCTS.find(p => p.isPersonalized) || PRODUCTS[0];
                  openStudio(item);
                }}
                className="bg-white hover:bg-[#FAF5F6] text-[#2E2427] border border-[#EFE5E8] px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkle className="w-3.5 h-3.5 text-[#D48598]" />
                <span>Make It Yours Studio</span>
              </button>
            </div>

            {/* Pastel Brand Perks */}
            <div className="pt-6 border-t border-[#EFE5E8] grid grid-cols-3 gap-3 text-xs text-[#7A6870]">
              <div className="bg-white/70 p-3 rounded-2xl border border-[#EFE5E8]">
                <strong className="block text-[#2E2427] font-serif text-sm font-semibold">Thêu Tay Chỉ Tơ</strong>
                <span className="text-[11px] text-[#7A6870]">Nét chữ mềm mại</span>
              </div>
              <div className="bg-white/70 p-3 rounded-2xl border border-[#EFE5E8]">
                <strong className="block text-[#2E2427] font-serif text-sm font-semibold">Khắc Nhũ Vàng</strong>
                <span className="text-[11px] text-[#7A6870]">Laser siêu nét</span>
              </div>
              <div className="bg-white/70 p-3 rounded-2xl border border-[#EFE5E8]">
                <strong className="block text-[#2E2427] font-serif text-sm font-semibold">Hộp Quà Pastel</strong>
                <span className="text-[11px] text-[#7A6870]">Nơ ruy băng lụa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING PILL STRIP (GEN Z FAVORITE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {[
            { label: '🎀 Balletcore Ribbon', filter: 'clothing' },
            { label: '💄 Son Khắc Tên Y2K', filter: 'beauty' },
            { label: '✨ Make It Yours Thêu Chữ', filter: 'personalized' },
            { label: '🌸 Váy Lụa Pastel', filter: 'clothing' },
            { label: '🕯️ Nến Thơm Khắc Nắp', filter: 'gifts' },
            { label: '🎁 Gift Box Bestie', filter: 'gifts' },
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setCategoryFilter(tag.filter as any)}
              className="bg-[#FAF5F6] hover:bg-[#F7EDF0] text-[#2E2427] hover:text-[#A85B70] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border border-[#EFE5E8] shadow-xs active:scale-95"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. NEW ARRIVALS - Wrapped in Soft Pastel Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5F6] border border-[#EFE5E8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-[#EFE5E8]">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block">
                Mùa Mới • Capsule Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] mt-1">
                New Arrivals ✨
              </h2>
            </div>
            <button
              onClick={() => setCategoryFilter('all')}
              className="mt-3 sm:mt-0 text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 group transition-colors cursor-pointer"
            >
              <span>Xem tất cả sản phẩm mới</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FASHION (THỜI TRANG NỮ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#EFE5E8]">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block">
              RiEn Apparel • Balletcore Chic
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] mt-1">
              Thời Trang Nữ
            </h2>
            <p className="text-xs text-[#7A6870] mt-1">
              Đầm lụa, áo thun baby tee và blazer thêu chữ ký độc quyền.
            </p>
          </div>
          <button
            onClick={() => setCategoryFilter('clothing')}
            className="mt-3 sm:mt-0 text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>Xem bộ sưu tập thời trang</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {fashionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BEAUTY (MỸ PHẨM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#EFE5E8]">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block">
              Glow & Scent • Khắc Tên Riêng
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] mt-1">
              Mỹ Phẩm & Nước Hoa
            </h2>
            <p className="text-xs text-[#7A6870] mt-1">
              Khắc laser nhũ vàng thông điệp ngọt ngào lên thân son và chai nước hoa của bạn.
            </p>
          </div>
          <button
            onClick={() => setCategoryFilter('beauty')}
            className="mt-3 sm:mt-0 text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>Khám phá mỹ phẩm</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {beautyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. MAKE IT YOURS - Gentle Pastel Studio Canvas */}
      <section className="bg-gradient-to-br from-[#F7EDF0] via-[#FAF5F6] to-[#FAF7F6] py-16 sm:py-20 border-y border-[#EFE5E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#A85B70] text-xs font-bold shadow-xs border border-[#EFE5E8]">
                <Sparkle className="w-3.5 h-3.5 text-[#D48598]" />
                <span>Trải Nghiệm Make It Yours Độc Quyền</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#2E2427] leading-tight">
                Make It Yours ✨
              </h2>

              <p className="text-sm sm:text-base text-[#7A6870] font-normal leading-relaxed">
                Biến mỗi món đồ thành kỷ vật độc nhất vô nhị. Tại RiEn, chúng mình mang đến công nghệ thêu tên và khắc laser chuẩn aesthetic cho Gen Z:
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#EFE5E8]">
                  <div className="w-5 h-5 rounded-full bg-[#D48598] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E2427]">
                      Thêu tên & monogram lên thời trang
                    </h4>
                    <p className="text-xs text-[#7A6870] mt-0.5">
                      Chỉ tơ lụa mềm mại, ánh kim metallic tại ngực áo, cổ tay hoặc vạt váy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#EFE5E8]">
                  <div className="w-5 h-5 rounded-full bg-[#D48598] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E2427]">
                      Khắc laser mạ nhũ lên mỹ phẩm
                    </h4>
                    <p className="text-xs text-[#7A6870] mt-0.5">
                      Khắc laser cực bén trên thân chai nước hoa thủy tinh, vỏ son mạ vàng hay nắp gỗ.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="open-make-it-yours-studio"
                  onClick={() => {
                    const sampleProduct = teaserType === 'apparel' 
                      ? PRODUCTS.find(p => p.id === 'prod-dress-01' || p.category === 'clothing') || PRODUCTS[0]
                      : PRODUCTS.find(p => p.id === 'prod-perfume-01' || p.category === 'beauty') || PRODUCTS[1];
                    openStudio(sampleProduct);
                  }}
                  className="bg-[#D48598] hover:bg-[#C27386] text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-bold shadow-md shadow-rose-200/50 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Mở Studio Cá Nhân Hóa Toàn Diện</span>
                </button>
              </div>
            </div>

            {/* Right: Live Interactive Mini Studio Preview */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-rose-200/20 border border-[#EFE5E8] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE5E8]">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#A85B70] font-bold block">
                      Thử nghiệm trực tiếp
                    </span>
                    <h3 className="font-serif text-lg text-[#2E2427]">
                      Xem trước tác phẩm của bạn
                    </h3>
                  </div>

                  {/* Mode switcher */}
                  <div className="flex bg-[#F7EDF0] p-1 rounded-full text-xs">
                    <button
                      onClick={() => setTeaserType('apparel')}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        teaserType === 'apparel'
                          ? 'bg-[#D48598] text-white font-bold shadow-xs'
                          : 'text-[#2E2427] hover:text-[#A85B70]'
                      }`}
                    >
                      Thêu Váy/Áo
                    </button>
                    <button
                      onClick={() => setTeaserType('beauty')}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        teaserType === 'beauty'
                          ? 'bg-[#D48598] text-white font-bold shadow-xs'
                          : 'text-[#2E2427] hover:text-[#A85B70]'
                      }`}
                    >
                      Khắc Nước Hoa
                    </button>
                  </div>
                </div>

                {/* Mockup Canvas */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-rose-50/50 flex items-center justify-center border border-[#EFE5E8]">
                  <img
                    src={
                      teaserType === 'apparel'
                        ? 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
                        : 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
                    }
                    alt="Preview Mockup"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />

                  {/* Dynamic Rendered Embroidery / Engraving Text */}
                  <div 
                    className="absolute z-10 px-4 py-2 rounded-md transition-all duration-300 backdrop-blur-[1px]"
                    style={{
                      top: teaserType === 'apparel' ? '40%' : '55%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: teaserColor,
                      textShadow: teaserType === 'beauty' 
                        ? '0 0 10px rgba(230, 202, 101, 0.7), 0 1px 2px rgba(0,0,0,0.5)'
                        : '0 1px 2px rgba(0,0,0,0.4)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: teaserFont === 'garamond' 
                          ? "'Cormorant Garamond', serif"
                          : teaserFont === 'cursive' 
                          ? "'Great Vibes', cursive"
                          : "'Plus Jakarta Sans', sans-serif"
                      }}
                      className={
                        teaserFont === 'cursive' 
                          ? 'text-2xl sm:text-3xl block capitalize tracking-normal'
                          : teaserFont === 'garamond'
                          ? 'text-lg sm:text-xl block tracking-[0.25em] uppercase font-light'
                          : 'text-sm sm:text-base block tracking-[0.3em] uppercase font-semibold'
                      }
                    >
                      {teaserName || 'Your Name'}
                    </span>
                    <span className="text-[10px] block text-center opacity-90 mt-0.5 tracking-widest font-mono">
                      {teaserType === 'apparel' ? '✦ THÊU TAY CHỈ TƠ ✦' : '✧ LASER ENGRAVED ✧'}
                    </span>
                  </div>
                </div>

                {/* Interactive Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-[#2E2427] block mb-1">
                      Nhập tên hoặc chữ viết tắt của bạn:
                    </label>
                    <input
                      type="text"
                      maxLength={14}
                      value={teaserName}
                      onChange={(e) => setTeaserName(e.target.value)}
                      placeholder="Ví dụ: Khánh Linh..."
                      className="w-full bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl px-3.5 py-2 text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598] font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#2E2427] block mb-1">
                        Kiểu chữ:
                      </label>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setTeaserFont('cursive')}
                          className={`flex-1 py-1 px-2 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                            teaserFont === 'cursive'
                              ? 'bg-[#D48598] text-white border-[#D48598] font-bold'
                              : 'bg-[#FAF5F6] text-[#2E2427] border-[#EFE5E8]'
                          }`}
                        >
                          Chữ Ký
                        </button>
                        <button
                          onClick={() => setTeaserFont('garamond')}
                          className={`flex-1 py-1 px-2 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                            teaserFont === 'garamond'
                              ? 'bg-[#D48598] text-white border-[#D48598] font-bold'
                              : 'bg-[#FAF5F6] text-[#2E2427] border-[#EFE5E8]'
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setTeaserFont('sans')}
                          className={`flex-1 py-1 px-2 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                            teaserFont === 'sans'
                              ? 'bg-[#D48598] text-white border-[#D48598] font-bold'
                              : 'bg-[#FAF5F6] text-[#2E2427] border-[#EFE5E8]'
                          }`}
                        >
                          Modern
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#2E2427] block mb-1">
                        Màu sắc:
                      </label>
                      <div className="flex items-center gap-2 pt-1">
                        {[
                          { hex: '#D48598', name: 'Pastel Rose' },
                          { hex: '#E6CA65', name: 'Vàng Kim' },
                          { hex: '#F3F4F6', name: 'Bạc Lụa' },
                          { hex: '#634E54', name: 'Nâu Mocha' }
                        ].map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => setTeaserColor(c.hex)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                              teaserColor === c.hex ? 'scale-125 border-[#A85B70]' : 'border-white shadow-xs'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS - Soft Pastel Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5F6] border border-[#EFE5E8] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-[#EFE5E8]">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#D48598]" />
                Được Yêu Thích Nhất
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] mt-1">
                Best Sellers 🔥
              </h2>
            </div>
            <button
              onClick={() => setCategoryFilter('all')}
              className="mt-3 sm:mt-0 text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 group transition-colors cursor-pointer"
            >
              <span>Xem tất cả bán chạy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. GIFT COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#EFE5E8]">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block">
              Món Quà Tình Thân & Kỷ Niệm
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] mt-1">
              Gift Collection 🎁
            </h2>
            <p className="text-xs text-[#7A6870] mt-1">
              Ví da Nappa Ý, túi tote và nến thơm sáp đậu nành khắc nắp gỗ độc bản.
            </p>
          </div>
          <button
            onClick={() => setCategoryFilter('gifts')}
            className="mt-3 sm:mt-0 text-xs text-[#A85B70] hover:text-[#2E2427] font-semibold flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>Tất cả quà tặng</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {giftProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. SOCIAL / INSTAGRAM / TIKTOK - Gen Z Aesthetic Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#A85B70] font-bold bg-[#FAF5F6] px-3.5 py-1 rounded-full border border-[#EFE5E8]">
            <Instagram className="w-3.5 h-3.5" />
            <span>@rien.boutique • #RiEnGirl #MakeItYours</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427]">
            RiEn In Real Life 📸
          </h2>
          <p className="text-xs text-[#7A6870]">
            Khoảnh khắc đáng yêu của các bạn khi unbox tác phẩm thêu tên & khắc laser tại RiEn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-[#FAF5F6] border border-[#EFE5E8] rounded-2xl overflow-hidden hover:border-[#D48598] hover:shadow-md hover:shadow-rose-200/30 transition-all group"
            >
              <div className="aspect-square relative overflow-hidden bg-rose-50/50">
                <img
                  src={post.image}
                  alt={post.author}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#EFE5E8]">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="text-[10px] font-bold text-[#2E2427]">
                    {post.handle}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-[#2E2427] line-clamp-3 leading-relaxed">
                  "{post.caption.replace('@atelier.bespoke', '@rien.boutique')}"
                </p>

                <div className="pt-2 border-t border-[#EFE5E8] flex items-center justify-between text-[11px] text-[#7A6870]">
                  <span className="font-semibold truncate text-[#A85B70]">
                    {post.productName}
                  </span>
                  <span className="flex items-center gap-1 text-[#D48598] shrink-0 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-[#D48598]" />
                    {post.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GEN Z NEWSLETTER - Pastel Pink Ribbon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F7EDF0] via-[#FAF5F6] to-[#FAF7F6] rounded-3xl p-8 sm:p-12 border border-[#EFE5E8] text-center space-y-4 shadow-xs">
          <span className="text-2xl">💌</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2E2427]">
            Tham gia RiEn Club & Nhận Quà 10% Cho Đơn Đầu Tiên
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6870] max-w-md mx-auto">
            Cập nhật sớm nhất các bộ sưu tập giới hạn, bí quyết phối đồ balletcore và ưu đãi khắc tên/thêu chữ miễn phí.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 bg-white border border-[#EFE5E8] rounded-full text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598] shadow-xs"
            />
            <button
              type="submit"
              className="bg-[#D48598] hover:bg-[#C27386] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-200/50 cursor-pointer active:scale-95 transition-all"
            >
              <span>Đăng ký</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
