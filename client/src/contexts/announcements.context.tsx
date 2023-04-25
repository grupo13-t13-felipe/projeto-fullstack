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
	allFilteredAnnouncements: IAnnouncement[];
	setAllFilteredAnnouncements: React.Dispatch<
		React.SetStateAction<IAnnouncement[] | any>
	>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	announcementsByOwner: IAnnouncement[] | undefined;
	getOwnerById: (ownerId: string | undefined) => Promise<void>;
	ownerId: string | undefined;
	setOwnerId: React.Dispatch<React.SetStateAction<string | undefined>>;
	owner: IAnnouncementOwner | undefined;
	getAllAnnoucementFilterTypes: () => Promise<IFilters>;
	filterData: IFilters | undefined;
	setFilterData: React.Dispatch<React.SetStateAction<IFilters | undefined>>;
}

interface IFilters {
	brand: string[];
	model: string[];
	color: string[];
	year: string[];
	fuel: string[];
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
	const [allFilteredAnnouncements, setAllFilteredAnnouncements] = useState(
		[]
	);
	const [filterData, setFilterData] = useState<IFilters | undefined>();
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

	async function getAllAnnoucementFilterTypes() {
		const { data } = await api.get<IFilters>("/annoucements/filters");
		console.log(data);
		return data;
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
				allFilteredAnnouncements,
				setAllFilteredAnnouncements,
				loading,
				setLoading,
				announcementsByOwner,
				getOwnerById,
				ownerId,
				setOwnerId,
				owner,
				getAllAnnoucementFilterTypes,
				filterData,
				setFilterData,
			}}>
			{children}
		</AnnouncementContext.Provider>
	);
};

export const annoucementCtx = () => useContext(AnnouncementContext);
