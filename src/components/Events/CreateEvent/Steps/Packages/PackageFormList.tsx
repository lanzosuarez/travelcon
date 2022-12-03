import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { EventPackageFormData } from "../../types";
import { usePackages } from "./store";

/**
 * Component that renders the forms of the added package
 */
export const PackageFormList = () => {
  const { activePackage, packageNames } = usePackages(
    ({ activePackage, packageNames }) => ({
      activePackage,
      packageNames,
    })
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormContext<EventPackageFormData>();
  const { fields, append, remove } = useFieldArray({
    name: "packages",
    control,
    rules: {
      required: "Please add some package",
    },
  });

  React.useEffect(() => {
    if (packageNames?.length) {
      /**
       * On mount add packages according to the `packageNames` added
       */
      setValue(
        "packages",
        packageNames.map((packageName) => ({ name: packageName }))
      );
    }
  }, [packageNames]);

  return (
    <form>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          spacing="4"
          display={field.name === activePackage ? "flex" : "none"}
        >
          <FormControl isInvalid={!!errors?.packages?.[index]?.duration}>
            <FormLabel>Duration</FormLabel>
            <Input
              placeholder="e.g 2 days 1 night"
              {...register(`packages.${index}.duration`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.duration && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.duration?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.rate}>
            <FormLabel>Rate</FormLabel>
            <InputGroup>
              <InputLeftAddon children="Php" />
              <Input
                type="number"
                {...register(`packages.${index}.rate`, {
                  required: "This field is required",
                })}
              />
            </InputGroup>
            <FormHelperText>
              TravelCon will add ₱50.00 to amount indicated
            </FormHelperText>
            {errors?.packages?.[index]?.rate && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.rate?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              rows={10}
              resize="vertical"
              {...register(`packages.${index}.description`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.description && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.description?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.inclusions}>
            <FormLabel>Inclusions</FormLabel>
            <Textarea
              rows={10}
              resize="vertical"
              {...register(`packages.${index}.inclusions`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.inclusions && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.inclusions?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.itinerary}>
            <FormLabel>Itinerary</FormLabel>
            <Textarea
              rows={10}
              resize="vertical"
              {...register(`packages.${index}.itinerary`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.itinerary && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.itinerary?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.exclusions}>
            <FormLabel>Exclusions</FormLabel>
            <Textarea
              rows={10}
              resize="vertical"
              {...register(`packages.${index}.exclusions`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.exclusions && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.exclusions?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.packages?.[index]?.note}>
            <FormLabel>Thins to note</FormLabel>
            <Textarea
              rows={10}
              resize="vertical"
              {...register(`packages.${index}.note`, {
                required: "This field is required",
              })}
            />
            {errors?.packages?.[index]?.note && (
              <FormErrorMessage>
                {errors?.packages?.[index]?.note?.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </Stack>
      ))}
    </form>
  );
};
