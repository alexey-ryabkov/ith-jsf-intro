import cn from 'classnames';
import type JumbotronProps from './types';

const Jumbotron = ({
  image,
  children,
  className: cls,
  style = {},
  ...attrs
}: JumbotronProps) => (
  <div
    className={cn(cls, 'w-[90rem] h-[37.5rem] px-step-5 py-step-10')}
    style={{
      ...style,
      backgroundImage: `url('${image}')`,
    }}
    {...attrs}
  >
    {children}
  </div>
);
export default Jumbotron;
