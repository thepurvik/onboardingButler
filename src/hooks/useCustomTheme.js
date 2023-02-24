import { useContext } from 'react';
import { ThemeContext } from '../components/Contexts/ThemeProvider';

// ----------------------------------------------------------------------

const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Theme context must be use inside ThemeProvider');
  return context;
};

export default useCustomTheme;
