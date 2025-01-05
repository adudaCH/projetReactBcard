import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../services/darkLightTheme";
// import './CSS/LoadingComp.module.css';



interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
    const theme = useContext(ThemeContext);

    return (
        <main
            style={{
                backgroundColor: theme.background, color: theme.color, minHeight: "100vh", display:"flex",
                justifyContent:"center", alignItems:"center", height:"calc(100vh - 60px)"}}>
            <div className= "loader">
                <div className="circle">
                    <div className="dot"></div>
                    <div className="outline"></div>
                </div>
                <div className="loader">
                    <div className="dot"></div>
                    <div  className="outline"></div>
                </div>
                <div  className="circle">
                    <div className="dot"></div>
                    <div  className="outline"></div>
                </div>
                <div className="circle">
                    <div className="dot"></div>
                    <div  className="outline"></div>
                </div>
            </div>
        </main>
    );
};

export default Loading;
