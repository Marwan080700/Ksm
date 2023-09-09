import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, addTodo, todoSelectors } from "@/redux/features/todoSlice"; // Import addTodo action

import AddList from "./component/modal/addData";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const todos = useSelector(todoSelectors.selectAll);
  console.log(todos);
  const dispatch = useDispatch();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, todos.length);

  const todosToDisplay = todos.slice(startIndex, endIndex);

  const handleAddTodo = async (todo) => {
    // Dispatch the addTodo action to add the new todo
    await dispatch(addTodo(todo));

    // Refetch the data to get the latest todos
    await dispatch(getTodos());

    // Calculate the page that should contain the newly added todo
    const newTotalPages = Math.ceil(todos.length / itemsPerPage);

    // Update the current page to the new total pages if it's greater
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }

    // Show the new data
    setShowCreate(false);
  };

  return (
    <>
      <main className="p-24">
        <div className="flex justify-end ">
          <button
            className="bg-lime-400 px-4 py-1 mb-4 rounded text-white text-xl hover:bg-sky-700 items-start"
            onClick={() => setShowCreate(true)}
          >
            + Data
          </button>
        </div>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-slate-400 text-white">
              <th className="border border-grey">No</th>
              <th className="border border-grey">User ID</th>
              <th className="border border-grey">Title</th>
              <th className="border border-grey">Completed</th>
            </tr>
          </thead>
          <tbody>
            {todosToDisplay.map((todo) => (
              <tr key={todo.id} className="border border-grey">
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>{todo.completed.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center items-center mt-8 gap-1">
          {" "}
          <button
            className="bg-rose-500 px-4 py-1 rounded text-white text-sm hover:bg-sky-700"
            onClick={() => handlePageChange(1)}
          >
            First Page
          </button>
          <button
            className="bg-rose-500 px-4 py-1 rounded text-white text-sm hover:bg-sky-700"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <p className="text-sm px-4">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="bg-rose-500 px-4 py-1 rounded text-white text-sm hover:bg-sky-700"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
          <button
            className="bg-rose-500 px-4 py-1 rounded text-white text-sm hover:bg-sky-700"
            onClick={() => handlePageChange(totalPages)}
          >
            Last Page
          </button>
        </div>
      </main>

      {/* AddList modal */}
      {showCreate && (
        <AddList
          show={showCreate}
          showCreate={setShowCreate}
          onAddTodo={handleAddTodo} // Pass the handleAddTodo function to the modal
        />
      )}
    </>
  );
}
