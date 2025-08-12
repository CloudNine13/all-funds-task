import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingFallback } from '@atoms';
import { MainLayout } from '@templates';
import { NewsProvider } from '@contexts';
import { routes } from './routes.ts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map(({ path, pageType, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <NewsProvider key={pageType} pageType={pageType}>
                    <Element pageType={pageType} />
                  </NewsProvider>
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
