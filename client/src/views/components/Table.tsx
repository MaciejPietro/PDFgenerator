import { useState, useRef, useEffect } from "react";
import { IClientData } from "../../redux/types";

interface IProps {
  items: IClientData[];
  deleteRecord: (email: string) => void;
  setEditedClient: any;
  popup: any;
}

const Table: React.FC<IProps> = ({
  items,
  deleteRecord,
  setEditedClient,
  popup,
}) => {
  useEffect(() => {}, [items]);

  const rates = (rate: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rate ? <span key={i}>&#9733;</span> : <span key={i}>&#9734;</span>,
      );
    }
    return stars;
  };

  const startEditing = (_id) => {
    popup.current.classList.remove("hidden");
    popup.current.classList.add("flex");
    const client = items.find((item) => item._id === _id);
    setEditedClient(client);
  };

  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3 text-left">
                    Contact
                  </th>

                  <th scope="col" className="px-6 py-3 text-left">
                    Importance
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Details</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items &&
                  items.map(
                    (
                      {
                        _id,
                        name,
                        realname,
                        country,
                        email,
                        profession,
                        rate,
                        image,
                        imageKey,
                      },
                      index,
                    ) => (
                      <tr id={`client-${index}`} key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img src={"data:image/jpeg;base64," + image} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black">
                                <span>{name}</span>
                              </div>
                              <div className="text-sm text-black">
                                <span>
                                  {realname}, {profession}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">
                            <span>{country}</span>
                          </div>
                          <div className="text-sm text-black">
                            <span>{email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <span>{rates(rate)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-6">
                          <button
                            type="button"
                            onClick={() => startEditing(_id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>

                          <button
                            type="submit"
                            className="text-indigo-600 hover:text-indigo-900 h-3/6 hidden"
                          >
                            Update
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => deleteRecord(_id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
