import { NavLink } from 'react-router';
import cn from 'classnames';
import { AppNavProps } from './types';

const AppNav = ({ items, className: cls }: AppNavProps) => (
  <nav className={cn(cls, 'flex space-x-step-4')}>
    {items.map(({ title, path }, i) => (
      <NavLink
        key={i}
        className={({ isActive }) =>
          cn('hover:text-primary', {
            'text-primary': isActive,
          })
        }
        to={path}
      >
        {title}
      </NavLink>
    ))}
  </nav>
);
export default AppNav;
