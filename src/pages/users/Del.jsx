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
        setErr(e?.response?.data?.message || e.message || "Hiba betöltéskor");
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
      setErr(e?.response?.data?.message || e.message || "Hiba törléskor");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0 text-danger">Törlés</h2>
        <Link className="btn btn-outline-secondary" to={`/users/${id}`}>
          <i className="bi bi-arrow-left me-2" />
          Vissza
        </Link>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div className="text-muted">Töltés…</div>
      ) : !item ? (
        <div className="alert alert-warning">Nincs ilyen user.</div>
      ) : (
        <div className="card shadow-sm border-danger">
          <div className="card-body">
            <div className="fw-bold fs-5">{item.name}</div>
            <div className="text-muted">{item.email}</div>
            <div className="small text-muted mt-2">id: {item.id}</div>

            <div className="alert alert-warning mt-3 mb-3">
              Biztos törlöd? A visszaút csak a lelkiismeretedben létezik.
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={onDelete} disabled={deleting}>
                <i className="bi bi-trash3 me-2" />
                {deleting ? "Törlés…" : "Igen, töröld"}
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
