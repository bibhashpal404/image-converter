import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/google-analytics";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "./pages/not-found";
import HomePage from "./pages/home";
import PhotoConverter from "./pages/photo-converter";
import VectorConverter from "./pages/vector-converter";
import AnimationConverter from "./pages/animation-converter";
import BackgroundRemover from "./pages/remove-background-from-image";
import ImageResizer from "./pages/image-resizer";
import Blog from "./pages/blog";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      {/* Main routes */}
      <Route path="/" component={HomePage} />
      <Route path="/photo" component={PhotoConverter} />
      <Route path="/animation" component={AnimationConverter} />
      <Route path="/vector" component={VectorConverter} />

      {/* Tools */}
      <Route path="/remove-background-from-image" component={BackgroundRemover} />
      <Route path="/image-resizer" component={ImageResizer} />

      {/* Content pages */}
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />

      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>

      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GoogleAnalytics />
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;