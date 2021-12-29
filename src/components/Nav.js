import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
function NewLink({ to, children, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        className={
          match
            ? "nav-link bg-dark text-white rounded-pill fs-6"
            : "nav-link text-dark fs-6 rounded-pill"
        }
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
function Nav() {
  return (
    <nav className="fixed-top bg-white shadow py-3 ">
      <div className="container d-flex justify-content-between align-items-center">
        <h3>
          <small className="text-muted">testapp</small>useReact
        </h3>
        <div className="d-flex align-items-center">
          <NewLink to="/">Home</NewLink>
          <NewLink to="/todo">Todo</NewLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
