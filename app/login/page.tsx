import Link from "next/link";
import { Mail, Lock, Eye, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="loginPage">
      <Link href="/" className="authHomeBrand">
        <img src="/logo.png" alt="Human Safety" className="authHomeLogo" />
        <span className="authHomeText">
          <b>Home</b>
        </span>
      </Link>

      <section className="loginHero">
        <div className="loginLeft">
          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>
            Login to access emergency alerts, live tracking, and trusted safety
            support.
          </p>

          <div className="loginShield">
            <ShieldCheck size={120} />
          </div>
        </div>

        <div className="loginCard">
          <div className="loginIcon">
            <ShieldCheck size={42} />
          </div>

          <h2>Login</h2>
          <p className="loginSubtitle">Enter your details to continue</p>

          <form>
            <label>Email</label>
            <div className="loginInput">
              <Mail size={20} />
              <input type="email" placeholder="Enter your email" />
            </div>

            <label>Password</label>
            <div className="loginInput">
              <Lock size={20} />
              <input type="password" placeholder="Enter your password" />
              <Eye size={20} />
            </div>

            <div className="loginOptions">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link href="#">Forgot password?</Link>
            </div>

            <button type="submit" className="loginBtn">
              Login →
            </button>
          </form>

          <p className="loginRegister">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>
        </div>
      </section>
    </main>
  );
}