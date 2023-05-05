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
  Input
} from "@chakra-ui/react";
import TextArea from "./textArea";
import Buttons from "./button";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAnnouncementCreate } from "@/types/announcements";
import { AnnouncementContext, annoucementCtx } from "@/contexts/announcements.context";
import { createAnnouncementSchema } from "@/schemas/annoucement.schema";
import DefaultForm from "./form";
import { useForm } from "react-hook-form";

const AnnouncementModal = () => {
    const { createAnnouncement } = useContext(AnnouncementContext)

    const { register, handleSubmit, formState: { errors } } = useForm<IAnnouncementCreate>({
      resolver: yupResolver(createAnnouncementSchema)
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [galleryImage, setGalleryImage] = useState([0]);
    const addImage = () => {
        setGalleryImage([...galleryImage, galleryImage.length]);
        console.log(galleryImage)
    }
  
    const modalContent =
      <>
        <form onSubmit={handleSubmit(createAnnouncement)}>
          <Box gap={"24px"} display={"flex"} flexDir={"column"}>
            <Text fontSize={"14px"}>Infomações do veículo</Text>
            <InputForm
              isInvalid={!!errors.brand?.message}
              errors={errors.brand?.message}
              inputregister={{...register("brand")}}
              labeltext={"Marca"}
              inputtype={"text"}
              inputplaceholder={"Mercedes Benz"}
              isRequired={true}
            ></InputForm>

            <InputForm
              isInvalid={!!errors.model?.message}
              inputregister={{ ...register("model") }}
              errors={errors.model?.message}
              labeltext={"Modelo"}
              inputtype={"text"}
              inputplaceholder={"A 200 CGI ADVANCE SEDAN"}
              isRequired={true}
            ></InputForm>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.year?.message}
                inputregister={{ ...register("year") }}
                errors={errors.year?.message}
                labeltext={"Ano"}
                inputtype={"text"}
                inputplaceholder={"2018"}
                isRequired={true}
              ></InputForm>

              <InputForm
                isInvalid={!!errors.fuel?.message}
                inputregister={{ ...register("fuel") }}
                errors={errors.fuel?.message}
                labeltext={"Combustível"}
                inputtype={"text"}
                inputplaceholder={"Gasolina / Etanol"}
                isRequired={true}
              ></InputForm>
            </HStack>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.km?.message}
                inputregister={{ ...register("km") }}
                errors={errors.km?.message}
                labeltext={"Quilometragem"}
                inputtype={"text"}
                inputplaceholder={"30.000"}
                isRequired={true}
              ></InputForm>

              <InputForm
                isInvalid={!!errors.color?.message}
                inputregister={{ ...register("color") }}
                errors={errors.color?.message}
                labeltext={"Cor"}
                inputtype={"text"}
                inputplaceholder={"Branco"}
                isRequired={true}
              ></InputForm>
            </HStack>

            <HStack gap={"14px"}>
              <InputForm
                isInvalid={!!errors.fip_price?.message}
                inputregister={{ ...register("fip_price") }}
                errors={errors.fip_price?.message}
                labeltext={"Preço tabela FIPE"}
                inputtype={"text"}
                inputplaceholder={"R$ 48.000,00"}
                isRequired={true}
              ></InputForm>

              <InputForm
                isInvalid={!!errors.price?.message}
                inputregister={{ ...register("price") }}
                errors={errors.price?.message}
                labeltext={"Preço"}
                inputtype={"text"}
                inputplaceholder={"R$ 50.000,00"}
                isRequired={true}
              ></InputForm>
            </HStack>

            <FormControl isRequired isInvalid={!!errors.description?.message}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                {...register("description")}
                placeholder={"Descreva o carro..."}
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
              inputplaceholder={"https://image.com"}
              isRequired={true}
            ></InputForm>
            <div>
              {/* {galleryImage.map((item: any, index: any) => (
                  <InputForm key={index}
                    id={index}
                    // isInvalid={!!errors.gallery_images?.message}
                    // inputregister={{ ...register("gallery_images") }}
                    errors={errors.gallery_images?.message}
                    labeltext={`${index + 1}º Imagem da Galeria`}
                    inputtype={"text"}
                    inputplaceholder={"https://image.com"}
                    isRequired={false}
                  ></InputForm>
              ))} */}
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
              <Buttons
                backgroundColor={"#DEE2E6"}
                valueButton={"Cancelar"}
                color={"#495057"}
                fontSize={"16px"}
                onClick={onClose}
              />

              <Buttons
              backgroundColor={"#4529E6"}
                valueButton={"Criar anúncio"}
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
            modalTitle={"Criar anúncio"}
            sizeTitle={"1em"}
            modalContent={modalContent}
            buttonWidth={"160px"}
            nameButton={"Criar anuncio"}
            modalButtonColor={"#4529E6"}
            modalButtonBg={"#FDFDFD"}
            buttonRadius={"4px"}
            buttonBorder={"2px"}
            buttonBorderColor={"#4529E6"}
            isOpen={isOpen}
            onOpen={() => {  setGalleryImage([0]); onOpen() }}
            onClose={() => { onClose()}} 
            titlesColor={""} 
            modalButtons={""} 
            footerDirection={""} 
            footerWidth={""} />
    );}
};

export default AnnouncementModal