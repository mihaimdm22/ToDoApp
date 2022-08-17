import React, { useState, useEffect, useRef, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, UPDATE_TODO } from "../graphql/Mutation";
import { GET_TODOS, GET_TODO } from "../graphql/Query";
import moment from "moment";
import { TodoContext } from "../TodoContext";

const AddTodos = () => {
    const [todo, setTodo] = useState({
        title: "",
        detail: "",
        date: "",
    });

    const { selectedId, setSelectedId } = useContext(TodoContext);

    const [addTodo] = useMutation(ADD_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);

    const inputAreaRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const { title, detail, date } = e.target.elements;
        if (!title.value) {
            alert("Please enter a title");
        }
        if (selectedId == 0) {
            addTodo({
                variables: {
                    title: title.value,
                    detail: detail.value,
                    date: date.value,
                },
                refetchQueries: [{ query: GET_TODOS }],
            });
            setSelectedId(0);
            setTodo({
                title: "",
                detail: "",
                date: "",
            });
        } else {
            updateTodo({
                variables: {
                    id: selectedId,
                    title: title.value,
                    detail: detail.value,
                    date: date.value,
                },
                refetchQueries: [{ query: GET_TODOS }],
            });
            setSelectedId(0);
            setTodo({
                title: "",
                detail: "",
                date: "",
            });
        }
    };

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (!inputAreaRef.current.contains(e.target)) {
                console.log("outside input area");
                setSelectedId(0);
                setTodo({
                    title: "",
                    detail: "",
                    date: "",
                });
            } else {
                console.log("inside input area");
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, []);

    const { loading, error, data } = useQuery(GET_TODO, {
        variables: { id: selectedId },
    });

    useEffect(() => {
        if (data) setTodo(data.getTodo);
    }, [data]);

    return (
        <form onSubmit={onSubmit} ref={inputAreaRef}>
            <div className="form-group mb-3">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter title"
                    value={todo.title}
                    onChange={(e) =>
                        setTodo({ ...todo, title: e.target.value })
                    }
                />
            </div>
            <div className="form-group mb-3">
                <label>Detail</label>
                <input
                    type="text"
                    name="detail"
                    className="form-control"
                    placeholder="Enter Detail"
                    value={todo.detail}
                    onChange={(e) =>
                        setTodo({ ...todo, detail: e.target.value })
                    }
                />
            </div>
            <div className="form-group mb-3">
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={
                        todo.date
                            ? moment(todo.date).format("yyyy-MM-DD")
                            : moment().format("yyyy-MM-DD")
                    }
                    onChange={(e) => setTodo({ ...todo, date: e.target.value })}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {selectedId == 0 ? "Add" : "Update"}
            </button>
        </form>
    );
};
export default AddTodos;
