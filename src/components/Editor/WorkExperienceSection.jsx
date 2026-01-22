import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../contexts/ResumeContext';

function WorkExperienceSection() {
  const { resume, dispatch } = useResume();
  const workExperience = resume.content.workExperience;

  const handleAdd = () => {
    dispatch({ type: 'ADD_WORK_EXPERIENCE' });
  };

  const handleUpdate = (id, field, value) => {
    dispatch({
      type: 'UPDATE_WORK_EXPERIENCE',
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      dispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: id });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(workExperience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const reordered = items.map((item, index) => ({ ...item, order: index }));
    dispatch({ type: 'REORDER_WORK_EXPERIENCE', payload: reordered });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Work Experience</h3>
        <button
          onClick={handleAdd}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-base">add_circle</span> Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="work-experience">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {workExperience.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
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
                            Job Title
                          </p>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Senior Product Designer"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Company
                          </p>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="DesignFlow AI"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Location
                          </p>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="San Francisco, CA"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Start Date
                          </p>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Jan 2021"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            End Date
                          </p>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Present"
                            disabled={exp.current}
                          />
                        </label>
                        <label className="flex items-center gap-2 col-span-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => {
                              handleUpdate(exp.id, 'current', e.target.checked);
                              if (e.target.checked) {
                                handleUpdate(exp.id, 'endDate', 'Present');
                              }
                            }}
                            className="rounded border-[#dbe0e6] dark:border-white/10 text-primary focus:ring-primary"
                          />
                          <span className="text-xs text-[#617589] dark:text-[#94a3b8]">
                            I currently work here
                          </span>
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Description
                          </p>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-24 p-3 text-sm resize-none dark:text-white"
                            placeholder="• Led the redesign of the core dashboard increasing user engagement by 45%&#10;• Standardized the design language with a robust design system"
                          />
                        </label>
                        <button
                          onClick={() => handleDelete(exp.id)}
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

      {workExperience.length === 0 && (
        <div className="text-center py-8 text-[#617589] dark:text-[#94a3b8] text-sm">
          <p>No work experience added yet</p>
          <p className="text-xs mt-1">Click "Add" to create your first entry</p>
        </div>
      )}
    </section>
  );
}

export default WorkExperienceSection;
