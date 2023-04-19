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
  useConst
} from "@chakra-ui/react";
import TextArea from "./textArea";
import Buttons from "./button";
import { useState } from "react";

const AnnouncementModal = ({
    
//   modalTitle,
//   titlesColor,
//   modalButtons,
//   nameButton,
//   sizeTitle,
//   footerDirection,
//   footerWidth,
//   modalButtonColor,
//   modalButtonBg,
//   buttonWidth,
}) => {
    const [galleryImage, setGalleryImage] = useState([0]);
    const addImage = () => {
        setGalleryImage([...galleryImage, galleryImage.length]);
        console.log(galleryImage)
    }
    const modalContent = (
      <Box gap={"24px"} display={"flex"} flexDir={"column"}>
        <Text fontSize={"14px"}>Infomações do veículo</Text>
        <InputForm
          labeltext={"Marca"}
          inputtype={"text"}
          inputplaceholder={"Mercedes Benz"}
          isRequired={true}
        ></InputForm>

        <InputForm
          labeltext={"Modelo"}
          inputtype={"text"}
          inputplaceholder={"A 200 CGI ADVANCE SEDAN"}
          isRequired={true}
        ></InputForm>

        <HStack gap={"14px"}>
          <InputForm
            labeltext={"Ano"}
            inputtype={"text"}
            inputplaceholder={"2018"}
            isRequired={true}
          ></InputForm>

          <InputForm
            labeltext={"Combustível"}
            inputtype={"text"}
            inputplaceholder={"Gasolina / Etanol"}
            isRequired={true}
          ></InputForm>
        </HStack>

        <HStack gap={"14px"}>
          <InputForm
            labeltext={"Quilometragem"}
            inputtype={"text"}
            inputplaceholder={"30.000"}
            isRequired={true}
          ></InputForm>

          <InputForm
            labeltext={"Cor"}
            inputtype={"text"}
            inputplaceholder={"Branco"}
            isRequired={true}
          ></InputForm>
        </HStack>

        <HStack gap={"14px"}>
          <InputForm
            labeltext={"Preço tabela FIPE"}
            inputtype={"text"}
            inputplaceholder={"R$ 48.000,00"}
            isRequired={true}
          ></InputForm>

          <InputForm
            labeltext={"Preço"}
            inputtype={"text"}
            inputplaceholder={"R$ 50.000,00"}
            isRequired={true}
          ></InputForm>
        </HStack>

        <FormControl isRequired>
          <FormLabel>Descrição</FormLabel>
          <TextArea
            labelText={"Descrição"}
            placeHolder={"Descreva o carro..."}
          ></TextArea>
        </FormControl>

        <InputForm
          labeltext={"Imagem da Capa"}
          inputtype={"text"}
          inputplaceholder={"https://image.com"}
          isRequired={true}
        ></InputForm>

        {galleryImage.map((item: any, index: any) => (
          <InputForm key={index}
            labeltext={`${index + 1}º Imagem da Galeria`}
            inputtype={"text"}
            inputplaceholder={"https://image.com"}
            isRequired={true}
          ></InputForm>
        ))}

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
          />

          <Buttons
            backgroundColor={"#B0A6F0"}
            valueButton={"Criar anúncio"}
            color={"#EDEAFD"}
            fontSize={"16px"}
          />
        </ButtonGroup>
      </Box>
    );
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
            />
    );}
};

export default AnnouncementModal