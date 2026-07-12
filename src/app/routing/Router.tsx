import React from 'react';
import useRoute from './useRoute.ts';

export type RouteParams = {
  [key: string]: string | undefined; // Разрешает динамический id, userId и т.д.
};

const matchPath = (path: string, route: string): RouteParams | null => {
  const pathParts = path.split('/');
  const routeParts = route.split('/');

  if (pathParts.length !== routeParts.length) {
    return null;
  }

  const params: RouteParams = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

interface RouterProps {
  routes: Record<string, React.ComponentType<{ params: RouteParams }>>;
}

const Router: React.FC<RouterProps> = (props) => {
  const { routes } = props;
  const path = useRoute();

  for (const route in routes) {
    const params = matchPath(path, route);

    if (params) {
      const Page = routes[route];
      return <Page params={params} />;
    }
  }

  const NotFound = routes['*'];

  if (!NotFound) return null;

  return <NotFound params={{}} />;
};

export default Router;
