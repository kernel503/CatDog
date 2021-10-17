import { createClient } from 'contentful-management';
//TOKEN content management
const accessToken = 'CFPAT-wqDaDKUEru4cY5dZhTN1kAg2yg8VIbCbcDuoMgsNu6E';
const environment = 'master';
const space = 'agv5h5fnr06l';
const contentTypeEmployee = 'employee';
const contentTypeDisability = 'disability';
const client = createClient({ accessToken });

/**
 * Adds a employee.
 * @param {object} destructuring keys (username, code, startDate, dui, positon).
 * @return {Promise} The result of operation.
 */
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

/**
 * Adds a Disability.
 * @param {object} destructuring keys (code, dateAdmission, medicalUnit, doctor, initiate, end).
 * @return {Promise} The result of operation.
 */
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

/**
 * Update an entry using entry.sys.id.
 * @param {object} destructuring keys (id, username, code, dui, position).
 * @return {Promise} The result of operation.
 */

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

/**
 * Delete an entry using entry.sys.id.
 * @param {string} id keys ID to delete.
 * @return {Promise} The result of operation.
 */
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

export { createEmployee, createDisability, updateEmployee, deleteEmployee };
