import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, PiggyBank, CreditCard, Home } from "lucide-react";

interface BudgetRecommendationsProps {
  income: number;
  totalDebts?: number;
}

const BudgetRecommendations = ({ income, totalDebts = 0 }: BudgetRecommendationsProps) => {
  // 50/20/20/10 rule for debt management
  const needs = income * 0.5; // 50% for needs
  const wants = income * 0.2; // 20% for wants (reduced for debt focus)
  const debtPayment = income * 0.2; // 20% for debt elimination
  const savings = income * 0.1; // 10% for savings (emergency fund first)

  const recommendations = [
    {
      category: "Essential Needs",
      amount: needs,
      percentage: 50,
      color: "bg-primary",
      icon: Home,
      description: "Housing, utilities, groceries, minimum EMIs, basic transportation"
    },
    {
      category: "Wants & Lifestyle",
      amount: wants,
      percentage: 20,
      color: "bg-accent",
      icon: Lightbulb,
      description: "Entertainment, dining out, hobbies - reduced to focus on debt freedom"
    },
    {
      category: "Debt Elimination",
      amount: debtPayment,
      percentage: 20,
      color: "bg-warning",
      icon: CreditCard,
      description: "Extra payments on loans - start with highest interest rate first"
    },
    {
      category: "Savings & Emergency Fund",
      amount: savings,
      percentage: 10,
      color: "bg-success",
      icon: PiggyBank,
      description: "Build ₹10,000 emergency fund first, then start SIPs"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Card className="shadow-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Debt-Free Budget Plan (50/20/20/10 Rule)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {income > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              Based on your monthly income of {formatCurrency(income)}, here's how FinanceBunny recommends allocating your money:
              {totalDebts > 0 && (
                <div className="mt-2 p-2 bg-warning/10 rounded text-warning font-medium">
                  💡 With ₹{totalDebts.toLocaleString('en-IN')} in debt, focus on the debt elimination strategy below!
                </div>
              )}
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
                  <p className="font-medium text-primary mb-1">🎯 Debt Freedom Strategy</p>
                  <p className="text-muted-foreground">
                    <strong>Step 1:</strong> List all debts by interest rate (highest first)<br/>
                    <strong>Step 2:</strong> Pay minimums on all, then attack highest rate debt<br/>
                    <strong>Step 3:</strong> Once paid off, roll that payment to next highest rate<br/>
                    <strong>Bonus:</strong> Add any extra income (bonus, freelance) directly to debt!
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