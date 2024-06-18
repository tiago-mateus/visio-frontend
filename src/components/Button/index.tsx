import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string[];
    active: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, active, ...props }, ref) => {
        return (
            <button
                ref={ref}
                {...props}
                className={`text-white border-solid border rounded-lg p-4 w-full active:opacity-60 
                    ${active ? 'bg-emerald-950 border-green-500' : 'opacity-50 border-gray-500 bg-gray-700'}`}
            >
                {text.map((texto, index) => (
                    <p key={index} className="text-white italic">{texto}</p>
                ))}
            </button>
        );
    }
);
