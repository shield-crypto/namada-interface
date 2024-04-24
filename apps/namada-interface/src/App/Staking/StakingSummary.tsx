import {
  ActionButton,
  AmountSummaryCard,
  Currency,
  Heading,
  Image,
  Panel,
  PieChart,
  PieChartData,
  SkeletonLoading,
} from "@namada/components";
import { useAtomValue } from "jotai";
import { GoStack } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { totalNamBalanceAtom } from "slices/accounts";
import { selectedCurrencyRateAtom } from "slices/exchangeRates";
import { selectedCurrencyAtom } from "slices/settings";
import { getStakingTotalAtom } from "slices/staking";
import StakingRoutes from "./routes";

export const StakingSummary = (): JSX.Element => {
  const navigate = useNavigate();
  const totalStakedBalance = useAtomValue(getStakingTotalAtom);
  const selectedCurrency = useAtomValue(selectedCurrencyAtom);
  const selectedCurrencyRate = useAtomValue(selectedCurrencyRateAtom);
  const availableBalance = useAtomValue(totalNamBalanceAtom);

  const getPiechartData = (): Array<PieChartData> => {
    if (!totalStakedBalance.isSuccess) {
      return [];
    }

    return [
      { value: availableBalance, color: "#ffffff" },
      { value: totalStakedBalance.data.totalBonded, color: "#ffff00" },
      { value: totalStakedBalance.data.totalUnbonded, color: "#DD1599" },
    ];
  };

  // TODO: implement total staking rewards
  return (
    <ul className="grid grid-cols-[1.25fr_1fr_1fr] gap-2">
      <Panel as="li" className="flex items-center">
        {totalStakedBalance.isLoading && (
          <SkeletonLoading
            height="auto"
            width="80%"
            className="rounded-full aspect-square mx-auto border-neutral-800 border-[22px] bg-transparent"
          />
        )}
        {totalStakedBalance.isSuccess && (
          <PieChart
            id="total-staked-balance"
            className="max-w-[85%] mx-auto"
            data={getPiechartData()}
            strokeWidth={7}
          >
            <div className="flex flex-col leading-tight">
              <Heading level="h3">Total Staked Balance</Heading>
              <Currency
                amount={totalStakedBalance.data.totalBonded}
                spaceAroundSign={true}
                currencyPosition="right"
                currency="nam"
                className="text-xl"
                currencySignClassName="block mb-1 text-xs ml-1"
              />
              <Currency
                amount={totalStakedBalance.data.totalBonded.multipliedBy(
                  selectedCurrencyRate
                )}
                className="text-neutral-500 text-sm"
                currency={selectedCurrency}
              />
            </div>
          </PieChart>
        )}
      </Panel>
      <Panel as="li" className="border border-yellow">
        <AmountSummaryCard
          logoElement={<Image imageName="LogoMinimal" />}
          title="Available NAM to Stake"
          isLoading={totalStakedBalance.isLoading}
          mainAmount={
            <Currency
              amount={availableBalance}
              className="block leading-none"
              currency="nam"
              spaceAroundSign={true}
              currencyPosition="right"
              currencySignClassName="block mb-3 mt-0.5 text-sm"
            />
          }
          alternativeAmount={
            totalStakedBalance.isSuccess && (
              <Currency
                amount={totalStakedBalance.data.totalUnbonded.multipliedBy(
                  selectedCurrencyRate
                )}
                currency={selectedCurrency}
              />
            )
          }
          callToAction={
            <ActionButton
              className="px-8"
              borderRadius="sm"
              size="xs"
              color="primary"
              onClick={() => navigate(StakingRoutes.incrementBonding().url)}
            >
              Stake
            </ActionButton>
          }
        />
      </Panel>
      <Panel as="li" className="opacity-60 pointer-events-none select-none">
        <AmountSummaryCard
          logoElement={
            <i className="text-4xl">
              <GoStack />
            </i>
          }
          title="Staking Rewards will be enabled in phase 2"
          mainAmount="0 NAM"
          alternativeAmount="$0"
          callToAction={
            <ActionButton
              className="px-8"
              borderRadius="sm"
              size="xs"
              color="white"
              disabled
            >
              Claim
            </ActionButton>
          }
        />
      </Panel>
    </ul>
  );
};
