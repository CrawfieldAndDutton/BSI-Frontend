
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

export default function BankStatementIndex() {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Bank Statement Intelligence</CardTitle>
            <CardDescription>
              Gain valuable insights from your bank statement with our advanced analysis tools
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-secondary/30 p-4 rounded-md space-y-2">
                <h3 className="font-medium">Track Spending Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  See where your money goes with AI-powered categorization of your transactions
                </p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-md space-y-2">
                <h3 className="font-medium">Income Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get insights on your income sources and identify irregular earnings
                </p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-md space-y-2">
                <h3 className="font-medium">Saving Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Discover potential savings and get personalized recommendations
                </p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-md space-y-2">
                <h3 className="font-medium">Financial Health Score</h3>
                <p className="text-sm text-muted-foreground">
                  Get a comprehensive view of your financial wellbeing
                </p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ol className="space-y-2 pl-5 list-decimal">
                <li className="text-sm">
                  <span className="font-medium">Submit your details</span> - Provide your name, mobile number and date of birth
                </li>
                <li className="text-sm">
                  <span className="font-medium">Select bank accounts</span> - Choose which accounts you want to analyze
                </li>
                <li className="text-sm">
                  <span className="font-medium">Provide consent</span> - Securely authorize access to your statements
                </li>
                <li className="text-sm">
                  <span className="font-medium">View insights</span> - Access your comprehensive financial analysis
                </li>
              </ol>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={() => navigate("/bank-statement/submit-details")}
              className="w-full"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Your data is encrypted and secure. We adhere to the highest standards of data privacy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
