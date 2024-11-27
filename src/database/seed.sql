-- Seed script for the ECMS database

-- Insert departments
INSERT INTO department (name) VALUES 
('Construction'),
('Engineering'),
('Design'),
('Administration'),
('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Site Manager', 80000, 1),
('Foreman', 60000, 1),
('Laborer', 40000, 1),
('Civil Engineer', 85000, 2),
('Structural Engineer', 90000, 2),
('Architect', 95000, 3),
('Draftsperson', 50000, 3),
('HR Manager', 70000, 4),
('Accountant', 65000, 4),
('Sales Executive', 75000, 5),
('Sales Associate', 50000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
-- Construction Team
('John', 'Doe', 1, NULL), -- Site Manager
('Alice', 'Smith', 2, 1), -- Foreman
('Bob', 'Johnson', 3, 2), -- Laborer
('Charlie', 'Brown', 3, 2), -- Laborer
('Daisy', 'White', 3, 2), -- Laborer

-- Engineering Team
('Eve', 'Black', 4, NULL), -- Civil Engineer
('Frank', 'Green', 5, 6), -- Structural Engineer
('Grace', 'Blue', 4, 6), -- Civil Engineer

-- Design Team
('Henry', 'Yellow', 6, NULL), -- Architect
('Ivy', 'Purple', 7, 10), -- Draftsperson
('Jack', 'Orange', 7, 10), -- Draftsperson

-- Administration Team
('Kathy', 'Red', 8, NULL), -- HR Manager
('Liam', 'Gray', 9, 13), -- Accountant

-- Sales Team
('Mona', 'Cyan', 10, NULL), -- Sales Executive
('Nina', 'Magenta', 11, 15), -- Sales Associate
('Oscar', 'Teal', 11, 15), -- Sales Associate
('Paul', 'Pink', 11, 15), -- Sales Associate
('Quinn', 'Silver', 11, 15), -- Sales Associate