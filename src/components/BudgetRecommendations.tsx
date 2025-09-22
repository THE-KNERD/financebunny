import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, PiggyBank, CreditCard, Home } from "lucide-react";

interface BudgetRecommendationsProps {
  income: number;
}

const BudgetRecommendations = ({ income }: BudgetRecommendationsProps) => {
  // 50/30/20 rule recommendations
  const needs = income * 0.5; // 50% for needs
  const wants = income * 0.3; // 30% for wants
  const savings = income * 0.2; // 20% for savings

  const recommendations = [
    {
      category: "Essential Needs",
      amount: needs,
      percentage: 50,
      color: "bg-primary",
      icon: Home,
      description: "Housing, utilities, groceries, minimum debt payments"
    },
    {
      category: "Wants & Lifestyle",
      amount: wants,
      percentage: 30,
      color: "bg-accent",
      icon: Lightbulb,
      description: "Entertainment, dining out, hobbies, subscriptions"
    },
    {
      category: "Savings & Investments",
      amount: savings,
      percentage: 20,
      color: "bg-success",
      icon: PiggyBank,
      description: "Emergency fund, retirement, investments, extra debt payments"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="shadow-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Budget Recommendations (50/30/20 Rule)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {income > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              Based on your monthly income of {formatCurrency(income)}, here's how FinanceBunny recommends allocating your money:
            </div>
            
            {recommendations.map((rec) => {
              const IconComponent = rec.icon;
              return (
                <div key={rec.category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-primary" />
                      <span className="font-medium">{rec.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(rec.amount)}</div>
                      <div className="text-sm text-muted-foreground">{rec.percentage}%</div>
                    </div>
                  </div>
                  
                  <Progress 
                    value={rec.percentage} 
                    className="h-2"
                  />
                  
                  <p className="text-sm text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              );
            })}
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CreditCard className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary mb-1">💡 FinanceBunny Tip</p>
                  <p className="text-muted-foreground">
                    Start with the 50/30/20 rule as a baseline, then adjust based on your specific goals. 
                    If you have high-interest debt, consider allocating more to debt payoff from the "wants" category.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <PiggyBank className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Add your income to see personalized budget recommendations!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetRecommendations;