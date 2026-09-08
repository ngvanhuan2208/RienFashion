import { Product, LookbookItem, SocialPost, Voucher, CustomizationConfig } from '../types';

export const COMMON_EMBROIDERY_CONFIG: CustomizationConfig = {
  supportedTypes: ['embroidery'],
  embroideryFee: 65000,
  engravingFee: 0,
  giftBoxFee: 45000,
  maxChars: 16,
  positions: [
    { id: 'left_chest', label: 'Ngực trái (Signature)', previewCoords: { x: 38, y: 36 } },
    { id: 'collar', label: 'Cổ áo tinh tế', previewCoords: { x: 50, y: 22 } },
    { id: 'cuff_wrist', label: 'Cổ tay áo (Monogram)', previewCoords: { x: 28, y: 68 } },
    { id: 'back_neck', label: 'Sau gáy tối giản', previewCoords: { x: 50, y: 18 } },
  ],
  fonts: [
    { id: 'serif_classic', name: 'Garamond Serif Cổ Điển', fontFamily: "'Cormorant Garamond', serif", styleClass: 'font-serif tracking-widest uppercase font-semibold', sample: 'RIEN' },
    { id: 'script_cursive', name: 'Chữ Ký Cursive Mềm Mại', fontFamily: "'Great Vibes', cursive", styleClass: 'font-cursive text-xl capitalize font-normal', sample: 'Khanh Linh' },
    { id: 'brush_romantic', name: 'Alex Brush Lãng Mạn', fontFamily: "'Alex Brush', cursive", styleClass: 'font-brush text-xl capitalize', sample: 'Forever Yours' },
    { id: 'modern_sans', name: 'Sans Minimal Hiện Đại', fontFamily: "'Plus Jakarta Sans', sans-serif", styleClass: 'font-sans uppercase tracking-[0.25em] font-medium', sample: 'RIEN 2026' },
    { id: 'roman_monogram', name: 'Cinzel Khắc Hoàng Gia', fontFamily: "'Cinzel', serif", styleClass: 'font-serif tracking-[0.3em] font-bold', sample: 'M • T' },
  ],
  colors: [
    { id: 'gold_metallic', name: 'Vàng Kim Metallic Gold', hex: '#D4AF37', type: 'metallic', border: '#B38F24' },
    { id: 'silver_silk', name: 'Bạc Lụa Pure Silver', hex: '#E5E7EB', type: 'metallic', border: '#9CA3AF' },
    { id: 'burgundy_wine', name: 'Đỏ Rượu Burgundy', hex: '#6B1D2F', type: 'thread' },
    { id: 'midnight_navy', name: 'Xanh Navy Đêm', hex: '#1E293B', type: 'thread' },
    { id: 'cream_ivory', name: 'Kem Ngà Ivory', hex: '#FDFBF7', type: 'thread', border: '#D1D5DB' },
    { id: 'forest_green', name: 'Xanh Rêu Hoàng Gia', hex: '#1C3F34', type: 'thread' },
    { id: 'charcoal_black', name: 'Đen Tuyển Khói', hex: '#18181B', type: 'thread' },
  ],
  icons: [
    { id: 'none', name: 'Không icon', symbol: '' },
    { id: 'heart', name: 'Trái tim thêu viền', symbol: '♥' },
    { id: 'star', name: 'Ngôi sao phương Bắc', symbol: '✦' },
    { id: 'flower', name: 'Cành hoa trà', symbol: '✤' },
    { id: 'crest', name: 'Vương miện mini', symbol: '♚' },
    { id: 'infinity', name: 'Vô cực tình yêu', symbol: '∞' },
  ]
};

export const COMMON_ENGRAVING_CONFIG: CustomizationConfig = {
  supportedTypes: ['engraving'],
  embroideryFee: 0,
  engravingFee: 85000,
  giftBoxFee: 50000,
  maxChars: 18,
  positions: [
    { id: 'bottle_front', label: 'Mặt trước thân chai', previewCoords: { x: 50, y: 55 } },
    { id: 'bottle_side', label: 'Cạnh chai tinh xảo', previewCoords: { x: 35, y: 58 } },
    { id: 'cap_top', label: 'Nắp chai mạ vàng', previewCoords: { x: 50, y: 26 } },
    { id: 'back_plate', label: 'Tấm kim loại mặt sau', previewCoords: { x: 50, y: 68 } },
  ],
  fonts: [
    { id: 'roman_monogram', name: 'Cinzel Cổ Điển Khắc Laser', fontFamily: "'Cinzel', serif", styleClass: 'font-serif tracking-[0.25em] font-bold uppercase', sample: 'VICTORIA' },
    { id: 'script_cursive', name: 'Chữ Viết Tay Quý Tộc', fontFamily: "'Great Vibes', cursive", styleClass: 'text-lg capitalize', sample: 'Eleanor with love' },
    { id: 'modern_sans', name: 'Laser Minimal Clean', fontFamily: "'Plus Jakarta Sans', sans-serif", styleClass: 'tracking-[0.2em] uppercase font-semibold text-xs', sample: 'PARIS • 24.12' },
    { id: 'classic_serif', name: 'Garamond Trầm Lắng', fontFamily: "'Cormorant Garamond', serif", styleClass: 'font-serif tracking-widest text-sm', sample: 'N° 07 Privé' },
  ],
  colors: [
    { id: 'engraved_gold', name: 'Khắc Nhũ Vàng 24K', hex: '#E6CA65', type: 'metallic', border: '#C5A038' },
    { id: 'engraved_silver', name: 'Khắc Bạc Gương Rhodium', hex: '#F3F4F6', type: 'metallic', border: '#9CA3AF' },
    { id: 'engraved_rose', name: 'Khắc Vàng Hồng Rose Gold', hex: '#E0A899', type: 'metallic', border: '#B57463' },
    { id: 'engraved_charcoal', name: 'Khắc Đen Khói Huyền Bí', hex: '#27272A', type: 'metallic' },
  ],
  icons: [
    { id: 'none', name: 'Không icon', symbol: '' },
    { id: 'heart', name: 'Trái tim tình nhân', symbol: '♡' },
    { id: 'star', name: 'Ánh sao kim', symbol: '✧' },
    { id: 'diamond', name: 'Viên kim cương', symbol: '◇' },
    { id: 'crown', name: 'Vương miện nữ hoàng', symbol: '♕' },
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-shirt-01',
    name: 'Áo Sơ Mi Linen Pháp Dệt Tay',
    subtitle: 'Thêu tên / Monogram độc bản ngực trái hoặc cổ tay',
    category: 'clothing',
    collection: 'Linen Riviera',
    price: 890000,
    originalPrice: 1090000,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Best Seller',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chế tác từ 100% sợi lanh tự nhiên thu hoạch vùng Normandy, Pháp. Chất vải thoáng mát tự nhiên với độ rủ trang nhã vượt thời gian. Mỗi chiếc áo có thể thêu thủ công chữ lồng tên hoặc thông điệp riêng theo chuẩn nghệ nhân may đo Ý.',
    highlights: [
      '100% Linen tự nhiên từ Normandy đã xử lý giặt mềm',
      'Khuy xà cừ tự nhiên nhập khẩu từ biển Nam Thái Bình Dương',
      'Đường may giấu mép chuẩn may đo cao cấp (French seams)',
      'Miễn phí tư vấn phối font và màu chỉ theo tone da'
    ],
    materials: '100% Pure Normandy Linen, khuy xà cừ ngọc trai 100%',
    careInstructions: 'Giặt tay nhẹ nhàng hoặc giặt máy chế độ len/lụa ở 30°C. Là/ủi khi vải còn ẩm để giữ form tốt nhất.',
    customizationInfo: 'Hỗ trợ thêu chữ nổi bật với 5 phông chữ và 7 màu chỉ lụa cao cấp. Chỉ thêu Coats Đức bền màu không phai.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Trắng Ngà Kem', hex: '#FAF7F2' },
      { name: 'Xanh Navy Trầm', hex: '#1E293B' },
      { name: 'Xanh Oliu Nhạt', hex: '#879878' },
      { name: 'Nâu Cát Ấm', hex: '#C2B69D' },
    ],
    variants: [
      { id: 'var-1', name: 'Trắng Ngà Kem - S', colorName: 'Trắng Ngà Kem', colorHex: '#FAF7F2', size: 'S', stock: 18 },
      { id: 'var-2', name: 'Trắng Ngà Kem - M', colorName: 'Trắng Ngà Kem', colorHex: '#FAF7F2', size: 'M', stock: 24 },
      { id: 'var-3', name: 'Trắng Ngà Kem - L', colorName: 'Trắng Ngà Kem', colorHex: '#FAF7F2', size: 'L', stock: 15 },
      { id: 'var-4', name: 'Xanh Navy Trầm - M', colorName: 'Xanh Navy Trầm', colorHex: '#1E293B', size: 'M', stock: 12 },
      { id: 'var-5', name: 'Xanh Navy Trầm - L', colorName: 'Xanh Navy Trầm', colorHex: '#1E293B', size: 'L', stock: 9 },
    ],
    customizationConfig: COMMON_EMBROIDERY_CONFIG,
    defaultPosition: 'left_chest',
  },
  {
    id: 'prod-perfume-01',
    name: 'Nước Hoa Eau De Parfum Santal N°24',
    subtitle: 'Khắc laser vàng 24K tên người thương & ngày kỷ niệm',
    category: 'beauty',
    collection: 'Haute Parfumerie',
    price: 1850000,
    originalPrice: 2200000,
    rating: 5.0,
    reviewCount: 98,
    badge: 'Độc Quyền',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Bản hòa ca của gỗ đàn hương Mysore ấm áp, bạch đậu khấu phương Đông và hoa diên vĩ Florence quý hiếm. Độ lưu hương trên 12 giờ với độ tỏa sang trọng. Chai thủy tinh pha lê nặng đầm tay được khắc laser tên hoặc lời chúc tình cảm mạ nhũ vàng.',
    highlights: [
      'Nồng độ tinh dầu EDP 22% nhập khẩu Grasse, Pháp',
      'Lưu hương 10-14 tiếng trên da, tỏa hương bán kính 1.5m',
      'Chai thủy tinh thủ công kèm nắp nam châm mạ kim loại sáng bóng',
      'Công nghệ khắc laser kim loại 3D chuẩn xác đến từng micron'
    ],
    materials: 'Alcohol Denat, Parfum (Fragrance), Aqua (Water), Santalum Album Oil',
    careInstructions: 'Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp và nhiệt độ cao.',
    customizationInfo: 'Khắc laser chính xác trên bề mặt thủy tinh pha lê hoặc nắp chai với nhũ vàng 24K hoặc bạc gương.',
    sizes: ['50ml', '100ml'],
    colors: [
      { name: 'Hổ Phách Vàng', hex: '#D97706' },
    ],
    variants: [
      { id: 'perf-1', name: 'Chai 50ml EDP', colorName: 'Hổ Phách Vàng', colorHex: '#D97706', size: '50ml', stock: 20 },
      { id: 'perf-2', name: 'Chai 100ml EDP', colorName: 'Hổ Phách Vàng', colorHex: '#D97706', size: '100ml', stock: 14 },
    ],
    customizationConfig: COMMON_ENGRAVING_CONFIG,
    defaultPosition: 'bottle_front',
  },
  {
    id: 'prod-lipstick-01',
    name: 'Son Lì Dưỡng Satin Velvet Rouge',
    subtitle: 'Khắc tên vỏ son kim loại mạ vàng sang trọng',
    category: 'beauty',
    collection: 'Signature Scent & Beauty',
    price: 680000,
    rating: 4.8,
    reviewCount: 86,
    badge: 'Best Seller',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chất son mịn như nhung phủ một lớp dưỡng satin dịu nhẹ từ tinh dầu hoa hồng Damask và bơ hạt mỡ. Vỏ son hợp kim nguyên khối nam châm cao cấp là bức canvas hoàn hảo để khắc tên người thương hay câu châm ngôn sống.',
    highlights: [
      'Chất son kem lì bám màu 8h không khô môi',
      'Bổ sung Vitamin E và tinh chất Rosehip cấp ẩm sâu',
      'Vỏ kim loại cầm nặng tay đóng nắp nam châm tách êm ái',
      'Khắc tên miễn phí khi mua cùng set quà tặng'
    ],
    materials: 'Tinh dầu hoa hồng, Hyaluronic Acid, Sáp Candelilla tự nhiên',
    careInstructions: 'Vặn son lên khoảng 1cm khi sử dụng. Đóng chặt nắp sau khi dùng.',
    customizationInfo: 'Khắc laser trắng bạc hoặc khắc chìm trên thân thỏi son hợp kim nguyên khối.',
    sizes: ['3.8g Fullsize'],
    colors: [
      { name: 'Đỏ Ruby Cổ Điển #01', hex: '#991B1B' },
      { name: 'Hồng Đất Trầm #02', hex: '#B45309' },
      { name: 'Cam Cháy Retro #03', hex: '#C2410C' },
      { name: 'Đỏ Rượu Vang #04', hex: '#581C87' },
    ],
    variants: [
      { id: 'lip-1', name: 'Đỏ Ruby Cổ Điển', colorName: 'Đỏ Ruby Cổ Điển #01', colorHex: '#991B1B', size: '3.8g Fullsize', stock: 35 },
      { id: 'lip-2', name: 'Hồng Đất Trầm', colorName: 'Hồng Đất Trầm #02', colorHex: '#B45309', size: '3.8g Fullsize', stock: 28 },
      { id: 'lip-3', name: 'Cam Cháy Retro', colorName: 'Cam Cháy Retro #03', colorHex: '#C2410C', size: '3.8g Fullsize', stock: 19 },
    ],
    customizationConfig: {
      ...COMMON_ENGRAVING_CONFIG,
      maxChars: 12,
      positions: [
        { id: 'body_center', label: 'Thân son kim loại', previewCoords: { x: 50, y: 50 } },
        { id: 'cap_side', label: 'Nắp son tinh tế', previewCoords: { x: 50, y: 25 } },
      ]
    },
    defaultPosition: 'body_center',
  },
  {
    id: 'prod-hoodie-01',
    name: 'Áo Hoodie Nỉ Bông Heavyweight 480gsm',
    subtitle: 'Thêu chữ nổi ngực áo, viền tay hoặc gáy sau',
    category: 'clothing',
    collection: 'Fall/Winter Capsule',
    price: 950000,
    originalPrice: 1150000,
    rating: 4.9,
    reviewCount: 215,
    badge: 'Best Seller',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chất nỉ bông chân cua chải kỹ định lượng 480gsm dày dặn, ấm áp và đứng form chuẩn streetwear thanh lịch. Mũ áo 2 lớp dày dặn không bị xẹp, bo chun co giãn bền bỉ.',
    highlights: [
      'Chất liệu 85% Organic Cotton, 15% Recycled Poly chống co rút',
      'Trọng lượng 480gsm cách nhiệt mùa thu đông cực ấm',
      'Mũ 2 lớp dày dặn có dây rút kim loại mạ mờ',
      'Thêu vi tính mật độ mũi kim cao sắc nét'
    ],
    materials: '85% Organic Cotton, 15% Polyester',
    careInstructions: 'Giặt mặt trái ở nhiệt độ phòng. Phơi nằm phẳng để giữ form dáng nguyên bản.',
    customizationInfo: 'Hỗ trợ thêu chữ nổi với chỉ lụa dầy, chọn lựa vị trí ngực giữa, ngực trái hoặc cổ tay.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Xám Tro Heather', hex: '#64748B' },
      { name: 'Đen Tuyển Khói', hex: '#18181B' },
      { name: 'Xanh Rêu Đậm', hex: '#1C3F34' },
      { name: 'Kem Yến Mạch', hex: '#E7E0D3' },
    ],
    variants: [
      { id: 'hood-1', name: 'Xám Tro Heather - M', colorName: 'Xám Tro Heather', colorHex: '#64748B', size: 'M', stock: 22 },
      { id: 'hood-2', name: 'Xám Tro Heather - L', colorName: 'Xám Tro Heather', colorHex: '#64748B', size: 'L', stock: 16 },
      { id: 'hood-3', name: 'Kem Yến Mạch - M', colorName: 'Kem Yến Mạch', colorHex: '#E7E0D3', size: 'M', stock: 18 },
      { id: 'hood-4', name: 'Đen Tuyển - L', colorName: 'Đen Tuyển Khói', colorHex: '#18181B', size: 'L', stock: 25 },
    ],
    customizationConfig: COMMON_EMBROIDERY_CONFIG,
    defaultPosition: 'left_chest',
  },
  {
    id: 'prod-wallet-01',
    name: 'Ví Da Bò Nappa Thủ Công Monogram',
    subtitle: 'Dập nhiệt nhũ vàng / Bạc tên hoặc viết tắt nghệ thuật',
    category: 'gifts',
    collection: 'Heirloom Monogram Gifts',
    price: 1250000,
    originalPrice: 1450000,
    rating: 5.0,
    reviewCount: 64,
    badge: 'Độc Quyền',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chế tác từ da bò Nappa Ý nguyên tấm với bề mặt hạt mịn tự nhiên, càng dùng càng lên màu bóng đẹp (patina). Đường chỉ khâu tay thủ công bằng chỉ sáp Pháp dẻo dai vĩnh cửu.',
    highlights: [
      'Da bò Nappa Full-grain tuyển chọn vùng Florence, Italy',
      'Đựng vừa 8-10 thẻ ngân hàng và tiền thẳng không gập',
      'Lớp lót chống quét trộm sóng vô tuyến RFID bảo mật',
      'Hộp quà nam châm nhung cao cấp đi kèm nơ thắt sẵn'
    ],
    materials: '100% Genuine Italian Nappa Leather, chỉ sáp Lin Câblé',
    careInstructions: 'Dưỡng kem da chuyên dụng 3 tháng/lần. Tránh tiếp xúc trực tiếp với nước biển hay cồn.',
    customizationInfo: 'Dập chìm nhiệt độ cao kèm nhũ vàng 24K hoặc nhũ bạc lá sang trọng bền màu vĩnh cửu.',
    sizes: ['Tiêu chuẩn (11.5 x 9 cm)'],
    colors: [
      { name: 'Nâu Espresso', hex: '#451A03' },
      { name: 'Đen Obsidian', hex: '#0F172A' },
      { name: 'Xanh Lá Rừng Pin', hex: '#064E3B' },
    ],
    variants: [
      { id: 'wal-1', name: 'Nâu Espresso', colorName: 'Nâu Espresso', colorHex: '#451A03', size: 'Tiêu chuẩn (11.5 x 9 cm)', stock: 15 },
      { id: 'wal-2', name: 'Đen Obsidian', colorName: 'Đen Obsidian', colorHex: '#0F172A', size: 'Tiêu chuẩn (11.5 x 9 cm)', stock: 20 },
    ],
    customizationConfig: {
      ...COMMON_ENGRAVING_CONFIG,
      maxChars: 10,
      positions: [
        { id: 'corner_front', label: 'Góc phải mặt ngoài', previewCoords: { x: 75, y: 75 } },
        { id: 'inside_slot', label: 'Ngăn thẻ phía trong', previewCoords: { x: 50, y: 50 } },
      ]
    },
    defaultPosition: 'corner_front',
  },
  {
    id: 'prod-tote-01',
    name: 'Túi Tote Canvas Organic Quai Da Thật',
    subtitle: 'Thêu họa tiết & chữ nghệ thuật theo yêu cầu',
    category: 'gifts',
    collection: 'Linen Riviera',
    price: 490000,
    rating: 4.7,
    reviewCount: 112,
    badge: 'Mới',
    isPersonalized: true,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Chiếc túi tote lý tưởng cho ngày làm việc lẫn dạo phố cuối tuần. Thân túi làm từ vải Canvas Organic 16oz dày dặn, quai cầm da bò sáp tự nhiên tạo điểm nhấn thanh lịch.',
    highlights: [
      'Vải Canvas Organic 16oz chịu tải đến 15kg',
      'Quai xách da bò thật tán đinh đồng vintage chống rách',
      'Có ngăn kéo khóa bên trong an toàn cho điện thoại và ví',
      'Vừa vặn laptop 14 - 15.6 inch'
    ],
    materials: '100% Cotton Canvas, quai da Vegetable Tanned Leather',
    careInstructions: 'Giặt vết bẩn cục bộ bằng bàn chải mềm và bọt xà phòng nhẹ. Tránh làm ướt quai da.',
    customizationInfo: 'Thêu chữ cỡ lớn chính giữa thân túi hoặc thêu monogram góc túi trang nhã.',
    sizes: ['Kích thước lớn (40 x 36 x 12 cm)'],
    colors: [
      { name: 'Trắng Mộc Tự Nhiên', hex: '#F3EFE0' },
      { name: 'Xanh Rêu Quân Đội', hex: '#4D533C' },
      { name: 'Đen Mờ', hex: '#262626' },
    ],
    variants: [
      { id: 'tote-1', name: 'Trắng Mộc - Lớn', colorName: 'Trắng Mộc Tự Nhiên', colorHex: '#F3EFE0', size: 'Kích thước lớn (40 x 36 x 12 cm)', stock: 40 },
      { id: 'tote-2', name: 'Xanh Rêu - Lớn', colorName: 'Xanh Rêu Quân Đội', colorHex: '#4D533C', size: 'Kích thước lớn (40 x 36 x 12 cm)', stock: 25 },
    ],
    customizationConfig: COMMON_EMBROIDERY_CONFIG,
    defaultPosition: 'left_chest',
  },
  {
    id: 'prod-candle-01',
    name: 'Nến Thơm Sáp Đậu Nành Gỗ Tuyết Tùng & Vani',
    subtitle: 'Khắc nắp gỗ sồi & nhãn kim loại thông điệp yêu thương',
    category: 'gifts',
    collection: 'Signature Scent & Beauty',
    price: 520000,
    rating: 4.9,
    reviewCount: 77,
    badge: 'Limited',
    isPersonalized: true,
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sáp đậu nành thiên nhiên 100% không khói kết hợp bấc gỗ phát ra tiếng tí tách êm dịu khi cháy. Mùi hương gỗ tuyết tùng Virginia, vani Madagascar và hổ phách thanh khiết xoa dịu tâm trí.',
    highlights: [
      'Thời gian cháy liên tục lên tới 55 giờ',
      'Bấc gỗ tự nhiên kêu lách tách như lửa lò sưởi mùa đông',
      'Cốc thủy tinh hổ phách mờ kèm nắp gỗ sồi khắc laser',
      'Tặng kèm que diêm dài sang trọng'
    ],
    materials: 'Sáp đậu nành, tinh dầu thiên nhiên nguyên chất, bấc gỗ',
    careInstructions: 'Cắt bấc còn khoảng 5mm trước mỗi lần thắp. Không đốt quá 4 tiếng/lần.',
    customizationInfo: 'Khắc laser thông điệp, tên hoặc ngày kỷ niệm trên nắp gỗ sồi cao cấp.',
    sizes: ['250g (8.8 oz)'],
    colors: [
      { name: 'Thủy Tinh Hổ Phách', hex: '#B45309' },
    ],
    variants: [
      { id: 'cnd-1', name: '250g Hũ Hổ Phách', colorName: 'Thủy Tinh Hổ Phách', colorHex: '#B45309', size: '250g (8.8 oz)', stock: 30 },
    ],
    customizationConfig: {
      ...COMMON_ENGRAVING_CONFIG,
      positions: [
        { id: 'wooden_lid', label: 'Nắp gỗ sồi', previewCoords: { x: 50, y: 30 } },
        { id: 'glass_label', label: 'Mặt trước cốc', previewCoords: { x: 50, y: 65 } },
      ]
    },
    defaultPosition: 'wooden_lid',
  },
  {
    id: 'prod-dress-01',
    name: 'Đầm Lụa Tơ Tằm Hà Đông Cắt Vát Bias',
    subtitle: 'Thêu monogram chữ lồng tinh xảo vạt váy hoặc dây lưng',
    category: 'clothing',
    collection: 'Minimalist Silk',
    price: 1650000,
    originalPrice: 1950000,
    rating: 5.0,
    reviewCount: 53,
    badge: 'Độc Quyền',
    isPersonalized: true,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Được dệt từ 100% sợi tơ tằm thượng hạng làng Vạn Phúc, Hà Đông. Kỹ thuật cắt xéo bias tôn vinh đường cong tự nhiên với độ óng ả mềm mại như nước chảy trên da.',
    highlights: [
      '100% Tơ tằm tự nhiên óng ả mềm mượt',
      'Kỹ thuật cắt xéo vải Bias cut ôm trọn phom dáng nữ tính',
      'Dây đan chéo lưng tùy chỉnh linh hoạt theo kích cỡ cơ thể',
      'Tặng kèm túi giặt lụa chuyên dụng'
    ],
    materials: '100% Mulberry Silk (Tơ tằm tự nhiên 19 momme)',
    careInstructions: 'Khuyên giặt khô hoặc giặt tay với sữa tắm dịu nhẹ trong nước mát.',
    customizationInfo: 'Thêu chữ lồng bằng chỉ tơ cùng tone màu hoặc chỉ vàng ánh kim tinh tế ở vạt váy.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Xanh Champagne Óng', hex: '#E6D7B9' },
      { name: 'Hồng Phấn Cổ Điển', hex: '#FBCFE8' },
      { name: 'Đen Huyền Bí', hex: '#0F172A' },
    ],
    variants: [
      { id: 'silk-1', name: 'Champagne - S', colorName: 'Xanh Champagne Óng', colorHex: '#E6D7B9', size: 'S', stock: 8 },
      { id: 'silk-2', name: 'Champagne - M', colorName: 'Xanh Champagne Óng', colorHex: '#E6D7B9', size: 'M', stock: 12 },
      { id: 'silk-3', name: 'Đen Huyền Bí - M', colorName: 'Đen Huyền Bí', colorHex: '#0F172A', size: 'M', stock: 10 },
    ],
    customizationConfig: COMMON_EMBROIDERY_CONFIG,
    defaultPosition: 'left_chest',
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'The Linen Solitude',
    subtitle: 'Nắng gió Địa Trung Hải hòa nhịp cùng may đo thủ công',
    season: 'Spring / Summer Capsule',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    description: 'Bộ sưu tập trang phục linen tự nhiên phối cùng các chi tiết thêu tên ngực áo tinh khôi, gợi nhớ những buổi chiều lộng gió bên bờ vịnh Riviera.',
    taggedProductIds: ['prod-shirt-01', 'prod-tote-01']
  },
  {
    id: 'look-2',
    title: 'L\'Ombre Privée',
    subtitle: 'Dấu ấn độc bản của hương thơm và sắc đẹp',
    season: 'Permanent Fragrance Collection',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    description: 'Chai thủy tinh khắc tên bằng tia laser mạ nhũ vàng 24K, đặt trong chiếc hộp sơn mài bespoke dành tặng cho những tâm hồn duy mỹ.',
    taggedProductIds: ['prod-perfume-01', 'prod-lipstick-01']
  },
  {
    id: 'look-3',
    title: 'Warmth of Winter Wool',
    subtitle: 'Ấm áp mùa lễ hội cùng món quà khắc ghi kỷ niệm',
    season: 'Fall / Winter Monogram',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    description: 'Sự giao thoa của chất liệu nỉ bông dày dặn cùng ví da Nappa khâu tay, hoàn thiện với chữ thêu monogram thanh nhã.',
    taggedProductIds: ['prod-hoodie-01', 'prod-wallet-01']
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    author: 'Minh Thư (@thu.aesthetic)',
    handle: '@thu.aesthetic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    caption: 'Nhận được chiếc áo sơ mi thêu tên nhỏ xinh ở ngực áo mà mê quá đỗi! Từng đường chỉ thêu tỉ mỉ, đóng gói như một tác phẩm nghệ thuật. Cảm ơn @atelier.bespoke!',
    likes: 1240,
    productName: 'Áo Sơ Mi Linen Pháp',
    productId: 'prod-shirt-01'
  },
  {
    id: 'post-2',
    author: 'Hoàng Long (@long.artisan)',
    handle: '@long.artisan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    caption: 'Món quà kỷ niệm 3 năm ngày cưới khắc laser tên 2 đứa lên chai nước hoa Santal. Vợ mình xúc động suýt khóc. 10/10 cho dịch vụ đóng gói và khắc laser!',
    likes: 2180,
    productName: 'Nước Hoa EDP Santal N°24',
    productId: 'prod-perfume-01'
  },
  {
    id: 'post-3',
    author: 'Khánh Linh (@linh.lifestyle)',
    handle: '@linh.lifestyle',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    caption: 'Thỏi son mang tên chính mình! Cảm giác lấy thỏi son khắc tên ra thoa nơi đông người sang chảnh cực kỳ luôn ạ.',
    likes: 950,
    productName: 'Son Satin Velvet Rouge',
    productId: 'prod-lipstick-01'
  },
  {
    id: 'post-4',
    author: 'Thái An (@an.minimalist)',
    handle: '@an.minimalist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    caption: 'Chiếc ví da nappa cầm êm tay, khắc chìm dập nhiệt tên tắt M.T ở góc phải. Đúng chất đồ thủ công đắt giá.',
    likes: 1430,
    productName: 'Ví Da Nappa Thủ Công',
    productId: 'prod-wallet-01'
  }
];

export const MOCK_VOUCHERS: Voucher[] = [
  { code: 'ATELIER10', description: 'Giảm 10% cho đơn hàng đầu tiên', discountType: 'percentage', value: 10, minOrder: 500000 },
  { code: 'BESPOKEVIP', description: 'Giảm ngay 200.000₫ cho đơn từ 1.500.000₫', discountType: 'fixed', value: 200000, minOrder: 1500000 },
  { code: 'FREESHIP', description: 'Miễn phí giao hàng tiêu chuẩn toàn quốc', discountType: 'fixed', value: 35000, minOrder: 300000 },
];
