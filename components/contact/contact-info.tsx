const contactDetails = [
  {
    label: 'Email',
    value: 'oxshipon1@gmail.com',
    type: 'link' as const,
    href: 'mailto:oxshipon1@gmail.com',
  },
  {
    label: 'Location',
    value: 'Available for remote work',
    type: 'text' as const,
  },
  {
    label: 'Response Time',
    value: 'Within 24 hours',
    type: 'text' as const,
  },
];

export function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
      <div className="space-y-4">
        {contactDetails.map((detail) => (
          <div key={detail.label}>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{detail.label}</p>
            {detail.type === 'link' ? (
              <a
                href={detail.href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {detail.value}
              </a>
            ) : (
              <p className="text-gray-900 dark:text-white">{detail.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
