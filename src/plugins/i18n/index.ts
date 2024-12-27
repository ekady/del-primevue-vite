import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

async function loadLocale() {
  const modules = import.meta.glob('/**/*.locale.json');
  const messages: I18nOptions['messages'] = {};

  for (const path in modules) {
    const matched = path.match(/([\w-]+)\./g);
    if (matched && matched.length > 1) {
      const locale = matched[1].replace('.', '');

      const module: any = await modules[path]();
      if (!messages?.[locale]) {
        messages[locale] = module.default;
      } else {
        messages[locale] = { ...messages[locale], ...module.default };
      }
    }
  }

  const i18n = createI18n({
    locale: localStorage.getItem('lang') ?? 'en',
    fallbackLocale: 'en',
    messages,
    legacy: true,
  });

  return i18n;
}

export default loadLocale;
