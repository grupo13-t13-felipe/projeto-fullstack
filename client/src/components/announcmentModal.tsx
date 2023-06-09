import { InputForm } from "./input";
import Modals from "./modal";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Box,
  HStack,
  ButtonGroup,
  useDisclosure,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import Buttons from "./button";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { IAnnouncementCreate } from "@/types/announcements";
import { AnnouncementContext } from "@/contexts/announcements.context";
import { createAnnouncementSchema } from "@/schemas/annoucement.schema";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

interface IModel {
  id?: string;
	name?: string;
	brand?: string;
	year?: string;
	fuel?: string;
	value?: string;
}

const AnnouncementModal = () => {
    const { createAnnouncement } = useContext(AnnouncementContext)

    const { register, control, handleSubmit, formState: { errors } } = useForm<IAnnouncementCreate>({
      resolver: yupResolver(createAnnouncementSchema),
      defaultValues: {
        gallery_image: [{url: ""}]
      },
      mode: "onBlur"
    });
    const { fields, append, remove } = useFieldArray({
      control,
      name: "gallery_image",
    })
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const fipUrl = axios.create({
	    baseURL: "https://kenzie-kars.herokuapp.com",
    });
    const [selectedBrandAlready, setSelectedBrandAlready] = useState(2)
    const [selectedModelAlready, setSelectedModelAlready] = useState(1)
    const [brands, setBrands] = useState<string[]>([])
    const [models, setModels] = useState<IModel[]>([])
    const [model, setModel] = useState<IModel | undefined>(undefined)
    useEffect(() => {
        const fipRequest = async () => {
          try{
            const {data} = await fipUrl.get("/cars")
            setBrands([])
            Object.keys(data).forEach(key => {
              setBrands(brands => [...brands, key]);
            })
          }catch(err){
            console.log(err)
          }
        }
        fipRequest()
    }, [])

    const selectedBrand = async (brand: string) => {
      const {data} = await fipUrl.get(`/cars?brand=${brand}`)
      setSelectedBrandAlready(selectedBrandAlready-1)
      setSelectedModelAlready(1)
      setModels(data)
      setModel(models[0])
    }
    const selectedModel = (modelName: string) => {
      const modell = models!.filter(item => item.name == modelName)[0]
      setSelectedModelAlready(0)
      setModel(modell);
    }

    {
        return (
            <Modals
            modalTitle={"Criar anúncio"}
            sizeTitle={"1em"}
            buttonWidth={"160px"}
            nameButton={"Criar anuncio"}
            modalButtonColor={"#4529E6"}
            modalButtonBg={"#FDFDFD"}
            buttonRadius={"4px"}
            buttonBorder={"2px"}
            buttonBorderColor={"#4529E6"}
            isOpen={isOpen}
            onOpen={() => { onOpen() }}
            onClose={() => { onClose()}} 
            titlesColor={""} 
            modalButtons={""} 
            footerDirection={""} 
            footerWidth={""}
            modalContent={ 
              <>
                <form onSubmit={handleSubmit(createAnnouncement)}>
                  <Box gap={"24px"} display={"flex"} flexDir={"column"}>
                    <Text fontSize={"14px"}>Infomações do veículo</Text>
                    <FormControl isRequired isInvalid={!!errors.model?.message}>
                      <FormLabel>Marca</FormLabel>
                      <Select {...register("brand")} onChange={(e) => selectedBrand(e.target.value)}>
                        {selectedBrandAlready < 1 ? <></> : <option></option>}
                        {
                          brands.map((item: any, index: any) => (
                            <option value={item}>{item}</option>
                          ))
                        }
                      </Select>
                    </FormControl>
                    <FormControl isRequired isInvalid={!!errors.model?.message}>
                      <FormLabel>Modelo</FormLabel>
                      <Select {...register("model")} onChange={(e) => selectedModel(e.target.value)}>
                        {selectedModelAlready < 1 ? <></> : <option></option>}
                        {
                          models ? models.map((item: any, index: any) => (
                            <option value={item.name}>{item.name}</option>
                          )) : <></>
                        }
                      </Select>
                    </FormControl>
                    <HStack gap={"14px"}>
                      <InputForm
                        isInvalid={!!errors.year?.message}
                        inputregister={{ ...register("year") }}
                        errors={errors.year?.message}
                        labeltext={"Ano"}
                        inputtype={"text"}
                        inputplaceholder={"2018"}
                        isRequired={true}
                        value={model?.year}
                      ></InputForm>

                      <InputForm
                        isInvalid={!!errors.fuel?.message}
                        inputregister={{ ...register("fuel") }}
                        errors={errors.fuel?.message}
                        labeltext={"Combustível"}
                        inputtype={"text"}
                        inputplaceholder={"Gasolina / Etanol"}
                        isRequired={true}
                        value={model?.fuel == "1" ? "Flex" : model?.fuel == "2" ? "Híbrido" : "Elétrico"}
                      ></InputForm>
                    </HStack>

                    <HStack gap={"14px"}>
                      <InputForm
                        isInvalid={!!errors.km?.message}
                        inputregister={{ ...register("km") }}
                        errors={errors.km?.message}
                        labeltext={"Quilometragem"}
                        inputtype={"text"}
                        inputplaceholder={"30.000"+"km"}
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
                        value={`${model?.value}`}
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
                    <ul>
                      {fields.map((field, index) => {
                        return (
                          <div key={field.id}>
                            <section className={"section"} key={field.id}>
                              {/* <input
                                placeholder="url"
                                {...register(`gallery_image.${index}.url` as const, {
                                  required: true
                                })}
                                className={errors?.gallery_image?.[index]?.url ? "error" : ""}
                              /> */}
                                <InputForm
                                  isInvalid={!!errors.gallery_image?.[index]?.url}
                                  inputregister={{ ...register(`gallery_image.${index}.url` as const, {
                                    required: true
                                  }) }}
                                  errors={errors.price?.message}
                                  labeltext={`Imagem ${index + 1}`}
                                  inputtype={"text"}
                                  inputplaceholder={"https://image.com"}
                                  isRequired={false}
                                ></InputForm>
                                <Button my={"12px"} w={"50%"} h={"48px"} color={"white"} fontWeight={"500"} bgColor={"blue.300"} border={"1px solid blue.300"} _hover={{ borderColor: "blue.400", bgColor: "blue.400" }} onClick={() => remove(index)} type={"button"}>Remover</Button>
                            </section>
                          </div>
                        )
                      })}
                      <Button mt={"12px"} w={"100%"} h={"48px"} color={"blue.400"} fontWeight={"600"} bgColor={"blue.100"} border={"1px solid blue.300"} _hover={{ borderColor: "blue.400", bgColor: "blue.400", color: "white" }} onClick={() => append({url: ""})} type={"button"}>Adicionar campo para imagem da galeria</Button>
                    </ul>

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
            }
        />
    );}
};

export default AnnouncementModal