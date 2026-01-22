import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../contexts/ResumeContext';

function EducationSection() {
  const { resume, dispatch } = useResume();
  const education = resume.content.education;

  const handleAdd = () => {
    dispatch({ type: 'ADD_EDUCATION' });
  };

  const handleUpdate = (id, field, value) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      dispatch({ type: 'DELETE_EDUCATION', payload: id });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(education);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reordered = items.map((item, index) => ({ ...item, order: index }));
    dispatch({ type: 'REORDER_EDUCATION', payload: reordered });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Education</h3>
        <button
          onClick={handleAdd}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-base">add_circle</span> Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="education">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {education.map((edu, index) => (
                <Draggable key={edu.id} draggableId={edu.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-4 rounded-xl border border-[#dbe0e6] dark:border-white/10 bg-[#f8fafc] dark:bg-white/5 relative group ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-[#617589] cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined">drag_indicator</span>
                      </div>
                      <div className="ml-6 grid grid-cols-2 gap-4">
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Degree
                          </p>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="B.S. Computer Science"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Institution
                          </p>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Stanford University"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Location
                          </p>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Stanford, CA"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Graduation Year
                          </p>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="2020"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            GPA (Optional)
                          </p>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="3.8/4.0"
                          />
                        </label>
                        <button
                          onClick={() => handleDelete(edu.id)}
                          className="col-span-2 text-red-500 text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {education.length === 0 && (
        <div className="text-center py-8 text-[#617589] dark:text-[#94a3b8] text-sm">
          <p>No education added yet</p>
          <p className="text-xs mt-1">Click "Add" to create your first entry</p>
        </div>
      )}
    </section>
  );
}

export default EducationSection;
