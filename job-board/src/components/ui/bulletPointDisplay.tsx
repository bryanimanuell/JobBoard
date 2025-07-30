'use client'; 

interface BulletPointDisplayProps {
  text: string | null | undefined;
}

export function BulletPointDisplay({ text }: BulletPointDisplayProps) {
  if (!text) {
    return null;
  }

  const points = text.split('\n').filter(point => point.trim() !== '');

  return (
    <ul className="list-disc pl-5 space-y-2 **word-break-break-word**">
    {points.map((point, index) => (
        <li key={index}>{point}</li>
    ))}
    </ul>
  );
}