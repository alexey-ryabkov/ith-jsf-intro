import { useAppDispatch, useAppSelector } from '@app/hooks';
import { closeNotification } from '@store/actions';
import { selectNotification2show } from '@store/selectors';
import Modal from '@ui/Modal';

const Notifier = () => {
  const { title, text, type } = useAppSelector(selectNotification2show);
  const dispatch = useAppDispatch();
  return (
    <Modal
      title={title}
      type={type}
      opened={!!title}
      onClose={() => dispatch(closeNotification())}
    >
      <div className="space-y-step-1">
        {text.split(`\n\n`).map((txtPart, i) => (
          <p key={i} className="text-base-b">
            {txtPart}
          </p>
        ))}
      </div>
    </Modal>
  );
};
export default Notifier;
