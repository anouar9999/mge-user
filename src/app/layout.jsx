/* eslint-disable react/no-children-prop */
'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RTL from '@/app/(DashboardLayout)/layout/shared/customizer/RTL';
import { ThemeSettings } from '@/utils/theme/Theme';
import { store } from '@/store/store';
import { useSelector } from 'react-redux';
// import { AppState } from "@/store/store";
import { Provider } from 'react-redux';
import './globals.css'; // adjust the path if necessary
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '@/utils/i18n';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/app/font.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ToastProvider } from './components/toast/ToastProviderContext';
import LoadingOverlay from './loading';

// Cookie consent modal component
const CookieConsentModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [cookiePreferences, setCookiePreferences] = React.useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  React.useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (true) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences if they exist
      try {
        const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences'));
        if (savedPreferences) {
          setCookiePreferences(savedPreferences);
        }
      } catch (e) {
        console.error("Error loading cookie preferences", e);
      }
    }
  }, []);

  const handlePreferenceChange = (type) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setCookiePreferences(allAccepted);
    setShowModal(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowModal(false);
  };

  const declineCookies = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    localStorage.setItem('cookieConsent', 'false');
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    setCookiePreferences(onlyNecessary);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black bg-opacity-50 flex justify-center">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-secondary text-white p-6 rounded-lg shadow-lg max-w-3xl"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">Cookie Preferences</h3>
        </div>
        <p className="mb-4">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          Please select which cookies you want to allow on our website.
        </p>
        
        <div className="mb-6 space-y-4">
          {/* Necessary cookies - always enabled */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Necessary Cookies</h4>
              <p className="text-sm text-gray-400">Required for the website to function properly. Cannot be disabled.</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={cookiePreferences.necessary} 
                disabled={true}
                className="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
          
          {/* Analytics cookies */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Analytics Cookies</h4>
              <p className="text-sm text-gray-400">Help us understand how visitors interact with our website.</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={cookiePreferences.analytics} 
                onChange={() => handlePreferenceChange('analytics')}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          {/* Marketing cookies */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Marketing Cookies</h4>
              <p className="text-sm text-gray-400">Used to track visitors across websites for advertising purposes.</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={cookiePreferences.marketing} 
                onChange={() => handlePreferenceChange('marketing')}
                className="cursor-pointer"
              />
            </div>
          </div>
          
          {/* Preferences cookies */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Preferences Cookies</h4>
              <p className="text-sm text-gray-400">Allow the website to remember choices you make and provide enhanced features.</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={cookiePreferences.preferences} 
                onChange={() => handlePreferenceChange('preferences')}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition-colors"
          >
            Decline All
          </button>
          <button
            onClick={savePreferences}
            className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/20 transition-colors"
          >
            Save Preferences
          </button>
          <button
            onClick={acceptAllCookies}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Accept All
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const MyApp = ({ children }) => {
  const theme = ThemeSettings();

  const customizer = useSelector((state) => state.customizer);

  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: 'key' }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
            <CookieConsentModal />
          </RTL>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({ children }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider store={store}>
          <ToastProvider>
            {loading ? (
              // eslint-disable-next-line react/no-children-prop

              <MyApp children={children} />
            ) : (
              <LoadingOverlay />
            )}
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
