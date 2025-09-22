import { useState } from "react";
import BunnyGuide from "@/components/BunnyGuide";
import FinancialOverview from "@/components/FinancialOverview";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import BudgetRecommendations from "@/components/BudgetRecommendations";

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'debt';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setTransactions(prev => [...prev, transaction]);
  };

  // Calculate financial stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebts = transactions
    .filter(t => t.type === 'debt')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const savings = totalIncome - totalExpenses - totalDebts;

  const stats = {
    totalIncome,
    totalExpenses,
    totalDebts,
    savings,
    budgetUsed: totalIncome > 0 ? ((totalExpenses + totalDebts) / totalIncome) * 100 : 0
  };

  // Determine bunny mood based on financial health
  const getBunnyMood = () => {
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
    
    if (savingsRate >= 20) return "celebrating";
    if (savingsRate >= 10) return "happy";
    if (savingsRate > 0) return "encouraging";
    return "concerned";
  };

  const getBunnyMessage = () => {
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;
    
    if (transactions.length === 0) {
      return "Welcome to FinanceBunny! 🐰 I'm here to help you take control of your finances. Start by adding your first transaction below!";
    }
    
    if (totalDebts > 0) {
      const debtToIncomeRatio = totalIncome > 0 ? (totalDebts / totalIncome) * 100 : 0;
      if (debtToIncomeRatio > 40) {
        return `You have ₹${totalDebts.toLocaleString('en-IN')} in debt. Don't worry! Start with the smallest debt first and pay ₹500-1000 extra monthly. Every small step counts! 💪`;
      } else {
        return `Good news! Your debt of ₹${totalDebts.toLocaleString('en-IN')} is manageable. Try the 50/20/20/10 rule: pay 20% of income towards debt elimination! 🎯`;
      }
    }
    
    if (savingsRate >= 20) {
      return `Wow! You're saving ${savingsRate.toFixed(1)}% of your income. That's fantastic financial discipline! 🌟`;
    }
    
    if (savingsRate >= 10) {
      return `Great job! You're saving ${savingsRate.toFixed(1)}% of your income. You're on the right track! 😊`;
    }
    
    if (savingsRate > 0) {
      return `You're saving ${savingsRate.toFixed(1)}% - that's a good start! Let's work on getting closer to that 20% goal! 💪`;
    }
    
    return `I notice you're spending more than you earn. No worries - let's create a plan to balance your budget! 🎯`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <h1 className="text-3xl font-bold text-gradient-primary">FinanceBunny</h1>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xl">🐰</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Your friendly guide to financial wellness
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Bunny Guide */}
        <BunnyGuide 
          message={getBunnyMessage()}
          mood={getBunnyMood()}
        />

        {/* Financial Overview */}
        <FinancialOverview stats={stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transaction Form */}
          <div className="space-y-6">
            <TransactionForm onAddTransaction={addTransaction} />
            <BudgetRecommendations income={totalIncome} totalDebts={totalDebts} />
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} />
          </div>
        </div>

        {/* Educational Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
            <h3 className="font-bold text-primary mb-2">💡 Smart Spending</h3>
            <p className="text-sm text-muted-foreground">
              Track every expense to identify spending patterns and find areas where you can save money.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-success/10 to-success/5 p-6 rounded-lg border border-success/20">
            <h3 className="font-bold text-success mb-2">🎯 Emergency Fund</h3>
            <p className="text-sm text-muted-foreground">
              Aim to save 3-6 months of expenses in an easily accessible emergency fund for unexpected costs.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-warning/10 to-warning/5 p-6 rounded-lg border border-warning/20">
            <h3 className="font-bold text-warning mb-2">📈 Invest Early</h3>
            <p className="text-sm text-muted-foreground">
              Start investing as early as possible to take advantage of compound interest over time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
