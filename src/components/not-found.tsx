import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="en-mark text-xs text-primary">404</p>
      <h1 className="mt-3 text-3xl">این مدار پیدا نشد</h1>
      <p className="mt-3 text-sm text-muted">صفحه حذف شده یا آدرس اشتباه است.</p>
      <Button asChild className="mt-6">
        <Link to="/">بازگشت به خانه</Link>
      </Button>
    </div>
  );
}
