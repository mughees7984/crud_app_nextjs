// import { useReducer } from "react";
// import { BiBrush, BiPlus } from "react-icons/bi";
// import Success from "./success";
// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "../lib/helper";

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value,
//   };
// };

// export default function UpdateUserForm({ formId, formData, setFormData }) {
//   // const {isLoading, isError, data, error} =  useQuery(["users", formId], ()=>getUser(formId))
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["users", formId],
  //   queryFn: () => getUser(formId),
  // });
//   if (isLoading) return <div>Loading!</div>;
//   if (isError) return <div>Error</div>;

//   const { name, avatar, email, salary, date, status } = data;
//   const [firstname, lastname] = name ? name.split(" ") : formData;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let userName = `${formData.firstname ?? firstname} ${
//       formData.lastname ?? lastname
//     }`;
//     let updated = Object.assign({}, data, formData, { name: userName });
//     console.log(updated)

//     if (Object.keys(formData).length > 0)
//       return <Success message="Data Added" />;
//     return (
//       <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
//         <div className="input-type">
//           <input
//             type="text"
//             defaultValue={firstname}
//             onChange={setFormData}
//             name="firstname"
//             placeholder="FirstName"
//             className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           />
//         </div>
//         <div className="input-type">
//           <input
//             type="text"
//             defaultValue={lastname}
//             onChange={setFormData}
//             name="lasttname"
//             placeholder="LastName"
//             className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           />
//         </div>
//         <div className="input-type">
//           <input
//             type="text"
//             defaultValue={email}
//             onChange={setFormData}
//             name="email"
//             placeholder="Email"
//             className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           />
//         </div>
//         <div className="input-type">
//           <input
//             type="text"
//             defaultValue={salary}
//             onChange={setFormData}
//             name="salary"
//             placeholder="Salary"
//             className="border w-full px-5 py-3 focus:outline-none rounded-md"
//           />
//         </div>
//         <div className="input-type">
//           <input
//             type="date"
//             defaultValue={date}
//             onChange={setFormData}
//             name="date"
//             placeholder="Salary"
//             className="border px-5 py-3 focus:outline-none rounded-md"
//           />
//         </div>

//         <div className="flex gap-10 items-center">
//           <div className="form-check">
//             <input
//               type="radio"
//               defaultChecked={status == "Active"}
//               onChange={setFormData}
//               value="Active"
//               id="radioDefault1"
//               name="status"
//               className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
//             />
//             <label
//               htmlFor="radioDefault1"
//               className="inline-block text-gray-800"
//             >
//               Active
//             </label>
//           </div>
//           <div className="form-check">
//             <input
//               type="radio"
//               defaultChecked={status != "Active"}
//               onChange={setFormData}
//               value="inactive"
//               id="radioDefault2"
//               name="status"
//               className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
//             />
//             <label
//               htmlFor="radioDefault2"
//               className="inline-block text-gray-800"
//             >
//               Inactive
//             </label>
//           </div>
//         </div>
//         {/* <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
//         Add{" "}
//         <span>
//           <BiPlus className="px-1" size={24} />
//         </span>
//       </button> */}
//         <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
//           Update{" "}
//           <span>
//             <BiBrush className="px-1" size={24} />
//           </span>
//         </button>
//       </form>
//     );
//   };
// }


import { useReducer } from "react"
import { BiBrush } from 'react-icons/bi'
import Success from "./success"
import Error from "./error"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUser, getUsers, updateUser } from "../lib/helper"

export default function UpdateUserForm({ formId, formData, setFormData }){
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users", formId],
    queryFn: () => getUser(formId),
  });
    const queryClient = useQueryClient()
    
    const UpdateMutation = useMutation({
      mutationFn: (newData) => updateUser(formId, newData),
      onSuccess: async (data)=>{
        await queryClient.prefetchQuery({
          queryKey: ['users'],
          queryFn: getUsers,
        })
      }
        
    })

   if(isLoading) return <div>Loading...!</div>
   if(isError) return <div>Error</div>

   const { name, avatar, salary, date, email, status } = data;
   const [firstname, lastname] = name ? name.split(' ') : formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
        let updated = Object.assign({}, data, formData, { name: userName})
        await UpdateMutation.mutate(updated)
    }

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={lastname} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={salary} name="salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Salary" />
            </div>
            <div className="input-type">
                <input type="date" onChange={setFormData} defaultValue={date} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Salary" />
            </div>


            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" defaultChecked={status == "Active"} onChange={setFormData} value="Active" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio"  defaultChecked={status !== "Active"}  onChange={setFormData} value="Inactive" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
             Update <span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>

        </form>
    )
}