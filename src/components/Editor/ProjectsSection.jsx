import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../contexts/ResumeContext';

function ProjectsSection() {
  const { resume, dispatch } = useResume();
  const projects = resume.content.projects;

  const handleAdd = () => {
    dispatch({ type: 'ADD_PROJECT' });
  };

  const handleUpdate = (id, field, value) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reordered = items.map((item, index) => ({ ...item, order: index }));
    dispatch({ type: 'REORDER_PROJECTS', payload: reordered });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Projects</h3>
        <button
          onClick={handleAdd}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-base">add_circle</span> Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {projects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
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
                            Project Name
                          </p>
                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) => handleUpdate(project.id, 'name', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="E-commerce Platform"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Technologies Used
                          </p>
                          <input
                            type="text"
                            value={project.technologies}
                            onChange={(e) => handleUpdate(project.id, 'technologies', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="React, Node.js, MongoDB"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Start Date
                          </p>
                          <input
                            type="text"
                            value={project.startDate}
                            onChange={(e) => handleUpdate(project.id, 'startDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Jan 2023"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            End Date
                          </p>
                          <input
                            type="text"
                            value={project.endDate}
                            onChange={(e) => handleUpdate(project.id, 'endDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Present"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Project Link (Optional)
                          </p>
                          <input
                            type="url"
                            value={project.link}
                            onChange={(e) => handleUpdate(project.id, 'link', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="https://github.com/username/project"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Description
                          </p>
                          <textarea
                            value={project.description}
                            onChange={(e) => handleUpdate(project.id, 'description', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-24 p-3 text-sm resize-none dark:text-white"
                            placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                          />
                        </label>
                        <button
                          onClick={() => handleDelete(project.id)}
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

      {projects.length === 0 && (
        <div className="text-center py-8 text-[#617589] dark:text-[#94a3b8] text-sm">
          <p>No projects added yet</p>
          <p className="text-xs mt-1">Click "Add" to showcase your work</p>
        </div>
      )}
    </section>
  );
}

export default ProjectsSection;
