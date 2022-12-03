import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  VisuallyHidden,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RiDeleteBin7Line, RiEyeLine, RiImageAddLine } from "react-icons/ri";
import { useBoolean, useEffectOnce } from "react-use";
import { UploadImagesFormData } from "../../types";

const FileItem: FC<{
  file: File;
  onLoadImage: (dataUrl: string) => void;
  onRemoveImage: () => void;
}> = ({ file, onLoadImage, onRemoveImage }) => {
  const [openPreview, toggleOpenPreview] = useBoolean(false);
  const [showActions, toggleShowActions] = useBoolean(false);
  const [dataUrl, setDataUrl] = React.useState<string>();

  useEffectOnce(() => {
    const reader = new FileReader();
    if (file) {
      reader.onload = (event) => {
        setDataUrl(event.target?.result as string);
        onLoadImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <Flex
      onMouseEnter={() => toggleShowActions(true)}
      onMouseLeave={() => toggleShowActions(false)}
      cursor="pointer"
      key={file.name}
      justifyContent="space-between"
      pos="relative"
    >
      <Image
        borderRadius="md"
        width="200px"
        height="150px"
        src={dataUrl}
        fallback={
          <Flex
            alignItems="center"
            justifyContent="center"
            width="200px"
            height="150px"
          >
            <Spinner />
          </Flex>
        }
      />
      <Box
        opacity={showActions ? 1 : 0}
        transition="opacity 300ms ease"
        pos="absolute"
        w="100%"
        h="100%"
        bgColor="blackAlpha.300"
      >
        <HStack pos="relative" top="40%" left="30%">
          <IconButton
            onClick={() => toggleOpenPreview()}
            // variant="outline"
            aria-label="preview"
            icon={<RiEyeLine />}
            colorScheme="blue"
          />
          <IconButton
            onClick={() => onRemoveImage()}
            colorScheme="red"
            variant="outline"
            aria-label="preview"
            icon={<RiDeleteBin7Line />}
          />
        </HStack>
      </Box>
      <Modal
        isOpen={openPreview}
        onClose={() => {
          toggleOpenPreview();
          toggleShowActions();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              width="100%"
              height="100%"
              src={dataUrl}
              fallback={<Spinner />}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export const UploadImages = () => {
  const uploadInputRef = React.useRef<HTMLInputElement>();
  const [files, setFiles] = React.useState<File[]>([]);
  const { control } = useFormContext<UploadImagesFormData>();
  const { remove, update } = useFieldArray({
    name: "images",
    control,
    rules: {
      required: "Please add some images",
    },
  });

  const handleRemoveImage = (imageIndex: number) => {
    setFiles((files) => files.filter((_, index) => index !== imageIndex));
    remove(imageIndex);
  };

  return (
    <Stack spacing="5">
      {/* <Stack
          onDragOver={(event) => event.preventDefault()}
          onClick={() => uploadInputRef.current?.click()}
          onDrop={(event) => {
            event.preventDefault();
            if (event.dataTransfer.items?.length) {
              // Use DataTransferItemList interface to access the file(s)
              const validFiles = [...event.dataTransfer.items]
                .filter((item) => {
                  // If dropped items aren't files, reject them
                  if (item.kind === "file") {
                    const file = item.getAsFile?.();
                    return file?.type?.indexOf("image")! > -1;
                  }
                  return false;
                })
                .map((item) => item.getAsFile()!);
              if (validFiles?.length) setFiles([...files, ...validFiles]);
            } else {
              // Use DataTransfer interface to access the file(s)
              const validFiles = Array.from(event.dataTransfer.files).filter(
                (file) => file?.type?.indexOf("image")! > -1
              );
              if (validFiles?.length) setFiles([...files, ...validFiles]);
            }
          }}
          transition="border-color 300ms ease"
          cursor="pointer"
          _hover={{
            borderColor: "blue.500",
          }}
          spacing="2"
          height="200px"
          border="1px dashed"
          borderColor="gray.300"
          borderRadius="sm"
          alignItems="center"
          justifyContent="center"
          bg="whitesmoke"
        >
          <Box>
            <VisuallyHidden>
              <input
                multiple
                ref={(ref) => {
                  if (ref) uploadInputRef.current = ref;
                }}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files?.length) {
                    setFiles([...files, ...Array.from(event.target.files)]);
                  }
                }}
              />
            </VisuallyHidden>
            <IconButton
              sx={{
                svg: {
                  color: "blue.500",
                  w: "40px",
                  h: "40px",
                },
              }}
              variant="ghost"
              aria-label="Upload"
              icon={<RiImageAddLine />}
            />
          </Box>
          <Stack textAlign="center">
            <Text fontSize="sm" fontWeight="semibold">
              Click or drag images to this area to upload
            </Text>
            <Text fontSize="xs">Upload multiple images at once</Text>
          </Stack>
        </Stack> */}
      <Box>
        <Wrap spacing="4">
          <WrapItem>
            <Flex
              justifyContent="center"
              alignItems="center"
              transition="border-color 300ms ease"
              cursor="pointer"
              _hover={{
                borderColor: "blue.500",
              }}
              width="200px"
              height="150px"
              border="1px dashed"
              borderColor="gray.300"
            >
              <Stack
                textAlign="center"
                p="4"
                onClick={() => uploadInputRef.current?.click()}
              >
                <VisuallyHidden>
                  <input
                    multiple
                    ref={(ref) => {
                      if (ref) uploadInputRef.current = ref;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files?.length) {
                        setFiles([...files, ...Array.from(event.target.files)]);
                        uploadInputRef!.current!.value = "";
                      }
                    }}
                  />
                </VisuallyHidden>
                <IconButton
                  sx={{
                    svg: {
                      color: "blue.500",
                      w: "40px",
                      h: "40px",
                    },
                  }}
                  variant="text"
                  aria-label="Upload"
                  icon={<RiImageAddLine />}
                />
                <Text fontSize="xs">Click to select and upload images</Text>
              </Stack>
            </Flex>
          </WrapItem>
          {files.map((file, index) => (
            <WrapItem key={file.name}>
              <FileItem
                file={file}
                onLoadImage={(dataUrl: string) =>
                  update(index, { url: dataUrl })
                }
                onRemoveImage={() => handleRemoveImage(index)}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Stack>
  );
};
