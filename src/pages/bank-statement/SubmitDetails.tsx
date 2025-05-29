
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MainLayout } from "@/components/layout/MainLayout";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const detailsFormSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(10, { message: "Mobile number should not exceed 10 digits" })
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
});

type DetailsFormValues = z.infer<typeof detailsFormSchema>;

export default function SubmitDetails() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Default form values
  const defaultValues: Partial<DetailsFormValues> = {
    fullName: "",
    mobileNumber: "",
  };
  
  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues,
  });
  
  function onSubmit(data: DetailsFormValues) {
    // Store the data in session storage for later use
    sessionStorage.setItem("bankStatementUserDetails", JSON.stringify(data));
    
    // Show a success toast
    toast({
      title: "Details submitted successfully",
      description: "Discovering linked bank accounts...",
    });
    
    // Navigate to the account discovery page
    navigate("/bank-statement/account-discovery");
  }
  
  return (
    <MainLayout>
      <div className="container max-w-2xl mx-auto py-6">
        <Card className="shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Bank Statement Intelligence</CardTitle>
            <CardDescription>
              Please enter your details to begin the bank statement analysis process
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please enter your name as it appears in your bank records
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="10-digit mobile number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the mobile number linked to your bank account
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1940-01-01")
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Your date of birth is required for verification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Continue to Account Discovery</Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Your information is secure and only used for bank statement analysis
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
