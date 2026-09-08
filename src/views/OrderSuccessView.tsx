import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  CheckCircle, 
  ArrowRight, 
  Printer, 
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { currentOrder, navigateTo } = useShop();

  if (!currentOrder) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-serif font-light text-[#2E2427]">Không tìm thấy thông tin đơn hàng</h2>
        <button
          onClick={() => navigateTo('home')}
          className="bg-[#D48598] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-rose-200/50 cursor-pointer"
        >
          Trở về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in text-[#2E2427]">
      {/* Top Success Banner */}
      <div className="bg-[#FAF5F6] rounded-3xl p-8 text-center space-y-4 shadow-xs border border-[#EFE5E8] relative overflow-hidden">
        <div className="w-14 h-14 rounded-full bg-[#F7EDF0] text-[#A85B70] flex items-center justify-center mx-auto border border-[#EFE5E8]">
          <CheckCircle className="w-7 h-7 stroke-[1.8]" />
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#A85B70] font-bold block mb-1">
            Đặt Hàng Thành Công 🎉
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-[#2E2427]">
            Cảm Ơn Bạn Đã Lựa Chọn RiEn
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6870] max-w-lg mx-auto mt-2 leading-relaxed">
            Nghệ nhân RiEn đã tiếp nhận đơn hàng #{currentOrder.orderNumber} và đang chuẩn bị chế tác tác phẩm hoàn mỹ nhất cho bạn.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full text-xs text-[#2E2427] border border-[#EFE5E8] font-bold">
          <span>Mã đơn: <strong className="font-mono text-[#A85B70]">{currentOrder.orderNumber}</strong></span>
          <span>•</span>
          <span>Ngày tạo: {currentOrder.createdAt}</span>
        </div>
      </div>

      {/* Production & Delivery Timeline */}
      <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE5E8]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#A85B70]" />
            <h3 className="font-serif text-lg text-[#2E2427] font-light">
              Tiến Độ Chế Tác & Giao Vận
            </h3>
          </div>
          <span className="text-xs text-[#A85B70] font-bold bg-[#F7EDF0] border border-[#EFE5E8] px-3 py-1 rounded-full">
            {currentOrder.statusText}
          </span>
        </div>

        <div className="relative pl-6 space-y-6 border-l-2 border-[#EFE5E8]">
          {currentOrder.timeline.map((step, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-white ${
                step.completed ? 'border-[#D48598] bg-[#D48598]' : 'border-[#EFE5E8]'
              }`} />
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold ${step.completed ? 'text-[#2E2427]' : 'text-[#7A6870]/60'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#A85B70]">{step.time}</span>
                </div>
                <p className="text-xs text-[#7A6870] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary & Customization details card */}
      <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="font-serif text-lg text-[#2E2427] font-light pb-3 border-b border-[#EFE5E8]">
          Chi Tiết Sản Phẩm & Make It Yours
        </h3>

        <div className="space-y-4">
          {currentOrder.items.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5E8]">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded-xl border border-[#EFE5E8] shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#2E2427]">{item.product.name}</h4>
                  <div className="text-[11px] text-[#7A6870]">
                    Phân loại: {item.selectedColor.name} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''} • SL: {item.quantity}
                  </div>

                  {item.customization && (
                    <div className="bg-[#F7EDF0] text-[#A85B70] text-[11px] px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1 border border-[#EFE5E8]">
                      <Sparkles className="w-3 h-3 text-[#D48598]" />
                      <span>{item.customization.type === 'embroidery' ? 'Thêu chữ: ' : 'Khắc laser: '}</span>
                      <strong className="font-serif">"{item.customization.text}"</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-serif font-bold text-[#2E2427] block">
                  {item.totalPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-[11px] text-[#7A6870]">
                  (Đã gồm phí Make It Yours)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping & Payment summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#EFE5E8] text-xs">
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[#2E2427] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A85B70]" />
              <span>Địa Chỉ Giao Nhận</span>
            </h4>
            <p className="text-[#2E2427]">
              <strong>{currentOrder.shippingAddress.fullName}</strong> • {currentOrder.shippingAddress.phone}
            </p>
            <p className="text-[#7A6870]">
              {currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.ward}, {currentOrder.shippingAddress.district}, {currentOrder.shippingAddress.city}
            </p>
            {currentOrder.shippingAddress.note && (
              <p className="text-[#7A6870] italic">
                Ghi chú: "{currentOrder.shippingAddress.note}"
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[#2E2427]">
              Tổng Kết Thanh Toán
            </h4>
            <div className="space-y-1 text-[#7A6870]">
              <div className="flex justify-between">
                <span>Tạm tính sản phẩm:</span>
                <span className="font-mono font-bold text-[#2E2427]">{currentOrder.subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-[#A85B70] font-bold">
                <span>Phí Make It Yours:</span>
                <span className="font-mono">+{currentOrder.customizationTotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-[#A85B70] font-bold">
                  <span>Giảm giá:</span>
                  <span className="font-mono">-{currentOrder.discount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span className="font-mono">
                  {currentOrder.shippingFee === 0 ? 'Miễn phí' : `${currentOrder.shippingFee.toLocaleString('vi-VN')}₫`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-[#2E2427] pt-2 border-t border-[#EFE5E8]">
                <span>Tổng cộng:</span>
                <span className="text-base font-serif text-[#A85B70]">
                  {currentOrder.total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#EFE5E8] hover:border-[#D48598] text-[#2E2427] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer bg-white active:scale-95 shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-[#A85B70]" />
          <span>In Hóa Đơn Điện Tử</span>
        </button>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('account')}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#D48598] hover:bg-[#C27386] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-rose-200/50 active:scale-95"
          >
            <span>Theo Dõi Đơn Hàng</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>

          <button
            onClick={() => navigateTo('catalog')}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-white border border-[#EFE5E8] hover:bg-[#FAF5F6] text-[#2E2427] text-xs font-bold flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};
