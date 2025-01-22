import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());
app.use(express.json());

//Create random Id
const generateRandomId = () => {
  return `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) => {
  users["users_list"].find((user) => user["id"] === id);
};

// Get user by Id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  // Assign an ID if it doesn't exist
  if (!user.id) {
    user.id = generateRandomId();
  }
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  // Validate input
  if (!userToAdd.name || !userToAdd.job) {
    res.status(400).send("Bad Request: Missing required fields.");
    return;
  }

  const addedUser = addUser(userToAdd);
  
  res.status(201).send(addedUser); // Respond with 201 Created and the added user
});

const deleteUserById = (id) => {
  const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
  if (userIndex === undefined) return null; // Return null if user not found
  return userIndex;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const userIndex = deleteUserById(id);

  if (userIndex === null) {
    res.status(404).send("Resource not found.");
  } else {
    users["users_list"].splice(userIndex, 1); // Remove the user from the array
    res.status(204).send(); // 204 No Content (successful deletion)
  }
});

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let result = users["users_list"];

  if (name && job) {
    result = findUserByNameAndJob(name, job);
  } else if (name) {
    result = findUserByName(name);
  }

  res.send({ users_list: result });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
