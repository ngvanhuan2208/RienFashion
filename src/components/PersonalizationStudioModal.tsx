import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Sparkles, 
  Gift, 
  Check, 
  ShoppingBag, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Eye
} from 'lucide-react';
import { UserCustomization } from '../types';

export const PersonalizationStudioModal: React.FC = () => {
  const { 
    isStudioOpen, 
    closeStudio, 
    studioProduct, 
    studioInitialCustomization, 
    addToCart, 
    showToast 
  } = useShop();

  if (!isStudioOpen || !studioProduct) return null;

  const isApparel = studioProduct.category === 'clothing';
  const mode: 'embroidery' | 'engraving' = isApparel ? 'embroidery' : 'engraving';
  const config = studioProduct.customizationConfig;

  // Customization Options
  const apparelPositions = [
    { id: 'chest_left', label: 'Ngực trái', previewCoords: { x: 42, y: 38 } },
    { id: 'cuff_right', label: 'Cổ tay áo', previewCoords: { x: 74, y: 68 } },
    { id: 'collar', label: 'Cổ áo / Sau gáy', previewCoords: { x: 50, y: 22 } },
    { id: 'hem', label: 'Vạt áo / Gấu váy', previewCoords: { x: 45, y: 82 } },
  ];

  const beautyPositions = [
    { id: 'bottle_body', label: 'Thân chai / Thân son', previewCoords: { x: 50, y: 55 } },
    { id: 'cap', label: 'Nắp kim loại / Nắp gỗ', previewCoords: { x: 50, y: 26 } },
    { id: 'base', label: 'Đế chai / Viền đế', previewCoords: { x: 50, y: 82 } },
  ];

  const positions = isApparel ? apparelPositions : beautyPositions;

  const fontOptions = [
    { id: 'cursive', name: 'Cursive (Chữ ký)', fontFamily: "'Great Vibes', cursive", preview: 'Khánh Linh' },
    { id: 'serif', name: 'Serif (Cổ điển)', fontFamily: "'Cormorant Garamond', serif", preview: 'KHÁNH LINH' },
    { id: 'modern', name: 'Modern (Hiện đại)', fontFamily: "'Plus Jakarta Sans', sans-serif", preview: 'KHÁNH LINH' },
  ];

  const embroideryColors = [
    { id: 'pink', name: 'Pastel Blush Rose', hex: '#D48598' },
    { id: 'rosegold', name: 'Rose Gold', hex: '#C79288' },
    { id: 'gold', name: 'Vàng Kim Metallic', hex: '#E6CA65' },
    { id: 'silver', name: 'Bạc Lụa Tinh Khiết', hex: '#E5E7EB' },
    { id: 'deeprose', name: 'Dusty Plum', hex: '#7A3E50' },
  ];

  const engravingColors = [
    { id: 'gold', name: 'Gold (Mạ vàng)', hex: '#E6CA65' },
    { id: 'pink', name: 'Pink Gold (Nhũ hồng)', hex: '#D48598' },
    { id: 'silver', name: 'Silver (Bạc bạch kim)', hex: '#E5E7EB' },
    { id: 'rosegold', name: 'Rose Gold (Vàng hồng)', hex: '#C79288' },
  ];

  const colors = isApparel ? embroideryColors : engravingColors;

  // State
  const [text, setText] = useState(studioInitialCustomization?.text || 'Khánh Linh');
  const [fontId, setFontId] = useState(studioInitialCustomization?.fontId || 'cursive');
  const [colorId, setColorId] = useState(studioInitialCustomization?.colorId || colors[0].id);
  const [positionId, setPositionId] = useState(studioInitialCustomization?.positionId || positions[0].id);
  const [includeGiftBox, setIncludeGiftBox] = useState(studioInitialCustomization?.includeGiftBox || false);
  const [giftMessage, setGiftMessage] = useState(studioInitialCustomization?.giftMessage || '');
  const [selectedSize, setSelectedSize] = useState(studioProduct.sizes[0] || 'M');

  // UX Interactive Controls
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  // Active selections
  const currentFont = fontOptions.find(f => f.id === fontId) || fontOptions[0];
  const currentColor = colors.find(c => c.id === colorId) || colors[0];
  const currentPosition = positions.find(p => p.id === positionId) || positions[0];

  const maxChars = isApparel ? 14 : 18;
  const baseCustomFee = isApparel ? (config?.embroideryFee || 65000) : (config?.engravingFee || 85000);
  const giftBoxFee = includeGiftBox ? (config?.giftBoxFee || 45000) : 0;
  const totalItemPrice = studioProduct.price + baseCustomFee + giftBoxFee;

  const handleCompleteAndAddToCart = () => {
    if (!text.trim()) {
      showToast('Vui lòng nhập nội dung muốn cá nhân hóa!', 'warning');
      return;
    }

    const customization: UserCustomization = {
      type: mode,
      text: text.trim(),
      fontId,
      colorId,
      positionId,
      includeGiftBox,
      giftMessage: includeGiftBox ? giftMessage : undefined,
      additionalFee: baseCustomFee
    };

    addToCart({
      productId: studioProduct.id,
      product: studioProduct,
      selectedVariant: studioProduct.variants[0],
      selectedSize,
      selectedColor: { name: studioProduct.colors[0]?.name || 'Mặc định', hex: studioProduct.colors[0]?.hex || '#000' },
      quantity: 1,
      unitPrice: studioProduct.price,
      customization
    });

    showToast('Đã thêm sản phẩm cá nhân hóa vào giỏ hàng!', 'success');
    closeStudio();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2E2427]/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF7F6] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#EFE5E8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-white/95 px-6 py-4 flex items-center justify-between border-b border-[#EFE5E8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F7EDF0] text-[#A85B70] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D48598]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg text-[#2E2427] font-normal">
                  Make It Yours ✨
                </h3>
                <span className="text-[10px] tracking-wider uppercase font-bold bg-[#F7EDF0] text-[#A85B70] px-2.5 py-0.5 rounded-full border border-[#EFE5E8]">
                  {isApparel ? 'Thêu Tên Thủ Công' : 'Khắc Laser Độc Bản'}
                </span>
              </div>
              <p className="text-xs text-[#7A6870]">
                {studioProduct.name} • Mô phỏng trực quan chuẩn aesthetic
              </p>
            </div>
          </div>

          <button
            id="close-studio-btn"
            onClick={closeStudio}
            className="p-1.5 text-[#7A6870] hover:text-[#A85B70] rounded-full hover:bg-[#F7EDF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* CỘT TRÁI: LIVE PREVIEW (Col 7) */}
          <div className={`lg:col-span-7 p-6 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-[#EFE5E8] transition-colors ${
            previewTheme === 'dark' ? 'bg-[#252022]' : 'bg-gradient-to-br from-[#FAF5F6] to-[#F2E8EB]'
          }`}>
            {/* Viewport Toolbar */}
            <div className="w-full max-w-md flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-full border border-[#EFE5E8] shadow-xs">
                <button
                  onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
                  className="p-1.5 rounded-full hover:bg-[#F7EDF0] text-[#2E2427]"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-3.5 h-3.5 stroke-[1.8]" />
                </button>
                <span className="text-[10px] font-mono font-bold px-1 text-[#A85B70]">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(1.6, zoomLevel + 0.2))}
                  className="p-1.5 rounded-full hover:bg-[#F7EDF0] text-[#2E2427]"
                  title="Phóng to"
                >
                  <ZoomIn className="w-3.5 h-3.5 stroke-[1.8]" />
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-full border border-[#EFE5E8] shadow-xs">
                <button
                  onClick={() => setPreviewTheme('light')}
                  className={`px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                    previewTheme === 'light'
                      ? 'bg-[#D48598] text-white font-bold'
                      : 'text-[#2E2427] hover:text-[#A85B70]'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>Sáng</span>
                </button>
                <button
                  onClick={() => setPreviewTheme('dark')}
                  className={`px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                    previewTheme === 'dark'
                      ? 'bg-[#2E2427] text-white font-bold'
                      : 'text-[#2E2427] hover:text-[#A85B70]'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>Tối</span>
                </button>
              </div>
            </div>

            {/* Stage Canvas */}
            <div className="relative w-full max-w-md aspect-[4/5] bg-white rounded-3xl shadow-lg border border-[#EFE5E8] overflow-hidden flex items-center justify-center select-none">
              <div 
                className="w-full h-full relative transition-transform duration-300 origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={studioProduct.images[0]}
                  alt={studioProduct.name}
                  className="w-full h-full object-cover"
                />

                {/* Live Customization Text Realtime Render */}
                <div
                  className="absolute transition-all duration-300 pointer-events-none flex flex-col items-center justify-center px-3 py-1.5 text-center"
                  style={{
                    left: `${currentPosition.previewCoords.x}%`,
                    top: `${currentPosition.previewCoords.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative p-2.5 rounded-xl border border-dashed border-white/80 bg-black/35 backdrop-blur-[2px] shadow-xl">
                    <div
                      className="whitespace-nowrap transition-all duration-200"
                      style={{
                        fontFamily: currentFont.fontFamily,
                        color: currentColor.hex,
                        textShadow: mode === 'embroidery'
                          ? `0 1px 2px rgba(0,0,0,0.7), 0 0 1px ${currentColor.hex}`
                          : `0 0 4px ${currentColor.hex}, 0 1px 3px rgba(0,0,0,0.8)`,
                        letterSpacing: fontId === 'cursive' ? 'normal' : '0.15em'
                      }}
                    >
                      <span className={
                        fontId === 'cursive'
                          ? 'text-xl sm:text-2xl capitalize'
                          : 'text-sm sm:text-base font-bold uppercase'
                      }>
                        {text || 'Tên Của Bạn'}
                      </span>
                    </div>

                    {/* Position Label Tag */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#2E2427]/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow whitespace-nowrap">
                      {currentPosition.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Real-time Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#A85B70] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-[#EFE5E8]">
                <Eye className="w-3 h-3 text-[#D48598]" />
                <span>Live Preview</span>
              </div>
            </div>

            <p className="text-[11px] text-[#7A6870] mt-3 text-center">
              Mô phỏng chân thực nét thêu chỉ tơ và khắc laser độc quyền tại RiEn.
            </p>
          </div>

          {/* CỘT PHẢI: TÙY CHỈNH (Col 5) */}
          <div className="lg:col-span-5 p-6 space-y-5 overflow-y-auto bg-[#FAF5F6]">
            {/* 1. Nội dung */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                  1. Nội dung {isApparel ? 'thêu' : 'khắc'}
                </label>
                <span className="text-[10px] font-mono text-[#A85B70] font-bold">
                  {text.length}/{maxChars} ký tự
                </span>
              </div>
              <input
                id="studio-text-input"
                type="text"
                maxLength={maxChars}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={isApparel ? 'VD: Khánh Linh, M • D' : 'VD: Linh & Minh, 24.12'}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#EFE5E8] rounded-2xl text-[#2E2427] font-medium focus:outline-none focus:border-[#D48598] transition-all shadow-xs"
              />
            </div>

            {/* 2. Font chữ */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block mb-1.5">
                2. Phông chữ thiết kế
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fontOptions.map((f) => (
                  <button
                    key={f.id}
                    id={`font-opt-${f.id}`}
                    onClick={() => setFontId(f.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      fontId === f.id
                        ? 'bg-[#F7EDF0] border-[#D48598] shadow-xs'
                        : 'bg-white border-[#EFE5E8] text-[#2E2427] hover:bg-[#F7EDF0]/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-[#2E2427] truncate">{f.name.split(' ')[0]}</div>
                    <div className="text-xs truncate text-[#A85B70] mt-0.5" style={{ fontFamily: f.fontFamily }}>
                      {text ? text : f.preview}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Màu sắc */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                  3. Màu {isApparel ? 'chỉ thêu' : 'khắc mạ'}
                </label>
                <span className="text-[11px] text-[#A85B70] font-bold">
                  {currentColor.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    id={`color-opt-${c.id}`}
                    onClick={() => setColorId(c.id)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      colorId === c.id
                        ? 'ring-2 ring-[#D48598] ring-offset-2 scale-110 shadow-xs'
                        : 'border-[#EFE5E8] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {colorId === c.id && (
                      <Check className="w-3.5 h-3.5 text-[#2E2427]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Vị trí */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block mb-1.5">
                4. Vị trí {isApparel ? 'thêu' : 'khắc'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {positions.map((pos) => (
                  <button
                    key={pos.id}
                    id={`pos-opt-${pos.id}`}
                    onClick={() => setPositionId(pos.id)}
                    className={`p-2.5 rounded-2xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                      positionId === pos.id
                        ? 'bg-[#D48598] border-[#D48598] text-white font-bold shadow-xs'
                        : 'bg-white border-[#EFE5E8] text-[#2E2427] hover:bg-[#F7EDF0]/50'
                    }`}
                  >
                    <span>{pos.label}</span>
                    {positionId === pos.id && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Hộp quà tặng sang trọng (Option) */}
            <div className="bg-white border border-[#EFE5E8] rounded-2xl p-3.5 space-y-2 shadow-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#D48598]" />
                  <div>
                    <span className="text-xs font-bold text-[#2E2427] block">
                      Hộp Quà Pastel & Thiệp Viết Tay 🎀
                    </span>
                    <span className="text-[10px] text-[#7A6870]">
                      Hộp cứng phủ nhung pastel, ruy băng lụa (+{(config?.giftBoxFee || 45000).toLocaleString('vi-VN')}₫)
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeGiftBox}
                  onChange={(e) => setIncludeGiftBox(e.target.checked)}
                  className="accent-[#D48598] cursor-pointer w-4 h-4"
                />
              </label>

              {includeGiftBox && (
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Nội dung lời nhắn trên thiệp viết tay gửi kèm..."
                  className="w-full text-xs p-2.5 bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                />
              )}
            </div>

            {/* Tính phụ phí tự động */}
            <div className="bg-[#F7EDF0] border border-[#EFE5E8] rounded-2xl p-4 space-y-1.5 text-xs text-[#2E2427]">
              <div className="flex justify-between">
                <span>Giá sản phẩm:</span>
                <span className="font-mono font-bold text-[#2E2427]">{studioProduct.price.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-[#A85B70] font-bold">
                <span>Phí {isApparel ? 'thêu tên' : 'khắc laser'}:</span>
                <span className="font-mono">+{baseCustomFee.toLocaleString('vi-VN')}₫</span>
              </div>
              {includeGiftBox && (
                <div className="flex justify-between text-[#A85B70] font-bold">
                  <span>Hộp quà & thiệp:</span>
                  <span className="font-mono">+{(config?.giftBoxFee || 45000).toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#EFE5E8] flex justify-between items-center text-sm font-serif font-bold text-[#2E2427]">
                <span>Tổng cộng:</span>
                <span className="text-base text-[#A85B70]">
                  {totalItemPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Nút CTA: Hoàn tất & Thêm vào giỏ */}
            <button
              id="studio-complete-add-btn"
              onClick={handleCompleteAndAddToCart}
              className="w-full bg-[#D48598] hover:bg-[#C27386] text-white py-3.5 px-4 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-200/50 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Hoàn tất & Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
