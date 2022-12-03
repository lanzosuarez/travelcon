import create from "zustand";

interface PackagesStore {
  packageNames: string[];
  activePackage?: string;
}

export const usePackages = create<PackagesStore>((set) => ({
  packageNames: [],
}));

export const addPackage = (packageName: string) =>
  usePackages.setState((state) => ({
    packageNames: [
      ...Array.from(new Set([...state.packageNames, packageName])),
    ],
  }));

export const setActivePacakge = (packageName?: string) =>
  usePackages.setState({ activePackage: packageName });

export const rmPackage = (packageName: string) =>
  usePackages.setState((state) => ({
    packageNames: state.packageNames.filter(
      (packageNameItem) => packageNameItem !== packageName
    ),
  }));
