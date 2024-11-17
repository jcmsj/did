import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';
import { useTonConnect } from '@/hooks/useTonConnect';
import useOnBoarding from '@/hooks/useOnBoarding';
import { useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const { connected } = useTonConnect();
  const { isOnBoardingComplete } = useOnBoarding() // TODO

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        {
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        }
      </HashRouter>
      <div className='w-full flex flex-col items-end p-4'>
      <TonConnectButton />
      </div>
    </AppRoot>
  );
}
