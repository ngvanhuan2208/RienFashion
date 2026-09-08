import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { navigateTo, openStudio, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div className="bg-white border border-[#EFE5E8] rounded-2xl overflow-hidden hover:border-[#D48598] hover:shadow-md hover:shadow-rose-100/60 transition-all duration-300 flex flex-col sm:flex-row group">
        <div 
          className="sm:w-56 h-64 sm:h-auto relative overflow-hidden bg-[#FAF5F6] cursor-pointer shrink-0"
          onClick={() => navigateTo('product-detail', product.id)}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#F7EDF0] text-[#A85B70] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs border border-[#EFE5E8]">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#A85B70] font-bold block">
                  {product.collection}
                </span>
                <h3 
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="font-serif text-base font-normal text-[#2E2427] hover:text-[#A85B70] transition-colors cursor-pointer mt-1"
                >
                  {product.name}
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`p-2 rounded-full transition-all active:scale-90 ${
                  isWishlisted ? 'bg-[#F2DEE5] text-[#A85B70]' : 'bg-[#FAF7F6] text-[#7A6870] hover:bg-[#F7EDF0]'
                }`}
              >
                <Heart className={`w-4 h-4 stroke-[1.5] ${isWishlisted ? 'fill-[#A85B70]' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-[#7A6870] mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-2.5 flex items-center gap-2 text-xs text-[#7A6870]">
              <div className="flex items-center text-[#D48598]">
                <Star className="w-3.5 h-3.5 fill-[#D48598] text-[#D48598]" />
                <span className="ml-1 font-bold text-[#2E2427]">{product.rating.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{product.reviewCount} đánh giá</span>
              <span>•</span>
              <span className="text-[#A85B70] font-medium">{product.subtitle}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#EFE5E8] flex items-center justify-between">
            <div>
              <span className="text-sm font-bold font-serif text-[#2E2427]">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-xs text-[#7A6870]/60 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('product-detail', product.id)}
                className="px-3.5 py-1.5 border border-[#EFE5E8] hover:border-[#D48598] text-[#2E2427] text-xs font-semibold rounded-full transition-all cursor-pointer hover:bg-[#FAF5F6] active:scale-95"
              >
                Xem chi tiết
              </button>

              {product.isPersonalized && (
                <button
                  onClick={() => openStudio(product)}
                  className="bg-[#D48598] hover:bg-[#C27386] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Make It Yours</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EFE5E8] rounded-2xl overflow-hidden hover:border-[#D48598] hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300 flex flex-col group relative">
      {/* Product Image Stage */}
      <div 
        className="aspect-[3/4] relative overflow-hidden bg-[#FAF5F6] cursor-pointer"
        onClick={() => navigateTo('product-detail', product.id)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Second image hover crossfade */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}

        {/* Badge: New, Best Seller, Personalized */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#F7EDF0] text-[#A85B70] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs border border-[#EFE5E8]">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs active:scale-90 ${
            isWishlisted 
              ? 'bg-[#F2DEE5] text-[#A85B70]' 
              : 'bg-white/95 text-[#7A6870] hover:text-[#A85B70] hover:bg-[#FAF5F6]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 stroke-[1.5] ${isWishlisted ? 'fill-[#A85B70]' : ''}`} />
        </button>

        {/* Quick Personalize Hover Pill */}
        {product.isPersonalized && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openStudio(product);
              }}
              className="w-full bg-[#D48598]/95 hover:bg-[#C27386] text-white backdrop-blur-xs py-2 px-3 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-rose-200/50 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-white" />
              <span>Make It Yours ✨</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#A85B70] mb-1">
            <span className="uppercase tracking-wider font-bold text-[10px]">{product.collection}</span>
            <div className="flex items-center text-[#D48598] font-bold">
              <Star className="w-3 h-3 fill-[#D48598] text-[#D48598] mr-0.5" />
              <span className="text-[#2E2427]">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-serif text-sm font-normal text-[#2E2427] hover:text-[#A85B70] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-[#7A6870] font-normal mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Variant Colors */}
        <div className="mt-3 pt-2.5 border-t border-[#EFE5E8] flex items-center justify-between">
          <div>
            <span className="text-sm font-serif font-bold text-[#2E2427]">
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && (
              <span className="ml-1.5 text-xs text-[#7A6870]/60 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center -space-x-1">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-white shadow-xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-[#A85B70] pl-1 font-bold">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
