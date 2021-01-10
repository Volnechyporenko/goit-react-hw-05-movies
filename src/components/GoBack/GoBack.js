import { useHistory } from 'react-router-dom';

export default function GoBack() {
  const history = useHistory();

  const onGoBack = () => {
    history.push(history?.location?.state?.from ?? '/');
  };

  return (
    <button type="button" onClick={onGoBack}>
      GoBack
    </button>
  );
}
