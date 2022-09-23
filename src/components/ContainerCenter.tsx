
interface IProps {
    style?: React.CSSProperties
    children: React.ReactNode
}

export const ContainerCenter: React.FC<IProps> = ({ style, children }) => {
    return <div style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center", ...style }}>
        {children}
    </div>
}