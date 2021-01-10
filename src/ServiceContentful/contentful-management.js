import { createClient } from 'contentful-management';
//TOKEN content management
const accessToken = 'CFPAT-wqDaDKUEru4cY5dZhTN1kAg2yg8VIbCbcDuoMgsNu6E';
const environment = 'master';
const space = 'agv5h5fnr06l';
const contentTypeEmployee = 'employee';
const contentTypeDisability = 'disability';
const client = createClient({ accessToken });

const createEmployee = ({ username, code, startDate, dui, position }) => {
  return new Promise((resolve, reject) => {
    client
      .getSpace(space)
      .then((space) => space.getEnvironment(environment))
      .then((environment) =>
        environment.createEntry(contentTypeEmployee, {
          fields: {
            username: { 'en-US': username },
            code: { 'en-US': code },
            startDate: { 'en-US': startDate || Date.now() },
            dui: { 'en-US': dui },
            position: { 'en-US': position },
          },
        })
      )
      .then((entry) => entry.publish())
      .then((entry) => resolve(`Entry ${entry.sys.id} published.`))
      .catch((error) => reject(new Error(error)));
  });
};

// const addEmployee = { username: 'String', code: 'cacscs', dui: '45123', position: 'Gerente' };
// createEmployee(addEmployee)
//   .then((result) => console.log('Agregado', result))
//   .catch((error) => console.log('Ocurrio error', error));

const createDisability = ({ code, dateAdmission, medicalUnit, doctor, initiate, end }) => {
  return new Promise((resolve, reject) => {
    client
      .getSpace(space)
      .then((space) => space.getEnvironment(environment))
      .then((environment) =>
        environment.createEntry(contentTypeDisability, {
          fields: {
            dateAdmission: { 'en-US': dateAdmission },
            medicalUnit: { 'en-US': medicalUnit },
            doctor: { 'en-US': doctor },
            initiate: { 'en-US': initiate },
            end: { 'en-US': end },
            code: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: code } } },
          },
        })
      )
      .then((entry) => entry.publish())
      .then((entry) => resolve(`Entry ${entry.sys.id} published.`))
      .catch((error) => reject(new Error(error)));
  });
};

// const addDisability = {
//   code: '7ursXNw3jcVRnXQoq8vOkO',
//   dateAdmission: Date.now(),
//   medicalUnit: 'Especialidad',
//   doctor: 'The Good Doctor',
//   initiate: Date.parse('Jan 1, 2021 23:15:30') || Date.now,
//   end: Date.parse('Jan 6, 2021 00:00:00'),
// };
// createDisability(addDisability)
//   .then((result) => console.log('Agregado', result))
//   .catch((error) => console.log('Ocurrio error', error));

const updateEmployee = ({ id, username, code, dui, position }) => {
  return new Promise((resolve, reject) => {
    client
      .getSpace(space)
      .then((space) => space.getEnvironment(environment))
      .then((environment) => environment.getEntry(id))
      .then((entry) => {
        entry.fields.username['en-US'] = username;
        entry.fields.code['en-US'] = code;
        entry.fields.dui['en-US'] = dui;
        entry.fields.position['en-US'] = position;
        return entry.update();
      })
      .then((entry) => entry.publish())
      .then((entry) => resolve(`Entry ${entry.sys.id} updated.`))
      .catch((error) => reject(new Error(error)));
  });
};

// const updateDataEmployee = {
//   id: '2RUko5vn1oL0A2GbrWcTeB',
//   username: 'Kernel',
//   code: 'SAJKCksjlsdewu',
//   dui: '999999-2',
//   position: 'Gerente GENERAL',
// };
// updateEmployee(updateDataEmployee);

const deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {
    client
      .getSpace(space)
      .then((space) => space.getEnvironment(environment))
      .then((environment) => environment.getEntry(id))
      .then((entry) => entry.unpublish())
      .then((entry) => entry.delete())
      .then((entry) => resolve(`Entry ${id} deleted.`))
      .catch((error) => reject(new Error(error)));
  });
};

const idDelete = '57TRj2yLPoE7UOyfTM5wXx';
deleteEmployee(idDelete)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

export { createEmployee };
