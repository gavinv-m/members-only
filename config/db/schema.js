export const createUsersTable = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);
`;

export const createMessagesTable = `
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

export const insertUsers = `
INSERT INTO users (first_name, last_name, username, password, is_member, is_admin)
VALUES
('John', 'Doe', 'john_doe', 'password123', TRUE, FALSE), 
('Jane', 'Smith', 'jane_smith', 'securepass456', FALSE, FALSE),
('Alice', 'Johnson', 'alice_john', 'mypassword789', FALSE, TRUE),
('Bob', 'Brown', 'bobbybrown', 'brownie1234', FALSE, FALSE);
`;

export const insertMessages = `
INSERT INTO messages (title, content, user_id)
VALUES
('Welcome', 'Hello, this is my first message!', 1),
('Greetings', 'Excited to join this platform!', 2),
('Admin Announcement', 'We are improving our features.', 3),
('Feedback', 'Great platform, keep up the good work!', 4);
`;

export const createRoles = `
CREATE TABLE role_passwords (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
