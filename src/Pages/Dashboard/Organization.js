import React, { useEffect, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { InActive } from '../../assets/icons/InActive';
import { Active } from '../../assets/icons/Active';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { CreateDivision, Get_Divison } from '../../assets/API/Apis';
import { axiosInstance } from '../../assets/API/axiosInstances';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { TiTick } from 'react-icons/ti';
import COUNTRYLIST from '../../Country_Nationality_List.json';

const initialData = {
  division_name: '',
  country: '',
  zone: '',
  createdAt: '',
};

const Organization = () => {
  const [show, setShow] = useState(false);
  const [allDivison, setAllDivision] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectTask, setSelectTask] = useState([]);
  const [search, setSearch] = useState();

  const [values, setValues] = useState({
    division_name: '',
    country: '',
    zone: '',
    createdAt: '',
  });
  const { division_name, country, zone } = values;
  const Navigate = useNavigate();

  const addIconHandler = () => {
    setValues({ ...initialData });
  };

  // fetching all Division data....
  const GetAllDivision = () => {
    setLoading(true);
    Get_Divison()
      .then((response) => {
        setAllDivision(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, 'error');
        setLoading(false);
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/organization_info/${id}/`, { state: { id: id } });
  };

  useEffect(() => {
    GetAllDivision();
  }, []);

  // // Divison Modal Api

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // // Division creation .....

  const handleModalClick = async (e) => {
    e.preventDefault();
    await CreateDivision(values).then(() => {
      toast.success('Organization created successfully');
      GetAllDivision();
    });
  };

  // Division handleDelete api call...

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/dashboard/structure/division/${id}/`);
      toast.success('Organization deleted successfully');
      // Navigate(`/organization`);
      // let delData = allGroup.filter((item) => {
      //   return item.id !== id;
      // });
      // await setAllGroup();
      GetAllDivision();
    } catch (error) {
      console.log('Something Want Wrong');
    }
  };

  const handleSelectedTask = (id) => {
    if (selectTask.indexOf(id) !== -1) {
      let tempArray = [...selectTask];
      tempArray.splice(selectTask?.indexOf(id), 1);
      setSelectTask(tempArray);
      return;
    }
    setSelectTask([...selectTask, id]);
    return;
  };

  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  const filtered = !search ? allDivison : allDivison.filter((person) => person?.division_name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className='row align-items-center justify-content-between m-3'>
        <div className='row align-items-center Search_Body m-0'>
          <div className='input-group flex-nowrap Search_Input '>
            <div className='input-group-prepend'>
              <span className='input-group-text SeachIcon' id='addon-wrapping'>
                <SearchIcon />
              </span>
            </div>
            <input type='text' className='form-control Input_type' placeholder='Search' aria-label='Search' aria-describedby='addon-wrapping' onChange={handlesearch} />
          </div>
        </div>
        <div className='d-flex align-items-center Default_Body'>
          <div
            className='Default_Icon'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            // onClick={() => {
            //   Navigate('/create_obb_plan');
            // }}
            onClick={addIconHandler}
            title='create'
          >
            <Additions_Icon />
          </div>
        </div>
      </div>
      {/* Addition Model Start*/}
      <div
        className='modal fade Groups_Modal'
        id='exampleModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
        data-backdrop='static'
        data-keyboard='false'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLongTitle'>
                Add Organization Information
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <table width='80%'>
                <tr>
                  <td>
                    <label className='poppins-regular'>Organization name*</label>
                    <input type='text' name='division_name' value={division_name} className='form-control' placeholder='Enter Organization Name' onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='poppins-regular'>Country</label>
                    <select className='form-control' value={country} name='country' onChange={handleChange}>
                      <option selected>Select Country</option>
                      {COUNTRYLIST.map((row, i) => (
                        <option>{row?.en_short_name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='poppins-regular'>Zone*</label>
                    <select className='form-control' value={zone} name='zone' onChange={handleChange}>
                      <option selected value='' disabled hidden>
                        Select zone
                      </option>
                      <option>north</option>
                      <option>west</option>
                      <option>east</option>
                      <option>south</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn Btn_Save' data-dismiss='modal' disabled={(division_name && zone) === ''} onClick={handleModalClick}>
                Save
              </button>
              <button type='button' className='btn Btn_Close' data-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Addition Model End*/}
      <div className='Employee_Table m-3'>
        <div className='Emptable-wrapper'>
          <table className='table table-bordered Action_Part'>
            <thead>
              <tr>
                <th>
                  {/* <label className='Rounded_CheckBox'>
                    <input type='checkbox' className='form-check-input' id='policyInput' name='policyCheckmark' />
                    <span className='checkmark'></span>
                  </label> */}
                  <label
                    className={`checkboxLabel ${selectTask?.length === allDivison?.length ? 'active' : ''}`}
                    onClick={() => {
                      setSelectTask(selectTask?.length !== allDivison?.length ? allDivison?.reduce((prev, next) => [...prev, next.id], []) : []);
                    }}
                  >
                    {selectTask?.length === allDivison?.length && <TiTick className='activeIcon' />}
                  </label>
                </th>
                <th className='poppins-semibold'>Organization</th>
                <th className='poppins-semibold'>Country </th>
                <th className='poppins-semibold'>Zone</th>
                <th className='poppins-semibold'>Date</th>
                <th className='poppins-semibold'>Action</th>
              </tr>
            </thead>
            {/* adding map function to the display all thye obb plans list */}
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              </tbody>
            ) : filtered?.length > 0 ? (
              filtered?.map((item, index) => (
                <tbody>
                  <tr>
                    <td>
                      {/* <label className='Rounded_CheckBox'>
                        <input type='checkbox' className='form-check-input' id='policyInput' name='policyCheckmark' />
                        <span className='checkmark'></span>
                      </label> */}
                      <label
                        className={`checkboxLabel ${selectTask.indexOf(item?.id) !== -1 ? 'active' : ''}`}
                        onClick={() => {
                          handleSelectedTask(item?.id);
                        }}
                      >
                        {selectTask.indexOf(item?.id) !== -1 && <TiTick className='activeIcon' />}
                      </label>
                    </td>
                    <td>
                      <div className='Emy_TableImg'>
                        <span className='name poppins-regular'>{item?.division_name}</span>
                      </div>
                    </td>
                    <td className='poppins-regular'>{item?.country}</td>
                    <td className='poppins-regular'>{item?.zone}</td>
                    <td className='poppins-regular'>{item?.createdAt}</td>
                    <td className='poppins-regular'>
                      {/* <span onClick={() => setShow(!show)}>{show ? <Active /> : <InActive />}</span> */}
                      <MdOutlineModeEditOutline className='mx-4' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, item.id)} />
                      <MdDeleteOutline style={{ fontSize: '23px', color: '#868689' }} onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan={8}>
                  <p className='text-center text-danger py-3' style={{ fontSize: '30px' }}>
                    No Records Found
                  </p>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>

      {/* pagination  */}
      {/* {allDivison?.data?.length > 0 ? (
        <div className='mr-3'>
          <nav aria-label='Page navigation example m-0'>
            <ul className='pagination justify-content-end'>
              <li className='page-item disabled'>
                <a className='page-link'>Previous</a>
              </li>
              <li className='page-item active'>
                <a className='page-link' href='#'>
                  1
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  2
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  3
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href='#'>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null} */}
    </div>
  );
};

export default Organization;
