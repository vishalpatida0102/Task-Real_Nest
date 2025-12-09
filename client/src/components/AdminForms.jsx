function AdminForms({ projectForm, setProjectForm, submitProject, clientForm, setClientForm, submitClient, showProjectForm = true, showClientForm = true }) {
  const handleFile = (file, setter, key) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setter((prev) => ({ ...prev, [key]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-grid">
      {showProjectForm && (
        <div className="admin-card">
          <h3>Add Project</h3>
          <form className="stack" onSubmit={submitProject}>
            <input placeholder="Project Name" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
            <label className="file-field">
              <span>Project Image</span>
              <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0], setProjectForm, "image")} />
            </label>
            <textarea rows="3" placeholder="Project Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
            {projectForm.image && <img className="thumb" src={projectForm.image} alt="Project preview" />}
            <button type="submit">Add Project</button>
          </form>
        </div>
      )}
      {showClientForm && (
        <div className="admin-card">
          <h3>Add Client</h3>
          <form className="stack" onSubmit={submitClient}>
            <input placeholder="Client Name" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} />
            <input placeholder="Designation" value={clientForm.role} onChange={(e) => setClientForm({ ...clientForm, role: e.target.value })} />
            <label className="file-field">
              <span>Client Image</span>
              <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0], setClientForm, "image")} />
            </label>
            <textarea rows="3" placeholder="Client Description" value={clientForm.description} onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })} />
            {clientForm.image && <img className="thumb" src={clientForm.image} alt="Client preview" />}
            <button type="submit">Add Client</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminForms;

