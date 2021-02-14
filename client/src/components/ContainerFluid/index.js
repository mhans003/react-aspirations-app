const Container = ({ main, children }) => {
    return <div className={`container-fluid${main ? ' main' : ''}`}>{children}</div>
}

export default Container;