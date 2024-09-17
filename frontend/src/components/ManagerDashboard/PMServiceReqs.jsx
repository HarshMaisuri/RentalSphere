import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function PMServiceReqs() {

  const tasks = [
  {
    id: "d5e3",
    requestSubject: "New Req",
    requestType: "New Req type",
    date:'24 Feb 2024',
    requestMessage: "New Req type Message New Req type Message"
  },
  {
    id: "caee",
    requestSubject: "Test 1",
    requestType: "Test 1 type",
    date:'24 Feb 2024',
    requestMessage: "Test 1 message Test 1 messageTest 1 messageTest 1 message"
  },
  {
    id: "2fdd",
    requestSubject: "Testst",
    requestType: "Testst",
    date:'24 Feb 2024',
    requestMessage: "TeststTeststTeststTestst"
  }]

  const taskStatus = {
    requests: {
      name: "Requests",
      items: tasks
    },
    toDo: {
      name: "In progress",
      items: []
    },
    done: {
      name: "Done",
      items: []
    }
  };

  const columnMappingBgColour = {
    "In progress":'text-yellow-800 bg-yellow-200' ,
    Done: 'text-green-800 bg-green-200',
    Requests: 'text-blue-800 bg-blue-200',
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const [columns, setColumns] = useState(taskStatus);
  const [modelData, setModelData] = useState();

  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-bold mb-10">Service Request</h1> */}
      <div className="flex justify-center h-full">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="flex flex-col" key={index}>
                <div className="m-2 bg-gray-200 h-[860px] w-80 rounded-md overflow-auto">
                  <h2 className={`pl-3 text-[22px] font-bold py-4 ${columnMappingBgColour[column.name]}`}>{column.name}</h2>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-4 w-250 min-h-500 ${snapshot.isDraggingOver ? 'bg-lightblue' : 'bg-lightgrey'}`}
                      >
                     
                        {column.items.map((item, index) => {
                          return ((
                            <Draggable key={item.id} draggableId={item.id} index={index} >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`select-none p-4 mb-2 min-h-50 ${snapshot.isDragging ? 'bg-white' : columnMappingBgColour[column.name]} rounded-md ${provided.draggableProps.style}`}
                                >
                                  <div className='cursor-pointer' 
                                  // onClick={()=>openModel(item)}
                                  onClick={() => {
                                    setModelData(item)
                                    document.getElementById("my_modal_3").showModal()
                                  }}
                                  >
                                    <h6 className='text-[18px] font-semibold'>{item.requestSubject}</h6>
    
                                    {/* <p className='text-[14px]'>{item.requestMessage}</p> */}


                                    <div className='flex gap-4 mt-4'>
                                      <p className='text-[12px] font-semibold bg-white rounded-full py-1 px-2'>{item.date}</p>
                                      <p className='text-[12px] font-semibold rounded-full px-6 py-1 text-white bg-blue-500'>{item.requestType}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        }
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            )
          }  )}
        </DragDropContext>
      </div>

      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">
            Service Request
          </h3>

          <div className="modal-action flex flex-col justify-center ">
            <h6 className='text-md ml-2 font-semibold'>{modelData?.requestSubject}</h6>
            <p className='text-[14px] mt-2'>{modelData?.requestMessage}</p>
            <div className='flex gap-4 mt-4'>
              <p className='text-[12px] font-semibold rounded-full text-white bg-blue-500 py-1 px-2'>{modelData?.date}</p>
              <p className='text-[12px] font-semibold rounded-full px-6 py-1 text-white bg-blue-500'>{modelData?.requestType}</p>
            </div>
            
          </div>
        </div>
      </dialog>
    </div>
  );
}
