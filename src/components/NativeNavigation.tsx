import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

/** Keep Android's system back button inside the app's route history. */
export function NativeNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return;
    const listener = App.addListener('backButton', () => {
      if (location.pathname === '/') void App.minimizeApp();
      else if (window.history.state?.idx > 0) navigate(-1);
      else navigate('/', { replace: true });
    });
    return () => { void listener.then(handle => handle.remove()); };
  }, [location.pathname, navigate]);
  return null;
}
