import React, { useEffect, useState } from 'react';
import '../../assets/styles/DashboardCss/EmployeeDashboard.css';
import '../../assets/styles/DashboardCss/Modal.css';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { Additions_Icon } from '../../assets/icons/Additions_Icon';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { InActive } from '../../assets/icons/InActive';
import { Active } from '../../assets/icons/Active';
import { useNavigate } from 'react-router-dom';
import { CreateGroup, Get_Group } from '../../assets/API/Apis';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../assets/API/axiosInstances';
import Loader from '../../components/Loader';
import { TiTick } from 'react-icons/ti';
const initialData = {
  name: '',
  description: '',
};

const Groups = () => {
  const [show, setShow] = useState(false);
  const [allGroup, setAllGroup] = useState('');
  const [selectTask, setSelectTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();

  const [values, setValues] = useState({
    name: '',
    description: '',
  });

  const Navigate = useNavigate();

  const addIconHandler = () => {
    setValues({ ...initialData });
  };

  // fetching all group data....
  const GetAllGroup = () => {
    setLoading(true);
    Get_Group()
      .then((response) => {
        setAllGroup(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, 'error');
        setLoading(false);
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    Navigate(`/group_info/${id}/`, { state: { id: id } });
  };

  useEffect(() => {
    GetAllGroup();
  }, []);

  // Group Modal Api

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // groups creation .....

  const handleModalClick = async (e) => {
    e.preventDefault();
    await CreateGroup(values).then(() => {
      toast.success('Groups created  successfully');
      GetAllGroup();
    });
  };

  // Groups handleDelete api call...

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/dashboard/structure/group/${id}/`);
      toast.success('Groups deleted successfully');
      GetAllGroup();
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
  const filtered = !search ? allGroup : allGroup.filter((person) => person?.name?.toLowerCase().includes(search.toLowerCase()));
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
          <div className='Default_Icon' data-toggle='modal' title='create' data-target='#exampleModalCenter' onClick={addIconHandler}>
            <Additions_Icon />
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
                  Add Groups Information
                </h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <table width='80%'>
                  <tr>
                    <td>
                      <label className='poppins-regular'>Group name*</label>
                      <input type='text' name='name' value={values?.name} className='form-control' placeholder='Enter Group Name' onChange={handleChange} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='poppins-regular'>Description</label>
                      <textarea
                        type='text'
                        name='description'
                        value={values?.description}
                        rows='5'
                        className='form-control'
                        placeholder='Enter Description'
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn Btn_Save' data-dismiss='modal' disabled={values?.name === ''} onClick={handleModalClick}>
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
      </div>

      {/* Group Table START */}
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
                    className={`checkboxLabel ${selectTask?.length === allGroup?.length ? 'active' : ''}`}
                    onClick={() => {
                      setSelectTask(selectTask?.length !== allGroup?.length ? allGroup?.reduce((prev, next) => [...prev, next.id], []) : []);
                    }}
                  >
                    {selectTask?.length === allGroup?.length && <TiTick className='activeIcon' />}
                  </label>
                </th>
                <th className='poppins-semibold'>Group Name</th>
                <th className='poppins-semibold'>Description </th>
                <th className='poppins-semibold'>Date </th>
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
                        <span className='name poppins-regular'>{item.name}</span>
                      </div>
                    </td>
                    <td className='poppins-regular'>{item.description}</td>
                    <td className='poppins-regular'>{item.createdAt}</td>
                    <td className='poppins-regular'>
                      {/* <span onClick={() => setShow(!show)}>{show ? <Active /> : <InActive />}</span> */}
                      <MdOutlineModeEditOutline className='mx-3' style={{ fontSize: '23px', color: '#868689' }} onClick={(e) => handleClick(e, item.id)} />
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
      {/* Group Table END */}

      {/* pagination  */}
      {/* {allGroup?.data?.length > 0 ? (
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

export default Groups;
