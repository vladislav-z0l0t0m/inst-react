import { formatDistanceToNowStrict } from "date-fns";
import { useTranslation } from "react-i18next";

export const useRelativeTime = () => {
  const { t } = useTranslation("time");

  return (date: Date) => {
    const distance = formatDistanceToNowStrict(date);
    const [value = "0", unit = "second"] = distance.split(" ");

    return `${t(`ago.${unit}`, { count: parseInt(value) })}.`;
  };
};
