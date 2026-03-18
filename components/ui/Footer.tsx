/**
 * Footer - Reusable footer with copyright. mt-auto for sticky bottom on short pages.
 */
export default function Footer() {
  return (
    <footer className="w-full min-h-20 flex items-center justify-center px-2 sm:px-4 bg-card mt-auto max-[500px]:min-h-32 max-[500px]:flex-col max-[500px]:gap-4 max-[500px]:py-4 rounded-xl shrink-0">
      <p className="text-sm sm:text-base font-light text-muted-foreground font-outfit">
        &copy; News World {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
}
