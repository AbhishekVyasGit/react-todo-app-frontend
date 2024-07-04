interface CompletedTodosProps {
    id: number;
    todo: string;
    dateTime: string;
    deleteTodo: (id: number) => void;
}

const CompletedTodoList = (props: CompletedTodosProps) => {
    return (
        <li className="border-gray-400 flex flex-row">
            <div className="select-none bg-white flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        {props.todo}
                    </div>
                    <div className="font-medium text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {props.dateTime}
                    </div>
                </div>
                <button
                    onClick={() => props.deleteTodo(props.id)}
                    className="bg-red-500 hover:bg-red-700 mr-12 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-5 lg:py-4 lg:px-6 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default CompletedTodoList;
