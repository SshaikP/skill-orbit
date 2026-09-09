import React, { useState, useEffect } from "react";

function SkillAnalysisDashboard() {

  console.log("✅ SkillAnalysisDashboard rendered");

  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");

  const [roles, setRoles] = useState([]); // ✅ NEW

  const [skillList, setSkillList] = useState([]);
  const [skills, setSkills] = useState({});
  const [results, setResults] = useState([]);


  
      useEffect(() => {
        console.log("⚡ useEffect triggered");

        const timer = setTimeout(() => {
          loadRoles();
        }, 500);

        return () => clearTimeout(timer);
      }, []);


  // ✅ LOAD ROLES FROM BACKEND

const loadRoles = async () => {

  console.log("🔥 loadRoles CALLED");

  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

        const res = await fetch(`/api/admin/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("STATUS:", res.status);

    if (!res.ok) {
      console.error("Failed to load roles:", res.status);
      setRoles([]);
      return;
    }

    const data = await res.json();

    console.log("ROLES DATA:", data);

    setRoles(data);

  } catch (err) {
    console.error("ERROR loading roles:", err);
    setRoles([]);
  }
};

    const loadSkills = async () => {

      if (!targetRole) {
        alert("Please select a role first ✅");
        return;
      }
      
               const res = await fetch(`/api/roleskills/${targetRole}`);

        if (!res.ok) {
          console.error("Failed to load skills", res.status);
          return;
        }


      const data = await res.json();

      const skillObj = {};
      data.forEach(s => {
        skillObj[s.skill] = 0;
      });

      setSkillList(data);
      setSkills(skillObj);
      setResults([]);
      console.log("Roles API result:", data);
    };


  const handleChange = (skill, value) => {
    setSkills(prev => ({
      ...prev,
      [skill]: value === "" ? "" : parseInt(value)
    }));
  };


    const handleAnalyze = async () => {
      const response = await fetch(`/api/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: targetRole,
          skills: skills
        })
      });

      if (!response.ok) {
        console.error("Analysis failed:", response.status);
        return;
      }

      const data = await response.json();

      setResults(data);
    };


  return (
    <div className="dashboard-container">

      <h2>⚡ SkillOrbit</h2>

      <div className="section card">
        <h3>Select Target Role</h3>

        {/* ✅ CURRENT ROLE (OPTIONAL — KEEPING AS IS) */}
        <input
          placeholder="Current Role (optional)"
          value={currentRole}
          onChange={e => setCurrentRole(e.target.value)}
        />

        {/* ✅ DYNAMIC ROLE DROPDOWN */}
        <select
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          <option value="">-- Select Role --</option>

          {roles.map(r => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}

        </select>
         
        <button onClick={loadSkills}>Load Skills</button>
      </div>

      {skillList.length > 0 && (
        <div className="section card">
          <h3>Enter Skill Levels</h3>

          {skillList.map((s, i) => (
            <div key={i} className="skill-row">
              <label>{s.skill}</label>

              <input
                type="number"
                min="0"
                max="10"
                value={skills[s.skill]}
                onChange={(e) => handleChange(s.skill, e.target.value)}
              />
            </div>
          ))}

          <button onClick={handleAnalyze}>Analyze</button>
        </div>
      )}

      {results.length > 0 && (
        <div className="section">

          <h3>Results</h3>

          {results.map((r, i) => (
            <div key={i} className="result-card">

              <div className="card-header">
                <h3>{r.skill}</h3>

                <span className={`priority-badge ${r.priority.toLowerCase()}`}>
                  {r.priority}
                </span>
              </div>

              <div className="priority-row">
                <span>📉 Gap: {r.gap}</span>
              </div>

              <div className="paths">

                <div className="path-box">
                  <h4>✅ Free Path</h4>
                  <ul>
                    {r.freePath.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="path-box">
                  <h4>💰 Premium Path</h4>
                  <ul>
                    {r.premiumPath.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SkillAnalysisDashboard;