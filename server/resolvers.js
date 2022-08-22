import Todo from "./models/Todo.js";
import User from "./models/User.js";

const resolvers = {
    Query: {
        welcome: () => {
            return "Welcome to ToDoApp by MihaiDavidMarin";
        },
        // model: ToDo
        getTodos: async () => {
            const todos = await Todo.find();
            return todos;
        },
        getTodo: async (root, args) => {
            return await Todo.findById(args.id);
        },
        countTitle: async (root, args) => {
            return await Todo.count({ title: args.title });
        },
        distinctTitle: async () => {
            return await Todo.distinct("title");
        },
        // model: User
        getUsers: async () => {
            const users = await User.find();
            return users;
        },
        getUser: async (root, args) => {
            return await User.findById(args.id);
        },
        getUsersTotalTime: async () => {
            return await Todo.aggregate([
                { $match: {} },
                { $group: { _id: "$user", total: { $sum: "$time" } } },
                { $sort: { total: -1 } },
            ]);
        },
    },
    Mutation: {
        // model: ToDo
        addTodo: async (root, args) => {
            const newTodo = new Todo({
                title: args.title,
                detail: args.detail,
                date: args.date,
                user: args.user,
                time: args.time,
            });
            await newTodo.save();
            return newTodo;
        },
        deleteTodo: async (root, args) => {
            await Todo.findByIdAndDelete(args.id);
            return "The todo is deleted";
        },
        updateTodo: async (root, args) => {
            const { id, title, detail, date, user, time } = args;
            const updatedTodo = {};
            if (title !== undefined) {
                updatedTodo.title = title;
            }
            if (detail !== undefined) {
                updatedTodo.detail = detail;
            }
            if (date !== undefined) {
                updatedTodo.date = date;
            }
            if (user !== undefined) {
                updatedTodo.user = user;
            }
            if (time !== undefined) {
                updatedTodo.time = time;
            }
            const todo = await Todo.findByIdAndUpdate(
                id,
                { title, detail, date, user, time },
                { new: true }
            );
            return todo;
        },
        // model: User
        addUser: async (root, args) => {
            const newUser = new User({
                firstName: args.firstName,
                lastName: args.lastName,
                address: {
                    street: args.addressStreet,
                    city: args.addressCity,
                    postalCode: args.addressPostalCode,
                },
            });
            await newUser.save();
            return newUser;
        },
    },
};
export default resolvers;
