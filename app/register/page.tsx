import Link from "next/link";
import { User, Mail, Phone, Lock, Eye } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="registerPage">
      <Link href="/" className="authHomeBrand">
        <img src="/logo.png" alt="Human Safety" className="authHomeLogo" />
        <span className="authHomeText">
          <span>Human</span> <b>Safety</b> <b>Home</b>
        </span>
      </Link>

      <section className="registerHero">
        <div className="registerLeft">
          <h1>
            Create Your <span>Account</span>
          </h1>

          <p>
            Join Human Safety and stay connected with your trusted contacts.
            Your safety is our priority.
          </p>

          <div className="registerShield">🛡️</div>
        </div>

        <div className="registerCard">
          <div className="registerIcon">
            <User size={42} />
          </div>

          <h2>Register</h2>
          <p className="registerSubtitle">
            Fill in the details to create your account
          </p>

          <form>
            <label>Full Name</label>
            <div className="registerInput">
              <User size={20} />
              <input type="text" placeholder="Enter your full name" />
            </div>

            <label>Email</label>
            <div className="registerInput">
              <Mail size={20} />
              <input type="email" placeholder="Enter your email" />
            </div>

            <label>Phone Number</label>
            <div className="registerInput">
              <Phone size={20} />
              <input type="text" placeholder="Enter your phone number" />
            </div>

            <label>Password</label>
            <div className="registerInput">
              <Lock size={20} />
              <input type="password" placeholder="Create a password" />
              <Eye size={20} />
            </div>

            <label>Confirm Password</label>
            <div className="registerInput">
              <Lock size={20} />
              <input type="password" placeholder="Confirm your password" />
              <Eye size={20} />
            </div>

            <div className="registerCheck">
              <input type="checkbox" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </div>

            <button type="submit" className="registerBtn">
              Register →
            </button>
          </form>

          <p className="registerLogin">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}



