import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { 
  Package, 
  Heart, 
  Bookmark, 
  MapPin, 
  User, 
  Clock, 
  LogOut, 
  Plus, 
  Trash2, 
  Sparkles
} from 'lucide-react';
import { ShippingAddress } from '../types';

export const AccountView: React.FC = () => {
  const { 
    user, 
    orders, 
    wishlist, 
    openAuth, 
    logout, 
    updateUserAddresses, 
    navigateTo, 
    openStudio, 
    showToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'customizations' | 'addresses' | 'profile'>('orders');
  const [selectedOrderIdx, setSelectedOrderIdx] = useState<number>(0);

  // Address modal form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    address: '',
    note: ''
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F7EDF0] flex items-center justify-center mx-auto text-[#A85B70] border border-[#EFE5E8]">
          <User className="w-8 h-8 stroke-[1.8]" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-light text-[#2E2427]">Tài Khoản RiEn</h2>
          <p className="text-xs text-[#7A6870] mt-2 leading-relaxed">
            Vui lòng đăng nhập để xem lịch sử đơn hàng, thiết kế Make It Yours đã lưu và theo dõi tiến độ giao hàng.
          </p>
        </div>
        <button
          onClick={openAuth}
          className="w-full bg-[#D48598] text-white py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-[#C27386] transition-colors shadow-md shadow-rose-200/50 cursor-pointer"
        >
          Đăng nhập / Trải nghiệm tài khoản VIP
        </button>
      </div>
    );
  }

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
  const activeOrder = orders[selectedOrderIdx] || orders[0];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.address.trim() || !newAddr.phone.trim()) {
      showToast('Vui lòng nhập đầy đủ thông tin địa chỉ!', 'warning');
      return;
    }
    const updated = [...user.addresses, newAddr];
    updateUserAddresses(updated);
    setShowAddAddress(false);
    setNewAddr({
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé',
      address: '',
      note: ''
    });
    showToast('Đã thêm địa chỉ giao hàng mới!', 'success');
  };

  const handleDeleteAddress = (idx: number) => {
    const updated = user.addresses.filter((_, i) => i !== idx);
    updateUserAddresses(updated);
    showToast('Đã xóa địa chỉ!', 'info');
  };

  const handleReorderDesign = (saved: typeof user.savedCustomizations[0]) => {
    const origProduct = PRODUCTS.find(p => p.id === saved.productId);
    if (!origProduct) return;
    openStudio(origProduct, saved.customization);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-[#2E2427]">
      {/* User Header Profile Card */}
      <div className="bg-[#FAF7F6] text-[#2E2427] rounded-3xl p-6 sm:p-8 shadow-xs border border-[#EFE5E8] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#D48598] shadow-xs shrink-0"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-light tracking-wide text-[#2E2427]">{user.name}</h1>
              <span className="bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                {user.tier}
              </span>
            </div>
            <p className="text-xs text-[#7A6870] mt-0.5">{user.email} • {user.phone}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-3 text-xs text-[#7A6870]">
              <span>Điểm tích lũy RiEn Privilege: <strong className="text-[#A85B70] font-mono font-bold">{user.points.toLocaleString('vi-VN')} pts</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('catalog')}
            className="px-4 py-2 bg-white hover:bg-[#FAF5F6] text-[#2E2427] rounded-full text-xs font-bold transition-all cursor-pointer border border-[#EFE5E8]"
          >
            Mua sắm tiếp
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-transparent hover:bg-white text-[#7A6870] hover:text-red-600 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-[#EFE5E8]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout with Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Account Nav Menu (Col 3) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-2.5 shadow-xs space-y-1">
            {[
              { id: 'orders', label: 'Đơn Hàng & Theo Dõi', icon: Package, count: orders.length },
              { id: 'wishlist', label: 'Danh Sách Yêu Thích', icon: Heart, count: wishlist.length },
              { id: 'customizations', label: 'Thiết Kế Đã Lưu', icon: Bookmark, count: user.savedCustomizations.length },
              { id: 'addresses', label: 'Sổ Địa Chỉ Giao Hàng', icon: MapPin, count: user.addresses.length },
              { id: 'profile', label: 'Thông Tin Tài Khoản', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-[#D48598] text-white font-bold shadow-md shadow-rose-200/50'
                      : 'text-[#2E2427] hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#A85B70]'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isSelected ? 'bg-white text-[#A85B70]' : 'bg-[#F7EDF0] text-[#A85B70]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab Panels (Col 9) */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: ORDERS & TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-12 text-center space-y-3">
                  <Package className="w-10 h-10 text-[#A85B70]/60 mx-auto" />
                  <p className="text-xs text-[#7A6870]">Quý khách chưa có đơn hàng nào.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Order Selector Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {orders.map((ord, idx) => (
                      <button
                        key={ord.id}
                        onClick={() => setSelectedOrderIdx(idx)}
                        className={`px-4 py-2.5 rounded-full text-xs whitespace-nowrap border transition-all cursor-pointer active:scale-95 ${
                          selectedOrderIdx === idx
                            ? 'bg-[#D48598] text-white border-[#D48598] font-bold shadow-xs'
                            : 'bg-white border-[#EFE5E8] text-[#2E2427] hover:bg-[#FAF5F6]'
                        }`}
                      >
                        <span>Đơn #{ord.orderNumber}</span>
                        <span className={`ml-2 text-[10px] ${selectedOrderIdx === idx ? 'text-pink-100' : 'text-[#A85B70]'}`}>
                          ({ord.total.toLocaleString('vi-VN')}₫)
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active Order Card */}
                  {activeOrder && (
                    <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-6 sm:p-8 shadow-xs space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EFE5E8] gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-lg text-[#2E2427]">
                              Đơn Hàng #{activeOrder.orderNumber}
                            </h3>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F7EDF0] border border-[#EFE5E8] text-[#A85B70]">
                              {activeOrder.statusText}
                            </span>
                          </div>
                          <span className="text-xs text-[#7A6870]">
                            Ngày đặt: {activeOrder.createdAt} • Phương thức: {activeOrder.paymentMethod.toUpperCase()}
                          </span>
                        </div>

                        <div className="text-sm font-serif font-bold text-[#A85B70]">
                          Tổng thanh toán: {activeOrder.total.toLocaleString('vi-VN')}₫
                        </div>
                      </div>

                      {/* Timeline Tracking */}
                      <div className="bg-white rounded-2xl p-5 border border-[#EFE5E8] space-y-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2E2427] font-bold">
                          <Clock className="w-4 h-4 text-[#D48598]" />
                          <span>Hành Trình Giao Hàng & Chế Tác</span>
                        </div>

                        <div className="relative pl-6 space-y-4 border-l-2 border-[#EFE5E8] ml-2">
                          {activeOrder.timeline.map((step, idx) => (
                            <div key={idx} className="relative">
                              <div className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                                step.completed ? 'border-[#D48598] bg-[#D48598]' : 'border-[#EFE5E8]'
                              }`} />
                              <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-xs font-bold ${step.completed ? 'text-[#2E2427]' : 'text-[#7A6870]/50'}`}>
                                    {step.title}
                                  </h4>
                                  <span className="text-[11px] font-mono text-[#A85B70]">{step.time}</span>
                                </div>
                                <p className="text-xs text-[#7A6870]">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items in order */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-[#2E2427]">
                          Sản phẩm trong đơn:
                        </h4>
                        <div className="space-y-2">
                          {activeOrder.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3.5 bg-white border border-[#EFE5E8] rounded-2xl text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-12 h-14 object-cover rounded-xl border border-[#EFE5E8]"
                                />
                                <div>
                                  <h5 className="font-bold text-[#2E2427]">{item.product.name}</h5>
                                  <span className="text-[11px] text-[#7A6870]">
                                    {item.selectedColor.name} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''} • SL: {item.quantity}
                                  </span>
                                  {item.customization && (
                                    <div className="text-[10px] text-[#A85B70] font-bold mt-0.5 bg-[#F7EDF0] px-2 py-0.5 rounded-full inline-block border border-[#EFE5E8]">
                                      ✦ Make It Yours: "{item.customization.text}"
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="font-serif font-bold text-[#2E2427]">
                                {item.totalPrice.toLocaleString('vi-VN')}₫
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE5E8]">
                <h3 className="font-serif text-lg text-[#2E2427]">
                  Danh Sách Yêu Thích ({wishlist.length} món)
                </h3>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-12 text-center space-y-3">
                  <Heart className="w-10 h-10 text-[#A85B70]/60 mx-auto" />
                  <p className="text-xs text-[#7A6870]">Danh sách yêu thích của bạn đang trống.</p>
                  <button
                    onClick={() => navigateTo('catalog')}
                    className="bg-[#D48598] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#C27386] shadow-md shadow-rose-200/50 cursor-pointer"
                  >
                    Khám phá bộ sưu tập
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED DESIGNS */}
          {activeTab === 'customizations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE5E8]">
                <h3 className="font-serif text-lg text-[#2E2427]">
                  Thiết Kế Make It Yours Đã Lưu ({user.savedCustomizations.length})
                </h3>
              </div>

              {user.savedCustomizations.length === 0 ? (
                <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-12 text-center space-y-3">
                  <Bookmark className="w-10 h-10 text-[#A85B70]/60 mx-auto" />
                  <p className="text-xs text-[#7A6870]">Bạn chưa lưu thiết kế cá nhân hóa nào.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.savedCustomizations.map((sc) => {
                    const prod = PRODUCTS.find(p => p.id === sc.productId);
                    if (!prod) return null;
                    return (
                      <div key={sc.id} className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-4 flex gap-4 items-center shadow-xs">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-16 h-20 object-cover rounded-2xl border border-[#EFE5E8] shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-bold text-xs text-[#2E2427] truncate">{prod.name}</h4>
                          <div className="bg-white border border-[#EFE5E8] rounded-xl p-2 text-[11px] text-[#7A6870]">
                            <div className="flex items-center gap-1 font-bold text-[#A85B70]">
                              <Sparkles className="w-3 h-3 text-[#D48598]" />
                              <span>{sc.customization.type === 'embroidery' ? 'Thêu: ' : 'Khắc: '}</span>
                              <strong>"{sc.customization.text}"</strong>
                            </div>
                            <span className="text-[10px] text-[#7A6870] block mt-0.5">Lưu ngày: {sc.createdAt}</span>
                          </div>
                          <button
                            onClick={() => handleReorderDesign(sc)}
                            className="mt-2 text-xs text-[#A85B70] hover:text-[#2E2427] underline font-bold cursor-pointer"
                          >
                            Mở chỉnh sửa & Đặt lại
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE5E8]">
                <h3 className="font-serif text-lg text-[#2E2427]">
                  Sổ Địa Chỉ Giao Hàng
                </h3>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-4 py-2 bg-[#D48598] hover:bg-[#C27386] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-rose-200/50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Địa Chỉ Mới</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleSaveAddress} className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-6 space-y-4 animate-fade-in text-xs">
                  <h4 className="font-bold text-[#2E2427] text-sm">Thêm địa chỉ giao nhận</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Họ tên người nhận *"
                      required
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại *"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                    <input
                      type="text"
                      placeholder="Tỉnh / Thành phố"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                    <input
                      type="text"
                      placeholder="Quận / Huyện"
                      value={newAddr.district}
                      onChange={(e) => setNewAddr({ ...newAddr, district: e.target.value })}
                      className="px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                    />
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        placeholder="Địa chỉ chi tiết (Số nhà, đường) *"
                        required
                        value={newAddr.address}
                        onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] focus:outline-none focus:border-[#D48598]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-5 py-2 bg-[#D48598] hover:bg-[#C27386] text-white rounded-full font-bold cursor-pointer transition-all">
                      Lưu địa chỉ
                    </button>
                    <button type="button" onClick={() => setShowAddAddress(false)} className="px-5 py-2 border border-[#EFE5E8] bg-white hover:bg-[#FAF7F6] rounded-full text-[#2E2427] cursor-pointer transition-all">
                      Hủy
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((addr, idx) => (
                  <div key={idx} className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-5 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2E2427]">{addr.fullName}</span>
                      {idx === 0 && (
                        <span className="text-[10px] bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8] px-2 py-0.5 rounded-full font-bold">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#7A6870]">{addr.phone}</p>
                    <p className="text-xs text-[#7A6870]">
                      {addr.address}, {addr.ward}, {addr.district}, {addr.city}
                    </p>
                    {user.addresses.length > 1 && (
                      <button
                        onClick={() => handleDeleteAddress(idx)}
                        className="text-[#A85B70] hover:text-red-700 text-xs flex items-center gap-1 pt-2 font-bold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-[#FAF5F6] rounded-3xl border border-[#EFE5E8] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-lg text-[#2E2427] pb-3 border-b border-[#EFE5E8]">
                Thông Tin Cá Nhân
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[#7A6870] font-bold block mb-1">Họ và tên</label>
                  <input
                    type="text"
                    disabled
                    value={user.name}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[#7A6870] font-bold block mb-1">Email</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[#7A6870] font-bold block mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    disabled
                    value={user.phone}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] font-medium"
                  />
                </div>
                <div>
                  <label className="text-[#7A6870] font-bold block mb-1">Hạng thành viên</label>
                  <input
                    type="text"
                    disabled
                    value={`${user.tier} (${user.points} điểm tích lũy)`}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-[#2E2427] font-medium"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
