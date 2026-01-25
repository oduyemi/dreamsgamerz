import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLoading,
  } from "@ionic/react";
  import React, { useContext, useState } from "react";
  import { UserContext } from "../userContext";
  
  export const LoginForm: React.FC = () => {
    const userContext = useContext(UserContext);
  
    if (!userContext) {
      throw new Error("UserContext must be used within a UserProvider");
    }
  
    const { handleLogin, flashMessage } = userContext;
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async () => {
      if (!email || !password) return;
  
      setLoading(true);
      const success = await handleLogin(email, password);
      setLoading(false);
  
      if (success) {
        setTimeout(() => {
          window.location.href = "/"; // or /dashboard
        }, 1200);
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
            />
          </IonItem>
  
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
  
          {flashMessage && (
            <IonText
              color={flashMessage.type === "error" ? "danger" : "success"}
            >
              <p className="ion-margin-top">{flashMessage.message}</p>
            </IonText>
          )}
  
          <IonButton
            expand="block"
            onClick={onSubmit}
            className="ion-margin-top"
            disabled={loading}
          >
            Login
          </IonButton>
  
          <IonLoading isOpen={loading} message="Logging in..." />
        </IonContent>
      </IonPage>
    );
  };
  