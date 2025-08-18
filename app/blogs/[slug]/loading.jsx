// app/blogs/[slug]/loading.jsx
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="wrapper py-10">
      <LoadingSpinner
        message="Loading post..."
        size="large"
        className="min-h-[50vh]"
      />
    </div>
  );
}
