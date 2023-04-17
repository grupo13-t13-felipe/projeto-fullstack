
export interface IImage {
    id: string,
    url: string,
    annoucement_id: string
}

export interface IAnnoucement {
    id: string,
    model: string,
    brand: string, 
    year: string,
	fuel: string,
	km: string,
    color: string,
    fip_price: string,
	price: string,
	description: string,
	cover_image: string,
	is_active: boolean,
	created_at: Date,
	updated_at: Date,
	owner_id: string,
    gallery_images: IImage[]
}

export interface Props {
    announcements: IAnnoucement[]
}

