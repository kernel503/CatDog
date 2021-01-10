import { createClient } from 'contentful';
//TOKEN content delivery api
const accessToken = 'TWRBagj1wP3F04UGLRoB_WlE-J18Nc5izp2qpcZyWJw';
const environment = 'master';
const space = 'agv5h5fnr06l';
const contentTypeEmployee = 'employee';
const contentTypeDisability = 'disability';
const client = createClient({ accessToken, environment, space });

const fetchData = (contentType) => {
  return new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: contentType,
      })
      .then((response) => resolve(response.items))
      .catch((error) => reject(new Error(error)));
  });
};

const getAllEmployee = fetchData(contentTypeEmployee);
const getAllDisability = fetchData(contentTypeDisability);

getAllEmployee
  .then((result) => {
    const employeeList = result.reduce((accumulator, currentValue) => {
      const {
        sys: { id },
        fields: { username, code, startDate, dui, position },
      } = currentValue;
      return [...accumulator, { id, username, code, startDate, dui, position: position || '' }];
    }, []);
    console.log(employeeList);
  })
  .catch((error) => console.log(error));

// getAllDisability
//   .then((result) => {
//     const disabilityList = result.reduce((accumulator, currentValue) => {
//       const {
//         sys: { id },
//         fields: {
//           code: { fields: employee },
//         },
//         fields: { dateAdmission, medicalUnit, doctor, initiate, end },
//       } = currentValue;
//       return [...accumulator, { id, dateAdmission, medicalUnit, doctor, initiate, end, employee }];
//     }, []);
//     console.log(disabilityList);
//   })
//   .catch((error) => console.log(error));
