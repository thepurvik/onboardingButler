import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import { API_BASE_URLS } from '../../assets/Helper/constant';
// import { GatewayActionsType } from '@customTypes/transaction';
import axios from '../../assets/Helper/axios';
import { isValidToken, setSession, IsAuthenticated } from '../../assets/Helper/utils';
import { axiosInstance } from '../../assets/API/axiosInstances';
// @types
// import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@customTypes/authentication';

// ----------------------------------------------------------------------

const Types = {
  Initial: 'INITIALIZE',
  Login: 'LOGIN',
  Logout: 'LOGOUT',
  Register: 'REGISTER',
  GatewayActionFetch: 'GATEWAYACTIONFETCH',
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  gatewayactions: [],
  gatewayactionsvt: [],
  domain: '',
};

const JWTReducer = (state, action) => {
  // debugger;
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        // user: action.payload,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        domain: '',
      };

    case 'GATEWAYACTIONFETCH':
      return {
        ...state,
        gatewayactions: [...action.payload.gatewayactions],
        gatewayactionsvt: [...action.payload.gatewayactionsvt],
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  useEffect(() => {
    // CALL this API to fetch account details on login for roles, elements etc
    initialize();
  }, []);

  const createSession = (values) => {
    // const user = {
    //   access,
    //   email,
    //   idToken,
    //   refreshToken,
    //   logo,
    //   displayName: `${name} ${familyName}`,
    //   userSub: username,
    // };

    setSession(values);
    dispatch({
      type: Types.Login,
      payload: {
        ...values,
      },
    });
  };

  const initialize = async () => {
    if (!IsAuthenticated()) {
      return;
    }
    try {
      // debugger;
      const { user } = JSON.parse(localStorage.getItem('user'));
      const accessToken = user?.access;

      // if (accessToken && user && isValidToken(accessToken)) {
      if (accessToken && user) {
        // setSession(accessToken, JSON.parse(user));

        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: true,
            user: user,
          },
        });
      } else {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const login = async (body) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URLS.baseUrl_V1}/accounts/login`, body);
      // debugger;
      const user = response?.data?.data;
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
      createSession({
        user: user,
      });

      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  // For Registration

  const loginMicrosoft = async (payload) => {
    try {
      const response = await axios.post(`${API_BASE_URLS.baseUrl_V1}/accounts/microsoft`, payload);
      const user = response?.data?.data;
      createSession({
        user: user,
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  // For Login
  const loginMicrosoftWithHeader = async (payload, headerValue) => {
    try {
      const response = await axios.post(`${API_BASE_URLS.baseUrl_V1}/accounts/microsoft`, payload, {
        headers: {
          company: headerValue,
        },
      });
      const user = response.data.data;
      createSession({
        user: user,
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const register = async (body) => {
    const response = await axios.post(`${API_BASE_URLS.baseUrl_V1}/accounts/customer`, body);
    const { company, ...rest } = response.data.data;

    return response.data.data;
  };

  const logout = async () => {
    setSession(null, null);
    dispatch({ type: Types.Logout });
  };

  const verifyPassword = async (body) => {
    await axios(body);
  };

  const resetPassword = async (email) => {
    await axios.post(`${API_BASE_URLS.user}/password/forget`, {
      username: email,
    });
  };

  const updateProfile = () => {};

  const fetchactions = async () => {
    try {
      const url = `${API_BASE_URLS.adminGateway}/gateways/actions/paylink`;
      const url1 = `${API_BASE_URLS.adminGateway}/gateways/actions/vt`;
      const [response, response1] = await Promise.all([axios.get(url), axios.get(url1)]);
      if (response.data && response1.data) {
        dispatch({
          type: Types.GatewayActionFetch,
          payload: {
            gatewayactions: [...response.data.message],
            gatewayactionsvt: [...response1.data.message],
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        initialize,
        login,
        loginMicrosoft,
        logout,
        register,
        resetPassword,
        updateProfile,
        verifyPassword,
        // activate,
        fetchactions,
        loginMicrosoftWithHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
