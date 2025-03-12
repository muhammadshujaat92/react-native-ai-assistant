import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
    scanedTranslation: string;
    setScanedTranslation: React.Dispatch<React.SetStateAction<string>>;
}
interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [scanedTranslation, setScanedTranslation] = useState<string>('');

    return (
        <AppContext.Provider value={{ scanedTranslation, setScanedTranslation }}>
            {children}
        </AppContext.Provider>
    );
};