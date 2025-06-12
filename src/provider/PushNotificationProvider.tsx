import { FC, ReactNode, createContext, useEffect, useContext, useState } from 'react';
import { urlBase64ToUint8Array } from '../utils/push';
import { useAuth } from '../store/auth.store';
import apiInterceptor from '../api/api.interceptor';

interface PushContextValue {
  isSubscribed: boolean;
  subscribeToPush: () => Promise<void>;
  unsubscribeFromPush: () => Promise<void>;
}
const PushContext = createContext<PushContextValue>({} as PushContextValue);
export const usePush = () => useContext(PushContext);

interface PushProviderProps {
  children: ReactNode;
}

export const PushProvider: FC<PushProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [swReg, setSwReg] = useState<ServiceWorkerRegistration | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !user) return;
    (async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        setSwReg(registration);
        const existing = await registration.pushManager.getSubscription();
        setIsSubscribed(!!existing);
      } catch (e) {
        console.error('SW register failed', e);
      }
    })();
  }, [user]);

  const subscribeToPush = async () => {
    if (!swReg) return;
    try {
      const { data: { publicKey } } = await apiInterceptor.get('/push-subscription/vapidPublicKey');
      const sub = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await apiInterceptor.post('/push-subscription/subscribe', sub);
      setIsSubscribed(true);
    } catch (e) {
      console.error('Push subscribe failed', e);
    }
  };

  const unsubscribeFromPush = async () => {
    if (!swReg) return;
    try {
      const subscription = await swReg.pushManager.getSubscription();
      if (subscription) {
        await apiInterceptor.post('/push-subscription/unsubscribe', { endpoint: subscription.endpoint });
        await subscription.unsubscribe();
      }
    } catch (e) {
      console.error('Push unsubscribe failed', e);
    } finally {
      setIsSubscribed(false);
    }
  };

  return (
    <PushContext.Provider value={{ isSubscribed, subscribeToPush, unsubscribeFromPush }}>
      {children}
    </PushContext.Provider>
  );
};
