import React from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
import { Download_Icon } from '../../assets/icons/Download_Icon';

const ExcelExportHelper = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', url);
      downloadAnchorNode.setAttribute('download', 'obb_export.xlsx');
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Download successfully');
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: 'application/octet-stream',
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: 'Employee Details' }];

    let table1 = [
      {
        A: 'Employee Name',
        B: 'Email',
        C: 'Phone',
        D: 'Created',
        E: 'Active/InActive',
        F: 'First name',
        G: 'Locations',
        H: 'Role',
        I: 'Preferred language',
        J: 'Time zone',
        K: 'Group',
        L: 'Approver',
        M: 'Cost center',
        N: 'Division',
        O: 'Grade',
        P: 'Position/role ',
        S: 'Login mode',
        T: 'Account state',
        U: 'Is Hiring manager',
        V: '',
      },
    ];

    data.forEach((row) => {
      const studentDetails = row;

      table1.push({
        A: studentDetails.full_name,
        B: studentDetails.email,
        C: studentDetails.mobile,
        D: studentDetails.createdAt,
        E: studentDetails.is_active,
        F: studentDetails.first_name,
        G: studentDetails.country,
        H: studentDetails.role,
        I: studentDetails.language,
        J: studentDetails.timezone,
        K: studentDetails.group.name,
        L: '',
        M: '',
        N: studentDetails.division,
        O: '',
        P: studentDetails.position,
        S: '',
        T: '',
        U: studentDetails.user_type == '2' ? 'Yes' : 'No',
        V: '',
      });
    });

    table1 = [{ A: 'Student Details' }].concat(table1);

    const finalData = [...title, ...table1];

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, 'student_report');

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) => (data['A'] === 'Employee Name' ? headerIndexes.push(index) : null));

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: 'A2',
      titleRange: 'A1:H2',
      tbodyRange: `A3:H${finalData.length}`,
      theadRange: headerIndexes?.length >= 1 ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}` : null,
      tFirstColumnRange: headerIndexes?.length >= 1 ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}` : null,
      tLastColumnRange: headerIndexes?.length >= 1 ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}` : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: 'Arial',
          verticalAlignment: 'center',
        });

        sheet.column('A').width(15);
        sheet.column('B').width(15);
        sheet.column('C').width(15);
        sheet.column('E').width(15);
        sheet.column('G').width(15);
        sheet.column('L').width(15);
        sheet.column('M').width(15);
        sheet.column('k').width(15);
        sheet.column('S').width(15);

        // const cell = workbook.sheet(0).cell('B3');
        // const cell1 = workbook.sheet(0).cell('D3');
        const cell2 = workbook.sheet(0).cell('L3');
        const cell3 = workbook.sheet(0).cell('M3');
        const cell4 = workbook.sheet(0).cell('K3');
        const cell5 = workbook.sheet(0).cell('S3');

        sheet.range('A3:U3').style({
          fill: '00b649',
          bold: true,
          horizontalAlignment: 'center',
        });

        // cell.style('fill', { type: 'PatternFill', color: 'cc3e2f' });
        // cell1.style('fill', { type: 'PatternFill', color: 'cc3e2f' });
        cell2.style('fill', { type: 'PatternFill', color: 'cc3e2f' });
        cell3.style('fill', { type: 'PatternFill', color: 'cc3e2f' });
        cell4.style('fill', { type: 'PatternFill', color: 'cc3e2f' });
        cell5.style('fill', { type: 'PatternFill', color: 'cc3e2f' });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: 'center',
          verticalAlignment: 'center',
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: 'center',
          });
        }

        // sheet.range(dataInfo.theadRange).style({
        //   fill: 'FFFD04',
        //   bold: true,
        //   horizontalAlignment: 'center',
        // });

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }
      });

      return workbook.outputAsync().then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <span
      onClick={() => {
        createDownLoadData();
      }}
      className='float-left'
    >
      {/* <Download_Icon /> */}
      <AiOutlineExport className='aioutline' />
    </span>
  );
};

export default ExcelExportHelper;
