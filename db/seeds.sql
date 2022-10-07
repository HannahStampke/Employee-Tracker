INSERT INTO department (name)
VALUES 
('Executive'),
('Finance'),
('Marketing'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 210000, 1),
('Executive Assistant', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Marketing Lead', 100000, 3),
('Content Writer', 80000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Marky', 'Mark', 5, null),
('Mike', 'Wasowski', 6, 1),
('Dolly', 'Parton', 1, null),
('Patrick', 'Swayze', 2, 3),
('Oprah', 'Winfrey', 3, null),
('Elsa', 'Fromfrozen', 4, 5),
('Angus', 'Thongsandperfectsnogging', 7, null),
('Rick', 'Astley', 8, 7);