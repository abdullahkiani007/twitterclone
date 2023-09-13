interface AuthLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function AuthLayout({ children, modal }: AuthLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
