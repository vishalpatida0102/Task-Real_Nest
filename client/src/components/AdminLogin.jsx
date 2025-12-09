function AdminLogin({ form, setForm, onSubmit }) {
  return (
    <section className="admin-login" id="admin">
      <div className="admin-login-card">
        <div className="admin-login-left">
          <p className="pill">Admin</p>
          <h2>Welcome back</h2>
          <p>Sign in to manage projects, clients, contacts, and subscribers.</p>
          <div className="login-steps">
            <div>
              <span className="dot" />
              <span>Add projects and clients</span>
            </div>
            <div>
              <span className="dot" />
              <span>Review contact submissions</span>
            </div>
            <div>
              <span className="dot" />
              <span>Track newsletter signups</span>
            </div>
          </div>
        </div>
        <div className="admin-login-right">
          <form className="stack" onSubmit={onSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
          <div className="hint">Use admin@example.com / admin123 to enter.</div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;

