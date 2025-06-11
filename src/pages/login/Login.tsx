
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { authApi } from "@/apis/modules/auth";
import { useDispatch } from 'react-redux';
import { setAuthData } from '@/store/userSlice';
import { generateOTP } from "@/lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authApi.sendOtp({ email });
      toast.success(`OTP sent to ${email}`);
      setShowOTPInput(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authApi.verifyOtp({ username: email, password: otp });

     if (response.access_token) {
      // Store all auth data in Redux
      dispatch(setAuthData(response));
      
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  } catch (error: any) {
    toast.error(error.message || "Failed to verify OTP. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex md:flex-row flex-col bg-background">
      {/* Left side branding section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-md mx-auto">
          <div className="mb-8 flex items-center">
            <img src="/lovable-uploads/1feca82a-073f-4352-b4fb-c606f5f94bd6.png" alt="BankLens Logo" className="h-12 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">BankLens</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Smart Banking Analytics for Modern Lenders
          </h2>
          
          <p className="text-gray-600 mb-8">
            Access comprehensive financial insights, customer monitoring, and risk assessment tools in one powerful platform.
          </p>
          
          <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/6ff1f3c6-b698-492a-82c4-fde3982e8a07.png" 
              alt="Banking Analytics Illustration" 
              className="max-h-full max-w-full object-contain p-8"
            />
          </div>
        </div>
      </div>
      
      {/* Right side login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Login to access your BankLens dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showOTPInput ? (
                <form onSubmit={handleSendOTP}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        placeholder="name@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP}>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="otp" className="text-sm font-medium">
                          Enter OTP
                        </label>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs text-primary"
                          onClick={() => setShowOTPInput(false)}
                        >
                          Change email
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        We've sent a one-time password to {email}
                      </p>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value.replace(/[^0-9]/g, ''))}
                        className="text-center text-lg letter-spacing-wide bg-white"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify & Login"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-center text-gray-500">
                Powered by Crawfield & Dutton Enterprise Solutions
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
