
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Consent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consented, setConsented] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get selected accounts from session storage
  const selectedAccountsJson = sessionStorage.getItem("selectedBankAccounts");
  const selectedAccounts = selectedAccountsJson ? JSON.parse(selectedAccountsJson) : [];
  
  const handleConsent = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Consent recorded",
        description: "Your bank statements are being processed for analysis.",
      });
      
      navigate("/bank-statement/thank-you");
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Account Access Consent</CardTitle>
            <CardDescription>
              Please review and provide consent to access your bank statements for analysis
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="border rounded-md p-4 bg-secondary/30">
              <h3 className="font-medium mb-2">Selected Accounts</h3>
              {selectedAccounts.length > 0 ? (
                <ul className="space-y-2">
                  {selectedAccounts.map((account: any) => (
                    <li key={account.id} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{account.bankName} • {account.maskedAccountNumber}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No accounts selected. Please go back to select accounts.
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Consent Details</h3>
              
              <div className="space-y-2 text-sm">
                <p>By providing consent, you authorize us to:</p>
                
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Access your banking information for the selected accounts</li>
                  <li>Analyze transaction history for the past 12 months</li>
                  <li>Generate financial insights and reports based on your data</li>
                  <li>Store necessary information securely in compliance with privacy regulations</li>
                </ul>
                
                <p className="mt-2">
                  Your data is encrypted and secured in compliance with financial regulations. 
                  You can revoke this consent at any time from your account settings.
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="consent" 
                  checked={consented} 
                  onCheckedChange={() => setConsented(!consented)}
                />
                <label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  I consent to the processing of my bank statement data as described above and agree to the{" "}
                  <button 
                    onClick={() => setShowTerms(true)} 
                    className="text-primary underline"
                    type="button"
                  >
                    terms and conditions
                  </button>
                </label>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={handleConsent}
              className="w-full" 
              disabled={!consented || selectedAccounts.length === 0 || isProcessing}
            >
              {isProcessing ? "Processing..." : "Provide Consent & Continue"}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/bank-statement/account-discovery")}
              disabled={isProcessing}
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Terms and Conditions Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Bank Statement Analysis Service Agreement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <h4 className="font-medium">1. Data Access and Usage</h4>
            <p>
              You authorize us to access your bank statement data for the purposes of financial analysis, 
              credit assessment, and providing personalized financial insights. We will only access the 
              data for the accounts you have explicitly selected.
            </p>
            
            <h4 className="font-medium">2. Data Protection</h4>
            <p>
              All data accessed will be encrypted both in transit and at rest. We implement industry-standard 
              security measures to protect your information. Your data will not be sold to third parties for 
              marketing purposes.
            </p>
            
            <h4 className="font-medium">3. Data Retention</h4>
            <p>
              We will retain your bank statement data for a period of 12 months from the date of access, 
              after which it will be securely deleted unless you request an earlier deletion or provide 
              consent for extended retention.
            </p>
            
            <h4 className="font-medium">4. Your Rights</h4>
            <p>
              You have the right to revoke consent at any time, request access to your data, 
              request correction of inaccurate data, and request deletion of your data subject 
              to any legal retention requirements.
            </p>
            
            <h4 className="font-medium">5. Service Limitations</h4>
            <p>
              The analysis provided is for informational purposes only and does not constitute 
              financial advice. We do not guarantee the accuracy of all insights generated from 
              the analysis.
            </p>
          </div>
          
          <Button onClick={() => setShowTerms(false)} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
