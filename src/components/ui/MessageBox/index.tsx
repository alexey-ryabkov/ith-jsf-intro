import cn from 'classnames';
import TitleBox from '@ui/TitleBox';
import MessageBoxProps from './types';

const MessageBox = ({
  title,
  image,
  desc,
  children,
  className: cls,
}: MessageBoxProps) => {
  return (
    <div className={cn(cls, 'text-center mx-auto')}>
      {image && <img className="mb-step-4" src={image} alt="404 error" />}
      <TitleBox level={2} className="!block !pb-step-2">
        {title}
      </TitleBox>
      {desc && <p className="text-quiet mb-step-4">{desc}</p>}
      {children}
    </div>
  );
};
export default MessageBox;
