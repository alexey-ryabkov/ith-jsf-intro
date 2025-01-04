import cn from 'classnames';
import { ReactComponent as PreloaderIcon } from '@assets/icons/preloader.svg';
import { TagCssAttrs } from '@app/types';

const Preloader = ({ className: cls, ...attrs }: TagCssAttrs) => (
  <div className={cn(cls, 'flex items-center justify-center')} {...attrs}>
    <div className="flex space-x-step-1">
      <PreloaderIcon className="w-step-6 text-primary" />
      <span className="">Loading...</span>
    </div>
  </div>
);
export default Preloader;
