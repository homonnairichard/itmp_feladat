import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/users";

export default function Create() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setErr("");
      setSaving(true);
      const payload = { name: name.trim(), email: email.trim() };
      await createUser(payload);
      nav("/users");
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Hiba mentéskor");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Új user</h2>
        <Link className="btn btn-outline-secondary" to="/users">
          <i className="bi bi-arrow-left me-2" />
          Vissza
        </Link>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      <form onSubmit={onSubmit} className="card shadow-sm">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Név</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" disabled={saving}>
            <i className="bi bi-check2 me-2" />
            {saving ? "Mentés…" : "Mentés"}
          </button>
        </div>
      </form>
    </div>
  );
}
