import * as React from 'react';
import './confirm.css';

interface IProps {
  open: boolean;
  title: string;
  content: string;
  exitOption?: string;
  acceptOption?: string;
  onAcceptClick: () => void;
  onExitClick: () => void;
}

const Confirm: React.SFC<IProps> = props => {
  console.log('Confirm: rendering');
  const [exitClickCount, setExitClickCount] = React.useState(0);

  React.useEffect(() => {
    console.log('Confirm first rendering');
    return () => {
      console.log('Confirm unmounted');
    };
  }, []);

  const handleAcceptClick = () => {
    props.onAcceptClick();
  };

  const handleExitClick = () => {
    const newCount = exitClickCount + 1;
    setExitClickCount(newCount);
    if (newCount >= 2) {
      props.onExitClick();
    }
  };

  return (
    <div
      className={
        props.open ? 'confirm-wrapper confirm-visible' : 'confirm-wrapper'
      }
    >
      <div className="confirm-container">
        <span>{props.title}</span>
      </div>

      <div className="confirm-content-container">
        <p>{props.content}</p>
      </div>

      <div className="confirm-buttons-container">
        <button className="confirm-exit" onClick={handleExitClick}>
          {exitClickCount === 0 ? props.exitOption : 'Really?'}
        </button>
        <button className="confirm-accept" onClick={handleAcceptClick}>
          {props.acceptOption}
        </button>
      </div>
    </div>
  );
};

Confirm.defaultProps = {
  exitOption: 'Exit',
  acceptOption: 'Accept',
};

const ConfirmMemo = React.memo(Confirm);
export default ConfirmMemo;
