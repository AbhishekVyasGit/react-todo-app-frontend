import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import ActiveTodoList from "../components/ActiveTodoList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
interface TodoModel {
    title: string;
    date: string;
    id: number;
}
function ActiveTodos() {
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const title: any = useRef();

    // get all todos not completed with respect to userId
    const getAllNotCompletedTodos = async () => {
        const userId = getLoginInfo()?.userId;
        if (userId != null) {
            const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
            setTodos(response.data);
        } else {
            toast.info("Sorry you are not authenticated");
        }
    };

    const saveTodo = async () => {
        if (title.current.value == "") {
            toast.info("Please Provide Title");
            return;
        }
        const userId = getLoginInfo()?.userId;
        if (userId != null) {
            await custom_axios.post(
                ApiConstants.TODO.ADD(userId),
                {
                    title: title.current.value,
                },
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            );
            getAllNotCompletedTodos();
            title.current.value = "";
            toast.success("Todo Added Successfully!!");
        } else {
            toast.info("Sorry you are not authenticated");
        }
    };

    useEffect(() => {
        if (todos.length == 0) getAllNotCompletedTodos();
    }, []);
    return (
        <div>
            <NavBar></NavBar>
            <div className="container mb-2 flex mx-auto w-full items-center justify-center">
                <ul className="flex flex-col p-4">
                    <span className="text-black text-2xl ">Enter Todo : </span>
                    <input ref={title} className="mt-2 p-2 border-blue-400 rounded-xl shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                    <button onClick={saveTodo} className="w-36 px-2 py-4 text-white mx-auto mb-12 mt-2 bg-green-400 rounded-xl hover:bg-green-500 text-2xl">
                        Save
                    </button>

                    {todos.map((todo) => {
                        return (
                            <ActiveTodoList
                                key={todo.id}
                                dateTime={todo.date}
                                deleteTodo={async () => {
                                    await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                                    getAllNotCompletedTodos();
                                    toast.success("Todo Deleted Successfully!!");
                                }}
                                markCompleted={async () => {
                                    await custom_axios.patch(ApiConstants.TODO.MARK_COMPLETE(todo.id), {}, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                                    getAllNotCompletedTodos();
                                    toast.success("Todo Marked Completed");
                                }}
                                id={todo.id}
                                todo={todo.title}
                            ></ActiveTodoList>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ActiveTodos;