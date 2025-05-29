
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface BankAccount {
  id: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  maskedAccountNumber: string;
}

export default function AccountDiscovery() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  
  // Simulate fetching accounts based on mobile number
  useEffect(() => {
    // Get user details from session storage
    const userDetailsString = sessionStorage.getItem("bankStatementUserDetails");
    if (!userDetailsString) {
      toast({
        title: "Error",
        description: "User details not found. Please submit your details first.",
        variant: "destructive",
      });
      navigate("/bank-statement");
      return;
    }
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockAccounts: BankAccount[] = [
        {
          id: "1",
          bankName: "HDFC Bank",
          accountType: "Savings Account",
          accountNumber: "1234567890",
          maskedAccountNumber: "XXXX7890"
        },
        {
          id: "2",
          bankName: "ICICI Bank",
          accountType: "Salary Account",
          accountNumber: "0987654321",
          maskedAccountNumber: "XXXX4321"
        },
        {
          id: "3",
          bankName: "State Bank of India",
          accountType: "Savings Account",
          accountNumber: "1122334455",
          maskedAccountNumber: "XXXX4455"
        },
      ];
      
      setAccounts(mockAccounts);
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, toast]);
  
  const handleToggleAccount = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };
  
  const handleContinue = () => {
    if (selectedAccounts.length === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one bank account to proceed",
        variant: "destructive",
      });
      return;
    }
    
    // Store selected accounts
    sessionStorage.setItem("selectedBankAccounts", JSON.stringify(
      accounts.filter(account => selectedAccounts.includes(account.id))
    ));
    
    // Navigate to consent page
    navigate("/bank-statement/consent");
  };
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Bank Account Discovery</CardTitle>
            <CardDescription>
              We found the following bank accounts linked to your mobile number. Please select the accounts you wish to analyze.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
                <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
                <div className="h-20 bg-gray-100 animate-pulse rounded-md"></div>
              </div>
            ) : accounts.length > 0 ? (
              <div className="space-y-4">
                {accounts.map(account => (
                  <div 
                    key={account.id}
                    className={`p-4 border rounded-md flex items-center justify-between transition-all ${
                      selectedAccounts.includes(account.id) 
                        ? "border-primary bg-secondary" 
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        checked={selectedAccounts.includes(account.id)} 
                        onCheckedChange={() => handleToggleAccount(account.id)}
                      />
                      <div>
                        <h3 className="font-medium">{account.bankName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {account.accountType} • {account.maskedAccountNumber}
                        </p>
                      </div>
                    </div>
                    
                    {selectedAccounts.includes(account.id) && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleContinue}
                    className="w-full"
                    disabled={selectedAccounts.length === 0}
                  >
                    Continue to Consent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bank accounts found linked to your mobile number.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate("/bank-statement")}
                >
                  Go Back and Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
