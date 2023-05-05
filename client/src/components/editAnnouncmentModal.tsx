import { InputForm } from "./input";
import Modals from "./modal";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  VStack,
  Box,
  HStack,
  ButtonGroup,
  useConst,
  useDisclosure,
  Textarea,
  Input,
  ModalCloseButton
} from "@chakra-ui/react";
import TextArea from "./textArea";
import Buttons from "./button";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAnnouncementCreate } from "@/types/announcements";
import { AnnouncementContext, annoucementCtx } from "@/contexts/announcements.context";
import { createAnnouncementSchema, editAnnouncementSchema } from "@/schemas/annoucement.schema";
import DefaultForm from "./form";
import { useForm } from "react-hook-form";
import { destroyCookie, setCookie } from "nookies";
import DeleteAnnouncementModal from "./deleteAnnouncmentModal";

interface editProps {
  announcId: string
  announcementInfo: {
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
    //gallery_images?: string[]
  }
}

const EditAnnouncementModal = ({ announcId, announcementInfo }: editProps) => {
    const { editAnnouncement } = useContext(AnnouncementContext)

    const { register, handleSubmit, formState: { errors } } = useForm<IAnnouncementCreate>({
      resolver: yupResolver(editAnnouncementSchema)
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [galleryImage, setGalleryImage] = useState([0]);
    const addImage = () => {
        setGalleryImage([...galleryImage, galleryImage.length]);
        console.log(galleryImage)
    }
    const setCurrentAnnouncement = () => setCookie(null, "announcId", announcId, { maxAge: 3600 * 24, path: "/" })
    const resetCurrentAnnouncement = () => destroyCookie(null, "announcId")
  
    const modalContent =
      <>
        <form onSubmit={handleSubmit(editAnnouncement)}>
          <Box gap={"24px"} display={"flex"} flexDir={"column"}>
            <HStack>
              <Text fontSize={"14px"}>Infomações do veículo</Text>
              <ModalCloseButton/>
            </HStack>
              
            <InputForm
              isInvalid={!!errors.brand?.message}
              errors={errors.brand?.message}
              inputregister={{...register("brand")}}
              labeltext={"Marca"}
              inputtype={"text"}
              inputplaceholder={announcementInfo.brand}
              
            ></InputForm>

            <InputForm
              isInvalid={!!errors.model?.message}
              inputregister={{ ...register("model") }}
              errors={errors.model?.message}
              labeltext={"Modelo"}
              inputtype={"text"}
              inputplaceholder={announcementInfo.model}
              
            ></InputForm>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.year?.message}
                inputregister={{ ...register("year") }}
                errors={errors.year?.message}
                labeltext={"Ano"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.year}
                
              ></InputForm>

              <InputForm
                isInvalid={!!errors.fuel?.message}
                inputregister={{ ...register("fuel") }}
                errors={errors.fuel?.message}
                labeltext={"Combustível"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.fuel}
                
              ></InputForm>
            </HStack>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.km?.message}
                inputregister={{ ...register("km") }}
                errors={errors.km?.message}
                labeltext={"Quilometragem"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.km}
                
              ></InputForm>

              <InputForm
                isInvalid={!!errors.color?.message}
                inputregister={{ ...register("color") }}
                errors={errors.color?.message}
                labeltext={"Cor"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.color}
                
              ></InputForm>
            </HStack>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.fip_price?.message}
                inputregister={{ ...register("fip_price") }}
                errors={errors.fip_price?.message}
                labeltext={"Preço tabela FIPE"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.fip_price}
                
              ></InputForm>

              <InputForm
                isInvalid={!!errors.price?.message}
                inputregister={{ ...register("price") }}
                errors={errors.price?.message}
                labeltext={"Preço"}
                inputtype={"text"}
                inputplaceholder={announcementInfo.price}
                
              ></InputForm>
            </HStack>

            <FormControl isInvalid={!!errors.description?.message}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                {...register("description")}
                placeholder={announcementInfo.description}
                resize={"none"}
              ></Textarea>
              <FormErrorMessage mt={"4px"} position={"absolute"}>
                {errors.model?.message}
              </FormErrorMessage>
            </FormControl>

            <InputForm
              isInvalid={!!errors.cover_image?.message}
              inputregister={{ ...register("cover_image") }}
              errors={errors.cover_image?.message}
              labeltext={"Imagem da Capa"}
              inputtype={"text"}
              inputplaceholder={announcementInfo.cover_image}
              
            ></InputForm>
            <div>
              {galleryImage.map((item: any, index: any) => (
                  <InputForm key={index}
                id={index}
                // isInvalid={!!errors.gallery_images?.message}
                // inputregister={{ ...register("gallery_images") }}
                errors={errors.gallery_images?.message}
                labeltext={`${index + 1}º Imagem da Galeria`}
                inputtype={"text"}
                inputplaceholder={"https://image.com"}
                isRequired={false} 
                inputregister={undefined}               
                ></InputForm>
              ))}
            </div>
            <Buttons
              backgroundColor={"#EDEAFD"}
              valueButton={"Adicionar campo para imagem da Galeria"}
              color={"#4529E6"}
              fontSize={"14px"}
              width={"315px"}
              maxWidth={"95%"}
              onClick={addImage}
            />

            <ButtonGroup ml={"auto"} mt={"18px"} mb={"0px"}>
              <DeleteAnnouncementModal/>
              <Buttons
                backgroundColor={"#4529E6"}
                valueButton={"Salvar Alterações"}
                color={"#EDEAFD"}
                fontSize={"16px"}
                type={"submit"}
              />
            </ButtonGroup>
          </Box>
        </form> 
      </>
    
    {
      
        return (
            <Modals
            modalTitle={"Editar anúncio"}
            sizeTitle={"1em"}
            modalContent={modalContent}
            buttonWidth={"80px"}
            nameButton={"Editar"}
            modalButtonColor={"#212529"}
            modalButtonBg={"#FDFDFD"}
            buttonRadius={"4px"}
            buttonBorder={"2px"}
            buttonBorderColor={"#212529"}
            isOpen={isOpen}
            onOpen={() => { setCurrentAnnouncement(), setGalleryImage([0]); onOpen() }}
            onClose={onClose} 
            titlesColor={""} 
            modalButtons={""} 
            footerDirection={""} 
            footerWidth={""} />
    );}
};

export default EditAnnouncementModal