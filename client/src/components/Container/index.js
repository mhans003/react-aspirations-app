const Container = ({ main, children }) => {
    return <div className={`container${main ? ' main' : ''}`}>{children}</div>
}

export default Container;