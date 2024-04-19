import BigNumber from "bignumber.js";
import { twMerge } from "tailwind-merge";

import { formatPercentage } from "@namada/utils";

export type SegmentedBarData = {
  value: number | BigNumber;
  color: string;
};

export const SegmentedBar: React.FC<
  {
    data: SegmentedBarData[];
  } & React.ComponentProps<"div">
> = ({ data, className, ...rest }) => {
  if (data.length === 0) {
    return null;
  }

  const percentage = (value: number | BigNumber): string => {
    const total = data.reduce(
      (acc, curr) => acc.plus(curr.value),
      BigNumber(0)
    );

    return formatPercentage(BigNumber(value).dividedBy(total), 2);
  };

  const init = data.slice(0, -1);
  const last = data[data.length - 1];

  return (
    <div className={twMerge("w-full h-[10px] flex", className)} {...rest}>
      {init.map(({ value, color }, index) => (
        <div
          key={index}
          style={{ flexBasis: percentage(value), backgroundColor: color }}
        ></div>
      ))}
      <div className="grow" style={{ backgroundColor: last.color }}></div>
    </div>
  );
};
