import type { Metadata } from "next";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Tag: ${tag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Tag</h1>
        <p className="text-2xl">Tag: {tag}</p>
      </div>
    </div>
  );
}

