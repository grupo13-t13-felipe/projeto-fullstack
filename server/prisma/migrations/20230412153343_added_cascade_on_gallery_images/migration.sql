-- DropForeignKey
ALTER TABLE "GalleryImage" DROP CONSTRAINT "GalleryImage_annoucement_id_fkey";

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_annoucement_id_fkey" FOREIGN KEY ("annoucement_id") REFERENCES "Annoucement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
