export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-text">Oops! Page Not Found</h2>
            <p className="error-message">
                The page you are looking for does not exist. It might have been removed or the URL might be incorrect.
            </p>
            <a href="/" className="back-home">Go Back Home</a>
        </div>
    );
}
