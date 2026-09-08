import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { MOCK_REVIEWS } from '../data/reviewsData';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Ruler, 
  ChevronRight,
  ShieldCheck,
  Package,
  RotateCcw
} from 'lucide-react';
import { UserCustomization } from '../types';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    openStudio, 
    toggleWishlist, 
    isInWishlist
  } = useShop();

  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const reviews = MOCK_REVIEWS[product.id] || MOCK_REVIEWS['prod-shirt-01'];
  const isWishlisted = isInWishlist(product.id);
  const isClothing = product.category === 'clothing';
  const config = product.customizationConfig;
  const mode = isClothing ? 'embroidery' : 'engraving';

  // State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'reviews'>('desc');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // In-line Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customText, setCustomText] = useState('Khánh Linh');
  const [fontId, setFontId] = useState(config?.fonts[0]?.id || 'cursive');
  const [colorId, setColorId] = useState(config?.colors[0]?.id || 'rosegold');
  const [positionId, setPositionId] = useState(config?.positions[0]?.id || 'chest_left');

  // Helpers
  const currentFont = config?.fonts.find(f => f.id === fontId) || config?.fonts[0];
  const currentColor = config?.colors.find(c => c.id === colorId) || config?.colors[0];
  const currentPosition = config?.positions.find(p => p.id === positionId) || config?.positions[0];
  const selectedColor = product.colors[selectedColorIdx] || product.colors[0];
  const activeVariant = product.variants.find(v => v.colorName.includes(selectedColor.name)) || product.variants[0];

  const baseCustomFee = isCustomizing 
    ? (mode === 'embroidery' ? (config?.embroideryFee || 65000) : (config?.engravingFee || 85000))
    : 0;
  const unitFinalPrice = product.price + baseCustomFee;
  const previewCoords = currentPosition?.previewCoords || { x: 50, y: 50 };

  // Prepare Customization Data
  const getCustomizationPayload = (): UserCustomization | undefined => {
    if (!isCustomizing) return undefined;
    return {
      type: mode,
      text: customText.trim() || 'RiEn',
      fontId,
      colorId,
      positionId,
      additionalFee: baseCustomFee
    };
  };

  // Add to Cart
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      product,
      selectedVariant: activeVariant,
      selectedSize,
      selectedColor: { name: selectedColor.name, hex: selectedColor.hex },
      quantity,
      unitPrice: product.price,
      customization: getCustomizationPayload()
    });
  };

  // Buy Now
  const handleBuyNow = () => {
    handleAddToCart();
    navigateTo('checkout');
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 text-[#2E2427]">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A6870]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
          Trang chủ
        </button>
        <ChevronRight className="w-3 h-3 text-[#D48598]" />
        <button onClick={() => navigateTo('catalog')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
          {product.category === 'clothing' ? 'Thời Trang Nữ' : product.category === 'beauty' ? 'Mỹ Phẩm' : 'Quà Tặng'}
        </button>
        <ChevronRight className="w-3 h-3 text-[#D48598]" />
        <span className="text-[#2E2427] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2-Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery (Main Image + Thumbnails) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/5] bg-[#F7EDF0]/50 rounded-3xl overflow-hidden border border-[#EFE5E8] shadow-xs group">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />

            {/* Live Customization Visual Overlay */}
            {isCustomizing && customText && (
              <div
                className="absolute transition-all duration-300 pointer-events-none flex flex-col items-center justify-center p-2 text-center"
                style={{
                  left: `${previewCoords.x}%`,
                  top: `${previewCoords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="p-2.5 rounded-xl border border-white/60 bg-black/35 backdrop-blur-[2px] shadow-lg">
                  <div
                    className={`whitespace-nowrap ${currentFont?.styleClass || ''}`}
                    style={{
                      fontFamily: currentFont?.fontFamily,
                      color: currentColor?.hex,
                      textShadow: mode === 'embroidery'
                        ? `0 1px 2px rgba(0,0,0,0.6), 0 0 1px ${currentColor?.hex}`
                        : `0 0 4px ${currentColor?.hex}, 0 1px 3px rgba(0,0,0,0.8)`,
                      letterSpacing: mode === 'embroidery' ? '0.08em' : '0.15em',
                    }}
                  >
                    <span className="text-base sm:text-lg font-bold select-none">
                      {customText}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#F7EDF0] text-[#A85B70] text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[#EFE5E8] shadow-xs">
                {product.badge}
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-xs transition-all active:scale-90 cursor-pointer ${
                isWishlisted ? 'bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8]' : 'bg-white/90 text-[#7A6870] hover:bg-[#F7EDF0]'
              }`}
            >
              <Heart className={`w-4 h-4 stroke-[1.8] ${isWishlisted ? 'fill-[#A85B70]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-18 h-22 rounded-2xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                  activeImageIdx === idx ? 'border-[#D48598] ring-2 ring-[#EFE5E8] shadow-xs scale-103' : 'border-[#EFE5E8] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A85B70] font-bold block mb-1">
              {product.collection}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427] tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6870] mt-1 font-normal">
              {product.subtitle}
            </p>

            {/* Rating & Stock */}
            <div className="mt-3 flex items-center gap-3 text-xs text-[#7A6870]">
              <div className="flex items-center text-[#D48598]">
                <Star className="w-3.5 h-3.5 fill-[#D48598] text-[#D48598]" />
                <span className="ml-1 font-bold text-[#2E2427]">{product.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span className="underline cursor-pointer hover:text-[#A85B70]" onClick={() => setActiveTab('reviews')}>
                {product.reviewCount} đánh giá
              </span>
              <span>•</span>
              <span className="text-[#A85B70] font-bold">
                Tồn kho: Còn {activeVariant.stock} sản phẩm
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-[#FAF5F6] border border-[#EFE5E8] p-4 rounded-2xl flex items-baseline gap-3">
            <span className="text-2xl font-serif font-bold text-[#2E2427]">
              {unitFinalPrice.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#7A6870]/60 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            {isCustomizing && (
              <span className="text-xs text-[#A85B70] font-bold bg-[#F7EDF0] border border-[#EFE5E8] px-2.5 py-0.5 rounded-full">
                Đã gồm Make It Yours (+{baseCustomFee.toLocaleString('vi-VN')}₫)
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block">
              Màu sắc: <strong className="text-[#A85B70]">{selectedColor.name}</strong>
            </span>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColorIdx(i)}
                  className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                    selectedColorIdx === i ? 'ring-2 ring-[#D48598] ring-offset-2 scale-110' : 'border-[#EFE5E8] shadow-xs'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColorIdx === i && (
                    <Check className="w-3 h-3 text-[#2E2427]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-wider text-[#2E2427] font-bold">
                  Kích cỡ: <strong className="text-[#A85B70]">{selectedSize}</strong>
                </span>
                {isClothing && (
                  <button
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="text-[#A85B70] hover:text-[#2E2427] flex items-center gap-1 underline font-medium cursor-pointer"
                  >
                    <Ruler className="w-3 h-3 stroke-[1.8]" />
                    <span>Bảng size</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#D48598] text-white shadow-xs'
                        : 'bg-[#FAF5F6] border border-[#EFE5E8] text-[#2E2427] hover:bg-[#F7EDF0]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {sizeGuideOpen && (
                <div className="bg-[#FAF7F6] border border-[#EFE5E8] rounded-2xl p-4 text-xs text-[#2E2427] space-y-2 animate-fade-in">
                  <div className="font-bold text-[#2E2427]">Bảng thông số may đo RiEn:</div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono border-t border-[#EFE5E8] pt-2 text-[#7A6870]">
                    <div>Size S: 46-52kg</div>
                    <div>Size M: 53-58kg</div>
                    <div>Size L: 59-64kg</div>
                    <div>Size XL: 65-72kg</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* In-line Customization Module if Supported */}
          {product.isPersonalized && config && (
            <div className="border border-[#EFE5E8] bg-[#FAF5F6] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D48598]" />
                  <span className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                    {mode === 'embroidery' ? 'Thêu Tên / Chữ Ký' : 'Khắc Tên Laser Mạ Nhũ'}
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#A85B70] font-semibold">
                  <span>Áp dụng (+{baseCustomFee.toLocaleString('vi-VN')}₫)</span>
                  <input
                    type="checkbox"
                    checked={isCustomizing}
                    onChange={(e) => setIsCustomizing(e.target.checked)}
                    className="accent-[#D48598] cursor-pointer"
                  />
                </label>
              </div>

              {isCustomizing && (
                <div className="space-y-3 pt-2 border-t border-[#EFE5E8]">
                  <div>
                    <label className="text-[11px] font-bold text-[#2E2427] block mb-1">
                      Nội dung thêu/khắc ({customText.length}/{config.maxChars} ký tự):
                    </label>
                    <input
                      type="text"
                      maxLength={config.maxChars}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Nhập tên của bạn..."
                      className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] font-medium focus:outline-none focus:border-[#D48598]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons: 1. Thêm vào giỏ | 2. Make It Yours | 3. Mua ngay */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#EFE5E8] rounded-full bg-[#FAF5F6] px-3 py-2 shrink-0 self-start sm:self-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#2E2427] hover:text-[#A85B70] px-2 text-sm font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono font-bold text-[#2E2427]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#2E2427] hover:text-[#A85B70] px-2 text-sm font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Button 1: Thêm vào giỏ */}
              <button
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-[#FAF7F6] text-[#2E2427] border border-[#EFE5E8] py-3 px-5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>Thêm vào giỏ</span>
              </button>

              {/* Button 2: Make It Yours Studio */}
              {product.isPersonalized && (
                <button
                  id="pdp-make-it-yours-btn"
                  onClick={() => openStudio(product)}
                  className="flex-1 bg-[#F7EDF0] hover:bg-[#F0DFE4] text-[#A85B70] border border-[#EFE5E8] py-3 px-5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D48598]" />
                  <span>Make It Yours</span>
                </button>
              )}
            </div>

            {/* Button 3: Mua ngay */}
            <button
              id="pdp-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full bg-[#D48598] hover:bg-[#C27386] text-white py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md shadow-rose-200/50"
            >
              <span>Mua ngay</span>
            </button>
          </div>

          {/* Boutique Reassurance */}
          <div className="pt-4 border-t border-[#EFE5E8] grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-[#FAF5F6] border border-[#EFE5E8] rounded-2xl">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#A85B70] mb-1 stroke-[1.8]" />
              <span className="text-[11px] block font-medium text-[#2E2427]">Thủ công tinh xảo</span>
            </div>
            <div className="p-3 bg-[#FAF5F6] border border-[#EFE5E8] rounded-2xl">
              <Package className="w-4 h-4 mx-auto text-[#A85B70] mb-1 stroke-[1.8]" />
              <span className="text-[11px] block font-medium text-[#2E2427]">Hộp quà pastel</span>
            </div>
            <div className="p-3 bg-[#FAF5F6] border border-[#EFE5E8] rounded-2xl">
              <RotateCcw className="w-4 h-4 mx-auto text-[#A85B70] mb-1 stroke-[1.8]" />
              <span className="text-[11px] block font-medium text-[#2E2427]">Bảo hành tỉ mỉ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion / Tabs: Mô tả chi tiết, Chất liệu, Đánh giá */}
      <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] overflow-hidden shadow-xs">
        <div className="flex border-b border-[#EFE5E8] bg-[#F7EDF0]/60 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'desc', label: 'Mô tả chi tiết' },
            { id: 'materials', label: 'Chất liệu & bảo quản' },
            { id: 'reviews', label: `Đánh giá khách hàng (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer text-xs font-bold ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#D48598] text-[#A85B70] bg-[#FAF5F6]'
                  : 'text-[#7A6870] hover:text-[#2E2427]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 text-xs sm:text-sm text-[#2E2427] leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <p>{product.description}</p>
              <div>
                <h4 className="font-serif text-base text-[#2E2427] mb-2 font-bold">Điểm nhấn chế tác:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#7A6870]">
                  <li>Chất liệu chọn lọc tự nhiên cao cấp, độ bền vượt trội</li>
                  <li>Tùy chọn thêu tên chữ ký hoặc khắc laser mạ nhũ vàng độc bản</li>
                  <li>Tặng kèm túi vải chống bụi canvas organic & thiệp viết tay theo yêu cầu</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h4 className="font-serif text-base text-[#2E2427] mb-1 font-bold">Chất liệu cao cấp:</h4>
                <p className="text-[#7A6870]">
                  Sợi vải và phôi sản phẩm được tuyển chọn nghiêm ngặt theo tiêu chuẩn sinh thái an toàn, lành tính cho làn da.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-base text-[#2E2427] mb-1 font-bold">Hướng dẫn bảo quản:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#7A6870]">
                  <li>Khuyến khích giặt tay hoặc chế độ giặt lụa nhẹ nhàng, lộn trái sản phẩm khi giặt</li>
                  <li>Tránh ủi trực tiếp ở nhiệt độ cao lên vùng thêu chỉ kim tuyến hoặc khắc mạ</li>
                  <li>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng gắt chiếu trực tiếp</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-[#EFE5E8] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2E2427]">{rev.author}</span>
                      <div className="flex items-center text-[#D48598]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D48598]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#7A6870] leading-relaxed">"{rev.content}"</p>
                    <span className="text-[10px] text-[#A85B70]/70 block font-mono">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sản phẩm gợi ý bên dưới */}
      <section className="space-y-6">
        <div className="border-b border-[#EFE5E8] pb-3">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#A85B70] font-bold block">
            Gợi Ý Riêng Cho Bạn
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#2E2427] mt-0.5">
            Sản Phẩm Tương Tự
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
