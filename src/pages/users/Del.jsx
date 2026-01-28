import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "../../api/users";

export default function Del() {
  const { id } = useParams();
  const nav = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const u = await getUser(id);
        setItem(u);
      } catch (e) {
        setErr(e?.response?.data?.message || "Nem sikerült betölteni az adatokat.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onDelete() {
    try {
      setErr("");
      setDeleting(true);
      await deleteUser(id);
      nav("/users");
    } catch (e) {
      setErr(e?.response?.data?.message || "Nem sikerült törölni.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Törlés</h2>
        <Link className="btn btn-outline-secondary" to={`/users/${id}`}>
          Vissza
        </Link>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div className="text-muted">Töltés…</div>
      ) : !item ? (
        <div className="alert alert-warning">A felhasználó nem található.</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="fw-bold">{item.name}</div>
            <div className="text-muted">{item.email}</div>

            <div className="alert alert-warning mt-3 mb-3">
              Biztosan törölni szeretnéd ezt a felhasználót?
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={onDelete} disabled={deleting}>
                {deleting ? "Törlés…" : "Törlés"}
              </button>
              <Link className="btn btn-outline-secondary" to="/users">
                Mégse
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
