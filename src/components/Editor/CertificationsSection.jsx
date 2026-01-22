import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useResume } from '../../contexts/ResumeContext';

function CertificationsSection() {
  const { resume, dispatch } = useResume();
  const certifications = resume.content.certifications;

  const handleAdd = () => {
    dispatch({ type: 'ADD_CERTIFICATION' });
  };

  const handleUpdate = (id, field, value) => {
    dispatch({
      type: 'UPDATE_CERTIFICATION',
      payload: { id, data: { [field]: value } },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      dispatch({ type: 'DELETE_CERTIFICATION', payload: id });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(certifications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reordered = items.map((item, index) => ({ ...item, order: index }));
    dispatch({ type: 'REORDER_CERTIFICATIONS', payload: reordered });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold">Certifications</h3>
        <button
          onClick={handleAdd}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
        >
          <span className="material-symbols-outlined text-base">add_circle</span> Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="certifications">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {certifications.map((cert, index) => (
                <Draggable key={cert.id} draggableId={cert.id} index={index}>
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
                            Certification Name
                          </p>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Issuing Organization
                          </p>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Amazon Web Services"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Issue Date
                          </p>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => handleUpdate(cert.id, 'date', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Jan 2023"
                          />
                        </label>
                        <label className="flex flex-col">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Expiry Date (Optional)
                          </p>
                          <input
                            type="text"
                            value={cert.expiryDate}
                            onChange={(e) => handleUpdate(cert.id, 'expiryDate', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="Jan 2026"
                          />
                        </label>
                        <label className="flex flex-col col-span-2">
                          <p className="text-[#111418] dark:text-[#94a3b8] text-xs font-bold mb-1.5 uppercase tracking-wide">
                            Credential ID (Optional)
                          </p>
                          <input
                            type="text"
                            value={cert.credentialId}
                            onChange={(e) => handleUpdate(cert.id, 'credentialId', e.target.value)}
                            className="w-full rounded-lg border-[#dbe0e6] dark:border-white/10 bg-white dark:bg-transparent h-10 px-3 text-sm dark:text-white"
                            placeholder="ABC123XYZ"
                          />
                        </label>
                        <button
                          onClick={() => handleDelete(cert.id)}
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

      {certifications.length === 0 && (
        <div className="text-center py-8 text-[#617589] dark:text-[#94a3b8] text-sm">
          <p>No certifications added yet</p>
          <p className="text-xs mt-1">Click "Add" to showcase your credentials</p>
        </div>
      )}
    </section>
  );
}

export default CertificationsSection;
