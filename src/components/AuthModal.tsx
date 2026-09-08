import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, Sparkles, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth, loginDemoUser } = useShop();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoUser();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2E2427]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FAF7F6] w-full max-w-md rounded-3xl shadow-2xl border border-[#EFE5E8] overflow-hidden">
        {/* Header */}
        <div className="bg-white/95 p-6 flex items-center justify-between border-b border-[#EFE5E8]">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A85B70] font-bold block mb-0.5">
              RiEn Club • Thành Viên
            </span>
            <h3 className="font-serif text-xl font-light text-[#2E2427]">
              {tab === 'login' ? 'Đăng Nhập RiEn' : 'Tạo Tài Khoản'}
            </h3>
          </div>
          <button
            onClick={closeAuth}
            className="p-1.5 text-[#7A6870] hover:text-[#A85B70] rounded-full hover:bg-[#F7EDF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#EFE5E8] text-xs">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 uppercase tracking-wider transition-all cursor-pointer font-bold ${
              tab === 'login'
                ? 'border-b-2 border-[#D48598] text-[#A85B70] bg-[#FAF5F6]'
                : 'text-[#7A6870] hover:text-[#2E2427] bg-white'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 uppercase tracking-wider transition-all cursor-pointer font-bold ${
              tab === 'register'
                ? 'border-b-2 border-[#D48598] text-[#A85B70] bg-[#FAF5F6]'
                : 'text-[#7A6870] hover:text-[#2E2427] bg-white'
            }`}
          >
            Đăng Ký
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Quick Demo Login 1-Click Banner */}
          <div className="bg-white border border-[#EFE5E8] rounded-2xl p-4 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E2427] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D48598]" />
                Tài khoản VIP trải nghiệm 🌸
              </span>
              <span className="text-[10px] bg-[#F7EDF0] text-[#A85B70] border border-[#EFE5E8] px-2 py-0.5 rounded-full font-mono font-bold">
                1-Click
              </span>
            </div>
            <p className="text-[11px] text-[#7A6870] leading-relaxed">
              Trải nghiệm ngay lịch sử đơn hàng, thiết kế Make It Yours đã lưu và ưu đãi tích điểm.
            </p>
            <button
              id="demo-login-btn"
              onClick={loginDemoUser}
              className="w-full bg-[#D48598] hover:bg-[#C27386] text-white text-xs font-bold py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md shadow-rose-200/50"
            >
              <span>Đăng nhập ngay: Khánh Linh</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A85B70] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#2E2427] font-bold block mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A85B70] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#EFE5E8] rounded-xl text-xs focus:outline-none focus:border-[#D48598] text-[#2E2427] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E2427] hover:bg-[#45363B] text-white text-xs uppercase tracking-wider font-bold py-3 rounded-full transition-all cursor-pointer mt-2 active:scale-95 shadow-sm"
            >
              {tab === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
            </button>
          </form>

          {/* Guest Action */}
          <div className="pt-2 text-center">
            <button
              onClick={closeAuth}
              className="text-xs text-[#7A6870] hover:text-[#A85B70] underline cursor-pointer transition-colors font-medium"
            >
              Tiếp tục với tư cách Khách (Guest)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
