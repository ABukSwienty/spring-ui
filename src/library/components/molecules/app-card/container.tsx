interface AppCardContainerProps {
  isOpen: boolean;
  isAnimating: boolean;
  children: React.ReactNode;
}

export const AppCardContainer = ({
  isOpen,
  isAnimating,
  children,
}: AppCardContainerProps) => {
  const containerClass = isOpen
    ? "fixed top-0 left-0 w-screen h-screen bg-transparent flex items-center justify-center"
    : "relative block h-full w-full";
  const zIndex = isOpen || isAnimating ? 9999 : 0;

  return (
    <div
      className={containerClass}
      style={{
        zIndex,
      }}
    >
      {children}
    </div>
  );
};
