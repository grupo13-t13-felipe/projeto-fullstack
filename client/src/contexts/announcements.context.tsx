import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IAnnouncement, IAnnouncementOwner } from "@/types/announcements";
import { UserContext } from "./users.context";

interface AnnouncementProviderData {
	allAnnouncements: IAnnouncement[] | any;
	setAllAnnouncements: React.Dispatch<
		React.SetStateAction<IAnnouncement[] | any>
	>;
	allFilterAnnouncements: IAnnouncement[];
	setAllFilterAnnouncements: React.Dispatch<
		React.SetStateAction<IAnnouncement[] | any>
	>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	announcementsByOwner: IAnnouncement[] | undefined;
	getOwnerById: (ownerId: string | undefined) => Promise<void>;
	ownerId: string | undefined;
	setOwnerId: React.Dispatch<React.SetStateAction<string | undefined>>;
	owner: IAnnouncementOwner | undefined;
}

export interface IProviderProps {
	children: ReactNode;
}

const AnnouncementContext = createContext<AnnouncementProviderData>(
	{} as AnnouncementProviderData
);

export const AnnouncementProvider = ({ children }: IProviderProps) => {
	const router = useRouter();
	const [allAnnouncements, setAllAnnouncements] = useState();
	const [allFilterAnnouncements, setAllFilterAnnouncements] = useState([]);
	const [loading, setLoading] = useState(true);
	const [announcementsByOwner, setAnnouncementsByOwner] = useState<
		IAnnouncement[] | undefined
	>();
	const [ownerId, setOwnerId] = useState<string>();
	const [owner, setOwner] = useState<IAnnouncementOwner>();
	const { user } = useContext(UserContext);

	async function getAllAnnouncements() {
		try {
			const { data } = await api.get("/annoucements");
			setAllAnnouncements(data.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function getAllAnnouncementsByIdOwner(ownerId: string) {
		try {
			const { data } = await api.get(`/annoucements?owner_id=${ownerId}`);
			setAnnouncementsByOwner(data.data);
		} catch (error) {
			console.error(error);
		} finally {
			setTimeout(() => {
				setLoading(false);
				router.push("/announcements");
			}, 1000);
		}
	}

	async function getOwnerById(ownerId: string | undefined) {
		try {
			const { data } = await api.get(`/users/${ownerId}`);
			setOwner(data);
			getAllAnnouncementsByIdOwner(ownerId!);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getAllAnnouncements();
	}, []);

	return (
		<AnnouncementContext.Provider
			value={{
				allAnnouncements,
				setAllAnnouncements,
				allFilterAnnouncements,
				setAllFilterAnnouncements,
				loading,
				setLoading,
				announcementsByOwner,
				getOwnerById,
				ownerId,
				setOwnerId,
				owner,
			}}>
			{children}
		</AnnouncementContext.Provider>
	);
};

export const annoucementCtx = () => useContext(AnnouncementContext);
