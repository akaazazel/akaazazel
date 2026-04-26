import React, { useState, useEffect, useRef } from "react";
import { Mail, ArrowUpRight, Sun, Moon } from "lucide-react";
import profile from "./data/profile.json";
import experience from "./data/experience.json";
import projects from "./data/projects.json";
import skills from "./data/skills.json";
import education from "./data/education.json";
import gallery from "./data/gallery.json";

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light",
    );
    const [viewMode, setViewMode] = useState("home");
    const [lightboxImage, setLightboxImage] = useState(null);
    const [isLarryLocked, setIsLarryLocked] = useState(false);
    const larryTimerRef = useRef(null);

    const handleProfileClick = () => {
        if (isLarryLocked) {
            setIsLarryLocked(false);
            if (larryTimerRef.current) clearTimeout(larryTimerRef.current);
        } else {
            setIsLarryLocked(true);
            larryTimerRef.current = setTimeout(() => {
                setIsLarryLocked(false);
            }, 5000);
        }
    };

    useEffect(() => {
        return () => {
            if (larryTimerRef.current) clearTimeout(larryTimerRef.current);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <main>
            <button className="theme-toggle" onClick={toggleTheme}>
                <div className="flex" style={{ gap: "0.4rem" }}>
                    {theme === "light" ? (
                        <Sun className="icon" />
                    ) : (
                        <Moon className="icon" />
                    )}
                    <span>{theme === "light" ? "Sun" : "Moon"}</span>
                </div>
            </button>

            <header>
                <div className="header-top">
                    {profile.image && (
                        <div 
                            className={`profile-image-container ${isLarryLocked ? 'larry-locked' : ''}`}
                            onClick={handleProfileClick}
                        >
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="profile-image original"
                            />
                            <img
                                src="/larry.png"
                                alt="Larry"
                                className="profile-image larry"
                            />
                        </div>
                    )}
                    <div className="header-info">
                        {profile.availableForWork && (
                            <div className="status-pill">
                                <span className="status-dot"></span>
                                {profile.statusText}
                            </div>
                        )}
                        <h1>{profile.name}</h1>
                    </div>
                </div>

                <p className="header-tagline">{profile.tagline}</p>

                <div className="social-links">
                    <a href={`mailto:${profile.email}`} className="flex">
                        Email
                    </a>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex"
                    >
                        GitHub
                    </a>
                    <a href={profile.linkedin} className="flex">
                        LinkedIn
                    </a>
                    <a href={profile.instagram} className="flex">
                        Instagram
                    </a>
                    <button 
                        onClick={() => setViewMode(viewMode === 'home' ? 'gallery' : 'home')} 
                        className="flex toggle-link-button"
                    >
                        {viewMode === 'home' ? 'Gallery' : 'Home'}
                    </button>
                </div>
            </header>

            <hr />

            {viewMode === "home" ? (
                <>
                    <section>
                        <h2>I KNOW</h2>
                        <div className="tag-container">
                            {skills.map((skill, index) => (
                                <span key={index} className="tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>EXP</h2>
                        <ul className="simple-cards">
                            {experience.map((job, index) => (
                                <li key={index} className="simple-card">
                                    <div className="simple-card-header">
                                        <div className="item-title">
                                            {job.title} - {job.company}
                                        </div>
                                        <div className="item-meta">{job.period}</div>
                                    </div>
                                    {job.description && (
                                        <div className="item-desc">
                                            {job.description}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>STUDI</h2>
                        <ul className="simple-cards">
                            {education.map((edu, index) => (
                                <li key={index} className="simple-card">
                                    <div className="simple-card-header">
                                        <div className="item-title">{edu.degree}</div>
                                        <div className="item-meta">{edu.period}</div>
                                    </div>
                                    <div className="item-desc">{edu.institution}</div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>Mentioned Stuffs</h2>
                        <div className="projects-scroll-container">
                            {projects.map((project, index) => (
                                <div key={index} className="project-card">
                                    {project.image && (
                                        <div className="project-image-wrapper">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="project-image"
                                            />
                                        </div>
                                    )}
                                    <div className="project-content">
                                        <h3 className="project-title">
                                            {project.name}
                                        </h3>
                                        <p className="project-desc">
                                            {project.description}
                                        </p>

                                        {project.tags && project.tags.length > 0 && (
                                            <div className="project-tags">
                                                {project.tags.map((tag, tIndex) => (
                                                    <span
                                                        key={tIndex}
                                                        className="project-tag"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="project-links">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label="GitHub Repository">
                                                    <span>[ Code ]</span>
                                                </a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noreferrer" className="project-link" aria-label="Live Project">
                                                    <span>[ Visit ]</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <section>
                    <h2>GALLERY</h2>
                    <div className="gallery-grid">
                        {gallery.map((item, index) => (
                            <div key={index} className="gallery-item" onClick={() => setLightboxImage(item)}>
                                <div className="gallery-thumbnail-wrapper">
                                    <img src={item.image} alt={item.caption} loading="lazy" className="gallery-thumbnail" />
                                </div>
                                <div className="gallery-item-info">
                                    <span className="gallery-caption">{item.caption}</span>
                                    <span className="gallery-date">{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <hr />

            <footer style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                <p>
                    © {new Date().getFullYear()} {profile.name}. 67.
                </p>
            </footer>

            {lightboxImage && (
                <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
                    <div className="lightbox-content">
                        <img src={lightboxImage.image} alt={lightboxImage.caption} className="lightbox-image" />
                        <div className="lightbox-info">
                            <span className="lightbox-caption">{lightboxImage.caption}</span>
                            <span className="lightbox-date">{lightboxImage.date}</span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default App;
