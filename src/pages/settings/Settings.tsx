import { useState, useEffect } from "react";
import { settingsApi } from "@/apis/modules/settings";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { 
  User,
  DollarSign, 
  Sliders, 
  CreditCard, 
  Phone, 
  Headphones, 
  Languages 
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("profile");
  
  // Profile settings form
  const profileForm = useForm({
    defaultValues: {
      mobileNumber: "+91 9876543210",
      email: "user@example.com",
    }
  });

  // Risk bucket form
  const riskForm = useForm({
    defaultValues: {
      generalRiskRange: "",
      highRiskScore: "",
      mediumRiskScore: "",
      lowRiskScore: ""
    }
  });

  // Integration form
  const integrationForm = useForm({
    defaultValues: {
      aaFiuConfig: "default",
      customAaFiuCredential: "",
      creditReportProvider: "cibil",
    }
  });

  // Call agent form
  const callAgentForm = useForm({
    defaultValues: {
      callAgents: 1,
      languages: [],
      callCredits: 1000,
    }
  });

 useEffect(() => {
  if (selectedTab === "risk") {
    const fetchRiskConfig = async () => {
      try {
        const res = await settingsApi.getRiskConfig();
        const data = res.data;

        riskForm.setValue(
          "generalRiskRange",
          `${data.general_risk_bucket_min}-${data.general_risk_bucket_max}`
        );
        riskForm.setValue("highRiskScore", `${data.high_risk_bucket_min}`);
        riskForm.setValue(
          "mediumRiskScore",
          `${data.medium_risk_bucket_min}-${data.medium_risk_bucket_max}`
        );
        riskForm.setValue("lowRiskScore", `${data.low_risk_bucket_max}`);
      } catch (error: any) {
        toast({
          title: "Failed to fetch risk config",
          description: error?.response?.data?.detail || "An error occurred.",
          variant: "destructive",
        });
      }
    };

    fetchRiskConfig();
  }
}, [selectedTab]);

  const onProfileSubmit = async (data: any) => {
  try {
    const response = await settingsApi.updateProfile({
      email: data.email,
      phone_number: data.mobileNumber,
    });
    toast({
      title: "Profile settings updated",
      description: response?.data?.detail ||"Your profile settings have been updated successfully.",
    });
  } catch (error: any) {
    toast({
      title: "Failed to update profile",
      description: error?.response?.data?.detail || "An error occurred.",
      variant: "destructive",
    });
  }
};

 const onRiskSubmit = async (data: any) => {
  try {
    // Parse ranges
    const [generalMin, generalMax] = data.generalRiskRange.split("-").map(Number);
    const highMin = Number(data.highRiskScore); // Single number
    const [mediumMin, mediumMax] = data.mediumRiskScore.split("-").map(Number);
    const lowMax = Number(data.lowRiskScore); // Single number

    const response = await settingsApi.updateRiskConfig({
      general_risk_bucket_min: generalMin,
      general_risk_bucket_max: generalMax,
      high_risk_bucket_min: highMin,
      medium_risk_bucket_min: mediumMin,
      medium_risk_bucket_max: mediumMax,
      low_risk_bucket_max: lowMax,
    });

    toast({
      title: "Risk bucket settings updated",
      description: response?.data?.detail ||"Risk bucket configurations have been updated successfully.",
    });
  } catch (error: any) {
    toast({
      title: "Failed to update risk settings",
      description: error?.response?.data?.detail || "An error occurred.",
      variant: "destructive",
    });
  }
};

  const onIntegrationSubmit = (data: any) => {
    toast({
      title: "Integration settings updated",
      description: "Integration configurations have been updated successfully.",
    });
    console.log("Integration settings:", data);
  };

  const onCallAgentSubmit = (data: any) => {
    toast({
      title: "Call agent settings updated",
      description: "Call agent configurations have been updated successfully.",
    });
    console.log("Call agent settings:", data);
  };

  const handleResetMobile = () => {
    profileForm.setValue("mobileNumber", "");
    toast({
      title: "Mobile number reset",
      description: "Your mobile number has been reset successfully.",
    });
  };

  const handleResetEmail = () => {
    profileForm.setValue("email", "");
    toast({
      title: "Email ID reset",
      description: "Your email ID has been reset successfully.",
    });
  };

  const calculateCallCreditsPrice = (credits: number) => {
    // Assuming 1.75 INR per minute
    return (credits * 1.75).toFixed(2);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-5xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and configure system preferences.
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Risk Buckets</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="callAgent" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            <span>Call Agents</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Mobile Number</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={handleResetMobile}
                            >
                              Reset
                            </Button>
                          </div>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your mobile number for account recovery and notifications.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Email ID</FormLabel>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={handleResetEmail}
                            >
                              Reset
                            </Button>
                          </div>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your email for account notifications and updates.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Profile Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Buckets Tab */}
        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Bucket Configurations</CardTitle>
              <CardDescription>
                Configure risk score ranges for different risk buckets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...riskForm}>
                <form onSubmit={riskForm.handleSubmit(onRiskSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={riskForm.control}
                      name="generalRiskRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>General Risk Score Range</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The overall range for risk scoring (e.g., 0-100)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    <FormField
                      control={riskForm.control}
                      name="highRiskScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>High Risk Score Range</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Threshold for high risk classification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={riskForm.control}
                      name="mediumRiskScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medium Risk Score Range</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Threshold for medium risk classification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={riskForm.control}
                      name="lowRiskScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Low Risk Score Range</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Threshold for low risk classification
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Risk Configurations</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure integration with external services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...integrationForm}>
                <form onSubmit={integrationForm.handleSubmit(onIntegrationSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">AA FIU Configuration</h3>
                      
                      <FormField
                        control={integrationForm.control}
                        name="aaFiuConfig"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>AA FIU Credentials</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="default" id="default" />
                                  <FormLabel htmlFor="default" className="cursor-pointer">Use Default Credentials</FormLabel>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="custom" id="custom" />
                                  <FormLabel htmlFor="custom" className="cursor-pointer">Provide Custom Credentials</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {integrationForm.watch("aaFiuConfig") === "custom" && (
                        <FormField
                          control={integrationForm.control}
                          name="customAaFiuCredential"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom AA FIU Credential</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Enter your custom AA FIU credentials
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Credit Report Selection</h3>
                      
                      <FormField
                        control={integrationForm.control}
                        name="creditReportProvider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credit Report Provider</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a credit report provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cibil">CIBIL (₹50 per report)</SelectItem>
                                <SelectItem value="experian">Experian (₹65 per report)</SelectItem>
                                <SelectItem value="equifax">Equifax (₹60 per report)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select a credit report provider (pricing varies by provider)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit">Save Integration Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Call Agent Tab */}
        <TabsContent value="callAgent">
          <Card>
            <CardHeader>
              <CardTitle>AI Call Agent Configuration</CardTitle>
              <CardDescription>
                Configure AI call agents and purchase calling credits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...callAgentForm}>
                <form onSubmit={callAgentForm.handleSubmit(onCallAgentSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <FormField
                      control={callAgentForm.control}
                      name="callAgents"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-4">
                            <FormLabel className="min-w-32">Number of Call Agents</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={(value) => field.onChange(parseInt(value))} 
                                defaultValue={field.value.toString()}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                          <FormDescription>
                            Number of call agents required for parallel calling
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={callAgentForm.control}
                      name="languages"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Languages Required</FormLabel>
                            <FormDescription>
                              Select languages for AI call agents
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { id: "english", label: "English" },
                              { id: "hindi", label: "Hindi" },
                              { id: "bengali", label: "Bengali" },
                              { id: "tamil", label: "Tamil" },
                            ].map((language) => (
                              <FormField
                                key={language.id}
                                control={callAgentForm.control}
                                name="languages"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={language.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(language.id)}
                                          onCheckedChange={(checked) => {
                                            const updatedLanguages = checked
                                              ? [...field.value, language.id]
                                              : field.value?.filter(
                                                  (value: string) => value !== language.id
                                                );
                                            field.onChange(updatedLanguages);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {language.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Calling Credits
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Pricing: 1.75 INR per minute
                      </p>

                      <FormField
                        control={callAgentForm.control}
                        name="callCredits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purchase Call Credits (minutes)</FormLabel>
                            <div className="flex items-center gap-4">
                              <FormControl>
                                <Input
                                  type="number"
                                  min="100"
                                  step="100"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <div className="text-sm font-medium">
                                Total: ₹{calculateCallCreditsPrice(field.value)}
                              </div>
                            </div>
                            <FormDescription>
                              Minimum purchase is 100 minutes
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button className="mt-4" type="button" variant="secondary">
                        Purchase Credits
                      </Button>
                    </div>
                  </div>

                  <Button type="submit">Save Call Agent Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
