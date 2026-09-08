import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  UserCustomization, 
  Voucher, 
  Order, 
  UserProfile, 
  CategoryId,
  ShippingAddress,
  PaymentMethod
} from '../types';
import { PRODUCTS, MOCK_VOUCHERS } from '../data/mockData';
import { INITIAL_USER_PROFILE, INITIAL_ORDERS } from '../data/reviewsData';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ShopContextType {
  // Navigation
  activeView: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'order-success' | 'account';
  selectedProductId: string | null;
  selectedCategory: CategoryId;
  navigateTo: (view: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'order-success' | 'account', productId?: string) => void;
  setCategoryFilter: (cat: CategoryId) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartCustomizationFeeTotal: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Voucher
  appliedVoucher: Voucher | null;
  voucherDiscount: number;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  user: UserProfile | null;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  loginDemoUser: () => void;
  logout: () => void;
  updateUserAddresses: (addresses: ShippingAddress[]) => void;
  saveCustomDesign: (productId: string, customization: UserCustomization) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (data: {
    address: ShippingAddress;
    shippingMethod: { id: string; name: string; cost: number; estimatedDays: string };
    paymentMethod: PaymentMethod;
  }) => Order;

  // Personalization Studio Modal
  studioProduct: Product | null;
  studioInitialCustomization?: UserCustomization;
  isStudioOpen: boolean;
  openStudio: (product: Product, initialCustomization?: UserCustomization) => void;
  closeStudio: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'product-detail' | 'checkout' | 'order-success' | 'account'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Studio Modal
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [studioProduct, setStudioProduct] = useState<Product | null>(null);
  const [studioInitialCustomization, setStudioInitialCustomization] = useState<UserCustomization | undefined>(undefined);

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial sample item in cart
    const p1 = PRODUCTS[0];
    return [
      {
        cartItemId: 'init-item-1',
        productId: p1.id,
        product: p1,
        selectedVariant: p1.variants[0],
        selectedSize: 'M',
        selectedColor: { name: 'Trắng Ngà Kem', hex: '#FAF7F2' },
        quantity: 1,
        unitPrice: p1.price,
        totalPrice: p1.price + 65000,
        customization: {
          type: 'embroidery',
          text: 'Atelier Signature',
          fontId: 'serif_classic',
          colorId: 'gold_metallic',
          positionId: 'left_chest',
          iconId: 'crest',
          includeGiftBox: true,
          additionalFee: 65000
        }
      }
    ];
  });

  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['prod-shirt-01', 'prod-perfume-01']);
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER_PROFILE);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const navigateTo = (view: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'order-success' | 'account', productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategoryFilter = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const loginDemoUser = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthOpen(false);
    showToast('Đăng nhập thành công! Chào mừng quý khách ' + INITIAL_USER_PROFILE.name, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Đã đăng xuất tài khoản.', 'info');
  };

  const openStudio = (product: Product, initialCustomization?: UserCustomization) => {
    setStudioProduct(product);
    setStudioInitialCustomization(initialCustomization);
    setIsStudioOpen(true);
  };

  const closeStudio = () => {
    setIsStudioOpen(false);
    setStudioProduct(null);
    setStudioInitialCustomization(undefined);
  };

  // Cart operations
  const addToCart = (newItem: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => {
    const customFee = newItem.customization?.additionalFee || 0;
    const boxFee = newItem.customization?.includeGiftBox ? (newItem.product.customizationConfig?.giftBoxFee || 45000) : 0;
    const itemTotal = (newItem.unitPrice + customFee + boxFee) * newItem.quantity;

    // Generate hash signature for custom items to avoid merging distinct customizations
    const customKey = newItem.customization 
      ? `${newItem.customization.text}_${newItem.customization.fontId}_${newItem.customization.colorId}_${newItem.customization.positionId}_${newItem.customization.includeGiftBox}`
      : 'standard';
    const uniqueCartKey = `${newItem.productId}_${newItem.selectedVariant.id}_${newItem.selectedSize || 'nosize'}_${customKey}`;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.cartItemId === uniqueCartKey);
      if (existingIdx > -1) {
        const updated = [...prev];
        const updatedQty = updated[existingIdx].quantity + newItem.quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updatedQty,
          totalPrice: (updated[existingIdx].unitPrice + customFee + boxFee) * updatedQty
        };
        return updated;
      } else {
        return [...prev, {
          ...newItem,
          cartItemId: uniqueCartKey,
          totalPrice: itemTotal
        }];
      }
    });

    showToast(`Đã thêm "${newItem.product.name}" vào giỏ hàng!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const customFee = item.customization?.additionalFee || 0;
        const boxFee = item.customization?.includeGiftBox ? (item.product.customizationConfig?.giftBoxFee || 45000) : 0;
        return {
          ...item,
          quantity,
          totalPrice: (item.unitPrice + customFee + boxFee) * quantity
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCustomizationFeeTotal = cart.reduce((sum, item) => {
    const fee = (item.customization?.additionalFee || 0) + (item.customization?.includeGiftBox ? (item.product.customizationConfig?.giftBoxFee || 45000) : 0);
    return sum + fee * item.quantity;
  }, 0);

  let voucherDiscount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percentage') {
      voucherDiscount = Math.round((cartSubtotal * appliedVoucher.value) / 100);
    } else {
      voucherDiscount = appliedVoucher.value;
    }
  }
  const cartTotal = Math.max(0, cartSubtotal + cartCustomizationFeeTotal - voucherDiscount);

  const applyVoucher = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = MOCK_VOUCHERS.find(v => v.code === trimmed);
    if (!found) {
      return { success: false, message: 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.' };
    }
    if (cartSubtotal < found.minOrder) {
      return { success: false, message: `Mã áp dụng cho đơn từ ${found.minOrder.toLocaleString('vi-VN')}₫ trở lên.` };
    }
    setAppliedVoucher(found);
    return { success: true, message: `Đã áp dụng mã "${found.code}" thành công!` };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Đã hủy áp dụng voucher.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Profile
  const updateUserAddresses = (addresses: ShippingAddress[]) => {
    if (!user) return;
    setUser({ ...user, addresses });
    showToast('Đã cập nhật sổ địa chỉ thành công.', 'success');
  };

  const saveCustomDesign = (productId: string, customization: UserCustomization) => {
    if (!user) {
      showToast('Vui lòng đăng nhập để lưu thiết kế cá nhân hóa.', 'warning');
      setIsAuthOpen(true);
      return;
    }
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const newDesign = {
      id: 'des-' + Date.now(),
      productId,
      productName: product.name,
      productImage: product.images[0],
      customization,
      savedAt: new Date().toLocaleDateString('vi-VN')
    };

    setUser({
      ...user,
      savedCustomizations: [newDesign, ...user.savedCustomizations]
    });
    showToast('Đã lưu thiết kế vào hồ sơ cá nhân của bạn!', 'success');
  };

  // Create Order
  const createOrder = ({
    address,
    shippingMethod,
    paymentMethod
  }: {
    address: ShippingAddress;
    shippingMethod: { id: string; name: string; cost: number; estimatedDays: string };
    paymentMethod: PaymentMethod;
  }): Order => {
    const orderNum = 'ATELIER-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      createdAt: new Date().toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      status: 'crafting',
      statusText: 'Đang chuẩn bị phác thảo & thêu/khắc thủ công',
      items: [...cart],
      shippingAddress: address,
      shippingMethod,
      paymentMethod,
      subtotal: cartSubtotal,
      customizationTotal: cartCustomizationFeeTotal,
      discount: voucherDiscount,
      shippingFee: shippingMethod.cost,
      total: cartTotal + shippingMethod.cost,
      voucherCode: appliedVoucher?.code,
      timeline: [
        {
          title: 'Đã nhận đơn hàng',
          time: 'Vừa xong',
          completed: true,
          description: `Đơn hàng #${orderNum} đã được xác nhận với phương thức ${paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : paymentMethod === 'bank_card' ? 'Thẻ ngân hàng quốc tế' : 'Ví MoMo'}.`
        },
        {
          title: 'Lên maket cá nhân hóa & Chế tác thủ công',
          time: 'Dự kiến 24h tới',
          completed: true,
          description: 'Nghệ nhân Atelier tiến hành đo đạc tọa độ và thêu chữ/khắc laser trên sản phẩm của quý khách.'
        },
        {
          title: 'Kiểm định hoàn thiện & Đóng gói quà tặng',
          time: 'Dự kiến ngày mai',
          completed: false,
          description: 'Kiểm tra đường kim mũi chỉ, xịt nước hoa chữ ký Atelier và thắt ruy băng nơ hộp.'
        },
        {
          title: 'Bàn giao vận chuyển',
          time: `Dự kiến giao ${shippingMethod.estimatedDays}`,
          completed: false,
          description: 'Đối tác vận chuyển hỏa tốc tiến hành giao tới địa chỉ của bạn.'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider value={{
      activeView,
      selectedProductId,
      selectedCategory,
      navigateTo,
      setCategoryFilter,
      cart,
      cartCount,
      cartSubtotal,
      cartCustomizationFeeTotal,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      appliedVoucher,
      voucherDiscount,
      applyVoucher,
      removeVoucher,
      wishlist,
      toggleWishlist,
      isInWishlist,
      user,
      isAuthOpen,
      openAuth,
      closeAuth,
      loginDemoUser,
      logout,
      updateUserAddresses,
      saveCustomDesign,
      orders,
      currentOrder,
      createOrder,
      studioProduct,
      studioInitialCustomization,
      isStudioOpen,
      openStudio,
      closeStudio,
      searchQuery,
      setSearchQuery,
      toasts,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
