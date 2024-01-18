import { routes, getRoute } from "../routes";

export const getUsers = async () => {
  try {
    const response = await fetch(getRoute(routes.user));
    const content = await response.json();
    return content;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (idUtilizator) => {
  try {
    const response = await fetch(
      getRoute(routes.user + `/edit/${idUtilizator}`)
    );
    const content = await response.json();
    return content;
  } catch (error) {
    throw error;
  }
};
export const userUnique = async (email) => {
  try {
    const response = await fetch(getRoute(routes.user + `/newUser/${email}`));
    const content = await response.json();
    return content;
  } catch (error) {
    throw error;
  }
};
export const loginDB = async (utilizator) => {
  try {
    const response = await fetch(getRoute(routes.user + `/login`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(utilizator),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (utilizator) => {
  await fetch(getRoute(routes.user + `/edit/${utilizator.idUtilizator}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utilizator),
  });
};
export const addNewUser = async (utilizator) => {
  await fetch(getRoute(routes.user + `/newUser`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utilizator),
  });
};
export const deleteUser = async (idUtilizator) => {
  await fetch(getRoute(routes.user), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idUtilizator }),
  });
};
// export const updateUser = async (idUtilizator: number, users: User[]) => {
//   const user = users.find((user) => {
//     user.idUtilizator === idUtilizator;
//   });
//   await fetch(getRoute(routes.user), {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
// };
