
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="bg-navy-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-navy-800 text-4xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-semibold text-navy-800 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-navy-800 hover:bg-navy-700">
          <Home className="mr-2 h-4 w-4" />
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
