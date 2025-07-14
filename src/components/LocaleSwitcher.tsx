import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

type Props = {
  scrolled?: boolean;
};

export default function LocaleSwitcher({ scrolled }: Props) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')} scrolled={scrolled}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
