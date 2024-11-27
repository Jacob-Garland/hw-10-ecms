import inquirer from "inquirer";
import { connection } from "../database/db.js";
// add chalk to the menus for some color
// add bonus functions to the main menu in seperate submenu 

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
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
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