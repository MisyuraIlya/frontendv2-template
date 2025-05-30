import { FC, ReactNode, createContext, useEffect, useContext } from 'react';
import { urlBase64ToUint8Array } from '../utils/push';
import { useAuth } from '../store/auth.store';
import apiInterceptor from '../api/api.interceptor';

interface PushProviderProps {
  children: ReactNode;
}

const PushContext = createContext<void>(undefined!);

export const usePush = () => useContext(PushContext);

export const PushProvider: FC<PushProviderProps> = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !user) return;
    let swReg: ServiceWorkerRegistration;

    (async () => {
      swReg = await navigator.serviceWorker.register('/service-worker.js');
      const resp = await fetch('/push-subscription/vapidPublicKey');
      const { publicKey } = await resp.json();
      const sub = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await apiInterceptor.post('/push-subscription/subscribe', sub);
    })();

    return () => {
      swReg?.pushManager.getSubscription().then(s => s?.unsubscribe());
    };
  }, [user]);

  return <PushContext.Provider value={undefined}>{children}</PushContext.Provider>;
};
