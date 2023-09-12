const Button = ({
    onClick,
    title="default"
}) => {
    return (
        <>
            <button onClick={onClick}>{title}</button>
        </>
    )   
}

export default Button