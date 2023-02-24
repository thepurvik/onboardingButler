import { formatDate } from './utils';
import p1sm from '../images/p1-sm.png';
import p2sm from '../images/p2-sm.png';
import p3sm from '../images/p3-sm.png';
import p4sm from '../images/p4-sm.png';
import p5sm from '../images/p5-sm.png';
import p6sm from '../images/p6-sm.png';
import p1lg from '../images/p1-lg.png';
import p2lg from '../images/p2-lg.png';
import p3lg from '../images/p3-lg.png';
import p4lg from '../images/p4-lg.png';
import p5lg from '../images/p5-lg.png';
import p6lg from '../images/p6-lg.png';

export const lgImages = {
  p1sm: p1lg,
  p2sm: p2lg,
  p3sm: p3lg,
  p4sm: p4lg,
  p5sm: p5lg,
  p6sm: p6lg,
};
export const smImages = {
  p1sm: p1sm,
  p2sm: p2sm,
  p3sm: p3sm,
  p4sm: p4sm,
  p5sm: p5sm,
  p6sm: p6sm,
};

export const PERSONAL_DATA = [
  {
    pesonalDetails: {
      fullName: 'Shanna Richards',
      gender: 'female',
      dob: formatDate('2022-04-06'),
      email: 'shannarichards@quonata.com',
      phone: '+1 (829) 482-2308',
      nationality: 'Luxembourg',
      image: 'p1sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
  {
    pesonalDetails: {
      fullName: 'Madeleine Byers',
      gender: 'female',
      dob: formatDate('2018-10-12'),
      email: 'madeleinebyers@quonata.com',
      phone: '+1 (939) 421-3702',
      nationality: 'Vanuatu',
      image: 'p2sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
  {
    pesonalDetails: {
      fullName: 'John Buyers',
      gender: 'Male',
      dob: formatDate('2019-06-20'),
      email: 'katiekelley@quonata.com',
      phone: '+1 (890) 520-2693',
      nationality: 'Tokelau',
      image: 'p3sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
  {
    pesonalDetails: {
      fullName: 'Tabatha Tillman',
      gender: 'female',
      dob: formatDate('2017-03-01'),
      email: 'tabathatillman@quonata.com',
      phone: '+1 (972) 574-2116',
      nationality: 'Palau',
      image: 'p4sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
  {
    pesonalDetails: {
      fullName: 'Beverley Espinoza',
      gender: 'female',
      dob: formatDate('2019-03-02'),
      email: 'beverleyespinoza@quonata.com',
      phone: '+1 (936) 418-2433',
      nationality: 'Ecuador',
      image: 'p5sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
  {
    pesonalDetails: {
      fullName: 'Fanny Burns',
      gender: 'female',
      dob: formatDate('2021-01-02'),
      email: 'fannyburns@quonata.com',
      phone: '+1 (813) 509-3769',
      nationality: 'Mali',
      image: 'p6sm',
    },
    jobDetails: {
      jobId: 'TBS45779',
      jobTitle: 'Finance Manager',
      firstWorkDay: '-',
      onboardStartDate: formatDate('12 Nov 2019'),
      onboardEndDate: formatDate('12 Nov 2019'),
      onboardBuddy: 'Female',
      manager: 'Faustino Gottlieb',
      employmentType: 'Full-time',
      department: 'Finance',
      resume: 'upload',
    },
  },
];

export const PERSONAL_DATA2 = [
  {
    jobid: 'obb5',
    jobtitle: 'Finance Manager',
    first_workingday: '2022-05-20',
    onboarding_startdate: '2022-04-30',
    onboarding_enddate: '2022-09-30',
    manager: 'Laura Olsen',
    onboardingbuddy: '-',
    employement_type: 'Seasonal',
    department: 'Finance',
    resume: null,
    employee: {
      email: 'aoi_nakanishi@grovehr.com',
      profile_pic: '/https%3A/www.techcronus.com/staging/onboarding/katie_kelley.png',
      full_name: 'Aoi Nakanishi',
      gender: 'male',
      dob: null,
      mobile: '4540553586',
      nationality: 'denish',
    },
    connection: null,
    clarification: null,
    culture: null,
    compliance: null,
    is_active: true,
  },
];

export const ONBOARDING_DATA = {
  jobId: 'TBS45779',
  jobTitle: 'Finance Manager',
  firstWorkDay: '-',
  onboardStartDate: formatDate('12 Nov 2019'),
  onboardEndDate: formatDate('12 Nov 2019'),
  onboardBuddy: 'Female',
  manager: 'Faustino Gottlieb',
  employmentType: 'Full-time',
  department: 'Finance',
  resume: 'upload',
};

export const COMPETENCE_QNA_DATA = {
  questions: [
    {
      id: '1',
      quentions_text: 'Question 1',
    },
    {
      id: '2',
      quentions_text: 'Question 2',
    },
    {
      id: '3',
      quentions_text: 'Question 3',
    },
    {
      id: '4',
      quentions_text: 'Question 4',
    },
    {
      id: '5',
      quentions_text: 'Question 5',
    },
  ],
  options: [
    {
      id: '11',
      option_text: 'Option 1',
    },
    {
      id: '12',
      option_text: 'Option 2',
    },
    {
      id: '13',
      option_text: 'Option 3',
    },
    {
      id: '14',
      option_text: 'Option 4',
    },
    {
      id: '15',
      option_text: 'Option 5',
    },
  ],
};
