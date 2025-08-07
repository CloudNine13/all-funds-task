import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingFallback } from '@atoms';
import { MainLayout } from '@templates';
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
                  <Element pageType={pageType} />
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
