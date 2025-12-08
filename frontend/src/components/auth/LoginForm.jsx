"use client";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isSuperAdmin } from "@/lib/clerk";

export default function LoginForm() {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn.create({
        strategy: "oauth_google",
      });

      if (result.status === "complete") {
        const email = result.user.primaryEmailAddress?.emailAddress;

        await setActive({ session: result.createdSessionId });

        if (isSuperAdmin(email)) {
          router.push("/admin-dashboard");
        } else {
          router.push("/"); // ← Everyone else goes home
        }
      }
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.57-2.77c-.98.66-2.23 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.11v2.83C3.93 20.58 7.63 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.11C1.42 8.92 1 10.92 1 13s.42 4.08 2.11 5.93l3.73-2.84z" />
          <path fill="currentColor" d="M12 6.75c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.46 3.01 14.97 2 12 2 7.63 2 3.93 4.42 2.11 7.07l3.73 2.84C6.71 8.29 9.14 6.75 12 6.75z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}