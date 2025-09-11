import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import BuyerLogin from './pages/buyer-login';
import ArtisanRegistration from './pages/artisan-registration';
import ProductDetails from './pages/product-details';
import UserProfileSettings from './pages/user-profile-settings';
import ProductUploadWizard from './pages/product-upload-wizard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ArtisanRegistration />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/buyer-login" element={<BuyerLogin />} />
        <Route path="/artisan-registration" element={<ArtisanRegistration />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/product-upload-wizard" element={<ProductUploadWizard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
