// "use client";

import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
// import { BiBrush, BiPlus } from "react-icons/bi";
import Success from "./success";
import Error from "./error";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addUser } from "../lib/helper";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function AddUserForm({ formData, setFormData}) {
  // const [formData, setFormData] = useReducer(formReducer, {});
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addUser, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(formData).length == 0)
    return console.log("Dont have form Data");
    const {firstname, lastname, email, salary, date, status} = formData;

    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
      email, salary, date, status: status?? "Active",
    }
    addMutation.mutate(model)
  };

  // if (Object.keys(formData).length > 0) return <Success message="Data Added"/>

  if(addMutation.isLoading) return <div>Loading!</div>
  if(addMutation.isError) return <Error message= {addMutation.error.message}/>
  if(addMutation.isSuccess) return <Success message= {"Added Successful"}/>
  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          placeholder="FirstName"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lasttname"
          placeholder="LastName"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          placeholder="Email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="salary"
          placeholder="Salary"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          placeholder="Salary"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      {/* <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-800">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            onChange={setFormData}
            value="inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-800">
            Inactive
          </label>
        </div>
      </div> */}
        <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Active" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Inactive" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        Inactive
                    </label>
                </div>
            </div>
      {/* <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Update{" "}
        <span>
          <BiBrush className="px-1" size={24} />
        </span>
      </button> */}
      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{" "}
        <span>
          <BiPlus className="px-1" size={24} />
        </span>
      </button>
    </form>
  );
}
