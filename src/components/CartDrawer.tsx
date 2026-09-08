import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  ShoppingBag, 
  Edit3,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    cartCount, 
    cartSubtotal, 
    cartCustomizationFeeTotal, 
    cartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    appliedVoucher, 
    voucherDiscount, 
    applyVoucher, 
    removeVoucher, 
    navigateTo,
    openStudio,
    showToast
  } = useShop();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    if (!res.success) {
      setVoucherError(res.message);
    } else {
      setVoucherInput('');
      showToast(res.message, 'success');
    }
  };

  const handleEditCustomization = (item: typeof cart[0]) => {
    const origProduct = PRODUCTS.find(p => p.id === item.productId) || item.product;
    closeCart();
    openStudio(origProduct, item.customization);
  };

  // Free shipping threshold: 1.500.000₫
  const freeShipThreshold = 1500000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShipThreshold) * 100));
  const remainingForFreeShip = Math.max(0, freeShipThreshold - cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#2E2427]/30 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F6] shadow-2xl flex flex-col border-l border-[#EFE5E8]">
          {/* Drawer Header */}
          <div className="p-5 bg-white text-[#2E2427] flex items-center justify-between border-b border-[#EFE5E8]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#A85B70] stroke-[1.8]" />
              <h2 className="text-base font-serif text-[#2E2427] font-normal">
                Túi Đồ RiEn
              </h2>
              <span className="bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8] text-[11px] px-2.5 py-0.5 rounded-full font-mono font-bold">
                {cartCount}
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={closeCart}
              className="p-1.5 text-[#7A6870] hover:text-[#A85B70] rounded-full hover:bg-[#F7EDF0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF5F6] px-5 py-3 border-b border-[#EFE5E8] text-xs text-[#7A6870]">
            {remainingForFreeShip > 0 ? (
              <p className="mb-1.5 font-medium">
                Mua thêm <span className="font-bold text-[#2E2427]">{remainingForFreeShip.toLocaleString('vi-VN')}₫</span> để nhận <span className="font-bold text-[#A85B70]">Freeship</span>.
              </p>
            ) : (
              <p className="mb-1.5 text-[#A85B70] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#A85B70]" />
                <span>Đơn hàng của bạn đã được Miễn phí vận chuyển! 🎉</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-[#EFE5E8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D48598] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F7EDF0] flex items-center justify-center mx-auto text-[#A85B70]">
                  <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
                </div>
                <p className="text-xs text-[#7A6870]">
                  Túi đồ của bạn hiện đang trống.
                </p>
                <button
                  id="empty-cart-shop-now-btn"
                  onClick={() => {
                    closeCart();
                    navigateTo('catalog');
                  }}
                  className="bg-[#D48598] text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#C27386] active:scale-95 transition-all shadow-md shadow-rose-200/50 cursor-pointer"
                >
                  Khám phá bộ sưu tập
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = (item.unitPrice + (item.customization?.additionalFee || 0)) * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white border border-[#EFE5E8] rounded-2xl space-y-3 hover:border-[#D48598] transition-all shadow-xs"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-18 h-22 object-cover rounded-xl bg-[#FAF5F6] shrink-0 cursor-pointer"
                        onClick={() => {
                          closeCart();
                          navigateTo('product-detail', item.productId);
                        }}
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 
                              onClick={() => {
                                closeCart();
                                navigateTo('product-detail', item.productId);
                              }}
                              className="text-xs font-bold text-[#2E2427] hover:text-[#A85B70] cursor-pointer line-clamp-1"
                            >
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#7A6870]/60 hover:text-red-500 p-0.5 transition-colors cursor-pointer"
                              title="Xóa món"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
                            </button>
                          </div>

                          <div className="text-[11px] text-[#7A6870] mt-0.5 space-x-2">
                            <span>Màu: {item.selectedColor.name}</span>
                            {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE5E8]">
                          <span className="text-xs font-serif font-bold text-[#2E2427]">
                            {itemTotal.toLocaleString('vi-VN')}₫
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#EFE5E8] rounded-full bg-[#FAF5F6] px-2 py-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="text-[#2E2427] hover:text-[#A85B70] px-1 text-xs font-bold cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-[#2E2427]">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="text-[#2E2427] hover:text-[#A85B70] px-1 text-xs font-bold cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Make It Yours Customization Details Chip */}
                    {item.customization && (
                      <div className="bg-[#FAF5F6] border border-[#EFE5E8] rounded-xl p-2.5 text-[11px] space-y-1">
                        <div className="flex items-center justify-between font-bold text-[#A85B70]">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D48598]" />
                            <span>Make It Yours: "{item.customization.text}"</span>
                          </span>
                          <button
                            onClick={() => handleEditCustomization(item)}
                            className="text-[#A85B70] hover:text-[#2E2427] flex items-center gap-0.5 underline text-[10px] cursor-pointer"
                          >
                            <Edit3 className="w-2.5 h-2.5" />
                            <span>Sửa</span>
                          </button>
                        </div>
                        <div className="text-[#7A6870] text-[10px] flex justify-between">
                          <span>Phụ phí: +{item.customization.additionalFee.toLocaleString('vi-VN')}₫</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer: Voucher, Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EFE5E8] space-y-4">
              {/* Voucher Input */}
              <div>
                {appliedVoucher ? (
                  <div className="bg-[#F7EDF0] border border-[#EFE5E8] rounded-xl p-2.5 flex items-center justify-between text-xs text-[#2E2427]">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#A85B70]" />
                      <span>Mã: <strong>{appliedVoucher.code}</strong> (-{voucherDiscount.toLocaleString('vi-VN')}₫)</span>
                    </div>
                    <button
                      onClick={removeVoucher}
                      className="text-[#A85B70] hover:text-[#2E2427] font-bold text-[11px] underline cursor-pointer"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mã ưu đãi (VD: RIEN10, WELCOME)"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FAF5F6] border border-[#EFE5E8] rounded-full px-3.5 py-1.5 text-xs text-[#2E2427] uppercase font-medium focus:outline-none focus:border-[#D48598]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#F7EDF0] hover:bg-[#F2DEE5] text-[#A85B70] rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </form>
                )}
                {voucherError && <p className="text-[10px] text-red-500 mt-1">{voucherError}</p>}
              </div>

              {/* Summary Calculations */}
              <div className="space-y-1 text-xs text-[#7A6870]">
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
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-[#A85B70] font-bold">
                    <span>Giảm giá voucher:</span>
                    <span className="font-mono">-{voucherDiscount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#EFE5E8] flex justify-between items-center text-sm font-serif font-bold text-[#2E2427]">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-base text-[#A85B70]">
                    {cartTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  closeCart();
                  navigateTo('checkout');
                }}
                className="w-full bg-[#D48598] hover:bg-[#C27386] text-white py-3.5 px-4 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-200/50 transition-all cursor-pointer active:scale-95"
              >
                <span>Tiến hành thanh toán</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
