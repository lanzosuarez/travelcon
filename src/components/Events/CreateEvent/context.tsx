import React from "react";
import { FC, PropsWithChildren } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { BasicInfoFormData } from "./types";

export const BasicInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<BasicInfoFormData>();

  const value = React.useMemo(() => form, [form]);

  return <FormProvider {...value}>{children}</FormProvider>;
};

export const useBasicInfoForm = () => useFormContext<BasicInfoFormData>();
