interface AdminHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-flux-900">
          {title}
        </h1>
        {description && (
          <p className="text-flux-500 mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  )
}
