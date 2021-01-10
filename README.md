* Crear un nuevo empleado
```jsconst addEmployee = { username: 'DR. Dre', code: 'OJKCSA-15', dui: '55555-12', position: 'Gerente' };
CatDog.createEmployee(addEmployee)
  .then((result) => console.log('Agregado', result))
  .catch((error) => console.log('Ocurrio error', error));
```