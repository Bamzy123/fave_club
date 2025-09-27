import React from 'react';

type IconProps = {
    className?: string;
}

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
    </svg>
);

export const MusicIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z" />
    </svg>
);

export const SuiIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12.28 2.05a1 1 0 0 0-1.08.22L3.5 10.32a.5.5 0 0 0 .34.86h5.45a.25.25 0 0 1 .25.25v1.62a.5.5 0 0 0 .76.42l5.48-3.76a1 1 0 0 0 .42-1.28l-3.3-8.05a1 1 0 0 0-1.14-.35z"></path>
        <path d="M14.65 11.18h-5.45a.25.25 0 0 0-.25.25v1.62a.5.5 0 0 1-.76.42l-5.48-3.76a1 1 0 0 1-.42-1.28l.8-1.95a.5.5 0 0 0 .1.7l3.3 8.05c.2.5.78.7 1.28.42l10.8-7.4a.5.5 0 0 0-.1-.86h-4.06a.5.5 0 0 0-.42.23l-1.34 2.5z"></path>
        <path d="M11.72 21.95a1 1 0 0 0 1.08-.22l7.7-8.05a.5.5 0 0 0-.34-.86h-5.45a.25.25 0 0 1-.25-.25v-1.62a.5.5 0 0 0-.76-.42l-5.48 3.76a1 1 0 0 0-.42 1.28l3.3 8.05a1 1 0 0 0 1.14.35z"></path>
    </svg>
);