import clsx from 'clsx';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
  scrolled?: boolean;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  scrolled,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const locales = ['en', 'ru'] as const satisfies readonly Locale[];
  type AppLocale = typeof locales[number];

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      if (typeof window === 'undefined') return;

      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      const pathParts = currentPath.split('/').filter(Boolean);
      const hasExistingLocale =
        pathParts[0] && (locales as readonly string[]).includes(pathParts[0]);
      const pathWithoutLocale = hasExistingLocale
        ? pathParts.slice(1).join('/')
        : pathParts.join('/');
      const newPath = `/${nextLocale}/${pathWithoutLocale}${currentHash}`.replace(
        /\/+/g,
        '/',
      );
      window.location.href = newPath;
    });
  }

  return (
    <label
      className={clsx(
        'relative',
        scrolled ? 'text-gray-700' : 'text-gray-200',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <p className="sr-only">{label}</p>
      <div className="relative inline-block">
        <select
          className={clsx(
            scrolled
              ? 'bg-white/20 border border-gray-400 text-gray-700'
              : 'bg-white/5 border border-white/30 text-gray-200',
            'text-sm rounded px-2 py-2 w-[60px] appearance-none pr-6',
          )}
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
        >
          {children}
        </select>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={clsx(scrolled ? 'text-gray-700' : 'text-gray-200', 'w-4 h-4')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <style jsx global>{`
        select option {
          background-color: white;
          color: black;
        }
      `}</style>
    </label>
  );
}
