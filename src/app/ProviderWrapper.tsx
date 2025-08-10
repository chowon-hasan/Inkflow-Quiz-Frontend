"use client";
import { Provider } from "react-redux";
import { store, persistor } from "@/app/Redux_Store/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useFirebaseAuthListener } from "@/app/Hooks/useFirebaseAuthListener";

function ReduxProviderWithListener({
  children,
}: {
  children: React.ReactNode;
}) {
  useFirebaseAuthListener();
  return <>{children}</>;
}

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxProviderWithListener>{children}</ReduxProviderWithListener>
      </PersistGate>
    </Provider>
  );
}
