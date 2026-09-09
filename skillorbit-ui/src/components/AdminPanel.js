import React, { useState } from "react";

function AdminPanel() {

  const [tab, setTab] = useState("users");
  
  return (
    <div className="dashboard-container">

      <h2>⚙️ Admin Panel</h2>

      <div className="admin-tabs">
        <button onClick={() => setTab("users")}>Users</button>
        <button onClick={() => setTab("roles")}>Roles</button>
        <button onClick={() => setTab("skills")}>Skills</button>
        <button onClick={() => setTab("roadmap")}>Roadmap</button>
      </div>

      {tab === "users" && <Users />}
      {tab === "roles" && <Roles />}
      {tab === "skills" && <Skills />}
      {tab === "roadmap" && <Roadmap />}

    </div>
  );
}

export default AdminPanel;

//////////////////////////////////////////////////////////
// ✅ USERS
//////////////////////////////////////////////////////////

function Users() {

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await fetch(`/api/admin/users`, {    
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadUsers();
  };

  return (
    <div>
      <button onClick={loadUsers}>Load Users</button>

      {users.map(u => (
        <div key={u.id} className="card">
          <p>{u.username}</p>
          <p>{u.role}</p>
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////////////
// ✅ ROLES
//////////////////////////////////////////////////////////


function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const token = localStorage.getItem("token");

  const loadRoles = async () => {
    const res = await fetch(`/api/admin/roles`, {      
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setRoles(data.filter(r => r.name && r.name.trim() !== ""));
  };

  const addRole = async () => {
    if (!roleName.trim()) return;

    await fetch(`/api/admin/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: roleName.trim() })
    });

    setRoleName("");
    loadRoles();
  };

  const deleteRole = async (id) => {
    if (!window.confirm("Delete role?")) return;

    await fetch(`/api/admin/roles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadRoles();
  };

  const saveEdit = async (id) => {
    await fetch(`/api/admin/roles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: editValue })
    });

    setEditingId(null);
    loadRoles();
  };

  return (
    <div>

      <input
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Role name"
      />

      <button onClick={addRole}>Add</button>
      <button onClick={loadRoles}>Load</button>

      <div style={{ marginTop: "20px" }}>
        {roles.map(r => (
          <div key={r.id} className="card">

            {editingId === r.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(r.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h4>{r.name}</h4>
                <button onClick={() => {
                  setEditingId(r.id);
                  setEditValue(r.name);
                }}>Edit</button>
                <button onClick={() => deleteRole(r.id)}>Delete</button>
              </>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

//////////////////////////////////////////////////////////
// ✅ SKILLS
//////////////////////////////////////////////////////////

function Skills() {

  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ✅ NEW: ADD FORM STATE
  const [newSkill, setNewSkill] = useState({
    role: "",
    skill: "",
    requiredLevel: ""
  });

  const token = localStorage.getItem("token");

  const loadSkills = async () => {
    const res = await fetch(`/api/admin/roleskills`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    setSkills(
      data.filter(s => s.skill && s.skill.trim() !== "")
    );
  };

  // ✅ ADD NEW SKILL
  const addSkill = async () => {

    if (!newSkill.role.trim() || !newSkill.skill.trim()) {
      alert("Role and Skill are required ❌");
      return;
    }

    await fetch(`/api/admin/roleskills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newSkill,
        requiredLevel: parseInt(newSkill.requiredLevel || 0)
      })
    });

    setNewSkill({ role: "", skill: "", requiredLevel: "" });
    loadSkills();
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    await fetch(`/api/admin/roleskills/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadSkills();
  };

  // ✅ START EDIT
  const startEdit = (skill) => {
    setEditingId(skill.id);
    setEditData(skill);
  };

  // ✅ SAVE EDIT
  const saveEdit = async (id) => {
    await fetch(`/api/admin/roleskills/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    });

    setEditingId(null);
    loadSkills();
  };

  return (
    <div>

      {/* ✅ ADD NEW SKILL SECTION */}
      <div className="card" style={{ marginBottom: "20px" }}>

        <input
          placeholder="Role"
          value={newSkill.role}
          onChange={(e) => setNewSkill({ ...newSkill, role: e.target.value })}
        />

        <input
          placeholder="Skill"
          value={newSkill.skill}
          onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
        />

        <input
          placeholder="Level"
          type="number"
          value={newSkill.requiredLevel}
          onChange={(e) =>
            setNewSkill({ ...newSkill, requiredLevel: e.target.value })
          }
        />

        <button onClick={addSkill}>Add Skill</button>

      </div>

      {/* ✅ LOAD BUTTON */}
      <button onClick={loadSkills}>Load Skills</button>

      {/* ✅ LIST + EDIT */}
      {skills.map(s => (
        <div key={s.id} className="card">

          {editingId === s.id ? (
            <>
              <input
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
              />

              <input
                value={editData.skill}
                onChange={(e) => setEditData({ ...editData, skill: e.target.value })}
              />

              <input
                value={editData.requiredLevel}
                onChange={(e) => setEditData({ ...editData, requiredLevel: e.target.value })}
              />

              <button onClick={() => saveEdit(s.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {s.skill} ({s.role}) - Level {s.requiredLevel}

              <button onClick={() => startEdit(s)}>Edit</button>
              <button onClick={() => deleteSkill(s.id)}>Delete</button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

  // ✅ ADD NEW SKILL


//////////////////////////////////////////////////////////
// ✅ ROADMAP
//////////////////////////////////////////////////////////
function Roadmap() {

  const [steps, setSteps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const [newStep, setNewStep] = useState({
    skill: "",
    step: "",
    type: "",
    stepOrder: ""
  });

  const token = localStorage.getItem("token");

  const loadSteps = async () => {
    const res = await fetch(`/api/admin/learning-path`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setSteps(data);
  };

  // ✅ ADD STEP
  const addStep = async () => {

    if (!newStep.skill || !newStep.step) {
      alert("Skill and Step required ❌");
      return;
    }

    await fetch(`/api/admin/learning-path`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newStep,
        stepOrder: parseInt(newStep.stepOrder || 0)
      })
    });

    setNewStep({ skill: "", step: "", type: "", stepOrder: "" });
    loadSteps();
  };

  const deleteStep = async (id) => {
    if (!window.confirm("Delete this step?")) return;

    await fetch(`/api/admin/learning-path/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadSteps();
  };

  const startEdit = (step) => {
    setEditingId(step.id);
    setEditData(step);
  };

  const saveEdit = async (id) => {
    await fetch(`/api/admin/learning-path/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    });

    setEditingId(null);
    loadSteps();
  };

  return (
    <div>

      {/* ✅ ADD NEW ROADMAP */}
      <div className="card" style={{ marginBottom: "20px" }}>

        <input
          placeholder="Skill"
          value={newStep.skill}
          onChange={(e) => setNewStep({ ...newStep, skill: e.target.value })}
        />

        <input
          placeholder="Step"
          value={newStep.step}
          onChange={(e) => setNewStep({ ...newStep, step: e.target.value })}
        />

        <input
          placeholder="Type (FREE / PREMIUM)"
          value={newStep.type}
          onChange={(e) => setNewStep({ ...newStep, type: e.target.value })}
        />

        <input
          placeholder="Step Order"
          type="number"
          value={newStep.stepOrder}
          onChange={(e) => setNewStep({ ...newStep, stepOrder: e.target.value })}
        />

        <button onClick={addStep}>Add Step ✅</button>

      </div>

      <button onClick={loadSteps}>Load Roadmap</button>

      {steps.map(s => (
        <div key={s.id} className="card">

          {editingId === s.id ? (
            <>
              <input
                value={editData.skill}
                onChange={(e) => setEditData({ ...editData, skill: e.target.value })}
              />
              <input
                value={editData.step}
                onChange={(e) => setEditData({ ...editData, step: e.target.value })}
              />
              <input
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              />
              <input
                value={editData.stepOrder}
                onChange={(e) => setEditData({ ...editData, stepOrder: e.target.value })}
              />

              <button onClick={() => saveEdit(s.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <b>{s.skill}</b> → {s.step} ({s.type})

              <button onClick={() => startEdit(s)}>Edit</button>
              <button onClick={() => deleteStep(s.id)}>Delete</button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}