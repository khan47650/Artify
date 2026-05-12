
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import api from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import loginArt from "@/assets/Subtract2.png";

type AuthView = "login" | "signup" | "forgot" | "forgot-sent" | "reset" | "reset-success";

const Login = () => {
  const [view, setView] = useState<AuthView>("login");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [rememberMe, setRememberMe] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const isLogin = view === "login";
  const isSignup = view === "signup";


  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });

  const handleArtistPhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file);
      setArtistPhoto(dataUrl);
    } catch (error: any) {
      toast({ title: "Unable to load image", description: error.message, variant: "destructive" });
    }
  };

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem("artify_selected_role", role);

      if (isLogin) {
        if (email === "admin123@gmail.com" && password === "Admin123") {
          localStorage.setItem("artify_admin_logged_in", "true");
          toast({ title: "Admin login successful" });
          navigate("/admin/dashboard");
          return;
        }
        const { data } = await api.post("/auth/login", {
          email,
          password,
          role,
        });

        toast({ title: data.message || `Logged in as ${role}` });
        navigate("/");
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      if (role === "seller" && !artistPhoto) {
        throw new Error("An artist picture is required for seller registration.");
      }

      const { data } = await api.post("/auth/signup", {
        role,
        firstName,
        lastName,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        artistPhoto,
        email,
        password,
      });

      toast({ title: data.message || "Signup successful" });
      setView("login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      toast({
        title: "Email required",
        description: "Enter your registered email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/auth/forgot-password", { email });

      toast({
        title: data.message || "New password sent to your email",
      });

      setView("forgot-sent");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    setView("reset-success");
    setPassword("");
    setConfirmPassword("");
    toast({ title: "Reset password feature will be added later" });
  };

  const renderTitle = () => {
    if (view === "signup") return "Sign Up";
    if (view === "forgot") return "Forgot Password?";
    if (view === "forgot-sent") return "Password reset email sent";
    if (view === "reset") return "Set New Password";
    if (view === "reset-success") return "Password updated";
    return "Welcome!";
  };

  const renderSubtitle = () => {
    if (view === "signup") return "Create your account to continue.";
    if (view === "forgot") return "Enter your email and we will send a recovery link.";
    if (view === "forgot-sent") return "Check your inbox and open the reset link to continue.";
    if (view === "reset") return "Set your new password below.";
    if (view === "reset-success") return "Your password has been reset successfully.";
    return "Enter your email and password to continue.";
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-[90px] pb-[40px]">
        <div className="grid w-full max-w-[1200px] h-[calc(100vh-120px)] items-start gap-10 lg:grid-cols-[420px_1fr]">
          <section className="flex items-center justify-center h-full">
            <div className="w-full max-w-[360px] pb-6">
              <Link to="/" className="font-extenda inline-block text-[76px] leading-[0.75] tracking-[-0.06em] text-black">
                A R T I F Y
              </Link>

              <h1 className="mt-12 font-dm-serif text-[28px] italic leading-none text-black">{renderTitle()}</h1>
              <p className="font-encode mt-2 text-[12px] text-black/45">{renderSubtitle()}</p>

              {(isLogin || isSignup) && (
                <div className="mt-8 rounded-full border border-black/35 p-1">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setRole("buyer")}
                      className={`h-10 rounded-full text-sm transition-all ${role === "buyer" ? "bg-black text-white" : "text-black/85"
                        }`}
                    >
                      {isLogin ? "Login as buyer" : "Buyer"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("seller")}
                      className={`h-10 rounded-full text-sm transition-all ${role === "seller" ? "bg-black text-white" : "text-black/85"
                        }`}
                    >
                      {isLogin ? "Login as seller" : "Seller"}
                    </button>
                  </div>
                </div>
              )}

              {(isLogin || isSignup) && (
                <form onSubmit={handleAuthSubmit} className="mt-8 space-y-3">
                  {isSignup && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last name"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                      </div>

                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone number"
                        required
                        className="h-12 rounded-full border-black/15 bg-transparent"
                      />

                      <Input
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Address line 1"
                        required
                        className="h-12 rounded-full border-black/15 bg-transparent"
                      />
                      <Input
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Address line 2 (optional)"
                        className="h-12 rounded-full border-black/15 bg-transparent"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                        <Input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="State / Province"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="Postal code"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                        <Input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Country"
                          required
                          className="h-12 rounded-full border-black/15 bg-transparent"
                        />
                      </div>
                      {role === "seller" && (
                        <div className="rounded-[22px] border border-black/15 bg-white/50 p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-full border border-black/10 bg-[#efefef]">
                              {artistPhoto ? (
                                <img src={artistPhoto} alt="Artist preview" className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[11px] text-black/45">
                                  Required
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-black">Artist Picture *</p>
                              <p className="mt-1 text-xs text-black/55">Upload the artist photo or avatar that will appear in the artist sections.</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleArtistPhotoUpload}
                            required={role === "seller"}
                            className="mt-3 h-12 rounded-full border-black/15 bg-transparent"
                          />
                        </div>
                      )}
                    </>
                  )}

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="h-12 rounded-full border-black/15 bg-transparent"
                  />

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password here"
                      required
                      className="h-12 rounded-full border-black/15 bg-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {isSignup && (
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="h-12 rounded-full border-black/15 bg-transparent pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/45"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between px-1 pt-1 text-sm">
                      <label className="flex items-center gap-2 text-black/85">
                        <Checkbox checked={rememberMe} onCheckedChange={(value) => setRememberMe(Boolean(value))} />
                        Remember me
                      </label>
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-black underline underline-offset-2"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-full bg-black text-[15px] text-white hover:bg-black/90"
                  >
                    {loading ? "Please wait..." : isLogin ? "Log in" : "Sign Up"}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-black/15" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-[#efefef] px-3 text-black/50">or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      toast({ title: "Google sign-in will be added later with Firebase" });
                    }}
                    className="h-12 w-full rounded-full border border-black/15 bg-white text-[15px] text-black hover:bg-black/5"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                </form>
              )}

              {view === "forgot" && (
                <form onSubmit={handleForgotPassword} className="mt-8 space-y-3">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-12 rounded-full border-black/15 bg-transparent"
                  />
                  <Button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-black text-white hover:bg-black/90">
                    {loading ? "Sending..." : "Send Recovery Email"}
                  </Button>
                  <button type="button" onClick={() => setView("login")} className="w-full text-sm text-black/70 underline underline-offset-2">
                    Back to login
                  </button>
                </form>
              )}

              {view === "forgot-sent" && (
                <div className="mt-8 rounded-3xl border border-black/15 bg-white/50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-black" />
                  <p className="mt-4 text-sm text-black/70">A recovery email has been sent to {email || "your inbox"}.</p>
                  <Button onClick={() => setView("login")} className="mt-5 h-11 rounded-full bg-black px-7 text-white hover:bg-black/90">
                    Back to login
                  </Button>
                </div>
              )}

              {view === "reset" && (
                <form onSubmit={handleResetPassword} className="mt-8 space-y-3">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    required
                    className="h-12 rounded-full border-black/15 bg-transparent"
                  />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="h-12 rounded-full border-black/15 bg-transparent"
                  />
                  <Button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-black text-white hover:bg-black/90">
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              )}

              {view === "reset-success" && (
                <div className="mt-8 rounded-3xl border border-black/15 bg-white/50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-black" />
                  <p className="mt-4 text-sm text-black/70">Your password has been reset successfully.</p>
                  <Button onClick={() => setView("login")} className="mt-5 h-11 rounded-full bg-black px-7 text-white hover:bg-black/90">
                    Continue to login
                  </Button>
                </div>
              )}

              {(isLogin || isSignup) && (
                <p className="mt-8 text-center text-sm text-black/60">
                  {isLogin ? "Don’t have an account??" : "Already have an account??"} {" "}
                  <button
                    type="button"
                    onClick={() => setView(isLogin ? "signup" : "login")}
                    className="font-semibold text-black underline underline-offset-2"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              )}
            </div>
          </section>

          <section className="relative hidden h-[540px] overflow-hidden rounded-[12px] bg-black lg:block">
            <img src={loginArt} alt="Digital art" className="h-full w-full object-cover object-center opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

            <div className="absolute left-6 top-6 rounded-full bg-black/55 px-4 py-2 text-xs text-white/90 backdrop-blur">
              Curated · Original · Limited
            </div>
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-white px-6 py-4 text-sm text-black/80">
              A Space for Digital Originals
            </div>

            <div className="absolute inset-x-6 bottom-8 text-center text-white">
              <h2 className="font-dm-serif text-[30px] italic leading-tight">Where Digital Art Finds Its Value</h2>
              <p className="font-encode mx-auto mt-2 max-w-xl text-[12px] text-white/80">
                Discover, collect, and sell original digital artworks from visionary artists around the world.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
