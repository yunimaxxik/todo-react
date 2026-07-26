import { BASE_URL } from '@/shared/constants';
import React from 'react';

interface RouterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

const RouterLink: React.FC<RouterLinkProps> = (props) => {
  const { to, children, ...rest } = props;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a
      href={`${BASE_URL}${to}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};

export default RouterLink;
