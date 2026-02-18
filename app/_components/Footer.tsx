import PathAILogo from "./PathAILogo";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <PathAILogo size={32} />
        <p className="text-muted-foreground text-sm">
          © 2024 PathAI. Built with Intelligence.
        </p>
      </div>
    </footer>
  );
}
