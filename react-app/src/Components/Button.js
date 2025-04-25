import "../App.css"
export default function Button({ children, type, className, onClick }) {
    return (
        <button type={type} onClick={onClick} className={`button ${className}`}>
            {children}
        </button>
    );
}