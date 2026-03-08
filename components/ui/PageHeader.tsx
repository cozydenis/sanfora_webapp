interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center py-16 border-b border-luxury-gray-200">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-black mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg font-light text-luxury-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
