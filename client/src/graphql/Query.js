import { gql } from "@apollo/client";
export const GET_TODOS = gql`
    query {
        getTodos {
            id
            title
            detail
            date
            time
        }
    }
`;

export const GET_TODO = gql`
    query getTodo($id: ID) {
        getTodo(id: $id) {
            id
            title
            detail
            date
            time
        }
    }
`;
