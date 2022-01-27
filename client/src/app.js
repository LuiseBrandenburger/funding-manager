import { BrowserRouter, Route, Link } from "react-router-dom";
import Projects from "./components/project-components/projects";
import Dashboard from "./components/dashboard-components/dashboard";

export default function App() {
    return (
        <div className="main-container">
            <BrowserRouter>
                <div className="main-row-left navigation-left">
                    <div className="navbar-left">
                        <div className="avatar logo">
                            <img src="/blur-background.svg" alt="" />
                        </div>

                        <div className="navbar-left-container">
                            <a href="/logout">
                                <div className="avatar">
                                    <img src="/logout.svg" alt="" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT RIGHT SIDE */}

                <div className="main-row-right">
                    <div className="navigation-top">
                        <nav className="navbar-top">
                            <ul>
                                <Link to="/dashboard">
                                    <li>Dashboard</li>
                                </Link>
                                <Link to="/projects">
                                    <li>Projects</li>
                                </Link>
                            </ul>
                            <div className="avatar">
                                <img src="/default-profile.gif" alt="" />
                            </div>
                        </nav>
                    </div>

                    <div className="main-content-container">
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/projects">
                            <Projects />
                        </Route>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}
