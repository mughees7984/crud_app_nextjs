import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { deleteAction, toggleChangeAction, updateAction } from "../redux/reducer";

export default function Table() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Employee is Loading...</div>;
  if (isError) return <div>Got Error: {error.message}</div>;
  return (
    <table className="min-w-full table-auto ">
      <thead className="">
        <tr className="bg-gray-800 ">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Action</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data?.map((obj, index) => (
          <Tr {...obj} key={index} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();
  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if(visible){
      dispatch(updateAction(_id))
    }
  };

  const onDelete = ()=>{
    if(!visible){
      dispatch(deleteAction(_id))
    }
  }
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || "#"}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{salary || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || ""}</span>
      </td>
      {/* <td className="px-16 py-2">
        <span>
          <button className="cursor">
            <span
              className={`${
                status == "Active" ? "bg-green-500" : "bg-rose-500"
              }`}
              text-white
              px-5
              py-1
              rounded-lg
            >
              {status || "Unknown"}
            </span>
          </button>
        </span>
      </td> */}
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              status == "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status || "Unknown"}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button onClick={onUpdate} className="cursor">
          <BiEdit size={25} color={"rgb(34,197,94)"} />
        </button>
        <button onClick={onDelete} className="cursor">
          <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
        </button>
      </td>
    </tr>
  );
}
