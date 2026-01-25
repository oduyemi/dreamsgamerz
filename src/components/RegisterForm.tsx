import React, { useEffect, useState } from "react";
import { IonInput, IonText, IonLoading, useIonRouter } from "@ionic/react";
import { Button } from "@mui/material";
import api from "../lib/axios";

export const RegisterForm: React.FC = () => {
  const ionRouter = useIonRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
        const timer = setTimeout(() => {
          ionRouter.push("/login", "root", "replace");
        }, 2000);
    
        return () => clearTimeout(timer);
      }
    }, [success, ionRouter]);
    

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post(
        "https://gamerz-lemon.vercel.app/api/v1/auth/register",
        {
          username,
          email,
          password,
          confirmPassword,
          referredBy: referralCode || undefined,
        }
      );

      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-3 py-6">
      <div className="w-full max-w-[320px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[20px] font-semibold text-gray-900">
            Create account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign up in under a minute
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Field label="Username">
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
            />
          </Field>

          <Field label="Email">
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </Field>

          <Field label="Password">
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </Field>

          <Field label="Confirm password">
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={(e) =>
                setConfirmPassword(e.detail.value!)
              }
            />
          </Field>

          <Field label="Referral code (optional)" subtle>
            <IonInput
              value={referralCode}
              onIonChange={(e) =>
                setReferralCode(e.detail.value!)
              }
            />
          </Field>
        </div>

        {/* Feedback */}
        {error && (
          <IonText color="danger">
            <p className="mt-4 text-sm text-center">{error}</p>
          </IonText>
        )}

        {success && (
          <IonText color="success">
            <p className="mt-4 text-sm text-center">
              Account created successfully 🎉  
              <br />
              Redirecting to login…
            </p>
          </IonText>
        )}

        {/* CTA */}
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={loading || success}
          onClick={onSubmit}
          className="
            mt-6
            !rounded-xl
            !py-2.5
            !text-sm
            !font-semibold
          "
        >
          {loading ? "Creating account…" : "Create account"}
        </Button>

        <IonLoading isOpen={loading} message="Creating account..." />
      </div>
    </div>
  );
};

/* ---------- Reusable Field ---------- */

const Field: React.FC<{
  label: string;
  subtle?: boolean;
  children: React.ReactNode;
}> = ({ label, subtle, children }) => (
  <div>
    <label
      className={`block mb-1 text-xs font-medium ${
        subtle ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {label}
    </label>
    <div
      className="
        rounded-xl
        border border-gray-300
        px-3 py-2.5
        text-sm
        focus-within:border-gray-900
      "
    >
      {children}
    </div>
  </div>
);
