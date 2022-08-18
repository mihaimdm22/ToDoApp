import { gql } from "@apollo/client";
export const ADD_TODO = gql`
    mutation addTodo($title: String, $detail: String, $date: Date, $time: Int) {
        addTodo(title: $title, detail: $detail, date: $date, time: $time) {
            id
            title
            detail
            date
            time
        }
    }
`;

export const DELETE_TODO = gql`
    mutation deleteTodo($id: ID) {
        deleteTodo(id: $id)
    }
`;

export const UPDATE_TODO = gql`
    mutation updateTodo(
        $id: String
        $title: String
        $detail: String
        $date: Date
        $time: Int
    ) {
        updateTodo(
            id: $id
            title: $title
            detail: $detail
            date: $date
            time: $time
        ) {
            id
            title
            detail
            date
            time
        }
    }
`;
