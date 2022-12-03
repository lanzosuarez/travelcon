import { HStack, IconButton, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { RiTableLine, RiLayoutGridLine } from "react-icons/ri";
import { View } from "./types";

export const ViewToggle: FC<{
  onViewChange: (view: View) => void;
  defaultView: View;
}> = ({ onViewChange, defaultView }) => {
  const [view, setView] = React.useState<View>(defaultView);
  return (
    <HStack
      sx={{
        svg: {
          w: "20px",
          h: "20px",
        },
      }}
    >
      <IconButton
        size="lg"
        onClick={() => {
          setView("table");
          onViewChange("table");
        }}
        colorScheme={view === "table" ? "blue" : "gray"}
        variant="ghost"
        aria-label="table-view"
        icon={<RiTableLine />}
      />
      <IconButton
        onClick={() => {
          setView("grid");
          onViewChange("grid");
        }}
        colorScheme={view === "grid" ? "blue" : "gray"}
        variant="ghost"
        aria-label="grid-view"
        icon={<RiLayoutGridLine />}
      />
    </HStack>
  );
};
