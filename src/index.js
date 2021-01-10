import CatDog from './ServiceContentful/CatDog';

// Get Employee List
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
