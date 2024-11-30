import inquirer from "inquirer";
import { connection } from "../database/db.js";
// add chalk to the menus for some color 

export const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Welcome to EMS! What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update an Employee Manager',
                'Delete a Department, Role, or Employee',
                'Exit Application'
            ]
        }
    ]);

    switch (choice) {
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'View Employees by Manager':
            await viewEmployeesByManager();
            break;
        case 'View Employees by Department':
            await viewEmployeesByDepartment();
            break;
        case 'Add a Department':
            await addDepartment();
            break;
        case 'Add a Role':
            await addRole();
            break;
        case 'Add an Employee':
            await addEmployee();
            break;
        case 'Update an Employee Role':
            await updateEmployeeRole();
            break;
        case 'Update an Employee Manager':
            await updateEmployeeManager();
            break;
        case 'Delete a Department, Role, or Employee':
            await deleteSubmenu();
            break;
        case 'Exit Application':
            console.log('Thank you for choosing EMS. Goodbye!');
            process.exit();
    }

    await mainMenu();
}

const viewDepartments = async () => {
    const departments = await connection.query('SELECT * FROM department');
    console.table(departments.rows);
};
const viewRoles = async () => {
    const roles = await connection.query('SELECT * FROM role');
    console.table(roles.rows);
};
const viewEmployees = async () => {
    const employees = await connection.query('SELECT * FROM employee');
    console.table(employees.rows);
};
const viewEmployeesByManager = async () => {
    const employees = await connection.query('SELECT * FROM employee WHERE manager_id IS NOT NULL');
    console.table(employees.rows);
};
const viewEmployeesByDepartment = async () => {
    const employees = await connection.query('SELECT * FROM employee WHERE department_id IS NOT NULL');
    console.table(employees.rows);
};
const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    await connection.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log('Department added successfully.');
};
const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter the salary for this role:'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Enter the department ID for this role:'
        }
    ]);

    await connection.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added successfully.');
};
const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the role ID for this employee:'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter the manager ID for this employee:'
        }
    ]);

    await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    console.log('Employee added successfully.');
};
const updateEmployeeRole = async () => {
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to update:'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'Enter the new role ID for this employee:'
        }
    ]);

    await connection.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated successfully.');
};
const updateEmployeeManager = async () => {
    const { employee_id, manager_id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'employee_id',
            message: 'Enter the ID of the employee you want to update:'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Enter the new manager ID for this employee:'
        }
    ]);

    await connection.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
    console.log('Employee manager updated successfully.');
};

const deleteSubmenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to delete?',
            choices: [
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee'
            ]
        }
    ]);

    switch (choice) {
        case 'Delete a Department':
            await deleteDepartment();
            break;
        case 'Delete a Role':
            await deleteRole();
            break;
        case 'Delete an Employee':
            await deleteEmployee();
            break;
    }
};

const deleteDepartment = async () => {
    const { id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter the ID of the department you want to delete:'
        }
    ]);

    await connection.query('DELETE FROM department WHERE id = $1', [id]);
    console.log('Department deleted successfully.');
};
const deleteRole = async () => {
    const { id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter the ID of the role you want to delete:'
        }
    ]);

    await connection.query('DELETE FROM role WHERE id = $1', [id]);
    console.log('Role deleted successfully.');
};
const deleteEmployee = async () => {
    const { id } = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter the ID of the employee you want to delete:'
        }
    ]);

    await connection.query('DELETE FROM employee WHERE id = $1', [id]);
    console.log('Employee deleted successfully.');
};