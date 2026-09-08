import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Package, 
  RotateCcw, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setCategoryFilter } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF5F6] text-[#2E2427] pt-14 pb-12 border-t border-[#EFE5E8] transition-colors">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-[#EFE5E8]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
            <div className="p-2 bg-[#F7EDF0] text-[#A85B70] rounded-xl shrink-0">
              <Sparkles className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="text-[#2E2427] font-bold text-xs tracking-wide mb-1 uppercase font-sans">
                Make It Yours ✨
              </h4>
              <p className="text-xs text-[#7A6870] leading-relaxed">
                Thêu tên chỉ tơ trên trang phục và khắc laser tinh tế trên mỹ phẩm chuẩn aesthetic.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
            <div className="p-2 bg-[#F7EDF0] text-[#A85B70] rounded-xl shrink-0">
              <Package className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="text-[#2E2427] font-bold text-xs tracking-wide mb-1 uppercase font-sans">
                Hộp Quà Pastel 🎀
              </h4>
              <p className="text-xs text-[#7A6870] leading-relaxed">
                Đóng gói hộp quà phủ nhung hồng pastel, thắt nơ ruy băng lụa và thiệp tay.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
            <div className="p-2 bg-[#F7EDF0] text-[#A85B70] rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="text-[#2E2427] font-bold text-xs tracking-wide mb-1 uppercase font-sans">
                Chất Liệu Cao Cấp
              </h4>
              <p className="text-xs text-[#7A6870] leading-relaxed">
                Lụa tơ tằm, linen tự nhiên và thành phần mỹ phẩm an toàn cho làn da.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-white/80 p-4 rounded-2xl border border-[#EFE5E8]">
            <div className="p-2 bg-[#F7EDF0] text-[#A85B70] rounded-xl shrink-0">
              <RotateCcw className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="text-[#2E2427] font-bold text-xs tracking-wide mb-1 uppercase font-sans">
                Live Preview 3D
              </h4>
              <p className="text-xs text-[#7A6870] leading-relaxed">
                Mô phỏng chân thực font chữ, màu chỉ và vị trí trước khi chốt đơn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-2xl font-serif tracking-[0.2em] text-[#2E2427] uppercase font-light">
                RiEn
              </h3>
              <p className="text-xs tracking-[0.2em] uppercase text-[#A85B70] font-bold">
                Beauty, Made Personal
              </p>
            </div>
            <p className="text-xs text-[#7A6870] leading-relaxed max-w-sm">
              Boutique thời trang nữ, mỹ phẩm và quà tặng thiết kế theo phong cách Quiet Luxury & Pastel Chic cho các cô gái hiện đại.
            </p>
            <div className="space-y-1.5 text-xs text-[#7A6870] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A85B70] shrink-0" />
                <span>Boutique: 28 Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A85B70] shrink-0" />
                <span>Boutique: 68 Đồng Khởi, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A85B70] shrink-0" />
                <span>Hotline: 1900 8899 (8h30 - 21h30)</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-[#2E2427] tracking-wider uppercase mb-3 font-sans">
              Danh Mục
            </h4>
            <ul className="space-y-2 text-xs text-[#7A6870]">
              <li>
                <button onClick={() => setCategoryFilter('clothing')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
                  Thời Trang Nữ
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter('beauty')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
                  Mỹ Phẩm & Nước Hoa
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter('gifts')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
                  Quà Tặng Tinh Tế
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter('personalized')} className="text-[#A85B70] hover:underline font-bold cursor-pointer">
                  ✦ Make It Yours Studio
                </button>
              </li>
              <li>
                <button onClick={() => setCategoryFilter('all')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
                  Bộ Sưu Tập Mới
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-[#2E2427] tracking-wider uppercase mb-3 font-sans">
              Hỗ Trợ & Dịch Vụ
            </h4>
            <ul className="space-y-2 text-xs text-[#7A6870]">
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#A85B70] transition-colors cursor-pointer">
                  Theo Dõi Đơn Hàng
                </button>
              </li>
              <li>
                <span className="hover:text-[#A85B70] cursor-pointer">Chính Sách Cá Nhân Hóa</span>
              </li>
              <li>
                <span className="hover:text-[#A85B70] cursor-pointer">Bảng Hướng Dẫn Chọn Size</span>
              </li>
              <li>
                <span className="hover:text-[#A85B70] cursor-pointer">Hướng Dẫn Bảo Quản Lụa</span>
              </li>
              <li>
                <span className="hover:text-[#A85B70] cursor-pointer">Quà Tặng Bestie Box</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-[#2E2427] tracking-wider uppercase mb-3 font-sans">
              Nhận Ưu Đãi 10%
            </h4>
            <p className="text-xs text-[#7A6870] mb-3 leading-relaxed">
              Nhận mã voucher độc quyền và thông tin mở bán sớm nhất.
            </p>
            {subscribed ? (
              <div className="bg-white border border-[#EFE5E8] text-[#2E2427] p-3 rounded-2xl flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 shrink-0 text-[#D48598]" />
                <span>Cảm ơn bạn đã tham gia RiEn Club!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email của bạn..."
                    className="w-full bg-white border border-[#EFE5E8] text-[#2E2427] placeholder-[#7A6870]/60 px-3.5 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#D48598]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#D48598] hover:bg-[#C27386] text-white rounded-full text-xs flex items-center justify-center transition-all cursor-pointer font-bold"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#7A6870]/70 block">Bảo mật thông tin tuyệt đối.</span>
              </form>
            )}

            <div className="mt-4 flex items-center gap-2 text-[#A85B70]">
              <span className="text-xs text-[#7A6870]">Follow:</span>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#F7EDF0] border border-[#EFE5E8] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#F7EDF0] border border-[#EFE5E8] transition-colors" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#F7EDF0] border border-[#EFE5E8] transition-colors" aria-label="Mail">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#EFE5E8] text-xs text-[#7A6870] flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© 2026 RiEn Boutique. Beauty, Made Personal. Make It Yours.</p>
        <div className="flex items-center gap-2 text-[11px]">
          <span>Thanh toán:</span>
          <span className="px-2.5 py-0.5 bg-white rounded-full text-[#2E2427] font-medium border border-[#EFE5E8]">VietQR</span>
          <span className="px-2.5 py-0.5 bg-white rounded-full text-[#2E2427] font-medium border border-[#EFE5E8]">Visa / Master</span>
          <span className="px-2.5 py-0.5 bg-white rounded-full text-[#2E2427] font-medium border border-[#EFE5E8]">COD</span>
        </div>
      </div>
    </footer>
  );
};
