import axios from 'axios';
import { API_BASE_URLS } from '../Helper/constant';
import { axiosInstance, axiosInstanceforPic } from './axiosInstances';
// import { axiosInstance, axiosInstance } from './axiosInstances';

// Question API

export const postCompetenceQue = (props) => {
  return axiosInstance
    .post('/accounts/user/competence_result', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // throw new Error('HELLO', { message: 'hello' })
      throw new Error(error?.response?.data?.messages[0]?.message || error?.response?.data?.detail);
    });
};

export const getCompetenceQue = () => {
  return axios
    .get(`${API_BASE_URLS.baseUrl}/backend/competence_question_details`)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Profile API

export const GetProfile = (props) => {
  return axiosInstance
    .get(`/accounts/user/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const Edit_Profile = (props) => {
  return axiosInstance
    .patch('/accounts/user/edit', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getLevelsAndTask = (id) => {
  return axios
    .get(`${API_BASE_URLS.baseUrl}/backend/get_level_task/${id}`)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_All_Employee_Details = (props) => {
  return axiosInstance
    .get(`/accounts/get_employee_details`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//  Get all Tasks Api
export const get_All_Task = (props) => {
  return axiosInstance
    .get(`/accounts/task/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Get one task api
export const get_One_Task = (props) => {
  return axiosInstance
    .get(`/accounts/task/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Send feedback
export const send_feedback = (id, status) => {
  return axiosInstance
    .post(`/accounts/feedback_onbplan/${id}/`, status)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Update Task details
export const Update_Task_Details = ({ id, ...props }) => {
  return axiosInstance
    .patch(`/accounts/task/${id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//  Store my plan
export const StoreMyPlan = (props) => {
  return axiosInstance
    .post('/accounts/task/', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // throw new Error('HELLO', { message: 'hello' });
      throw new Error(error?.response?.data?.messages[0]?.message || error?.response?.data?.detail);
    });
};

// SaveLeval Api
export const SaveLevel = (id, props) => {
  return axiosInstance
    .patch(`/accounts/save_level/${id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.messages[0]?.message || error?.response?.data?.detail);
    });
};

// Change Password Api
export const Change_Password = (props) => {
  return axiosInstance
    .patch('/accounts/user/change_password', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.message);
    });
};

// Domain Validation
export const Domain_Validation = (props) => {
  return axiosInstance
    .get('/accounts/validate_domain', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

//Upload Profile Pic
export const Upload_Profile_Pic = (props) => {
  return axiosInstanceforPic
    .patch('/dashboard/upload_profile_pic', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.message);
    });
};

//Upload Emp_Profile Pic
export const Upload_Emp_Profile_Pic = (id, props) => {
  return axiosInstanceforPic
    .patch(`/dashboard/structure/emp_upload_profile_pic/${id}`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.message);
    });
};

// TO GET ALL THE EMPLOYEE LIST.....
export const Get_All_Emp = () => {
  return axiosInstance
    .get(`/dashboard/structure/employee/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

export const Get_Emp_data = () => {
  return axiosInstance
    .get(`/dashboard/get_employees`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of Employee using id..
export const Get_Employee_By_Id = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/employee/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to create the Employee ..
export const Create_employee = (data) => {
  return axiosInstance
    .post('/dashboard/structure/employee/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error?.response?.data;
    });
};

// to update the existing Employee data...
export const Update_Employee_Data = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/employee/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error?.response?.data;
      // throw new Error(error);
    });
};

// TO FETCH ALL THE HIRING MANAGER LIST...
export const Get_All_HiringM = () => {
  return axiosInstance
    .get(`/dashboard/get_hiring_managers`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch all the onboarding plans ..
export const Get_plans = () => {
  return axiosInstance
    .get(`/dashboard/plan/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of onboarding plans using id..
export const Get_plans_By_Id = (props) => {
  return axiosInstance
    .get(`/dashboard/plan/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to create the onboarding plans..
export const createPlans = (data) => {
  return axiosInstance
    .post('/dashboard/plan/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to update the existing obb plan data...
export const Update_Emp_Data = (props) => {
  return axiosInstance
    .patch(`/dashboard/plan/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to fetch all the Group ..
export const Get_Group = () => {
  return axiosInstance
    .get(`/dashboard/structure/group/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of Groups using id..
export const Get_Group_By_Id = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/group/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to update the existing Group data...
export const Update_Group_Data = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/group/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to create the Group plans..
export const CreateGroup = (data) => {
  return axiosInstance
    .post('/dashboard/structure/group/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to fetch all the Divison ..
export const Get_Divison = () => {
  return axiosInstance
    .get(`/dashboard/structure/division/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of Division using id..
export const Get_Divison_By_Id = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/division/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to update the existing Divison data...
export const Update_Division_Data = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/division/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to create the Divison ..
export const CreateDivision = (data) => {
  return axiosInstance
    .post('/dashboard/structure/division/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Assign group

// export const Assign_Group = (props) => {
//   return axiosInstance
//     .patch(`/dashboard/structure/assign_group/`, props)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

//Assign Division
// export const Assign_division = (props) => {
//   return axiosInstance
//     .patch(`/dashboard/structure/division/assign_division/`, props)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

//Assign Division
export const Assign_division_group_role = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/employee/assign/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// due Date sorting

export const DateSorting = (payload) => {
  return axiosInstance
    .post(`/accounts/task/duedate_sorting/`, payload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//createdAt Date sorting

export const CreatedAtDateSorting = (payload) => {
  return axiosInstance
    .post(`/dashboard/structure/UsercreatedAtSortingAPI`, payload)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getCornerStones = () => {
  return axios
    .get(`${API_BASE_URLS.baseUrl}/backend/get_cornerstone`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to fetch all the Role ..
export const Get_Role = () => {
  return axiosInstance
    .get(`/dashboard/structure/role/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of Role using id..
export const Get_Role_By_Id = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/role/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to create the createRole..
export const createRole = (data) => {
  return axiosInstance
    .post('/dashboard/structure/role/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to update the existing role data...
export const updateRole = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/role/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// search employee by name...
export const getEmployeeByName = (search) => {
  return axiosInstance
    .get(`/dashboard/structure/employee/`, { params: { employee_name: `${search}` } })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// search employee by onboarding plans...
export const getEmployeeByPlans = (search) => {
  return axiosInstance
    .get(`/dashboard/plan/`, { params: { hiring_manager: `${search}` } })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to create the Adminstrator..
export const createAdmintrator = (data) => {
  return axiosInstance
    .post('/dashboard/structure/administrator/', data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// to fetch all the Adminstrator (HM) ..
export const getAllAdminstrator = () => {
  return axiosInstance
    .get(`/dashboard/structure/administrator/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to fetch data of Ademinstrator using id..
export const getAdminstorById = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/administrator/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to update the existing Adminstrator data...
export const updateAdminstrator = (props) => {
  return axiosInstance
    .patch(`/dashboard/structure/administrator/${props.id}/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const Get_Csvfile = () => {
  return axiosInstance
    .get(`/dashboard/structure/export`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

export const Send_Mail = (props) => {
  return axiosInstance
    .get(`/dashboard/structure/User_SednMailAPI/${props.id}/`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

// to change status of task
export const Change_task_status = (id, props) => {
  return axiosInstance
    .put(`/dashboard/plan/${id}/hm_update_status/`, props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
};

export const deleteEmployeeData = (props) => {
  return axiosInstance
    .post('/dashboard/structure/UserDeleteAPIView', props)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error?.response?.data?.messages[0]?.message || error?.response?.data?.detail);
    });
};
