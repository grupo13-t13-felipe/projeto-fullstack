import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import api from "@/services/api"
import { IAnnouncement } from "@/types/announcements";


interface AnnouncementProviderData {
    allAnnouncements: IAnnouncement[] | any;
    setAnnouncement: React.Dispatch<React.SetStateAction<IAnnouncement[] | any>>
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IProviderProps {
    children: ReactNode
}

const AnnouncementContext = createContext<AnnouncementProviderData>({} as AnnouncementProviderData)

export const AnnouncementProvider = ({children}: IProviderProps) => {
    const router = useRouter()
    const [allAnnouncements, setAnnouncement] = useState()
    const [loading, setLoading] = useState(true)

    async function getAllAnnouncements() {

        try {
            const {data} = await api.get("/annoucements")
            setLoading(false)   
            setAnnouncement(data.data)
        }
        catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
       
        getAllAnnouncements()
    }, [])


    return (
        <AnnouncementContext.Provider value={{allAnnouncements, setAnnouncement, loading, setLoading}}>
            {children}
        </AnnouncementContext.Provider>
    )
}

export const annoucementCtx = () => useContext(AnnouncementContext)