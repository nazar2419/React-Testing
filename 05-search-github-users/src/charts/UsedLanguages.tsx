import { Repository } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import { calculatePopularLanguages } from "@/utils";

const  UsedLanguages = ({ repositories }: { repositories: Repository[]}) => {
  const popularLanguages = calculatePopularLanguages(repositories);
  const chartConfig = {
    languages: {
      label: "Language",
      color: "#2563eb",
    },
  } satisfies ChartConfig;


  return (
    <div>
       <h2 className="text-2xl font-semibold text-center mb-4">
        Used Languages
      </h2>
        {/* ChartContainer handles responsive sizing and theme variables */}
        <ChartContainer config={chartConfig} className="h-100 w-full">
          <BarChart accessibilityLayer data={popularLanguages}>
            <CartesianGrid vertical={false}  />
            <XAxis 
              dataKey="language"
              tickLine={false} // Removes tick marks
              tickMargin={10}
             
            />
            <YAxis dataKey="count" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-language)" radius={4} />
          </BarChart> 
        </ChartContainer>
    </div>
  )
}
export default UsedLanguages