
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Progress } from "@/components/ui/progress";

export default function ThankYou() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing");
  const [completed, setCompleted] = useState(false);
  
  // Simulate processing progress
  useEffect(() => {
    const steps = [
      { progress: 10, status: "Connecting to bank servers..." },
      { progress: 25, status: "Fetching statement data..." },
      { progress: 40, status: "Processing transactions..." },
      { progress: 60, status: "Categorizing expenses..." },
      { progress: 75, status: "Generating financial insights..." },
      { progress: 90, status: "Finalizing report..." },
      { progress: 100, status: "Analysis complete!" },
    ];
    
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].status);
        currentStep++;
        
        if (currentStep === steps.length) {
          setCompleted(true);
          clearInterval(progressInterval);
        }
      }
    }, 1500);
    
    return () => clearInterval(progressInterval);
  }, []);
  
  const handleViewDashboard = () => {
    // In a real app, you'd navigate to a dashboard showing the analysis results
    navigate("/dashboard");
  };
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {completed ? "Analysis Complete!" : "Processing Your Statement"}
            </CardTitle>
            <CardDescription>
              {completed 
                ? "Thank you for providing your bank statement. Your financial data has been analyzed successfully."
                : "Please wait while we securely process and analyze your bank statement data."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!completed && (
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">{status}</p>
                
                <div className="border rounded-md p-4 bg-secondary/30 text-center">
                  <p className="text-sm">
                    This process typically takes 1-2 minutes. Please do not close your browser.
                  </p>
                </div>
              </div>
            )}
            
            {completed && (
              <div className="space-y-6 text-center">
                <div className="mx-auto bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Your Bank Statement Analysis is Ready</h3>
                  <p className="text-muted-foreground">
                    We've analyzed your transactions and prepared a comprehensive financial report.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Analysis Highlights:</h4>
                  <ul className="space-y-1 text-sm text-left list-disc list-inside">
                    <li>Monthly income and expense patterns</li>
                    <li>Top spending categories</li>
                    <li>Saving potential and recommendations</li>
                    <li>Financial health score and insights</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            {completed ? (
              <>
                <Button onClick={handleViewDashboard} className="w-full">
                  View Financial Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/bank-statement")}
                  className="w-full"
                >
                  Start a New Analysis
                </Button>
              </>
            ) : (
              <p className="text-xs text-center text-muted-foreground w-full">
                Your data is encrypted and processed securely. You can close this window once the analysis is complete.
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
