/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_TODO } from "../graphql/Mutation";
import { GET_TODOS } from "../graphql/Query";
import { TodoContext } from "../TodoContext";

const Todo = ({ id, title, detail, date, time }) => {
    const [deleteTodo] = useMutation(DELETE_TODO);

    const { selectedId, setSelectedId } = useContext(TodoContext);

    const removeTodo = (id) => {
        deleteTodo({
            variables: {
                id: id,
            },
            refetchQueries: [{ query: GET_TODOS }],
        });
        setSelectedId(0);
    };

    return (
        <div class="card border-danger m-2 w-50" key={id}>
            <div class="card-header">{title}</div>
            <div
                class="card-body text-danger"
                onClick={() => setSelectedId(id)}
            >
                <h5 class="card-title">{detail}</h5>
                <p class="card-text">{moment(date).format("MMM Do YY")}</p>
                {time && <p class="card-text">Time: {time}</p>}
            </div>
            <div class="card-footer text-muted">
                <div class="d-flex justify-content-end">
                    <button
                        type="button"
                        class="btn btn-outline-primary mx-2"
                        onClick={() => setSelectedId(id)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={(e) => removeTodo(e, id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Todo;
