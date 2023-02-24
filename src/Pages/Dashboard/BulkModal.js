import axios from 'axios';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URLS } from '../../assets/Helper/constant';
import { IsAuthenticated } from '../../assets/Helper/utils';
// import csv from '../../assets/csv/obb.csv';
// import { exportFile } from './csv';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader';
const company = window.location.hostname?.split('.')?.[0];
const Auth = IsAuthenticated()?.user?.access;

// const FILE_PATH = require('../../assets/csv/obb.csv');

const BulkModal = ({ handleClose }) => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [override, setOverride] = useState(false);
  const [verify, setVerify] = useState(false);

  const dragbox = useRef(null);

  const exportColumnHeader = {
    MmsCampaignID: 'MmsCampaignID',
    Status: 'Status',
    Name: 'Name',
    UpdateDate: 'UpdateDate',
  };

  const handleClick = async () => {
    // setLoading(true);
    const formData = new FormData();

    formData.append('csv_file', file);
    formData.append('update', update.toString());
    formData.append('override', override.toString());
    formData.append('verify', verify.toString());

    await axios({
      method: 'post',
      url: API_BASE_URLS.baseUrl_V1 + '/dashboard/structure/UserCsvImportAPI',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        company: company || '',
        Authorization: Auth ? `Bearer ${Auth}` : '',
      },
    })
      .then(function (response) {
        toast.success('CSV import and saved successfully!');
        handleClose();
        setLoading(false);

        return response.data;
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      });
  };

  // const handleCsv = () => {
  //   exportFile({
  //     data: [{ MmsCampaignID: '', Status: '', Name: '', UpdateDate: '' }],
  //     fileName: 'mmsReport',
  //     exportType: 'csv',
  //     fields: exportColumnHeader,
  //   });
  // };

  return loading ? (
    <tbody>
      <tr>
        <td colSpan={8}>
          <Loader />
        </td>
      </tr>
    </tbody>
  ) : (
    <div>
      <span>
        Use the form below to import or update one or more users. Simply {/* onClick={handleCsv} */}
        <a href='https://butler-media.fra1.digitaloceanspaces.com/obb.csv' className='poppins-semibold'>
          download the tamplate file
        </a>{' '}
        and then add your user data. You can also get an example of what the import file should look like from here.
      </span>
      <br />
      <br />
      <span className='poppins-bold'>You will be notified by email when the bulk user import process is complete.</span>
      <div className='d-flex align-items-center'>
        <input type='checkbox' className='mx-2' onClick={() => setUpdate(!update)} checked={update} />
        <span>Update existing users (group membership will be updated for existing users)</span>
      </div>
      <div className='d-flex align-items-center'>
        <input type='checkbox' className='mx-2' onClick={() => setOverride(!override)} checked={override} />
        <span>Override mandatory checks (excluding username, first name , surname)</span>
      </div>
      <div className='d-flex align-items-center'>
        <input type='checkbox' className='mx-2' onClick={() => setVerify(!verify)} checked={verify} />
        <span>Varify import file only</span>
      </div>
      <br />
      <div style={{ background: '#d1cdcd' }}>
        <div
          style={{ width: '100%', height: '275px', background: 'transparent', border: '1px solid grey', position: 'relative' }}
          className='d-flex align-items-center justify-content-center'
          id='dragbox'
          ref={dragbox}
        >
          <div>
            <h5 className='my-2 poppins-semibold'>{file ? file.name : 'Drag and drop file here'}</h5>
            <label htmlFor='upload-profile'>
              <div className=''>
                <a style={{ cursor: 'pointer' }} className='btn btn-secondary btn-md my-2 mr-3 poppins-semibold'>
                  Browse...
                </a>
              </div>
            </label>

            <input
              type='file'
              name='csv_file'
              id='upload-profile'
              accept='file/*'
              style={{ opacity: 0, height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
              onChange={(e) => setFile(e.target.files[0])}
              onDragEnterCapture={() => (dragbox.current.style.background = '#959595')}
              onDropCapture={() => (dragbox.current.style.background = 'transparent')}
              onDragLeaveCapture={() => (dragbox.current.style.background = 'transparent')}
            />
            <button className='btn poppins-semibold' style={{ border: '1px solid grey' }} onClick={handleClick}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkModal;
