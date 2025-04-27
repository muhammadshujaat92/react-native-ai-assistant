import { fetchData } from "@/utils/helper";
import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
    scanedTranslation: string;
    setScanedTranslation: React.Dispatch<React.SetStateAction<string>>;
    chats: any;
    refreshChats: any;
}
interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [scanedTranslation, setScanedTranslation] = useState<string>('');
    const [chats, setChats] = useState([]);

    const refreshChats = async () => {
        const res = await fetchData(null, 'api/chats');
        setChats(res);
    };

    return (
        <AppContext.Provider value={{ scanedTranslation, setScanedTranslation, chats, refreshChats }}>
            {children}
        </AppContext.Provider>
    );
};