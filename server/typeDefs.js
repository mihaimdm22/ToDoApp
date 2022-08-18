import { gql } from "apollo-server-express";
const typeDefs = gql`
    scalar Date
    type Todo {
        id: ID
        title: String
        detail: String
        date: Date
        user: ID
        time: Int
    }
    type Address {
        street: String
        city: String
        postalCode: String
    }
    type User {
        id: ID
        firstName: String
        lastName: String
        address: Address
        fullName: String
    }
    type UserTotal {
        _id: ID
        total: Int
    }
    type Query {
        welcome: String
        getTodos: [Todo]
        getTodo(id: ID): Todo
        countTitle(title: String): Int
        distinctTitle: [String]
        getUsers: [User]
        getUser(id: ID): User
        getUsersTotalTime: [UserTotal]
    }
    type Mutation {
        addTodo(
            title: String
            detail: String
            date: Date
            user: ID
            time: Int
        ): Todo
        deleteTodo(id: ID): String
        updateTodo(
            id: String
            title: String
            detail: String
            date: Date
            user: ID
            time: Int
        ): Todo
        addUser(
            firstName: String
            lastName: String
            addressStreet: String
            addressCity: String
            addressPostalCode: String
        ): User
    }
`;
export default typeDefs;
