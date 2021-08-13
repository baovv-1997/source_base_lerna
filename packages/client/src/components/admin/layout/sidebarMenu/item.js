import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarMenu = ({ icon, label, isOen, href, className }) => {
  const Router = useRouter();

  const isActive = Router.pathname === href;

  return (
    <Link href={href}>
      <a
        className={clsx('no-underline flex flex-row items-center rounded-full p-2 mx-4', className, {
          'bg-primary-light': isActive && isOen,
          'hover:bg-primary-light hover:bg-opacity-25': !isActive,
          'justify-center': !isOen,
        })}
        href={href}
      >
        <div className={clsx({ 'text-gray-700': !isActive, 'text-primary': isActive, 'ml-3': isOen })}>{icon}</div>
        {isOen && (
          <Typography className={clsx({ 'text-gray-700': !isActive, 'text-primary': isActive, 'ml-3': isOen })}>
            {label}
          </Typography>
        )}
      </a>
    </Link>
  );
};

export default SidebarMenu;
