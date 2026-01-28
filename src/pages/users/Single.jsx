import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../api/users";

export default function Single() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await getUser(id);
        setItem(data);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message || "Hiba a lekéréskor");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">User részletek</h2>
        <Link className="btn btn-outline-secondary" to="/users">
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
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="fw-bold fs-4">{item.name}</div>
            <div className="text-muted">{item.email}</div>
            <div className="small text-muted mt-2">id: {item.id}</div>

            <div className="d-flex gap-2 mt-3">
              <Link className="btn btn-primary" to={`/users/${item.id}/edit`}>
                <i className="bi bi-pencil-square me-2" />
                Módosítás
              </Link>
              <Link className="btn btn-danger" to={`/users/${item.id}/delete`}>
                <i className="bi bi-trash3 me-2" />
                Törlés
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
