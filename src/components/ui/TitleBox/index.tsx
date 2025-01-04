import { type ElementType } from 'react';
import cn from 'classnames';
import type TitleBoxProps from './types';

const TitleBox = ({
  level,
  divider,
  tail = null,
  children,
  className: cls,
  ...attrs
}: TitleBoxProps) => {
  const TitleTag = `h${level}` as ElementType;

  let fontSize: string;
  let paddingBottom: string;
  switch (level) {
    case 1:
      fontSize = 'text-2xl';
      paddingBottom = 'pb-step-5';
      break;
    case 2:
      fontSize = 'text-xl';
      paddingBottom = 'pb-step-5';
      break;
    case 3:
      fontSize = 'text-lg-b';
      paddingBottom = 'pb-step-3';
      break;
    default:
      fontSize = 'text-base-b';
      paddingBottom = 'pb-step-2';
      break;
  }

  divider ??= !!tail;
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between',
        paddingBottom,
        cls,
      )}
    >
      <TitleTag
        className={cn(
          fontSize,
          { 'flex-none': divider || tail },
          {
            'me-step-4': divider,
          },
        )}
        {...attrs}
      >
        {children}
      </TitleTag>
      {divider && <hr className="divider flex-1 relative top-1" />}
      {tail && <div className="flex-none">{tail}</div>}
    </div>
  );
};
export default TitleBox;
