import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IAnnouncement, IAnnouncementCreate, IAnnouncementEdit, IAnnouncementOwner, IComments } from "@/types/announcements";
import { Box, useToast } from "@chakra-ui/react";
import nookies, { setCookie } from 'nookies'
import removeEmptyStrings from "@/utils/removeEmptyStrings";


interface AnnouncementProviderData {
	allAnnouncements: IAnnouncement[] | any;
	setAllAnnouncements: React.Dispatch<React.SetStateAction<IAnnouncement[] | any>>;
	allFilteredAnnouncements: IAnnouncement[];
	setAllFilteredAnnouncements: React.Dispatch<
	React.SetStateAction<IAnnouncement[] | any>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	announcementsByOwner: IAnnouncement[] | undefined;
	getOwnerById: (ownerId: string | undefined) => Promise<void>;
	ownerId: string | undefined;
	setOwnerId: React.Dispatch<React.SetStateAction<string | undefined>>;
	owner: IAnnouncementOwner | undefined;
	filterData: IFilters | undefined;
	actualFilters: IFilters | undefined;
	setActualFilters: React.Dispatch<
	React.SetStateAction<IFilters | undefined>>;
	selectedFilters: ISelectedFilter;
	setSelectedFilters: React.Dispatch<React.SetStateAction<ISelectedFilter>>;
	getAllAnnouncements: () => Promise<void>;
	paginationPage: number;
	setPaginationPage: React.Dispatch<React.SetStateAction<number>>;
	createAnnouncement: (dataForm: IAnnouncementCreate) => void
	editAnnouncement: (dataForm: IAnnouncementEdit) => void
	deleteAnnouncement: () => void
	getComments: (announcement_id: string) => void
	comments: IComments[] | undefined
	getAnnouncementById(announcement_id: string): Promise<void>
	announcementById: IAnnouncement
}

export interface IFilters {
	brand: string[];
	model: string[];
	color: string[];
	year: string[];
	fuel: string[];
}
export interface ISelectedFilter {
	brand?: string;
	model?: string;
	color?: string;
	year?: string;
	fuel?: string;
	min_km?: string;
	max_km?: string;
	min_price?: string;
	max_price?: string;
}

export interface IProviderProps {
	children: ReactNode;
}

export const AnnouncementContext = createContext<AnnouncementProviderData>(
	{} as AnnouncementProviderData
);

export const AnnouncementProvider = ({ children }: IProviderProps) => {
	const router = useRouter();
	const [allAnnouncements, setAllAnnouncements] = useState();
	const [allFilteredAnnouncements, setAllFilteredAnnouncements] = useState(
		[]
	);
	const [paginationPage, setPaginationPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [announcementsByOwner, setAnnouncementsByOwner] = useState<
		IAnnouncement[] | undefined
	>();
	const [announcementById, setAnnouncementById] = useState({} as IAnnouncement)
	const [ownerId, setOwnerId] = useState<string>();
	const [owner, setOwner] = useState<IAnnouncementOwner>();
	const [filterData, setFilterData] = useState<IFilters | undefined>();
	const [actualFilters, setActualFilters] = useState<IFilters | undefined>();
	const [selectedFilters, setSelectedFilters] = useState<ISelectedFilter>({});
	const [ comments, setComments ] = useState<IComments[] | undefined>()
    const toast = useToast()

    async function createAnnouncement(dataForm: IAnnouncementCreate) {
        try {
            await api.post("/annoucements", dataForm)
        } catch (err){
            toast({
                title: "error",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"red.700"} fontWeight={"500"}>
                            Ops!! Verifique seus dados e tente novamente!
                        </Box>
                    )
                }
            })
        }
    }

	async function editAnnouncement (dataForm: IAnnouncementEdit) {
		const announcId = nookies.get()['announcId']
		const data = removeEmptyStrings(dataForm)
        try {
            await api.patch(`/annoucements/${announcId}`, data)
        } catch (err){
            toast({
                title: "error",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"red.700"} fontWeight={"500"}>
                            Ops!! Verifique seus dados e tente novamente!
                        </Box>
                    )
                }
            })
			console.log(err)
        }
    }

	async function deleteAnnouncement () {
		const announcId = nookies.get()['announcId']
        try {
            await api.delete(`/annoucements/${announcId}`)
        } catch (err){
            toast({
                title: "error",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"red.700"} fontWeight={"500"}>
                            Ops!! Verifique seus dados e tente novamente!
                        </Box>
                    )
                }
            })
        }
    }

	async function getAllAnnouncements() {
		try {
			const { data } = await api.get(
				`/annoucements?limit=12&page=${paginationPage}`
			);
			setAllAnnouncements(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function getAllAnnoucementFilterTypes() {
		const { data } = await api.get<IFilters>("/annoucements/filters");
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

	async function getAnnouncementById(announcement_id: string) {
		try {
			if(announcement_id) {
				setCookie(null, "announcId", announcement_id)
			} else {
				announcement_id = nookies.get()['announcId']
			}
			const { data } = await api.get(`/annoucements/${announcement_id}`);
			setAnnouncementById(data)
		} catch (err) {
			console.log(err)
		}
	}

	async function getComments(announcement_id: string){
		try {
			const { data } = await api.get(`/annoucements/${announcement_id}/comments`)
      		setComments(data)
		} catch (err) {
			console.error(err)
		}finally{
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}
  

	useEffect(() => {
		getAllAnnouncements();
		asyncLoad();
		async function asyncLoad() {
			const data = await getAllAnnoucementFilterTypes();
			setFilterData(data);
			setActualFilters(data);
		}
	}, [paginationPage]);

	return (
		<AnnouncementContext.Provider
			value={{ 
				createAnnouncement,
				editAnnouncement,
				deleteAnnouncement,
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
				actualFilters,
				filterData,
				setActualFilters,
				selectedFilters,
				setSelectedFilters,
				getAllAnnouncements,
				paginationPage,
				setPaginationPage,
				getComments,
				comments,
				getAnnouncementById,
				announcementById
			}}>
			{children}
		</AnnouncementContext.Provider>
	);
};
export const annoucementCtx = () => useContext(AnnouncementContext);