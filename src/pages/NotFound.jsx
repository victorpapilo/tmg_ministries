import { Link } from 'react-router-dom'
export default function NotFound(){return <div className="auth-page"><div className="auth-card"><span className="eyebrow">404</span><h1>Page not found.</h1><p>The page you're looking for doesn't exist.</p><Link className="btn btn-primary" to="/">Back home</Link></div></div>}
