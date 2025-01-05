import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../services/darkLightTheme";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const theme = useContext(ThemeContext);
    return (
        <main style={{ backgroundColor: theme.background, color: theme.color }}>
            <div className="container-fluid d-flex align-items-start justify-content-center vh-100">
                <p className="lilita-one-regular mt-5">Page Not Found 👀 </p>
            </div>
        </main>
    );
};

export default PageNotFound;
