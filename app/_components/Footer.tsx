import PathAILogo from "./PathAILogo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <PathAILogo size={28} />
        <p className="text-muted-foreground text-sm">
          © 2024 PathAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
