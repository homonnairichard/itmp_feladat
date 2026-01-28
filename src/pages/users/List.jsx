import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/users";

export default function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setErr("");
      setLoading(true);
      const data = await getUsers();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Hiba a lista lekérésekor");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Users</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={load} disabled={loading}>
            <i className="bi bi-arrow-clockwise me-2" />
            Frissítés
          </button>
          <Link className="btn btn-primary" to="/users/new">
            <i className="bi bi-plus-lg me-2" />
            Új user
          </Link>
        </div>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div className="text-muted">Töltés…</div>
      ) : items.length === 0 ? (
        <div className="alert alert-warning">Nincs adat.</div>
      ) : (
        <div className="row g-3">
          {items.map((u) => (
            <div className="col-12 col-md-6 col-lg-4" key={u.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold fs-5">{u.name}</div>
                      <div className="text-muted">{u.email}</div>
                      <div className="small text-muted mt-2">id: {u.id}</div>
                    </div>
                    <div className="d-flex gap-2">
                      <Link className="btn btn-outline-secondary btn-sm" to={`/users/${u.id}`}>
                        <i className="bi bi-eye" />
                      </Link>
                      <Link className="btn btn-outline-primary btn-sm" to={`/users/${u.id}/edit`}>
                        <i className="bi bi-pencil-square" />
                      </Link>
                      <Link className="btn btn-outline-danger btn-sm" to={`/users/${u.id}/delete`}>
                        <i className="bi bi-trash3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
