# Examples

## Create a new employee
```js
const addEmployee = { username: 'DR. Dre', code: 'OJKCSA-15', dui: '55555-12', position: 'Gerente' };
CatDog.createEmployee(addEmployee)
  .then((result) => console.log('Agregado', result))
  .catch((error) => console.log('Ocurrio error', error));
```

## Register disability
```js
const addDisability = {
  code: '5JDXYLWEGzPvp3XPYh9KHz',
  dateAdmission: Date.now(),
  medicalUnit: 'Especialidad',
  doctor: 'The Good Doctor',
  initiate: Date.parse('Jan 1, 2021 23:15:30') || Date.now,
  end: Date.parse('Jan 6, 2021 00:00:00'),
};
CatDog.createDisability(addDisability)
  .then((result) => console.log('Agregado', result))
  .catch((error) => console.log('Ocurrio error', error));
```

## Update employee
```js
const updateDataEmployee = {
  id: '2RUko5vn1oL0A2GbrWcTeB',
  username: 'Kernel',
  code: 'SAJKCksjlsdewu',
  dui: '999999-2',
  position: 'Gerente GENERAL',
};
CatDog.updateEmployee(updateDataEmployee);
```

## Delete employee
```js
const idDelete = '57TRj2yLPoE7UOyfTM5wXx';
CatDog.deleteEmployee(idDelete)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

## Get Employee List
```js
CatDog.getAllEmployee
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
```

## Get List of Disabilities
```js
CatDog.getAllDisability
  .then((result) => {
    const disabilityList = result.reduce((accumulator, currentValue) => {
      const {
        sys: { id },
        fields: {
          code: { fields: employee },
        },
        fields: { dateAdmission, medicalUnit, doctor, initiate, end },
      } = currentValue;
      return [...accumulator, { id, dateAdmission, medicalUnit, doctor, initiate, end, employee }];
    }, []);
    console.log(disabilityList);
  })
  .catch((error) => console.log(error));
```
