import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

import { AddPackageFormData } from "../../types";
import { PackageFormList } from "./PackageFormList";
import { addPackage, rmPackage, setActivePacakge, usePackages } from "./store";

const PackageSelectItem: FC<{ packageName: string }> = ({ packageName }) => {
  const activePackage = usePackages(({ activePackage }) => activePackage);
  const isActive = activePackage === packageName;
  return (
    <WrapItem>
      <Button
        border={isActive ? "3px solid orange" : ""}
        sx={{
          svg: {
            h: "20px",
            w: "20px",
          },
        }}
        onClick={() => {
          isActive
            ? setActivePacakge(undefined)
            : setActivePacakge(packageName);
        }}
        cursor="pointer"
        colorScheme="blue"
        rightIcon={
          <RiCloseLine
            onClick={(e) => {
              e.stopPropagation();
              rmPackage(packageName);
            }}
          />
        }
      >
        {packageName}
      </Button>
    </WrapItem>
  );
};

export const Packages = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<AddPackageFormData>();
  const packageName = watch("packageName");
  const packageNames = usePackages(({ packageNames }) => packageNames);

  /**
   * Validates if a packageName has been added to the list
   */
  const hasPackagesValidator = React.useCallback(
    () => packageNames.length > 0 || "Add event packages",
    [packageNames]
  );

  return (
    <Stack spacing="6">
      <Stack spacing="6">
        <HStack>
          <FormControl>
            <FormLabel>Package Name</FormLabel>
            <Input
              placeholder="Type and press 'Enter' to add activity"
              onKeyDown={(e) => {
                if (e.key === "Enter" && packageName?.length) {
                  addPackage(packageName);
                  if (errors?.packageName?.type === "hasActivities") {
                    clearErrors("packageName");
                  }
                  setValue("packageName", "");
                }
              }}
              id="packageName"
              {...register("packageName", {
                validate: {
                  hasPackages: () => hasPackagesValidator(),
                },
              })}
            />
            <FormHelperText>
              Press 'Enter' or click `Add` to create a package
            </FormHelperText>
            {errors.packageName && (
              <FormErrorMessage>
                {errors?.packageName?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button
            disabled={!packageName?.length}
            onClick={() => addPackage(packageName)}
            colorScheme="blue"
            leftIcon={<RiAddLine />}
          >
            Add
          </Button>
        </HStack>
        <Wrap mt="4">
          {packageNames.map((packageName) => (
            <PackageSelectItem packageName={packageName} key={packageName} />
          ))}
        </Wrap>
      </Stack>
      {!!packageNames.length && <PackageFormList />}
    </Stack>
  );
};
