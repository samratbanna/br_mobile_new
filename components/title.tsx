import React from "react";
import { Text } from "./ui/text";
import { cn } from "~/lib/utils";

export const Title: React.FC<{title: string; customStyle?: string}> = ({
  title,
  customStyle,
}) => {
  return <Text className={cn("font-medium text-lg", customStyle)}>{title}</Text>;
};