import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Language = {
    code: string;
    name: string;
    flag: string;
};

const languages: Language[] = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('preferredLanguage', lng);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.language-selector')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
            i18n.changeLanguage(savedLanguage);
        }
        document.body.dir = i18n.dir();
    }, [i18n]);

    const currentLanguage = languages.find(lng => lng.code === i18n.language);

    return (
        <div className="language-selector">
            <button 
                className="lang-btn-current"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                aria-expanded={isOpen}
            >
                <span className="lang-flag">{currentLanguage?.flag}</span>
                <span className="lang-name">{currentLanguage?.name}</span>
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className="lang-dropdown-content">
                    {languages.map((lng) => (
                        <button
                            key={lng.code}
                            onClick={() => changeLanguage(lng.code)}
                            className={`lang-option ${lng.code === i18n.language ? 'selected' : ''}`}
                        >
                            <span className="lang-flag">{lng.flag}</span>
                            <span className="lang-name">{lng.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;