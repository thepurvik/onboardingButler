import './assets/styles/Global.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginForm from './Pages/authentication/LoginForm';
import Contact from './Pages/Contact';
import Boarding from './Pages/Boarding';
import AuthGaurd from './components/Guards/AuthGaurd';
import UnAuthGuard from './components/Guards/UnAuthGuard';
import OnboardingPlansCreation from './Pages/OnboardingPlans';
import NotFound from './Pages/NotFound';
import Layout from './components/Layout';
import Tasks from './Pages/OnboardingPlans/Tasks';
import OnBoardingPlansView from './Pages/OnboardingPlans/OnBoardingPlansView';
import EditProfile from './components/EditProfile';
import Dashboard from './Pages/OnboardingPlans/Dashboard';
import Reflections from './Pages/OnboardingPlans/Reflections​';
import { ToastContainer } from 'react-toastify';
import Callback from './Pages/OnboardingPlans/Callback';
import LoginSSO from './Pages/OnboardingPlans/LoginSSO';
import Contact_info from './Pages/Contact_info';
import Administrator_info from './Pages/Administrator_info';
import EmployeeDashboard from './Pages/Dashboard/EmployeeDashboard';
import AdministratorsDashboard from './Pages/Dashboard/AdministratorsDashboard';
import OnboardingDashboard from './Pages/Dashboard/OnboardingDashboard';
import ChangePassword from './Pages/ChangePassword';
import Domain_Route from './components/Domain_Route';
import { ThemeProvider } from './components/Contexts/ThemeProvider';
import UnAuthLayout from './Pages/authentication/UnAuthLayout';
import DashLayout from './Pages/Dashboard/DashLayout';
import DashCard from './components/DashCard';
import OnboardingPlanTable from './Pages/OnboardingPlanTable';
import Loader from './components/Loader';
import Role from './Pages/Dashboard/Role';
import Role_info from './Pages/Role_info';
import Groups from './Pages/Dashboard/Groups';
import Group_info from './Pages/Group_info';
import { API_BASE_URLS } from './assets/Helper/constant';
import Cookies_Bar from './components/Cookies_Bar';
import useAuth from './hooks/useAuth';
import Spinner from './components/Spinner';
import Organization from './Pages/Dashboard/Organization';
import Organization_info from './Pages/Organization_info';
import CallbackSync from './Pages/OnboardingPlans/CallbackSync';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import { useEffect } from 'react';
import { createContext } from 'react';

export const GoogleID = createContext();

function App() {
  const { user } = useAuth();

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'es,da,fr,it,en',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className='container-fluid position-relative p-0 m-0' style={{ height: 'auto' }}>
      {/* <div id='google_translate_element'></div> */}
      <GoogleID.Provider value={'google_translate_element'}>
        <ThemeProvider>
          <ToastContainer autoClose={1000} />
          <BrowserRouter>
            <Routes>
              {/* <Route path='/' element={<Navigate to='/' replace={true} />} /> */}
              {/* <Route path='/' element={<Domain_Route />}> */}
              {!user && <Route path='/' element={<Navigate to='/login' />} />}
              <Route
                path='/login'
                element={
                  <UnAuthGuard>
                    <UnAuthLayout>
                      <LoginForm />
                    </UnAuthLayout>
                  </UnAuthGuard>
                }
              />
              <Route
                path='/forgetpassword'
                element={
                  <UnAuthGuard>
                    <UnAuthLayout>
                      <ForgetPassword />
                    </UnAuthLayout>
                  </UnAuthGuard>
                }
              />
              <Route
                path='/resetpassword/:code/:code'
                element={
                  <UnAuthGuard>
                    <UnAuthLayout>
                      <ResetPassword />
                    </UnAuthLayout>
                  </UnAuthGuard>
                }
              />
              <Route
                path='/callback'
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path='' element={<Callback />} />
                <Route path=':token' element={<Callback />} />
              </Route>
              <Route
                path='/loginsso'
                element={
                  <>
                    <Outlet />
                  </>
                }
              >
                <Route path='' element={<LoginSSO />} />
                <Route path=':token' element={<LoginSSO />} />
              </Route>

              {(user?.user_type === '2' || user?.user_type === '3') && (
                // user?.user_type === '1'&&
                <Route path='/' element={<Layout />}>
                  <Route
                    path='/'
                    element={
                      <AuthGaurd>
                        <OnboardingPlansCreation />
                      </AuthGaurd>
                    }
                  />
                  <Route
                    path='/onboarding_plans'
                    element={
                      <AuthGaurd>
                        <OnBoardingPlansView />
                      </AuthGaurd>
                    }
                  />
                  {/* <Route path='/loginsso' element={<LoginSSO />} /> */}
                  <Route path='/reflections' element={<Reflections />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/boarding' element={<Boarding />} />
                  <Route path='/tasks' element={<Tasks />} />
                  <Route path='/edit_profile' element={<EditProfile />} />
                  <Route path='/changepassword' element={<ChangePassword />} />
                  <Route path='/dashcard' element={<DashCard />} />
                  <Route path='/loader' element={<Loader />} />
                  <Route path='/cookies' element={<Cookies_Bar />} />
                  <Route path='/*' exact element={<NotFound />} />
                </Route>
              )}
              <Route path='/callbacksync' element={<CallbackSync />} />
              {/* 1 */}
              {user?.user_type === '1' && (
                <Route path='/' element={<DashLayout />}>
                  <Route path='/' element={<Dashboard />} />
                  {/* <Route path='/dashboard' element={<Dashboard />} /> */}
                  <Route path='/edit_profile' element={<EditProfile />} />
                  <Route path='/changepassword' element={<ChangePassword />} />
                  <Route path='/employeedashboard' element={<EmployeeDashboard />} />
                  <Route path='/administratorsdashboard' element={<AdministratorsDashboard />} />
                  <Route path='/onboardingdashboard' element={<OnboardingDashboard />} />
                  <Route path='/contact_info/:id' element={<Contact_info />} />
                  <Route path='/administator_info/:id' element={<Administrator_info />} />
                  <Route path='/onboardingplan_table/:id' element={<OnboardingPlanTable />} />
                  <Route path='/role' element={<Role />} />
                  <Route path='/organization' element={<Organization />} />
                  <Route path='/group' element={<Groups />} />
                  <Route path='/role_info/:id' element={<Role_info />} />
                  <Route path='/group_info/:id' element={<Group_info />} />
                  <Route path='/organization_info/:id' element={<Organization_info />} />
                  <Route path='/*' exact element={<NotFound />} />
                </Route>
              )}
              {/* <Route path='/*' exact element={<Spinner />} /> */}
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </GoogleID.Provider>
    </div>
  );
}

export default App;
