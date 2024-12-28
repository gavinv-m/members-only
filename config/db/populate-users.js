import db from './queries.js';

export const populateUsers = async () => {
  let success = true;

  console.log('Populating users...');
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john_doe',
      password: 'password123',
      isMember: true,
      isAdmin: false,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'jane_smith',
      password: 'securepass456',
      isMember: false,
      isAdmin: false,
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alice_john',
      password: 'mypassword789',
      isMember: true,
      isAdmin: true,
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      username: 'bobbybrown',
      password: 'brownie1234',
      isMember: false,
      isAdmin: false,
    },
  ];

  for (const user of users) {
    try {
      await db.addUser(user);
      console.log(`Added user: ${user.username}`);
    } catch (error) {
      success = false;
      console.error(`Error adding user ${user.username}:`, error);
    }
  }

  return success;
};
