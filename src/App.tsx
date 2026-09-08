/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PersonalizationStudioModal } from './components/PersonalizationStudioModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { AccountView } from './views/AccountView';

const MainContent: React.FC = () => {
  const { activeView } = useShop();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F6] text-[#2E2427] font-sans selection:bg-[#F2D7E0] selection:text-[#5B3340] transition-colors duration-300">
      {/* Global Sticky Header */}
      <Header />

      {/* Dynamic View Routing with Smooth Transition */}
      <main className="flex-1 transition-ux">
        <div key={activeView} className="animate-in fade-in zoom-in-[0.99] duration-300">
          {activeView === 'home' && <HomeView />}
          {activeView === 'catalog' && <CatalogView />}
          {activeView === 'product-detail' && <ProductDetailView />}
          {activeView === 'checkout' && <CheckoutView />}
          {activeView === 'order-success' && <OrderSuccessView />}
          {activeView === 'account' && <AccountView />}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <PersonalizationStudioModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
