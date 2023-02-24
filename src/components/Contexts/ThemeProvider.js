import { Colors } from '../../assets/Helper/constant';
import { createContext, useReducer } from 'react';
import { getCornerStones } from '../../assets/API/Apis';

const initialState = {
  colorTypes: {
    CONNECTION: 'connection',
    CLARIFICATION: 'clarification',
    CULTURE: 'culture',
    COMPLIANCE: 'compliance',
  },
  activeCornerStone: null,
  cornerStone: [],
  loader: false,
};

const JWTReducer = (state, action) => {
  // debugger;
  switch (action.type || action) {
    case 'SET_CORNERSTONE':
      return { ...state, cornerStone: action.payload };
    case 'SET_ACTIVE_CORNERSTONE':
      return { ...state, activeCornerStone: action.payload };

    default:
      return state;
  }
};

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  return <ThemeContext.Provider value={{ ...state, dispatch }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
