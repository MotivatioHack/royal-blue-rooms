import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, User, Hotel } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simulate login (frontend only)
    setTimeout(() => {
      // Demo credentials
      if (data.username === 'admin' && data.password === 'admin123') {
        toast.success('Login successful!', {
          description: 'Welcome to LuxStay Hotel Admin',
        });
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/guests');
      } else {
        toast.error('Invalid credentials', {
          description: 'Please try again',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <Card className="max-w-md w-full p-8 shadow-elegant animate-scale-in relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-glow mb-4">
            <Hotel className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage hotel bookings</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="flex items-center space-x-2">
              <User className="h-4 w-4 text-primary" />
              <span>Username</span>
            </Label>
            <Input
              id="username"
              placeholder="Enter username"
              {...register('username')}
              className={errors.username ? 'border-destructive' : ''}
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Demo Credentials:</strong><br />
            Username: admin | Password: admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
