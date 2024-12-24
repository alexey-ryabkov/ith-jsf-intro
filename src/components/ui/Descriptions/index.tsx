import cn from 'classnames';
import type { DescriptionsProps } from './types';

const Descriptions = ({
  items,
  itemWrapperCls = '',
  className: cls,
  ...attrs
}: DescriptionsProps) => {
  return (
    <dl className={cn(cls, 'descriptions')} {...attrs}>
      {items.map(({ name, value }, i) => (
        <div key={i} className={itemWrapperCls}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
};
export default Descriptions;
