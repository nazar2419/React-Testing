import { type Repository } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateMostForkedRepos } from "@/utils";


const ForkedRepos =({repositories}: {repositories: Repository[]}) =>  {
  // Calculate most forked repositories and return array of {repo: string, count: number}
  const mostForkedRepos = calculateMostForkedRepos(repositories);
  console.log(mostForkedRepos);
  // Define chart configuration for styling and labels
  const chartConfig = {
    repo: {
      label: "Repository",
      color: "#facd12",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Forked Repos</h2>
       {/* ChartContainer handles responsive sizing and theme variables */}
       <ChartContainer config={chartConfig} className="h-100 w-full">
         {/* BarChart is the main container for the bar chart visualization */}
        {/* accessibilityLayer adds ARIA labels for better screen reader support */}
        <BarChart accessibilityLayer data={mostForkedRepos}>
          <CartesianGrid vertical={false} />
          {/* XAxis configures the horizontal axis */}
          <XAxis
            dataKey="repo"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 10)} // Truncates long repo names
          />
          <YAxis dataKey="count" />
          {/* ChartTooltip shows details when hovering over bars */}
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-repo)" radius={4} />
        </BarChart>
       </ChartContainer>
    </div>
  );
};
export default ForkedRepos