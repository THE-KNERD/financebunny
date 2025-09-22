import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

interface OverviewStats {
  totalIncome: number;
  totalExpenses: number;
  totalDebts: number;
  savings: number;
  budgetUsed: number;
}

interface FinancialOverviewProps {
  stats: OverviewStats;
}

const FinancialOverview = ({ stats }: FinancialOverviewProps) => {
  const netBalance = stats.totalIncome - stats.totalExpenses - stats.totalDebts;
  const savingsRate = stats.totalIncome > 0 ? (stats.savings / stats.totalIncome) * 100 : 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-success";
    if (balance < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="shadow-card border-primary/10 transition-smooth hover:shadow-orange-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(stats.totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            +2.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/10 transition-smooth hover:shadow-orange-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(stats.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            +5.3% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/10 transition-smooth hover:shadow-orange-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Debts</CardTitle>
          <TrendingDown className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">
            {formatCurrency(stats.totalDebts)}
          </div>
          <p className="text-xs text-muted-foreground">
            Focus on elimination
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/10 transition-smooth hover:shadow-orange-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          <DollarSign className={`h-4 w-4 ${getBalanceColor(netBalance)}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getBalanceColor(netBalance)}`}>
            {formatCurrency(netBalance)}
          </div>
          <p className="text-xs text-muted-foreground">
            Your monthly balance
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/10 transition-smooth hover:shadow-orange-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {savingsRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Recommended: 20%+
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;