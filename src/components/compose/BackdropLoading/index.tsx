import LoadingStatus from "../LoadingStatus";

const BackdropLoader = ({ open }: { open: boolean }) => {
  if (!open) return null;

  return (
    <div className="z-50 fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
      <LoadingStatus size={60} />
    </div>
  );
};

export default BackdropLoader;
