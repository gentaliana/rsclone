import { useDispatch } from 'react-redux';
import { setLanguage } from '@store';
import './settings.css';

export const Settings = () => {
  const dispatch = useDispatch();
  const setLang = (lang: string) => dispatch(setLanguage(lang));

  return (
    <div>
      <div>
        <span>Select language: </span>
        <button onClick={() => setLang('ru')}>ru</button>
        <button onClick={() => setLang('en')}>en</button>
      </div>
    </div>
  );
};
