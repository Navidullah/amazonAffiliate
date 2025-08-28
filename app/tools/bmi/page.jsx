import BmiCalculator from "@/app/components/tools/BmiCalculator";

export const metadata = {
  title: "BMI Calculator | Shopyor",
  description: "Fast, accurate BMI calculator with metric & imperial units.",
};

export default function BmiPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BmiCalculator />
    </main>
  );
}
