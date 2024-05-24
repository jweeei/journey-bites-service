import db from '@/db';

const findUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      profile: true,
      oAuthProvider: true,
      billing: true,
    },
  });

  return user;
};

const findUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    include: {
      profile: true,
      oAuthProvider: true,
      billing: true,
    },
  });

  return user;
};

const createUser = async (email: string, hashedPassword: string) => {
  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw new Error('Error while creating a new user');
  }
};

const updateUserPassword = async (id: string, hashedPassword: string) => {
  try {
    await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error('Error while updating user password');
  }
};

export default {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserPassword,
};
