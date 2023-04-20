
export interface IImage {
    id: string,
    url: string,
    annoucement_id: string
}

export interface IAnnouncementOwner {
    id: string,
    name: string
    description?: string
}

export interface IAnnouncement {
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
    gallery_images: IImage[],
    owner: IAnnouncementOwner
}

export interface Props {
    announcements: IAnnouncement[]
}

