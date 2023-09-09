import { addTodo } from "@/redux/features/todoSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function AddList({ show, showCreate }) {
  const handleClose = () => showCreate(false);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    userId: "",
    title: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(form))
      .then(() => {
        toast.success("Add data success", {
          position: "bottom-right",
          autoClose: 3000,
        });
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to add todo:", error);
      });

    console.log(form);
  };

  return (
    <>
      {/* Main modal */}
      {show && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                  Add List
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="user_id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User Id
                    </label>
                    <input
                      type="number"
                      name="userId"
                      id="user_id"
                      value={form.userId}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={form.title}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="completed"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Completed
                    </label>
                    <input
                      type="checkbox"
                      name="completed"
                      id="completed"
                      checked={form.completed}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
