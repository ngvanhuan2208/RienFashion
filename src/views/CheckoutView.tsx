import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Truck, 
  Tag, 
  ArrowLeft, 
  Lock, 
  Gift, 
  Check, 
  UserCheck,
  Smartphone
} from 'lucide-react';
import { ShippingAddress, PaymentMethod } from '../types';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartCustomizationFeeTotal, 
    cartTotal, 
    appliedVoucher, 
    voucherDiscount, 
    applyVoucher, 
    removeVoucher, 
    user, 
    openAuth, 
    createOrder, 
    navigateTo, 
    showToast 
  } = useShop();

  // If cart empty, return to shop
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-light text-[#2E2427]">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-[#7A6870]">Vui lòng chọn sản phẩm trước khi tiến hành thanh toán.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="bg-[#D48598] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#C27386] shadow-md shadow-rose-200/50 cursor-pointer"
        >
          Khám phá sản phẩm
        </button>
      </div>
    );
  }

  // Address State
  const defaultAddr = user?.addresses[0];
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: defaultAddr?.fullName || 'Lê Hoàng Khánh Linh',
    phone: defaultAddr?.phone || '0908 123 456',
    email: defaultAddr?.email || 'khanhlinh.rien@gmail.com',
    city: defaultAddr?.city || 'Hồ Chí Minh',
    district: defaultAddr?.district || 'Quận 1',
    ward: defaultAddr?.ward || 'Phường Bến Nghé',
    address: defaultAddr?.address || '12 Lê Duẩn',
    note: defaultAddr?.note || 'Đóng gói nơ lụa hồng pastel tinh tế'
  });

  // Shipping Method
  const [shippingMethodId, setShippingMethodId] = useState<'standard' | 'express'>('express');
  const isFreeShip = cartTotal >= 1500000;
  const standardCost = isFreeShip ? 0 : 35000;
  const expressCost = 65000;
  const shippingFee = shippingMethodId === 'standard' ? standardCost : expressCost;

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vietqr');
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Card details state for mock gateway
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const finalPayTotal = cartTotal + shippingFee;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    if (!res.success) {
      setVoucherError(res.message);
    } else {
      setVoucherInput('');
      setVoucherError('');
      showToast(res.message, 'success');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName.trim() || !address.phone.trim() || !address.address.trim()) {
      showToast('Vui lòng điền đầy đủ thông tin giao hàng!', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedShipping = {
        id: shippingMethodId,
        name: shippingMethodId === 'standard' ? 'Giao Tiêu Chuẩn Toàn Quốc' : 'Giao Hỏa Tốc RiEn Express',
        cost: shippingFee,
        estimatedDays: shippingMethodId === 'standard' ? '2-3 ngày' : '1-2 ngày'
      };

      createOrder({
        address,
        shippingMethod: selectedShipping,
        paymentMethod
      });

      setIsSubmitting(false);
      navigateTo('order-success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-[#2E2427]">
      {/* Top back & title */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EFE5E8]">
        <button
          onClick={() => navigateTo('catalog')}
          className="text-xs text-[#A85B70] hover:text-[#2E2427] flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95 font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tiếp tục mua sắm</span>
        </button>
        <h1 className="text-xl sm:text-2xl font-serif font-light text-[#2E2427] tracking-wide">
          Thanh Toán Đơn Hàng
        </h1>
        <div className="flex items-center gap-1.5 text-[11px] text-[#A85B70] bg-[#F7EDF0] px-3 py-1 rounded-full border border-[#EFE5E8] font-bold">
          <Lock className="w-3 h-3 text-[#A85B70]" />
          <span className="hidden sm:inline">Bảo mật SSL 256-bit</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Customer info, Address, Shipping, Payment (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: User / Guest mode */}
            <div className="bg-[#FAF5F6] p-6 rounded-3xl border border-[#EFE5E8] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE5E8]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#D48598] text-white text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h2 className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                    Thông Tin Khách Hàng
                  </h2>
                </div>

                {user ? (
                  <span className="text-xs text-[#7A6870] flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-[#A85B70]" />
                    <span>Thành viên: <strong className="text-[#2E2427] font-bold">{user.name}</strong></span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={openAuth}
                    className="text-xs text-[#A85B70] hover:text-[#2E2427] underline cursor-pointer font-bold"
                  >
                    Đăng nhập tài khoản
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#2E2427] font-bold mb-1">
                    Họ và tên người nhận <span className="text-[#D48598]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#2E2427] font-bold mb-1">
                    Số điện thoại <span className="text-[#D48598]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#2E2427] font-bold mb-1">
                    Email nhận thông tin đơn hàng <span className="text-[#D48598]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address & Gift Notes */}
            <div className="bg-[#FAF5F6] p-6 rounded-3xl border border-[#EFE5E8] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#EFE5E8]">
                <span className="w-5 h-5 rounded-full bg-[#D48598] text-white text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <h2 className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                  Địa Chỉ Nhận Hàng & Lời Nhắn
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#2E2427] font-bold mb-1">Tỉnh / Thành phố</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2427] font-bold mb-1">Quận / Huyện</label>
                    <input
                      type="text"
                      required
                      value={address.district}
                      onChange={(e) => setAddress({ ...address, district: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2427] font-bold mb-1">Phường / Xã</label>
                    <input
                      type="text"
                      required
                      value={address.ward}
                      onChange={(e) => setAddress({ ...address, ward: e.target.value })}
                      className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2E2427] font-bold mb-1">
                    Địa chỉ chi tiết (Số nhà, tên đường, căn hộ) <span className="text-[#D48598]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    placeholder="VD: Căn hộ 12.04, 12 Lê Duẩn, Phường Bến Nghé"
                    className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                  />
                </div>

                <div>
                  <label className="block text-[#2E2427] font-bold mb-1 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#D48598]" />
                    <span>Ghi chú đơn hàng & Yêu cầu đóng gói:</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address.note}
                    onChange={(e) => setAddress({ ...address, note: e.target.value })}
                    placeholder="Giao giờ hành chính, thắt nơ ruy băng lụa màu hồng pastel..."
                    className="w-full px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-xl text-xs text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method Selection */}
            <div className="bg-[#FAF5F6] p-6 rounded-3xl border border-[#EFE5E8] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#EFE5E8]">
                <span className="w-5 h-5 rounded-full bg-[#D48598] text-white text-xs font-bold flex items-center justify-center font-mono">
                  3
                </span>
                <h2 className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                  Phương Thức Giao Hàng
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setShippingMethodId('express')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between space-y-2 active:scale-95 ${
                    shippingMethodId === 'express'
                      ? 'bg-[#F7EDF0] border-[#D48598] shadow-xs'
                      : 'bg-white border-[#EFE5E8] hover:bg-[#FAF7F6]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="block text-[#2E2427] font-bold">Hỏa Tốc RiEn Express</strong>
                      <span className="text-[#7A6870] text-[11px]">Nội thành Hà Nội & TP.HCM (1-2 ngày)</span>
                    </div>
                    {shippingMethodId === 'express' && <Check className="w-4 h-4 text-[#A85B70]" />}
                  </div>
                  <div className="font-mono font-bold text-[#A85B70]">
                    65.000₫
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethodId('standard')}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between space-y-2 active:scale-95 ${
                    shippingMethodId === 'standard'
                      ? 'bg-[#F7EDF0] border-[#D48598] shadow-xs'
                      : 'bg-white border-[#EFE5E8] hover:bg-[#FAF7F6]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="block text-[#2E2427] font-bold">Giao Hàng Tiêu Chuẩn</strong>
                      <span className="text-[#7A6870] text-[11px]">Toàn quốc (2-3 ngày)</span>
                    </div>
                    {shippingMethodId === 'standard' && <Check className="w-4 h-4 text-[#A85B70]" />}
                  </div>
                  <div className="font-mono font-bold text-[#2E2427]">
                    {standardCost === 0 ? <span className="text-[#A85B70] font-bold">MIỄN PHÍ</span> : `${standardCost.toLocaleString('vi-VN')}₫`}
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Payment Method Selection */}
            <div className="bg-[#FAF5F6] p-6 rounded-3xl border border-[#EFE5E8] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#EFE5E8]">
                <span className="w-5 h-5 rounded-full bg-[#D48598] text-white text-xs font-bold flex items-center justify-center font-mono">
                  4
                </span>
                <h2 className="text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                  Phương Thức Thanh Toán
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'vietqr', label: 'Quét mã VietQR', icon: QrCode, badge: 'Nhanh chóng' },
                  { id: 'cod', label: 'Tiền mặt (COD)', icon: Truck },
                  { id: 'bank_card', label: 'Thẻ Quốc tế', icon: CreditCard },
                  { id: 'momo', label: 'Ví MoMo', icon: Smartphone },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
                        isSelected
                          ? 'bg-[#F7EDF0] border-[#D48598] text-[#A85B70] font-bold shadow-xs'
                          : 'bg-white border-[#EFE5E8] text-[#2E2427] hover:bg-[#FAF7F6]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#A85B70]' : 'text-[#7A6870]'}`} />
                      <span className="text-[11px] leading-tight">{m.label}</span>
                      {m.badge && (
                        <span className="text-[9px] bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8] px-1.5 py-0.2 rounded-full font-bold">
                          {m.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Details Display */}
              {paymentMethod === 'vietqr' && (
                <div className="bg-white border border-[#EFE5E8] rounded-2xl p-4 space-y-3 animate-fade-in text-xs shadow-xs">
                  <div className="flex items-center gap-2 text-[#2E2427] font-bold">
                    <QrCode className="w-4 h-4 text-[#D48598]" />
                    <span>Mã QR Chuyển Khoản Tự Động (VietQR)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1 text-[#7A6870]">
                      <p>Ngân hàng: <strong className="text-[#2E2427]">Vietcombank (Chi nhánh Kỳ Đồng)</strong></p>
                      <p>Số tài khoản: <strong className="font-mono text-[#2E2427]">9988 2412 8888</strong></p>
                      <p>Chủ tài khoản: <strong className="text-[#2E2427]">RIEN BOUTIQUE</strong></p>
                      <p>Số tiền: <strong className="font-mono text-[#A85B70] font-bold">{finalPayTotal.toLocaleString('vi-VN')}₫</strong></p>
                      <p className="text-[11px] text-[#7A6870]">Nội dung: <strong>RIEN {address.phone.slice(-6)}</strong></p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 bg-[#FAF5F6] rounded-2xl border border-[#EFE5E8] shadow-xs">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=RIEN-BOUTIQUE-ORDER"
                        alt="Mã VietQR"
                        className="w-28 h-28 object-contain"
                      />
                      <span className="text-[10px] text-[#A85B70] mt-1 font-mono font-bold">Quét bằng mọi App ngân hàng</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_card' && (
                <div className="bg-white border border-[#EFE5E8] rounded-2xl p-4 space-y-3 animate-fade-in text-xs">
                  <div className="font-bold text-[#2E2427]">Thông tin thẻ thanh toán:</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="Số thẻ (VD: 4111 2222 3333 4444)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl font-mono text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl font-mono text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427]"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl font-mono text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3.5 bg-white border border-[#EFE5E8] rounded-2xl text-xs text-[#7A6870]">
                  Bạn sẽ thanh toán tiền mặt trực tiếp cho nhân viên giao hàng khi nhận và kiểm tra kiện hàng.
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Order Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF5F6] p-6 rounded-3xl border border-[#EFE5E8] shadow-xs space-y-5 sticky top-24">
              <h3 className="font-serif text-lg text-[#2E2427] pb-3 border-b border-[#EFE5E8]">
                Tóm Tắt Đơn Hàng ({cart.length} món)
              </h3>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                {cart.map((item) => {
                  const itemTotal = (item.unitPrice + (item.customization?.additionalFee || 0)) * item.quantity;
                  return (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover rounded-xl border border-[#EFE5E8] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2E2427] truncate">{item.product.name}</h4>
                        <p className="text-[#7A6870] text-[11px]">
                          SL: {item.quantity} • {item.selectedColor.name} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                        </p>

                        {/* Customization Note */}
                        {item.customization && (
                          <div className="text-[10px] text-[#A85B70] bg-[#F7EDF0] border border-[#EFE5E8] px-2 py-0.5 rounded-full mt-1 inline-block font-bold">
                            ✦ Make It Yours: "{item.customization.text}"
                          </div>
                        )}

                        <div className="mt-1 font-serif font-bold text-[#2E2427]">
                          {itemTotal.toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Voucher Application */}
              <div className="pt-2 border-t border-[#EFE5E8]">
                {appliedVoucher ? (
                  <div className="bg-[#F7EDF0] border border-[#EFE5E8] text-[#A85B70] px-3 py-2 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#A85B70]" />
                      <span>Voucher: <strong>{appliedVoucher.code}</strong> (-{voucherDiscount.toLocaleString('vi-VN')}₫)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeVoucher}
                      className="text-[#A85B70] font-bold hover:underline cursor-pointer text-[11px]"
                    >
                      Bỏ
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                        placeholder="Mã giảm giá (VD: RIEN10)"
                        className="flex-1 px-3.5 py-2 bg-white border border-[#EFE5E8] rounded-full text-xs uppercase font-medium focus:outline-none focus:border-[#D48598] text-[#2E2427]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyVoucher}
                        className="px-4 py-2 bg-[#F7EDF0] hover:bg-[#EED9E0] text-[#A85B70] rounded-full text-xs font-bold transition-all cursor-pointer active:scale-95"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {voucherError && <p className="text-[10px] text-red-500 mt-1">{voucherError}</p>}
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs text-[#7A6870] pt-2 border-t border-[#EFE5E8]">
                <div className="flex justify-between">
                  <span>Tạm tính sản phẩm:</span>
                  <span className="font-mono font-bold text-[#2E2427]">{cartSubtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                {cartCustomizationFeeTotal > 0 && (
                  <div className="flex justify-between text-[#A85B70] font-medium">
                    <span>Phí Make It Yours:</span>
                    <span className="font-mono">+{cartCustomizationFeeTotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                {appliedVoucher && (
                  <div className="flex justify-between text-[#A85B70] font-bold">
                    <span>Ưu đãi voucher ({appliedVoucher.code}):</span>
                    <span className="font-mono">-{voucherDiscount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-[#A85B70] font-bold">Miễn phí</span> : `+${shippingFee.toLocaleString('vi-VN')}₫`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#2E2427] pt-3 border-t border-[#EFE5E8]">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-base font-serif text-[#A85B70]">
                    {finalPayTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D48598] hover:bg-[#C27386] text-white py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-200/50 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Xác Nhận Đặt Hàng</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-[#7A6870]/80 text-center leading-relaxed">
                Bằng việc xác nhận, bạn đồng ý với điều khoản chế tác và chính sách giao nhận của RiEn.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
