
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MainLayout } from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function CreditReportConsent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consented, setConsented] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportType, setReportType] = useState("basic");
  
  const handlePullCreditReport = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Credit Report Request Submitted",
        description: "Your credit report is being generated and will be available shortly.",
      });
      
      // Navigate to a thank you page or back to customer profile
      navigate("/customers/1"); // Replace with actual customer ID or thank you page
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Credit Report Access</CardTitle>
            <CardDescription>
              Please review and provide consent to access your credit report
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="border rounded-md p-4 bg-secondary/30">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Credit Report Types</h3>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Report Types Explained</h4>
                      <p className="text-sm">
                        Different report types provide varying levels of detail about your credit history.
                        Basic reports show active accounts, while comprehensive reports include detailed
                        payment history and credit utilization.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              
              <RadioGroup 
                defaultValue="basic" 
                value={reportType}
                onValueChange={setReportType}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="basic" id="basic" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="basic" className="font-medium">Basic Report</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">No Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Overview of active accounts, credit score, and any delinquencies
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="standard" id="standard" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="standard" className="font-medium">Standard Report</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">Soft Pull</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Includes payment history, credit utilization, and account details
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="comprehensive" id="comprehensive" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="comprehensive" className="font-medium">Comprehensive Report</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600 font-normal">Hard Pull</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full detailed report with analysis, score factors, and historical trends
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Consent Details</h3>
              
              <div className="space-y-2 text-sm">
                <p>By providing consent, you authorize us to:</p>
                
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Request your credit report from national credit bureaus</li>
                  <li>
                    {reportType === "comprehensive" ? 
                      "Perform a hard inquiry which may temporarily impact your credit score" : 
                      "Perform a soft inquiry which will not impact your credit score"}
                  </li>
                  <li>Store and analyze your credit information securely</li>
                  <li>Generate insights and recommendations based on your credit profile</li>
                </ul>
                
                <p className="mt-2">
                  Your data is encrypted and secured in compliance with financial regulations. 
                  This consent will remain valid for 30 days, after which a new authorization will be required.
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
                  I consent to the processing of my credit information as described above and agree to the{" "}
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
              onClick={handlePullCreditReport}
              className="w-full" 
              disabled={!consented || isProcessing}
            >
              {isProcessing ? "Processing..." : "Provide Consent & Pull Credit Report"}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(-1)}
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
              Credit Report Access Agreement
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <h4 className="font-medium">1. Authorization for Credit Pull</h4>
            <p>
              You authorize us to obtain your credit report from one or more consumer reporting agencies.
              This may include a hard or soft inquiry, depending on the report type selected. Hard inquiries
              may affect your credit score temporarily.
            </p>
            
            <h4 className="font-medium">2. Data Usage and Protection</h4>
            <p>
              The information obtained will be used solely for the purposes of credit assessment, 
              financial analysis, and providing personalized insights. We implement industry-standard
              security measures to protect your information.
            </p>
            
            <h4 className="font-medium">3. Data Retention</h4>
            <p>
              Your credit information will be retained for a period of 12 months, after which
              it will be securely deleted unless you provide consent for extended retention or 
              request earlier deletion.
            </p>
            
            <h4 className="font-medium">4. Your Rights</h4>
            <p>
              Under the Fair Credit Reporting Act (FCRA), you have the right to dispute 
              inaccurate information, request access to your information, and understand
              who has accessed your credit report.
            </p>
            
            <h4 className="font-medium">5. Limitations</h4>
            <p>
              The analysis provided is for informational purposes only and does not constitute 
              financial advice. Credit scores and reports from different bureaus may vary, and
              we cannot guarantee the absolute accuracy of all information.
            </p>
          </div>
          
          <Button onClick={() => setShowTerms(false)} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
