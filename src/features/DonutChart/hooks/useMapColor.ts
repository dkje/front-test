import { RootState } from "app/rootReducer";
import { getPercentage } from "common/utils/getPercentage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const colors = [
  "rgb(33, 121, 238)",
  "rgb(0, 204, 154)",
  "rgb(255, 103, 89)",
  "rgb(240, 185, 91)",
  "rgb(117, 55, 239)",
  "rgb(211, 55, 239)",
  "rgb(221, 239, 55)",
];

const useMapColor = () => {
  const exceptions = useSelector((state: RootState) => state.exceptionSerise);
  const [lineTypeData, setLineTypeData] = useState<
    { color: string; name: string }[]
  >([]);

  useEffect(() => {
    const careateNewLineTypeData = (
      data?: { key: string; value: any[] }[]
    ): { color: string; name: string }[] => {
      if (!data) return [];
      return data.map((el, i) => {
        return {
          color: colors[i % colors.length],
          name: `${el.key}(${getPercentage(
            el.value.length,
            exceptions.value?.total!
          )}%)`,
        };
      });
    };
    setLineTypeData(careateNewLineTypeData(exceptions.value?.records));
  }, [exceptions.value?.total]);

  return lineTypeData;
};

export default useMapColor;
