import { useEffect, useState } from "react";
import { Download } from "lucide-react";

function InstallPWAButton() {
  const [promptEvent, setPromptEvent] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    promptEvent.userChoice.then(() => setPromptEvent(null));
  };

  if (!promptEvent) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-green-700 flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Install Quran Admin App
    </button>
  );
}

export default InstallPWAButton;
