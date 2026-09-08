import { ProductReview, Order, UserProfile } from '../types';
import { PRODUCTS } from './mockData';

export const MOCK_REVIEWS: Record<string, ProductReview[]> = {
  'prod-shirt-01': [
    {
      id: 'rev-1',
      author: 'Nguyễn Bích Phương',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '15/08/2026',
      content: 'Chất vải linen Normandy cực kỳ mềm mại sau khi giặt lần đầu. Mình đặt thêu tên "Bích Phương" bằng chỉ màu Vàng Kim ở cổ tay, đường thêu khít rịt, không một sợi chỉ thừa. Đóng hộp quà kèm thiệp viết tay cực kỳ trang trọng!',
      verified: true,
      customizationDetails: 'Thêu chữ: "Bích Phương" • Font: Garamond • Chỉ: Vàng Kim • Cổ tay áo',
      reviewImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rev-2',
      author: 'Trần Minh Đức',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '28/07/2026',
      content: 'Mặc đi làm hay đi cà phê cuối tuần đều rất lịch thiệp. Size L vừa như in (mình 1m76, 72kg). Phần thêu ngực trái nhìn sang trọng và độc đáo, không sợ đụng hàng ai.',
      verified: true,
      customizationDetails: 'Thêu chữ: "M • D" • Font: Cinzel • Chỉ: Xanh Navy • Ngực trái'
    },
    {
      id: 'rev-3',
      author: 'Lê Thanh Hà',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      rating: 4,
      date: '10/06/2026',
      content: 'Áo đẹp chuẩn form, khuy xà cừ óng ánh. Thời gian chuẩn bị thêu mất khoảng 2 ngày nhưng thành phẩm xứng đáng với sự chờ đợi.',
      verified: true
    }
  ],
  'prod-perfume-01': [
    {
      id: 'rev-4',
      author: 'Phạm Quỳnh Anh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '02/09/2026',
      content: 'Hương gỗ đàn hương cực kỳ quyến rũ và đắt tiền, lưu hương từ sáng đến tối mịt vẫn thoang thoảng. Khắc laser chữ "Forever With You • 24.12" ánh vàng sắc sảo như tiệm kim hoàn làm.',
      verified: true,
      customizationDetails: 'Khắc laser: "Forever With You • 24.12" • Nhũ Vàng 24K • Thân chai',
      reviewImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-vip-001',
  name: 'Lê Hoàng Khánh Linh',
  email: 'khanhlinh.bespoke@gmail.com',
  phone: '0908 123 456',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  tier: 'Platinum VIP',
  points: 1250,
  addresses: [
    {
      fullName: 'Lê Hoàng Khánh Linh',
      phone: '0908 123 456',
      email: 'khanhlinh.bespoke@gmail.com',
      address: 'Căn hộ 18.04, Tháp B, Tòa nhà Saigon Pearl, 92 Nguyễn Hữu Cảnh',
      city: 'Hồ Chí Minh',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22',
      note: 'Giao giờ hành chính, gọi trước 15 phút.'
    },
    {
      fullName: 'Khánh Linh (Công ty)',
      phone: '0908 123 456',
      email: 'khanhlinh.bespoke@gmail.com',
      address: 'Tầng 12, Tòa nhà Deutsches Haus, 33 Lê Duẩn',
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      ward: 'Phường Bến Nghé'
    }
  ],
  savedCustomizations: [
    {
      id: 'saved-1',
      productId: 'prod-shirt-01',
      productName: 'Áo Sơ Mi Linen Pháp Dệt Tay',
      productImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
      savedAt: '01/09/2026',
      customization: {
        type: 'embroidery',
        text: 'K • L Bespoke',
        fontId: 'serif_classic',
        colorId: 'gold_metallic',
        positionId: 'left_chest',
        iconId: 'crest',
        additionalFee: 65000
      }
    },
    {
      id: 'saved-2',
      productId: 'prod-perfume-01',
      productName: 'Nước Hoa EDP Santal N°24',
      productImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      savedAt: '25/08/2026',
      customization: {
        type: 'engraving',
        text: 'Linh & Minh • 2026',
        fontId: 'roman_monogram',
        colorId: 'engraved_gold',
        positionId: 'bottle_front',
        iconId: 'heart',
        additionalFee: 85000
      }
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-88902',
    orderNumber: 'ATELIER-88902',
    createdAt: '06/09/2026 14:30',
    status: 'crafting',
    statusText: 'Đang chế tác & thêu tay thủ công',
    subtotal: 890000,
    customizationTotal: 65000,
    discount: 89000,
    shippingFee: 0,
    total: 866000,
    voucherCode: 'ATELIER10',
    paymentMethod: 'vietqr',
    shippingMethod: {
      id: 'express',
      name: 'Giao hàng Hỏa tốc Atelier White-Glove',
      cost: 0,
      estimatedDays: '1-2 ngày làm việc'
    },
    shippingAddress: {
      fullName: 'Lê Hoàng Khánh Linh',
      phone: '0908 123 456',
      email: 'khanhlinh.bespoke@gmail.com',
      address: 'Căn hộ 18.04, Tháp B, Saigon Pearl, 92 Nguyễn Hữu Cảnh',
      city: 'Hồ Chí Minh',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22',
      note: 'Gói hộp quà có nơ lụa thắt tay'
    },
    items: [
      {
        cartItemId: 'item-demo-1',
        productId: 'prod-shirt-01',
        product: PRODUCTS[0],
        selectedVariant: PRODUCTS[0].variants[0],
        selectedSize: 'M',
        selectedColor: { name: 'Trắng Ngà Kem', hex: '#FAF7F2' },
        quantity: 1,
        unitPrice: 890000,
        totalPrice: 955000,
        customization: {
          type: 'embroidery',
          text: 'Khánh Linh',
          fontId: 'script_cursive',
          colorId: 'gold_metallic',
          positionId: 'left_chest',
          iconId: 'star',
          includeGiftBox: true,
          additionalFee: 65000
        }
      }
    ],
    timeline: [
      { title: 'Đã nhận đơn hàng', time: '06/09 14:30', completed: true, description: 'Hệ thống đã ghi nhận đơn và thanh toán thành công qua VietQR.' },
      { title: 'Nghệ nhân lên maket cá nhân hóa', time: '06/09 16:00', completed: true, description: 'Phác thảo vị trí thêu chữ "Khánh Linh" bằng chỉ vàng ánh kim.' },
      { title: 'Đang thêu thủ công tại xưởng', time: '07/09 09:15', completed: true, description: 'Sản phẩm đang được nghệ nhân hoàn thiện trên khung thêu.' },
      { title: 'Kiểm định chất lượng & Đóng gói quà', time: '08/09 11:00', completed: false, description: 'Kiểm tra đường may và xịt thơm tinh dầu signature.' },
      { title: 'Giao hàng tận tay', time: 'Dự kiến 09/09', completed: false, description: 'Đơn vị vận chuyển hỏa tốc chuyển phát.' }
    ]
  },
  {
    id: 'ord-87114',
    orderNumber: 'ATELIER-87114',
    createdAt: '18/08/2026 09:15',
    status: 'delivered',
    statusText: 'Đã giao hàng thành công',
    subtotal: 1850000,
    customizationTotal: 85000,
    discount: 0,
    shippingFee: 0,
    total: 1935000,
    paymentMethod: 'bank_card',
    shippingMethod: {
      id: 'standard',
      name: 'Giao hàng Tiêu chuẩn',
      cost: 0,
      estimatedDays: 'Đã giao'
    },
    shippingAddress: {
      fullName: 'Lê Hoàng Khánh Linh',
      phone: '0908 123 456',
      email: 'khanhlinh.bespoke@gmail.com',
      address: 'Căn hộ 18.04, Tháp B, Saigon Pearl, 92 Nguyễn Hữu Cảnh',
      city: 'Hồ Chí Minh',
      district: 'Quận Bình Thạnh',
      ward: 'Phường 22'
    },
    items: [
      {
        cartItemId: 'item-demo-2',
        productId: 'prod-perfume-01',
        product: PRODUCTS[1],
        selectedVariant: PRODUCTS[1].variants[1],
        selectedSize: '100ml',
        selectedColor: { name: 'Hổ Phách Vàng', hex: '#D97706' },
        quantity: 1,
        unitPrice: 1850000,
        totalPrice: 1935000,
        customization: {
          type: 'engraving',
          text: 'K.L • 2026',
          fontId: 'roman_monogram',
          colorId: 'engraved_gold',
          positionId: 'bottle_front',
          iconId: 'heart',
          additionalFee: 85000
        }
      }
    ],
    timeline: [
      { title: 'Đã giao hàng thành công', time: '20/08 15:40', completed: true, description: 'Khách hàng đã ký nhận đơn hàng hoàn tất.' }
    ]
  }
];
